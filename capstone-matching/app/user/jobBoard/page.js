"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
const supabase = createClient()

export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchJobs() {
            const { data: job_postings, error } = await supabase
                .from('job_posts')
                .select(`
                        *,
                        companies!job_posts_company_id_fkey (
                            company_name
                        ),
                        applications (
                            status
                        )
                    `)

            setJobs(job_postings || [])
        }


        fetchJobs()
    }, [])
    // console.log(jobs)

    async function ApplyToJob(e) {
        // if (!validate()) return
        console.log("Applying to job: ")
        console.log(e.target.id)
        const { data: { user } } = await supabase.auth.getUser()

        const { error: insertError } = await supabase
            .from('applications')
            .insert([{
                student_id: user.id,
                job_id: e.target.id,
                status: "Submitted"
            }])

        if (insertError) {
            console.error(insertError)
            setError('Failed to apply to job posting: ' + e.target.id)
            return
        }

        alert('Successfully Applied!')
    }

    return (
        <div className="sjb-page-container">
            {/* Header */}
            <p className="sjb-header-text ">Student Job Board</p>

            {/* List of Job Items */}
            <div className="sjb-job-list-container">
                {
                    jobs.map((item, idx) => (
                        <div className="sjb-job-item-container" key={idx}>
                            <div className="sjb-job-item-top-container">
                                <div className="sjb-job-item-top-left">
                                    <p className="sjb-job-item-title-text">{item.title}</p>
                                    <p className="sjb-job-item-company-text">
                                        {item.companies?.company_name}
                                        <span className="sjb-job-item-info-text">
                                            Type: {item?.job_type} | Location: {item?.location} | Status: {item?.status}
                                        </span>
                                    </p>
                                </div>
                                <div className="sjb-job-item-top-right">
                                    <button id={item.id}
                                            onClick={ApplyToJob} 
                                            disabled={(item?.applications[0]?.status == undefined) && (item?.status == "Open") ? false : true} 
                                            className={(item?.applications[0]?.status == undefined) && (item?.status == "Open") ? "sjb-apply-btn" : "sjb-apply-disabled"}>
                                        {item?.applications[0]?.status == undefined ? "Apply" : "Applied"}
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
                                        {item?.required_skills?.map((item, idx) => (
                                            <li className="sjb-job-item-skills-list-item" key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="sjb-job-item-bottom-schedule-container">
                                    <p className="font-bold">Schedule:</p>
                                    <div>
                                        {item?.schedule?.split(" | ").map((item, idx) => (
                                            <div key={idx}>
                                                <p>{idx == 0 ? "Hours: " : "Days: "}{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}