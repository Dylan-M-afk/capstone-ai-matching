# AI-Assisted Student–Employer Matching Platform

> Design and Prototype Development of an LLM-Assisted Student–Job Matching System for College Students and Local Employers

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

---

## Overview

This platform connects college students with local employers using artificial intelligence. Students create profiles and upload CVs, companies post job vacancies, and an LLM-powered ranking engine intelligently scores and ranks applicants against job requirements — returning a match score out of 100 with a short explanation for each candidate.

The system supports three user roles: **Admin**, **Student**, and **Company**, each with a dedicated dashboard and role-based access control enforced at both the API and database level.

This project was developed as a capstone prototype for the School of Business & IT at the College of the North Atlantic under the supervision of Instructor Peter Shafie.

---

## Features

- **Role-based authentication** — Admin, Student, and Company roles with protected routes
- **Student profiles** — Full profile creation with skills, experience, availability, and bio
- **CV upload & parsing** — PDF CV upload with LLM-powered extraction of structured profile data
- **Job postings** — Companies can create, manage, and close job postings
- **Application tracking** — Students apply to jobs and track application status
- **AI ranking engine** — LLM generates match scores, skill gap analysis, and explanations for each applicant
- **Admin dashboard** — Manage users, create company accounts, and generate access codes

---

## Team

| Role | Student |
|---|---|
| Authentication, Admin & User Roles | Parker Wallace |
| Backend, Database & APIs | Dylan Mercer |
| Frontend, UI & Dashboards | Julia Forward |
| CV Parsing & LLM Matching Engine | Julia Parewick  |

**Instructor:** Peter Shafie
**Institution:** College of the North Atlantic — School of Business & IT
**Academic Year:** 2025–2026

---


## Tech Stack

| Layer | Technology |
|---|---|
| Frontend & Backend | Next.js 16 |
| Database & Auth | Supabase (PostgreSQL) |
| Styling | Tailwind CSS |
| LLM API | Anthropic Claude / LiteLLM |
| File Storage | Supabase Storage |
| Deployment | Vercel |
| Version Control | GitHub |

---

## Getting Started

See [INSTALL.md](./INSTALL.md) for full setup instructions including prerequisites, environment variables, and database configuration.

---

## Project Structure

```
capstone-ai-matching/
├── capstone-matching/        # Next.js application
│   ├── app/                  # App router — pages and API routes
│   ├── utils/supabase/       # Supabase client utilities
│   ├── lib/llm/              # LLM integration modules
│   ├── proxy.js              # Next.js middleware for session handling
│   └── .env.example          # Environment variable template
├── database/                 # SQL setup files
│   ├── 1. Schema.sql
│   ├── 2. RLS Policies.sql
│   ├── 3. New User Trigger.sql
│   └── 4. Seed Users.sql
```
---

## License

This project was developed for academic purposes as part of the CP Capstone program at the College of the North Atlantic. Not intended for commercial use.
