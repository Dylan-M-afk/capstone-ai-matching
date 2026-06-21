import { chatCompletion } from "./llmClient.mjs";

export async function rankStudentsForJob(students, job) {
  const content = await chatCompletion({
    system:
      "You rank student candidates against a job posting. Return only valid JSON.",
    userContent: `
Compare these students against the provided job posting.

Generate:
- an alignment score from 0-100
- concise reasoning

Return ONLY valid JSON.

Required output format:

{
  "rankings": [
    {
      "student_id": "",
      "score": 0,
      "why": ""
    }
  ]
}

Rules:
- Use the student_id provided in each student object.
- Score must be an integer from 0-100.
- Higher score = better alignment.
- Consider:
  - skill overlap
  - relevant experience
  - education relevance
  - years of experience
  - leadership/project complexity
- Penalize missing required skills.
- Keep "why" concise and specific.
- Do not include markdown.
- Return only valid JSON.

Job Posting:
${JSON.stringify(job, null, 2)}

Students:
${JSON.stringify(students, null, 2)}
`
  });

  const cleanedContent = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const jsonStart = cleanedContent.indexOf("{");
  const jsonEnd = cleanedContent.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("No valid JSON found in LLM response.");
  }

  const jsonString = cleanedContent.slice(
    jsonStart,
    jsonEnd + 1
  );

  console.log("LLM Rankings Response:", jsonString);

  return JSON.parse(jsonString);
}