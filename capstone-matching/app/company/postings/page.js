'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

const supabase = createClient()

export default function Home() {
  const [postings, setPostings] = useState([])

  useEffect(() => {
    async function fetchApplications() {

      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        console.error('Error fetching user:', authError)
        return
      }

      const { data: applications, error: appError } = await supabase
        .from('job_posts')
        .select(`*, applications!applications_job_id_fkey(count)`)
        .eq('company_id', user.id)

      if (appError) {
        console.error(appError)
        return
      }
      setPostings(applications)
    }
    fetchApplications()
  }, [])

  return (
    <div className="cjb-page-container ">
      <p className="page-header">Company Job Postings</p>

      {postings.length === 0 ? (
        <p>No postings found</p>
      ) : (
        postings.map((posting) => (
          <div
            key={posting.id}
            className='cjb-post-container drop-shadow-2xl'
          >
            {/* Title + Application Count */}
            <div
              className='cjb-title-container'
            >
              <p className='cjb-posting-header'>
                {posting.title}
              </p>

              <Link
                href={`postings/applications/${posting.id}`}
                className='button'
              >
                {posting.applications?.[0]?.count || 0} Applications
              </Link>
            </div>

            {/* Description */}
            <p className='cjb-posting-desc '>
              {posting.description}
            </p>

            {/* Skills */}
            <div>
              <strong>Required Skills:</strong>

              <div className='cjb-skills-contianer'>
                {posting.required_skills?.map((skill, i) => (
                  <span
                    key={i}
                    className='cjb-skills-item'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}