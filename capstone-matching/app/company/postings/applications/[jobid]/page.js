'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export default function ApplicationsPage() {
  const { jobid } = useParams()
  const [ranking, setRanking] = useState(null)
  const [isRanked, setIsRanked] = useState(false)
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

      if (applicationError || jobError) {
        console.error(applicationError || jobError)
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

    const result = await response.json();
    console.log(result);

    const rankingArray = result.rankings.rankings;

    const rankingMap = Object.fromEntries(
      rankingArray.map(r => [r.student_id, r])
    );

    setRanking(rankingMap);
    setIsRanked(true);

  } catch (err) {
    console.error(err);
  }
}

function getMatchBadge(score) {
  if (score >= 85) return { label: "Strong Match", color: "#16a34a" } // green
  if (score >= 70) return { label: "Good Match", color: "#2563eb" }   // blue
  if (score >= 50) return { label: "Weak Match", color: "#f59e0b" }   // amber
  return { label: "Poor Match", color: "#dc2626" }                    // red
}

return (
  <div style={{ padding: '20px' }}>
    <h2>Applications Page</h2>

    <p>Job ID: {jobid}</p>

  <button
    onClick={() => {
      if (isRanked) {
        // RESET → manual review mode
        setRanking(null)
        setIsRanked(false)
      } else {
        // GENERATE rankings
        generateRankings()
      }
    }}
    style={{
      padding: '10px 16px',
      background: isRanked ? '#444' : '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '20px'
    }}
  >
    {isRanked ? 'Manual Review' : 'Generate Rankings'}
  </button>
{isRanked && (
  <p style={{ marginBottom: 10, color: "green" }}>
    AI Ranking Active
  </p>
)}
    <hr style={{marginBottom: '20px'}}></hr>

    {applications.length === 0 ? (
      <p>No applications found</p>
    ) : (
      // STEP 1: sort ONLY if rankings exist
      [...applications]
        .sort((a, b) => {
          if (!isRanked || !ranking) return 0
          const aId = a.student_profiles?.student_id
          const bId = b.student_profiles?.student_id

          const aScore = ranking?.[aId]?.score ?? 0
          const bScore = ranking?.[bId]?.score ?? 0

          return bScore - aScore
        })
        .map((app) => {
          const studentId = app.student_profiles?.student_id
          const studentRanking = isRanked && ranking?.[studentId]
          const badge = getMatchBadge(studentRanking.score)

          return (
            <div
              key={app.id}
              style={{
                border: '1px solid #ccc',
                padding: '12px',
                marginBottom: '12px',
                borderRadius: '8px'
              }}
            >
              {/* ===== RANKED VIEW ===== */}
              {studentRanking ? (
                <>             
<h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  {app.student_profiles?.name} — {studentRanking.score}/100

  <span
    style={{
      backgroundColor: badge.color,
      color: "white",
      fontSize: "12px",
      padding: "3px 8px",
      borderRadius: "999px",
      fontWeight: "bold"
    }}
  >
    {badge.label}
  </span>
</h3>

                  <p>{studentRanking.why}</p>
                </>
              ) : (
                <>
                  {/* ===== ORIGINAL VIEW ===== */}

                  <p><strong>Status:</strong> {app.status}</p>

                  <hr />

                  <p><strong>Name:</strong> {app.student_profiles?.name}</p>
                  <p><strong>Program:</strong> {app.student_profiles?.program}</p>
                  <p><strong>Bio:</strong> {app.student_profiles?.bio}</p>
                  <p><strong>Availability:</strong> {app.student_profiles?.availability}</p>

                  {/* Skills */}
                  {app.student_profiles?.skills?.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      <strong>Skills:</strong>

                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginTop: '6px'
                      }}>
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
                            typeof exp === 'string'
                              ? JSON.parse(exp)
                              : exp

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
                </>
              )}
            </div>
          )
        })
    )}
  </div>
)}