/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function StudentJobBoardClient({ initialJobs, currentUserId }) {
    const supabase = createClient()

    const [jobs, setJobs] = useState(initialJobs || []);
    const [error, setError] = useState('');

    useEffect(() => {
        setJobs(initialJobs || [])
    }, [initialJobs])

    async function ApplyToJob(e) {
        // if (!validate()) return
        console.log("Applying to job: ")
        const jobId = e.target.id
        console.log(jobId)
        const { data: { user } } = await supabase.auth.getUser()

        const { error: insertError } = await supabase
            .from('applications')
            .insert([{
                student_id: user.id,
                job_id: jobId,
                status: "Submitted"
            }])

        if (insertError) {
            console.error(insertError)
            setError('Failed to apply to job posting: ' + jobId)
            return
        }

        setJobs(prev => prev.map(job =>
            job.id === jobId
                ? { ...job, applications: [{ status: 'Submitted', student_id: user.id }] }
                : job
        ))

        alert('Successfully Applied!')
    }

    function myApplication(item) {
        const apps = item?.applications ?? []
        return apps.find(app => !currentUserId || app.student_id === currentUserId)
    }

    console.log(jobs)
    if (jobs.length < 1) {
        return (
            <div className='sjb-page-container'>
                <p className='text-lg mt-10'>No postings found, please check back later for new postings</p>

            </div>
        )
    }

    return (
        <div className="sjb-page-container">
            {/* Header */}
            <p className="page-header ">Student Job Board</p>

            {error != '' &&
                <div className='profile-form-error-container'>
                    <p className='profile-form-error-text'>Error: {error}</p>
                </div>}

            {/* List of Job Items */}
            <div className="sjb-job-list-container">
                {
                    jobs.map((item, idx) => {
                        const myApp = myApplication(item)
                        const alreadyApplied = myApp?.status != undefined
                        const canApply = !alreadyApplied && item?.status == "Open"

                        return (
                            <div className="sjb-job-item-container" key={idx}>
                                <div className="sjb-job-item-top-container">
                                    <div className="sjb-job-item-top-left">
                                        <p className="sjb-job-item-title-text">{item.title}</p>
                                        <p className="sjb-job-item-company-text">
                                            {item.companies?.company_name.toUpperCase()}
                                            <span className="sjb-job-item-info-text">
                                                Type: {item?.job_type} | Location: {item?.location} | Status: {item?.status}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="sjb-job-item-top-right">
                                        <button id={item.id}
                                            onClick={ApplyToJob}
                                            disabled={!canApply}
                                            className={canApply ? "sjb-apply-btn" : "sjb-apply-disabled"}>
                                            {alreadyApplied ? "Applied" : "Apply"}
                                        </button>
                                    </div>
                                </div>
                                <div className="sjb-job-item-bottom-container">
                                    <div className="sjb-job-item-bottom-about-container">
                                        <p className="font-bold">About: </p>
                                        <p>{item?.description}</p>
                                    </div>

                                    <div className="sjb-job-item-bottom-skills-container"><p className="font-bold">Required Skills:</p>
                                        <ul className="sjb-job-item-skills-list">
                                            {item?.required_skills?.map((skill, sIdx) => (
                                                <li className="sjb-job-item-skills-list-item" key={sIdx}>{skill}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="sjb-job-item-bottom-schedule-container">
                                        <p className="font-bold">Schedule:</p>
                                        <div>
                                            {item?.schedule?.split(" | ").map((part, pIdx) => (
                                                <div key={pIdx}>
                                                    <p>{pIdx == 0 ? "Hours: " : "Days: "}{part}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}