'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const supabase = createClient()

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function JobPostCreate() {
  // =========================
  // BASIC FIELDS
  // =========================
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('full-time')

  const [error, setError] = useState('')

  // =========================
  // SKILLS
  // =========================
  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState([])
  const [skillError, setSkillError] = useState('')

  // =========================
  // SCHEDULE
  // =========================
  const [days, setDays] = useState([])
  const [timeRange, setTimeRange] = useState([0, 6]) // start/end hours

  const toggleDay = (day) => {
    setDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  // =========================
  // SKILLS LOGIC
  // =========================
  function addSkill() {
    if (!skillInput.trim()) {
      setSkillError('Skill cannot be empty')
      return
    }
    setSkills(prev => [...prev, skillInput.trim()])
    setSkillInput('')
    setSkillError('')
  }

  function removeSkill(index) {
    setSkills(prev => prev.filter((_, i) => i !== index))
  }

  // =========================
  // VALIDATION
  // =========================
  function validate() {
    if (!title) return setError('Title required'), false
    if (!description) return setError('Description required'), false
    if (!location) return setError('Location required'), false
    if (skills.length === 0) return setError('Add skills'), false
    if (days.length === 0) return setError('Select work days'), false

    setError('')
    return true
  }

  // =========================
  // SUBMIT
  // =========================
  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const { data: { user } } = await supabase.auth.getUser()

    const { data: company } = await supabase
      .from('companies')
      .select('id, company_id')
      .eq('company_id', user.id)
      .single()

    const scheduleString = `${timeRange[0]}-${timeRange[1]} | ${days.join(',')}`

    const { error: insertError } = await supabase
      .from('job_posts')
      .insert([{
        company_id: company.company_id,
        title,
        description,
        location,
        job_type: jobType,
        required_skills: skills,
        schedule: scheduleString,
        status: "Open"
      }])

    if (insertError) {
      console.error(insertError)
      setError('Failed to create job posting')
      return
    }

    alert('Job posting created!')
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="profile-page-container p-6">
      <p className="profile-header-text">Create Job Posting</p>

      <form onSubmit={handleSubmit} className="profile-content-container p-6 space-y-6">

        <div className="profile-content-lr gap-6">

          {/* LEFT */}
          <div className="profile-content-left">

            <input
              className="profile-form-field"
              placeholder="Job Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <textarea
              className="profile-form-field h-24"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <input
              className="profile-form-field"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />

            <select
              className="profile-form-field"
              value={jobType}
              onChange={e => setJobType(e.target.value)}
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>

          </div>

          {/* RIGHT */}
          <div className="profile-content-right">

            {/* SKILLS */}
            <div className="profile-form-row">
              <input
                className="profile-form-field"
                placeholder="Add skill"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
              />
              <button type="button" onClick={addSkill}>
                Add
              </button>
            </div>

            {skills.map((s, i) => (
              <div key={i}>
                {s}
                <button type="button" onClick={() => removeSkill(i)}>X</button>
              </div>
            ))}

            {/* DAYS */}
            <div>
              <p>Work Days:</p>
              {daysOfWeek.map(day => (
                <label key={day}>
                  <input
                    type="checkbox"
                    checked={days.includes(day)}
                    onChange={() => toggleDay(day)}
                  />
                  {day}
                </label>
              ))}
            </div>

            {/* TIME RANGE SLIDER */}
            <div>
              <p>Working Hours: {timeRange[0]} - {timeRange[1]}</p>

              <Slider
                range
                min={0}
                max={24}
                value={timeRange}
                onChange={setTimeRange}
              />
            </div>

          </div>
        </div>

        {/* ERROR */}
        {error && <p>{error}</p>}

        <button type="submit">Create Job</button>
      </form>
    </div>
  )
}