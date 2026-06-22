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
    <div className='cjba-page-container'>
      <div className='cbja-header-container'>
        <p className="page-header">Company Job Postings</p>

        <p><span className='font-bold'>Job ID:</span> {jobid}</p>

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
          className='button'
        >
          {isRanked ? 'Manual Review' : 'Generate Rankings'}
        </button>
        {isRanked && (
          <p className='mb-10 text-green-500' >
            AI Ranking Active
          </p>
        )}
      </div>



      {/* <hr className='mb-10'></hr> */}

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
                className='cjba-app-item-container'
              >
                {/* ===== RANKED VIEW ===== */}
                {studentRanking ? (
                  <div>
                    <p className='cbja-app-item-rank-text'>
                      {app.student_profiles?.name} - {studentRanking.score}/100

                      <span
                        className='cbja-app-item-rank-badge'
                        style={{
                          backgroundColor: badge.color,
                        }}
                      >
                        {badge.label}
                      </span>
                    </p>

                    <p>{studentRanking.why}</p>
                  </div>
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
                      <div className='mt-4'>
                        <strong>Skills:</strong>

                        <div className='cjba-app-item-rank-container'>
                          {app.student_profiles.skills.map((skill, i) => (
                            <span
                              key={i}
                              className='cjba-app-item-rank-badge'
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experience */}
                    {app.student_profiles?.experience?.length > 0 && (
                      <div className='mt-4'>
                        <strong>Experience:</strong>

                        <ul className='mt-2'>
                          {app.student_profiles.experience.map((exp, i) => {
                            const parsed =
                              typeof exp === 'string'
                                ? JSON.parse(exp)
                                : exp

                            return (
                              <div key={i}>
                                <li className='ml-4 list-disc'>
                                  <strong>{parsed.name}</strong> - {parsed.years} years
                                </li>
                              </div>
                            )
                          })}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })
      )}
    </div>
  )
}