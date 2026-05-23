# API Contract

## Base URL

http://localhost:5000/api

# Authentication

## POST /auth/login

Purpose: Logs in a user.

Role: Public

Request body:

```json
{
  "email": "student@cna.nl.ca",
  "password": "Password123!"
}
```

Successful response:

```json
{
  "token": "jwt_token_here",
  "role": "student",
  "user_id": 1
}
```

Error response:

```json
{
  "success": false,
  "error": "Invalid email or password."
}
```

## POST /auth/logout

Purpose:
Logs out the current user.

Role:
Student, Company, Admin

Request:

```json
{}
```

Success:

```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

Error:

```json
{
  "success": false,
  "error": "User is not authenticated."
}
```

## POST /auth/register/student

Purpose: Registers a new student account.

Role: Public

Request Body:

```json
{
  "name": "Jane Student",
  "email": "jane.student@cna.nl.ca",
  "password": "Password123!"
}
```

Successful Response:

```json
{
  "success": true,
  "user_id": 1,
  "message": "Student account created successfully. Verification code sent."
}
```

Error Response:

```json
{
  "success": false,
  "error": "A student account with this email already exists."
}
```

## POST /auth/verify

Purpose: Verifies a student's email using a verification code.

Role: Public

Request Body:

```json
{
  "email": "jane.student@cna.nl.ca",
  "code": "123456"
}
```

Successful Response:

```json
{
  "success": true,
  "message": "Account verified successfully."
}
```

Error Response:

```json
{
  "success": false,
  "error": "Invalid verification code."
}
```

## GET /auth/me

Purpose:
Returns information about the currently authenticated user.

Role:
Student, Company, Admin

Success:

```json
{
  "user_id": 1,
  "email": "jane.student@cna.nl.ca",
  "role": "student",
  "is_verified": true
}
```

Error:

```json
{
  "success": false,
  "error": "User is not authenticated."
}
```


# Student Profile

---

## GET /students/:id

Purpose: Returns a student's profile information.

Required role: Student, Admin

URL Parameter:

```text
id = Student ID
```

Successful Response:

```json
{
  "student_id": 1,
  "name": "Jane Student",
  "email": "jane.student@cna.nl.ca",
  "program": "Software Development",
  "skills": [
    "Python",
    "React",
    "SQL"
  ],
  "experience": "Built several academic web applications and team projects.",
  "availability": "Part-time evenings",
  "preferred_job_type": "Part-time",
  "bio": "Motivated software development student interested in backend systems and AI.",
  "cv_file_path": "/uploads/jane-student-cv.pdf"
}
```

Error Response:

```json
{
  "success": false,
  "error": "Student profile not found."
}
```

---

## POST /students/profile

Purpose: Creates a student profile.

Required role: Student

Request Body:

```json
{
  "name": "Jane Student",
  "program": "Software Development",
  "skills": [
    "Python",
    "React",
    "SQL"
  ],
  "experience": "Built several academic web applications and team projects.",
  "availability": "Part-time evenings",
  "preferred_job_type": "Part-time",
  "bio": "Motivated software development student interested in backend systems and AI."
}
```

Successful Response:

```json
{
  "success": true,
  "message": "Student profile created successfully."
}
```

Error Response:

```json
{
  "success": false,
  "error": "Missing required profile fields."
}
```

---

## PUT /students/profile

Purpose: Updates an existing student profile.

Required role: Student

Request Body:

```json
{
  "skills": [
    "Python",
    "React",
    "SQL",
    "Node.js"
  ],
  "availability": "Full-time summer"
}
```

Successful Response:

```json
{
  "success": true,
  "message": "Student profile updated successfully."
}
```

Error Response:

```json
{
  "success": false,
  "error": "Unauthorized access."
}
```

# Company / Admin

---

## POST /admin/companies

Purpose: Allows an Admin to create a company account.

Required role: Admin

Request Body:

```json
{
  "company_name": "TechNL Solutions",
  "contact_person": "Alex Smith",
  "email": "contact@technl.ca"
}
```

Successful Response:

```json
{
  "success": true,
  "company_id": 1,
  "access_code": "TECHNL-48291",
  "message": "Company account created successfully."
}
```

Error Response:

```json
{
  "success": false,
  "error": "Admin role required."
}
```

---

## GET /admin/companies

Purpose: Returns a list of all companies.

Required role: Admin

Successful Response:

```json
{
  "companies": [
    {
      "company_id": 1,
      "company_name": "TechNL Solutions",
      "contact_person": "Alex Smith",
      "status": "Active"
    },
    {
      "company_id": 2,
      "company_name": "Avalon Media",
      "contact_person": "Sarah Lee",
      "status": "Inactive"
    }
  ]
}
```

Error Response:

```json
{
  "success": false,
  "error": "Unauthorized access."
}
```

---

## GET /admin/users

Purpose: Returns a list of all users in the system.

Required role: Admin

Successful Response:

```json
{
  "users": [
    {
      "user_id": 1,
      "name": "Jane Student",
      "email": "jane.student@cna.nl.ca",
      "role": "student",
      "status": "Active"
    },
    {
      "user_id": 2,
      "name": "Alex Smith",
      "email": "contact@technl.ca",
      "role": "company",
      "status": "Active"
    }
  ]
}
```

Error Response:

```json
{
  "success": false,
  "error": "Admin role required."
}
```

---

## PUT /admin/users/:id/status

Purpose: Allows an Admin to activate or deactivate user accounts.

Required role: Admin

URL Parameter:

```text
id = User ID
```

Request Body:

```json
{
  "status": "Inactive"
}
```

Successful Response:

```json
{
  "success": true,
  "message": "User account status updated."
}
```

Error Response:

```json
{
  "success": false,
  "error": "User not found."
}
```


# Job Posts

---

## POST /jobs

Purpose: Allows a Company to create a new job posting.

Required role: Company

Request Body:

```json
{
  "title": "Junior Web Developer",
  "description": "Assist with React and Node.js development.",
  "required_skills": [
    "React",
    "Node.js",
    "SQL"
  ],
  "job_type": "Part-time",
  "location": "St. John's, NL",
  "schedule": "Evenings and weekends"
}
```

Successful Response:

```json
{
  "success": true,
  "job_id": 1,
  "message": "Job post created successfully."
}
```

Error Response:

```json
{
  "success": false,
  "error": "Company role required."
}
```

---

## GET /jobs

Purpose: Returns all open job postings for students to view.

Required role: Student, Company, Admin

Successful Response:

```json
{
  "jobs": [
    {
      "job_id": 1,
      "company_id": 1,
      "company_name": "TechNL Solutions",
      "title": "Junior Web Developer",
      "description": "Assist with React and Node.js development.",
      "required_skills": [
        "React",
        "Node.js",
        "SQL"
      ],
      "job_type": "Part-time",
      "location": "St. John's, NL",
      "schedule": "Evenings and weekends",
      "status": "Open"
    }
  ]
}
```

Error Response:

```json
{
  "success": false,
  "error": "Unable to retrieve job posts."
}
```

---

## GET /jobs/:id

Purpose: Returns details for one job posting.

Required role: Student, Company, Admin

URL Parameter:

```text
id = Job ID
```

Successful Response:

```json
{
  "job_id": 1,
  "company_id": 1,
  "company_name": "TechNL Solutions",
  "title": "Junior Web Developer",
  "description": "Assist with React and Node.js development.",
  "required_skills": [
    "React",
    "Node.js",
    "SQL"
  ],
  "job_type": "Part-time",
  "location": "St. John's, NL",
  "schedule": "Evenings and weekends",
  "status": "Open",
  "created_at": "2026-05-12T14:30:00Z"
}
```

Error Response:

```json
{
  "success": false,
  "error": "Job post not found."
}
```

---

## PUT /jobs/:id

Purpose: Allows a Company to update one of their job postings.

Required role: Company

URL Parameter:

```text
id = Job ID
```

Request Body:

```json
{
  "title": "Junior Full Stack Developer",
  "description": "Assist with React, Node.js, and database development.",
  "required_skills": [
    "React",
    "Node.js",
    "PostgreSQL"
  ],
  "job_type": "Part-time",
  "location": "St. John's, NL",
  "schedule": "Flexible evenings",
  "status": "Open"
}
```

Successful Response:

```json
{
  "success": true,
  "message": "Job post updated successfully."
}
```

Error Response:

```json
{
  "success": false,
  "error": "Unauthorized access to this job post."
}
```

---

## PUT /jobs/:id/status

Purpose: Allows a Company to change the status of one of their job postings.

Required role: Company

URL Parameter:

```text
id = Job ID
```

Request Body:

```json
{
  "status": "Closed"
}
```

Successful Response:

```json
{
  "success": true,
  "message": "Job status updated successfully."
}
```

Error Response:

```json
{
  "success": false,
  "error": "Job post not found."
}
```

# CV Upload

---

## POST /students/cv

Purpose: Allows a Student to upload a PDF CV and extract profile information using AI.

Required role: Student

Request Type:

```text
multipart/form-data
```

Form Field:

```text
cv = PDF resume file
```

Successful Response:

```json
{
  "success": true,
  "cv_file_path": "/uploads/jane-student-cv.pdf",
  "extracted_profile": {
    "name": "Jane Student",
    "skills": [
      "Python",
      "React",
      "SQL"
    ],
    "experience": "Built several academic software projects.",
    "education": "Software Development Diploma"
  },
  "message": "CV uploaded and processed successfully."
}
```

Error Response:

```json
{
  "success": false,
  "error": "Only PDF files are allowed."
}
```

---

## GET /students/cv

Purpose: Returns the uploaded CV information for the logged-in student.

Required role: Student

Successful Response:

```json
{
  "student_id": 1,
  "cv_file_path": "/uploads/jane-student-cv.pdf",
  "uploaded_at": "2026-05-12T15:10:00Z"
}
```

Error Response:

```json
{
  "success": false,
  "error": "No CV found for this student."
}
```

---

## DELETE /students/cv

Purpose: Allows a Student to remove their uploaded CV.

Required role: Student

Successful Response:

```json
{
  "success": true,
  "message": "CV deleted successfully."
}
```

Error Response:

```json
{
  "success": false,
  "error": "Unable to delete CV."
}
```

# AI Ranking

---

## POST /jobs/:id/rank

Purpose: Allows a Company to generate AI rankings for applicants to one of their job postings.

Required role: Company

URL Parameter:

```text
id = Job ID
```

Successful Response:

```json
{
  "job_id": 1,
  "job_title": "Junior Web Developer",
  "ranked_applicants": [
    {
      "student_id": 1,
      "name": "Jane Student",
      "score": 87,
      "confidence_badge": "Strong Match",
      "matched_skills": [
        "React",
        "SQL"
      ],
      "missing_skills": [
        "Node.js"
      ],
      "availability_match": "Good",
      "reason": "Strong match because the student has relevant web development skills and part-time availability."
    },
    {
      "student_id": 2,
      "name": "Mark Taylor",
      "score": 64,
      "confidence_badge": "Partial Match",
      "matched_skills": [
        "SQL"
      ],
      "missing_skills": [
        "React",
        "Node.js"
      ],
      "availability_match": "Fair",
      "reason": "Partial match because the student has some database experience but is missing key frontend and backend skills."
    }
  ]
}
```

Error Response:

```json
{
  "success": false,
  "error": "Unauthorized access to this job posting."
}
```

---

## GET /jobs/:id/rankings

Purpose: Returns saved AI ranking results for a job without calling the AI again.

Required role: Company

URL Parameter:

```text
id = Job ID
```

Successful Response:

```json
{
  "job_id": 1,
  "ranked_applicants": [
    {
      "student_id": 1,
      "name": "Jane Student",
      "score": 87,
      "confidence_badge": "Strong Match",
      "matched_skills": [
        "React",
        "SQL"
      ],
      "missing_skills": [
        "Node.js"
      ],
      "availability_match": "Good",
      "reason": "Strong match because the student has relevant web development skills and part-time availability.",
      "created_at": "2026-05-12T15:30:00Z"
    }
  ]
}
```

Error Response:

```json
{
  "success": false,
  "error": "No ranking results found for this job."
}
```

# Applications

---

## POST /jobs/:id/apply

Purpose:
Allows a Student to apply to a job posting.

Role:
Student

URL Parameter:

```text
id = Job ID
```

Success:

```json
{
  "success": true,
  "application_id": 1,
  "message": "Application submitted successfully."
}
```

Error:

```json
{
  "success": false,
  "error": "You have already applied to this job."
}
```

---

## GET /students/applications

Purpose:
Returns all applications submitted by the logged-in student.

Role:
Student

Success:

```json
{
  "applications": [
    {
      "application_id": 1,
      "job_id": 1,
      "job_title": "Junior Web Developer",
      "company_name": "TechNL Solutions",
      "status": "Submitted"
    }
  ]
}
```

Error:

```json
{
  "success": false,
  "error": "Unable to retrieve applications."
}
```

---

## GET /jobs/:id/applicants

Purpose:
Returns all applicants for a specific job posting.

Role:
Company

URL Parameter:

```text
id = Job ID
```

Success:

```json
{
  "job_id": 1,
  "job_title": "Junior Web Developer",
  "applicants": [
    {
      "student_id": 1,
      "name": "Jane Student",
      "program": "Software Development",
      "status": "Submitted"
    }
  ]
}
```

Error:

```json
{
  "success": false,
  "error": "Unauthorized access to this job posting."
}
```

---

## PUT /applications/:id/status

Purpose:
Allows a Company to update the status of an application.

Role:
Company

URL Parameter:

```text
id = Application ID
```

Request:

```json
{
  "status": "Reviewing"
}
```

Success:

```json
{
  "success": true,
  "message": "Application status updated successfully."
}
```

Error:

```json
{
  "success": false,
  "error": "Application not found."
}
```








# Standard Error Format

All API errors should return responses in the following format:

```json
{
  "success": false,
  "error": "Error message here."
}
```

---

## Example Errors

### Unauthorized Access

```json
{
  "success": false,
  "error": "Unauthorized access."
}
```

---

### Missing Required Fields

```json
{
  "success": false,
  "error": "Missing required fields."
}
```

---

### Invalid Login Credentials

```json
{
  "success": false,
  "error": "Invalid email or password."
}
```

---

### Resource Not Found

```json
{
  "success": false,
  "error": "Requested resource not found."
}
```

---

### Invalid File Type

```json
{
  "success": false,
  "error": "Only PDF files are allowed."
}
```

---

### Duplicate Application

```json
{
  "success": false,
  "error": "You have already applied to this job."
}
```
# Role Permissions

The system uses role-based access control to restrict API access based on user type.

---

## Admin Permissions

Admin users can:

- Create company accounts
- Generate company access codes
- View all users
- View all companies
- Activate or deactivate accounts
- Access the admin dashboard

Admin users cannot:

- Apply to jobs
- Upload CVs
- Generate AI rankings

---

## Student Permissions

Student users can:

- Log in/Log out
- Create and edit their profile
- Upload a CV
- Browse job postings
- Apply to jobs
- View their applications

Student users cannot:

- Create company accounts
- Create job postings
- Access admin routes
- Generate applicant rankings

---

## Company Permissions

Company users can:

- Log in using company credentials/access code
- Create and manage job postings
- View applicants for their jobs
- Generate AI rankings
- View ranking results

Company users cannot:

- Access admin routes
- Edit student profiles
- Apply to jobs
- Upload CVs

---

## Route Protection Rules

| Route Area | Admin | Student | Company |
|---|---|---|---|
| Authentication | Yes | Yes | Yes |
| Student Profiles | View Only | Yes | No |
| CV Upload | No | Yes | No |
| Company Management | Yes | No | No |
| Job Posts | View Only | View Only | Yes |
| Applications | View Only | Yes | View Applicants |
| AI Ranking | No | No | Yes |
| Admin Dashboard | Yes | No | No |

---

## Unauthorized Access Response

If a user attempts to access a restricted route, the API returns:

```json
{
  "success": false,
  "error": "Unauthorized access."
}
```