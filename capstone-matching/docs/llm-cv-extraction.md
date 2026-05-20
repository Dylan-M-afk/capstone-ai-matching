## LiteLLM Setup

### 1. Install LiteLLM

Install LiteLLM with proxy support:

```powershell
pip install "litellm[proxy]>=1.83.0"
```

Verify installation:

```powershell
python -c "import litellm; print(litellm.__version__)"
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
LITELLM_BASE_URL=http://127.0.0.1:4000
LLM_MODEL=anthropic/claude-haiku-4-5-20251001
ANTHROPIC_API_KEY=your_key_here
```

Do not commit `.env.local`.

---

## Running LiteLLM

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

## Running the CV Extraction Test

Open another terminal in the project root and run:

```powershell
$env:LITELLM_BASE_URL="http://127.0.0.1:4000"
$env:LLM_MODEL="anthropic/claude-haiku-4-5-20251001"

node scripts/test-cv-extraction.mjs
```

---

## Expected Output

The script should return structured JSON similar to:

```json
{
  "name": "Jane Student",
  "email": "jane.student@cna.nl.ca",
  "phone": "Unknown",
  "education": "Software Development Diploma",
  "skills": ["Python", "React", "SQL"],
  "experience": [
    "Built a full stack student scheduling application."
  ],
  "availability": "Unknown",
  "preferred_job_type": "Unknown"
}
```

---

## Current Files

```text
lib/llm/cvExtraction.mjs
scripts/test-cv-extraction.mjs
.env.example
```

---
