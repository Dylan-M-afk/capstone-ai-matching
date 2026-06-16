import fs from "fs";
import PDFParser from "pdf2json";

export async function extractTextFromPDF(pdfPath) {
  const buffer = fs.readFileSync(pdfPath);
  return extractTextFromPDFBuffer(buffer);
}

export async function extractTextFromPDFBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => {
      reject(new Error(errData.parserError));
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const text = pdfData.Pages
        .flatMap((page) =>
          page.Texts.map((textItem) =>
            decodeURIComponent(
              textItem.R.map((run) => run.T).join("")
            )
          )
        )
        .join(" ");

      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}