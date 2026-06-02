

export default function Home() {
    let dummyData = [
        {
            "title": "Fish Handler",
            "description": "Handle fish very very well"
        },
        {
            "title": "Fish Thrower",
            "description": "Throw fish at the wall fish very very well"
        },
        {
            "title": "Fish Feeder",
            "description": "Feed fish car batteries fish at the wall fish very very well"
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

                            </div>
                            <div className="sbj-job-item-bottom-container">

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
