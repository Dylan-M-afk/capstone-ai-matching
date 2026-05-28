import { extractTextFromPDF } from "../lib/llm/pdfTextExtraction.mjs";
import { extractProfileFromCV } from "../lib/llm/cvExtraction.mjs";

const pdfPath = process.argv[2];

if (!pdfPath) {
  console.error("Usage: node scripts/test-pdf-cv-extraction.mjs <path-to-pdf>");
  process.exit(1);
}

async function runTest() {
  try {
    console.log("Extracting text from PDF...");
    const cvText = await extractTextFromPDF(pdfPath);

    console.log("Sending extracted text to LLM...");
    const profile = await extractProfileFromCV(cvText);

    console.log("Extracted Profile:");
    console.log(JSON.stringify(profile, null, 2));
  } catch (err) {
    console.error(err);
  }
}

runTest();