'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

const supabase = createClient()

export default function Home() {
  const [postings, setPostings] = useState([])

  useEffect(() => {
    async function fetchApplications() {

      // Get logged in user
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser()

      if (authError || !user) {
        console.error(authError)
        return
      }

      // Get all job posts + application count
      const { data: applications, error: appError } = await supabase
  .from('job_posts')
  .select(`
    *,
    applications!applications_job_id_fkey(count)
  `)
  .eq('company_id', user.id)

      if (appError) {
        console.error(appError)
        return
      }

      setPostings(applications || [])
      console.log(applications)
    }

    fetchApplications()
  }, [])

  return (
    <div className="job-postings-container">
      <h2>Job Postings</h2>

      {postings.map((posting) => (
        <div
          key={posting.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "16px",
            marginBottom: "12px",
            marginRight: "60px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          {/* Title + Application Count */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>
              {posting.title}
            </h3>

          <Link
            href={`postings/applications/${posting.id}`}
            style={{
              background: "#222",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "8px",
              fontSize: "14px",
              textDecoration: "none"
            }}
          >
            {posting.applications?.[0]?.count || 0} Applications
          </Link>
          </div>

          {/* Description */}
          <p style={{ marginBottom: "10px", color: "#444" }}>
            {posting.description}
          </p>

          {/* Skills */}
          <div>
            <strong>Required Skills:</strong>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "6px"
              }}
            >
              {posting.required_skills?.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: "#eef",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "12px"
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}