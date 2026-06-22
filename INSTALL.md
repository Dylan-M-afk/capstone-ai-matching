# Installation Guide

## Prerequisites

- [Node.js v22 LTS](https://nodejs.org/en/download) or higher
- [Git](https://git-scm.com/downloads)
- Access to Supabase project credentials 
- An Anthropic API key

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Dylan-M-afk/capstone-ai-matching.git
cd capstone-ai-matching/capstone-matching
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the `capstone-matching/` directory:

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in the required values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic
ANTHROPIC_API_KEY=
```

#### Optional: Local AI via LiteLLM

Only needed if you are running a local LLM instead of Anthropic's API directly.

```env
# Defaults to anthropic/claude-haiku-4-5-20251001 if not set
LLM_MODEL=

# If set, the app tries LiteLLM first before falling back to Anthropic
LITELLM_BASE_URL=

# Only relevant if LITELLM_BASE_URL is set
LITELLM_API_KEY=
```

### 4. Start the development server

```bash
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

---

## Database Setup

The Supabase database is shared — no local setup is required. If you need to recreate the schema from scratch, run the SQL files in the `/database/` folder in this order:

1. `1. Schema.sql`
2. `2. RLS Policies.sql`
3. `3. New User Trigger.sql`
4. `4. Seed Users.sql` *(dev/demo only)*

---
