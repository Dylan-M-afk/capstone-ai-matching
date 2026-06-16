## LiteLLM + PDF CV Extraction Setup

### 1. Install Node packages

From the `capstone-matching` project folder, install project dependencies:

```powershell
npm install
```

The PDF extraction test requires:

```text
pdf2json
```

This dependency should already be included in `package.json` and `package-lock.json`.

---

## 2. Install LiteLLM

Install LiteLLM with proxy support:

```powershell
pip install "litellm[proxy]>=1.83.0"
```

Verify installation:

```powershell
python -c "import litellm; print(litellm.__version__)"
```

---

## 3. Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

LITELLM_BASE_URL=http://127.0.0.1:4000
LLM_MODEL=anthropic/claude-haiku-4-5-20251001
ANTHROPIC_API_KEY=your_key_here
```

Do not commit `.env.local`.

---

## 4. Running LiteLLM

Open a separate PowerShell terminal and run:

```powershell
$env:ANTHROPIC_API_KEY="your_key_here"
litellm --model anthropic/claude-haiku-4-5-20251001
```

LiteLLM should start on:

```text
http://0.0.0.0:4000
```

Leave this terminal running.

---

## 5. Running the PDF CV Extraction Test

Open another terminal in the `capstone-matching` project folder and run:

```powershell
$env:LITELLM_BASE_URL="http://127.0.0.1:4000"
$env:LLM_MODEL="anthropic/claude-haiku-4-5-20251001"

node scripts/test-pdf-cv-extraction.mjs "scripts/sample_cv.pdf"
```

This test performs the following pipeline:

```text
PDF CV -> extracted text -> LiteLLM proxy -> Claude -> structured JSON profile
```

---

## 6. Expected Output

The script should return structured JSON similar to:

```json
{
  "name": "Jane Student",
  "email": "jane.student@cna.nl.ca",
  "phone": "(555) 123-4567",
  "program": "Software Development Diploma",
  "skills": ["Python", "React", "SQL", "JavaScript", "Git"],
  "experience": "Student Developer Intern - Built a scheduling web application using React and Node.js.",
  "education": "Software Development Diploma, College of the North Atlantic",
  "availability": "Full-time",
  "preferred_job_type": "Software Development",
  "bio": "Created a resume-to-profile extraction tool using LiteLLM and Claude."
}
```

---

## 7. Current Files

```text
lib/llm/cvExtraction.mjs
lib/llm/pdfTextExtraction.mjs
scripts/test-pdf-cv-extraction.mjs
scripts/sample_cv.pdf
.env.example
package.json
package-lock.json
```

---

## 8. Notes

- LiteLLM acts as a local proxy between the Next.js project and Claude.
- The current test uses a sample fake PDF CV.
- Real API keys must only be stored in `.env.local`.
- Do not commit `.env.local`.
- The LLM response is cleaned before JSON parsing to remove possible Markdown code fences.
- PDF text extraction currently uses `pdf2json`.
- Earlier `pdf-parse` and `pdfjs-dist` approaches caused compatibility issues in the Next.js API route.
