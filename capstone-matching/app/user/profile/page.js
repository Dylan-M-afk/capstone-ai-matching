'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
const supabase = createClient()

export default function Home() {

  // Field Values
  const [fullname, setFullName] = useState('');
  const [program, setProgram] = useState('');
  const [skills, setSkills] = useState('');
  const [availability, setAvailability] = useState('');
  const [bio, setBio] = useState('');

  // Experience List logic
  const [expName, setExpName] = useState('');
  const [expDate, setExpDate] = useState('');
  const [expItems, setExpItems] = useState([])

  // Validation
  const [error, setError] = useState('');

  // Dynamic Styling
  const progress = Math.round(
    [fullname, program, skills, availability, bio, expItems]
      .filter(field => field.length > 0)
      .length * 16.66
  )
  let progressWidth = progress + "%";

  // On Initial Page Load
  useEffect(() => {
    async function fetchStudentProfile() {
      // Get auth data
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError || !user) {
        console.error('Error fetching user:', authError)
        return
      }

      // Get student profile associated with auth account
      const { data: profile, error: profileError } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('student_id', user.id)
        .single()

      if (profileError) {
        console.error('Error fetching profile:', profileError)
        return
      }

      console.log('Student Profile:', profile)

      // Populate fields with existing profile data
      if (profile) {
        console.log(profile.skills)
        setFullName(profile.name ?? '')
        setProgram(profile.program ?? '')
        setSkills(profile.skills.toString() ?? '')
        setAvailability(profile.availability ?? '')
        setBio(profile.bio ?? '')

        // Each entry in the experience array becomes an experience item on the page
        if (profile.experience) {
                  const experienceItems = profile.experience.map((item) => {
          const expParts = item.split(",")
          return {
            name: expParts[0].trim(),
            years: expParts[1].trim()
          }
        })
        setExpItems(experienceItems)
        }
      }
    }

    fetchStudentProfile()
  }, [])


  function addExpItem() {
    console.log("adding item")

    setExpItems(expItems => [...expItems, {
      "name": expName,
      "years": expDate
    }])
  }

  function deleteExpItem(i) {
    console.log("deleting item at index" + i)
    setExpItems(expItems => expItems.filter((_, idx) => i !== idx))
  }

  function validate() {
    if (fullname == '') {
      setError('Full Name must not be blank');
      return false;
    }
    if (program == '') {
      setError('Program must not be blank');
      return false;
    }
    if (skills == '') {
      setError('Skills must not be blank');
      return false;
    }
    if (availability == '') {
      setError('Availability must not be blank');
      return false;
    }
    if (bio == '') {
      setError('Bio must not be blank');
      return false;
    }

    if (expItems.length <= 0) {
      setError('Must include at least 1 experience item');
      return false;
    }

    setError('')
    return true;
  }

  // Submit form to update student profile with data in fields
  async function handleUpdate(e) {
    console.log("Updating Profile")
    setError('');

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    const { data: profile, error: profileError } = await supabase
      .from('student_profiles')
      .update({
        name: fullname,
        program: program,
        skills: skills.split(",").map(s => s.trim()),
        experience: expItems.map((item) => {
          return item.name + "," + item.years
        }),
        bio: bio,
        availability: availability
      })
      .eq('student_id', user.id)

    if (profileError) {
      console.error('Error updating profile:', profileError)
      return
    }
  }

  return (
    <div className="profile-page-container ">

      {/* Header */}
      <p className="profile-header-text">Student Profile</p>

      <form action={handleUpdate} onSubmit={(e) => { if (!validate()) e.preventDefault() }} className="profile-content-container">

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
                placeholder="Jane Doe"
                value={fullname || ''}
                onChange={e => setFullName(e.target.value)}
              >
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
                placeholder="Bachelors of Engineering"
                value={program || ''}
                onChange={e => setProgram(e.target.value)}
              >
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
                placeholder="Java, HTML, Python, ..."
                value={skills || ''}
                onChange={e => setSkills(e.target.value)}
              >
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
                placeholder="Mon-Fri 9AM-5PM"
                value={availability || ''}
                onChange={e => setAvailability(e.target.value)}
              >
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
                placeholder="I am an experienced junior backend-engineer with specialisation for the spring framework..."
                value={bio || ''}
                onChange={e => setBio(e.target.value)}
              >
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
          <p className='progress-bar-header'>Student Profile Completion Progress: <span className='font-bold'>{progress}%</span></p>
          <div className="progress-bar-container">
            <div className="progress-bar-value" style={{ width: progressWidth }}></div>
          </div>

          {error != '' &&
            <div className='profile-form-error-container'>
              <p className='profile-form-error-text'>Error: {error}</p>
            </div>}

          {/* Submit Button */}
          <button className="button" type="submit">Save Changes</button>
        </div>

      </form>

    </div>
  );
}
