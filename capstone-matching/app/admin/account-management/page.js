'use client'

import { useState } from 'react'
import { createCompany } from './action'

export default function CompanyPage() {

  const [companyName, setCompanyName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function generateCode() {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    setAccessCode(code)
    return code
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await createCompany({
        companyName,
        contactPerson,
        accessCode: accessCode || generateCode()
      })

      if (result?.error) throw new Error(result.error)

      setCompanyName('')
      setContactPerson('')
      setAccessCode('')

      alert('Company created!')

    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  return (
    <div className="profile-page-container">

      <p className="profile-header-text">Create Company</p>

      <form className="profile-content-container" onSubmit={handleSubmit}>

        <div className="profile-content-lr">

          <div className="profile-content-left">

            <div className="profile-form-row">
              <label className="profile-form-label">Company Name:</label>
              <input
                className="profile-form-field"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="profile-form-row">
              <label className="profile-form-label">Contact Person:</label>
              <input
                className="profile-form-field"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
            </div>

          </div>

          <div className="profile-content-right">

            <div className="profile-form-row">
              <label className="profile-form-label">Access Code:</label>

              <div className="profile-experience-row">

                <input
                  className="profile-experience-company-field"
                  value={accessCode}
                  readOnly
                />

                <button
                  type="button"
                  className="profile-add-experience-button"
                  onClick={generateCode}
                >
                  Generate
                </button>

              </div>

            </div>

          </div>

        </div>

        <div className="profile-content-bottom">

          {error && (
            <div className="profile-form-error-container">
              <p className="profile-form-error-text">{error}</p>
            </div>
          )}

          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Company'}
          </button>

        </div>

      </form>

    </div>
  )
}