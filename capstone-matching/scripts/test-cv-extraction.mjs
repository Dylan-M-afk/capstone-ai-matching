import { extractProfileFromCV } from "../lib/llm/cvExtraction.mjs";

const fakeCV = `
Jane Student
jane.student@cna.nl.ca

Skills:
Python, React, SQL

Education:
Software Development Diploma

Experience:
Built a full stack student scheduling application.
`;

async function runTest() {
  try {
    const result = await extractProfileFromCV(fakeCV);

    console.log("LLM Extraction Result:");
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

runTest();