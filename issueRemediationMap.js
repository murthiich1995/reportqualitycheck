// simple map for issue categories -> remediation suggestions
export const ISSUE_REMEDIATION_MAP = {
  "Findings_incomplete": "Add missing anatomic region(s) to Findings or explain why omitted.",
  "Impression_incomplete": "Ensure Impression summarizes all major Findings; do not introduce new facts.",
  "Findings_Impression_mismatch": "Correct either Findings or Impression so they align; ensure measurements/side match.",
  "Laterality_mismatch": "Correct laterality references so they match across Indication/Findings/Impression.",
  "Measurement_missing": "Add numeric measurement (with units) in Findings and replicate appropriately in Impression.",
  "Measurement_mismatch": "Ensure same numeric value and unit are reported in both Findings and Impression.",
  "STIR_missing_line": "Add the required STIR-specific lines in Technique/Findings/Impression per institutional template.",
  "Sequence_missing": "Add the missing sequence(s) in the Technique section (e.g., T1, T2, STIR, DWI).",
  "CT_phase_missing": "Document appropriate contrast phases (e.g., arterial/venous) in Technique.",
  "MVA_template_violation": "Apply the client's MVA templates: remove generic 'Degenerative changes' and use provided neural foramina phrasing.",
  "Grammar_clarity": "Edit sentence(s) for grammar/clarity (remove fragments/duplicates).",
  "Template_adherence": "Reformat report sections to follow Indication | Technique | Findings | Impression.",
  // add more as needed...
};
