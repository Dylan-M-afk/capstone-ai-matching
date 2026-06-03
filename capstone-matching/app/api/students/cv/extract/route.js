export const runtime = "nodejs";
import { extractTextFromPDFBuffer } from "@/lib/llm/pdfTextExtraction.mjs";
import { extractProfileFromCV } from "@/lib/llm/cvExtraction.mjs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("cv");

    if (!file) {
      return Response.json(
        { success: false, error: "No CV file uploaded." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return Response.json(
        { success: false, error: "Only PDF files are allowed." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cvText = await extractTextFromPDFBuffer(buffer);
    const extractedProfile = await extractProfileFromCV(cvText);

    return Response.json({
      success: true,
      extracted_text: cvText,
      extracted_profile: extractedProfile,
    });
  } catch (error) {
    console.error("CV extraction error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to extract profile from CV.",
      },
      { status: 500 }
    );
  }
}