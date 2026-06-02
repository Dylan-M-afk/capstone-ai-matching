

export default function Home() {
    let dummyData = [
        {
            "title": "Fish Handler",
            "description": "Handle fish very very very very very very very very very very very very very very very very very very well",
            "type": "Finance",
            "location": "Remote",
            "status": "Applied",
            "skills": ["HTML", "CSS", "Java"],
            "schedule": "9AM-5PM Mon-Fri"
        },
        {
            "title": "Fish Thrower",
            "description": "Throw fish at the wall fish very very well",
            "type": "IT",
            "location": "Slough, UK",
            "status": "Not Applied",
            "skills": ["HTML", "CSS", "Java"],
            "schedule": "9AM-5PM Mon-Fri"
        },
        {
            "title": "Fish Feeder",
            "description": "Feed fish car batteries fish at the wall fish very very well",
            "type": "Agriculture",
            "location": "Missusaga, ON",
            "status": "Rejected",
            "skills": ["HTML", "CSS", "Java"],
            "schedule": "9AM-5PM Mon-Fri"
        }
    ]

    return (
        <div className="sjb-page-container">
            {/* Header */}
            <p className="sjb-header-text ">Student Job Board</p>

            {/* List of Job Items */}
            <div className="sjb-job-list-container">
                {
                    dummyData.map((item, idx) => (
                        <div className="sjb-job-item-container" key={idx}>
                            <div className="sbj-job-item-top-container">
                                <div className="sbj-job-item-top-left">
                                    <p className="sbj-job-item-title-text">{item.title}</p>
                                    <p className="sbj-job-item-company-text">
                                        Company Name Here
                                        <span className="sbj-job-item-info-text">Type: {item.type} | Location: {item.location} | Status: {item.status}</span>
                                    </p>
                                </div>
                                <div className="sbj-job-item-top-right">
                                    <button className="button m-5 text-3xl">Apply</button>
                                </div>
                            </div>
                            <div className="sbj-job-item-bottom-container">
                                <div className="sbj-job-item-bottom-about-container">
                                    <p className="font-bold">About: </p>
                                    <p>{item.description}</p>
                                </div>

                                <div className="sbj-job-item-bottom-skills-container"><p className="font-bold">Required Skills:</p>
                                    <ul className="sbj-job-item-skills-list">
                                        {item.skills.map((item, idx) => (
                                            <li className="sbj-job-item-skills-list-item" key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="sbj-job-item-bottom-schedule-container">
                                    <p className="font-bold">Schedule:</p>
                                    <p>{item.schedule}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
