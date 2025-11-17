// server.js
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import { QC_SYSTEM_PROMPT } from "./qcPrompt.js";

dotenv.config();
const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load JSON schema (kept for reference/validation)
const qcSchema = JSON.parse(fs.readFileSync("./qcSchema.json", "utf8"));

/**
 * Utility: Convert metadata object into a short deterministic system hint
 * Example metadata:
 * { case_type: "MVA", study: "MRI Lumbar", stir_present: true }
 */
function metadataToSystemHint(metadata = {}) {
  const parts = [];
  if (metadata.case_type) parts.push(`case_type: ${metadata.case_type}`);
  if (metadata.study) parts.push(`study: ${metadata.study}`);
  if (typeof metadata.stir_present !== "undefined")
    parts.push(`stir_present: ${metadata.stir_present}`);
  if (metadata.prior_available) parts.push(`prior_available: ${metadata.prior_available}`);
  if (metadata.study_type) parts.push(`study_type: ${metadata.study_type}`);
  return parts.length ? `METADATA: ${parts.join(" | ")}` : "";
}

// POST /qc — Main Radiology QC Endpoint
app.post("/qc", async (req, res) => {
  try {
    const { report, metadata } = req.body;

    if (!report) {
      return res.status(400).json({ error: "Missing 'report' field" });
    }

    // Build an additional system hint message using metadata to ensure deterministic rule application.
    const metadataHint = metadataToSystemHint(metadata);

    // Build messages array
    const messages = [
      { role: "system", content: QC_SYSTEM_PROMPT },
    ];
    if (metadataHint) {
      messages.push({ role: "system", content: metadataHint });
    }
    messages.push({ role: "user", content: `Perform QC on the following CT/MRI report:\n\n${report}` });

    // Call OpenAI Chat Completions with json_schema response format
    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "qc_output",
          schema: qcSchema
        }
      },
      messages
    });
    console.log("OpenAI Response:", response.choices[0].message.content);
    // The model returns parsed JSON under choices[0].message.parsed
    const jsonResult = response.choices[0].message.content;
    const qc = JSON.parse(jsonResult);
    // Optionally: validate jsonResult against qcSchema here (use AJV or similar). Omitted for brevity.
    //console.log("QC Result:", JSON.stringify(jsonResult, null, 2));
   // console.log(jsonResult);
    return res.json({
      success: true,
      //metadata_used: metadata || null,
      qc
    });

  } catch (err) {
    console.error("QC Error:", err);
    // Return as much debugging info as is safe
    return res.status(500).json({ error: "Internal error", details: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Radiology QC API running on port ${PORT}`));
