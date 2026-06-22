import { chatCompletion } from "./llmClient.mjs";

export async function extractProfileFromCV(cvText) {
  const content = await chatCompletion({
    system:
      "You extract structured student profile data from CV text. Return only valid JSON.",
    userContent: `
Extract this CV into JSON:

{
  "name": "",
  "email": "",
  "phone": "",
  "program": "",
  "skills": [],
  "experience": [
    {
      "title": "",
      "company": "",
      "duration": "",
      "years": 0,
      "description": ""
    }
  ],
  "education": [],
  "availability": "",
  "preferred_job_type": "",
  "bio": ""
}

Rules:
- Return only valid JSON.
- Do not include markdown.
- Use "Unknown" for missing string fields.
- Use [] for missing array fields.
- Infer years worked from the duration field.
- Convert inferred duration into a decimal number.
- Example:
  "2024 - 2026" => 2
  "Jan 2024 - Jul 2025" => 1.5
  "2025 - Present" => estimate using current year.
- If duration cannot be determined use 1.

CV text:
${cvText}
`
  });

  const cleanedContent = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedContent);
}