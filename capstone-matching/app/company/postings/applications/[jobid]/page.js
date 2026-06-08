'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export default function ApplicationsPage() {
  const { jobid } = useParams()
  const [applications, setApplications] = useState([])
  const [job, setjob] = useState(null)

  useEffect(() => {
    async function fetchData() {
      if (!jobid) return
      console.log('Job ID:', jobid)

      const { data: applicationData, error: applicationError } = await supabase
        .from('applications')
        .select(`*, student_profiles(*)`)
        .eq('job_id', jobid)

      const { data: jobData, error: jobError } = await supabase
        .from('job_posts')
        .select(`*`)
        .eq('id', jobid)

      if (applicationError | jobError) {
        console.error(error)
        return
      }

      setjob(jobData || [])
      setApplications(applicationData || [])
    }

    fetchData()
  }, [jobid])

async function generateRankings() {
  try {
    const response = await fetch("/api/jobs/rank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        students: applications.map(a => a.student_profiles),
        job: job
      })
    });
    console.log(job)
    const result = await response.json();

    console.log(result.rankings);

  } catch (err) {
    console.error(err);
  }
}

return (
  <div style={{ padding: '20px' }}>
    <h2>Applications Page</h2>

    <p>Job ID: {jobid}</p>
    <button
      onClick={generateRankings}
      style={{
        padding: '10px 16px',
        background: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: '20px'
      }}
    >
      Generate Rankings
    </button>
    <hr />

    {applications.length === 0 ? (
      <p>No applications found</p>
    ) : (
      applications.map((app) => (
        <div
          key={app.id}
          style={{
            border: '1px solid #ccc',
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '8px'
          }}
        >
          {/* Application status */}
          <p><strong>Status:</strong> {app.status}</p>

          <hr />

          {/* Student basic info */}
          <p><strong>Name:</strong> {app.student_profiles?.name}</p>
          <p><strong>Program:</strong> {app.student_profiles?.program}</p>
          <p><strong>Bio:</strong> {app.student_profiles?.bio}</p>
          <p><strong>Availability:</strong> {app.student_profiles?.availability}</p>

          {/* Skills */}
          {app.student_profiles?.skills?.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <strong>Skills:</strong>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                {app.student_profiles.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#eef',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {app.student_profiles?.experience?.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <strong>Experience:</strong>

              <div style={{ marginTop: '6px' }}>
                {app.student_profiles.experience.map((exp, i) => {
                  const parsed =
                    typeof exp === 'string' ? JSON.parse(exp) : exp

                  return (
                    <div key={i}>
                      <p>
                        <strong>{parsed.name}</strong> — {parsed.years} years
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      ))
    )}
  </div>
)}