export async function extractProfileFromCV(cvText) {
  const response = await fetch(`${process.env.LITELLM_BASE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LITELLM_API_KEY || "anything"}`
    },
    body: JSON.stringify({
      model: process.env.LLM_MODEL || "anthropic/claude-haiku-4-5-20251001",
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You extract structured student profile data from CV text. Return only valid JSON."
        },
        {
          role: "user",
content: `
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
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LLM request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  const cleanedContent = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedContent);
}