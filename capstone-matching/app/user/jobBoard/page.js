"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
const supabase = createClient()

export default function Home() {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        async function fetchJobs() {
            const { data: job_postings, error } = await supabase
                .from('job_posts')
                .select(`
                        *,
                        companies!job_posts_company_id_fkey (
                        company_name
                        )
                    `)

            setJobs(job_postings || [])
        }


        fetchJobs()
    }, [])
    console.log(jobs)

    return (
        <div className="sjb-page-container">
            {/* Header */}
            <p className="sjb-header-text ">Student Job Board</p>

            {/* List of Job Items */}
            <div className="sjb-job-list-container">
                {
                    jobs.map((item, idx) => (
                        <div className="sjb-job-item-container" key={idx}>
                            <div className="sbj-job-item-top-container">
                                <div className="sbj-job-item-top-left">
                                    <p className="sbj-job-item-title-text">{item.title}</p>
                                    <p className="sbj-job-item-company-text">
                                        {item.companies?.company_name}
                                        <span className="sbj-job-item-info-text">Type: {item?.job_type} | Location: {item?.location} | Status: {item?.status}</span>
                                    </p>
                                </div>
                                <div className="sbj-job-item-top-right">
                                    <button className="button m-5 text-2xl">Apply</button>
                                </div>
                            </div>
                            <div className="sbj-job-item-bottom-container">
                                <div className="sbj-job-item-bottom-about-container">
                                    <p className="font-bold">About: </p>
                                    <p>{item?.description}</p>
                                </div>

                                <div className="sbj-job-item-bottom-skills-container"><p className="font-bold">Required Skills:</p>
                                    <ul className="sbj-job-item-skills-list">
                                        {item?.required_skills?.map((item, idx) => (
                                            <li className="sbj-job-item-skills-list-item" key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="sbj-job-item-bottom-schedule-container">
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
