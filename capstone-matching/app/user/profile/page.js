'use client'

import { useState } from 'react'

export default function Home() {

  const [expName, setExpName] = useState('');
  const [expDate, setExpDate] = useState('');
  const [expItems, setExpItems] = useState([])


  function addExpItem() {
    console.log("adding item")

    // console.log(...expItems)
    setExpItems(expItems => [...expItems, {
      "name": expName,
      "years": expDate
    }])
    console.log(expItems);

    // setExpName('');
    // setExpDate('');
  }

  function deleteExpItem(i) {
    console.log(expItems)
    setExpItems(expItems => expItems.filter(
      (_, idx) => i !== idx
    ))
    
  }

  return (
    <div className="profile-page-container ">

      {/* Header */}
      <p className="profile-header-text">Student Profile</p>

      <form className="profile-content-container">

        <div className="profile-content-lr">

          {/* Standard Fields */}
          <div className="profile-content-left">

            <div className="profile-form-row ">
              <label className="profile-form-label">
                Full Name:
              </label>
              <input
                className="profile-form-field"
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Jane Doe">
              </input>
            </div>

            <div className="profile-form-row ">
              <label className="profile-form-label">
                Program:
              </label>
              <input
                className="profile-form-field"
                id="program"
                name="program"
                type="text"
                placeholder="Bachelors of Engineering">
              </input>
            </div>

            <div className="profile-form-row ">
              <label className="profile-form-label">
                Skills (comma seperated):
              </label>
              <input
                className="profile-form-field"
                id="skills"
                name="skills"
                type="text"
                placeholder="Java, HTML, Python, ...">
              </input>
            </div>

            <div className="profile-form-row ">
              <label className="profile-form-label">
                Availability:
              </label>
              <input
                className="profile-form-field"
                id="skills"
                name="availability"
                type="text"
                placeholder="Mon-Fri 9AM-5PM">
              </input>
            </div>

            <div className="profile-form-row ">
              <label className="profile-form-label">
                Bio:
              </label>
              <textarea
                className="profile-form-field h-20"
                id="skills"
                name="bio"
                type="text"
                placeholder="I am an experienced junior backend-engineer with specialisation for the spring framework...">
              </textarea>
            </div>

          </div>

          {/* Skills */}
          <div className="profile-content-right">

            {/* Headers */}
            <div className="profile-form-row ">
              <div className="profile-experience-label-row ">
                <label className="profile-form-label w-140 mr-3">
                  Experience:
                </label>
                <label className="profile-form-label">
                  Years:
                </label>
              </div>

              {/* Input Fields */}
              <div className="profile-experience-row ">
                <input
                  className="profile-experience-company-field "
                  id="fullname"
                  type="text"
                  placeholder="Generic Company LLC."
                  onChange={(e) => setExpName(e.target.value)}
                  >
                </input>
                <input
                  className="profile-experience-date-field "
                  id="fullname"
                  type="number"
                  placeholder="2"
                  onChange={(e) => setExpDate(e.target.value)}
                  >
                </input>
              </div>
              <button 
                className="profile-add-experience-button" 
                type="button"
                onClick={addExpItem}
              >
                  Add Experience
              </button>

              {/* Experience List */}
              <div className="profile-experience-item-list">
                <label className="profile-form-label w-140 ml-1 ">
                  Experience Items:
                </label>

                {
                  expItems.map((entry, i) => (
                    <div key={"entry" + i} className="profile-experience-item-container">
                      <div className="experience-item">
                        <p className="experience-item-text">{entry.name} </p><span className="experience-item-years">({entry.years} Years)</span>
                      </div>
                      <button
                        id={i}
                        className="experience-item-delete" 
                        type="button"
                        onClick={() => deleteExpItem(i)}
                      >
                          X
                      </button>
                    </div>

                  ))
                }

              </div>





            </div>

          </div>

        </div>

        <div className="profile-content-bottom">
          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar-value"></div>
          </div>

          {/* Submit Button */}
          <button className="button" type="submit">Save Changes</button>
        </div>

      </form>

    </div>
  );
}
