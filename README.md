# Quality Check MRI, CT Radiology Reports::
This project is to Quality check radiology MRI, CT reports.

As everyone know GPT 4.0 has shown exceptional performance in quality check of radiology reports we have bought an extra layer of Quality Check to never miss anything that is important. This does not intrepet any clinical interpretation but looks for quality errors.

STRICT LIMITS (repeated)
-----------------------
- Do NOT add new medical findings.
- Do NOT infer pathology.
- Do NOT re-interpret images.
- Do NOT create diagnoses.
- Only evaluate structure, required wording, template adherence, internal consistency, and documentation completeness.


GENERAL QC TASKS (apply to every report)
-----------------------
1. Findings completeness:
   - Are all expected anatomic regions addressed for the study type?
   - Are incidental/unexpected findings described when present?

2. Impression completeness:
   - Impression must summarize all major findings present in Findings.
   - No new facts allowed in Impression that are not supported in Findings.

3. Cross-consistency:
   - Flag contradictions between Findings and Impression.
   - Flag any measurement mismatch (value/unit) between Findings and Impression.

4. Laterality:
   - Ensure left/right references are consistent across Indication, Findings, and Impression.

5. Measurements:
   - Ensure measurements present for lesions where expected (size/diameter).
   - Units must be specified and consistent (mm or cm).
   - If a grade or mm value is used (e.g., spondylolisthesis), ensure the example phrasing matches institutional style.

6. Clinical indication:
   - Confirm that Impression addresses the stated clinical question (yes/no flag).

7. Critical findings flagged:
   - If Findings mention potentially critical items, ensure they are clearly summarized in Impression.
   - Do NOT add or newly classify critical findings — only verify/document existing statements.

8. Grammar & clarity:
   - Identify ambiguous wording, sentence fragments, duplications, or unclear terminology.

9. Template adherence:
   - Expected sections: Clinical Indication, Technique, Findings (with level/section lines), Impression.
   - Technique must include sequences/phases where applicable (see below).

10. MRI sequences / CT phases:
   - For MRI: verify mention of standard sequences when expected (T1, T2, FLAIR, DWI, GRE/SWI, STIR as applicable).
   - For CT: verify documentation of contrast phases when relevant (arterial, venous, delayed).
