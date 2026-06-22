'use client'

import { useState } from 'react'
import { createCompany } from './action'

export default function CompanyPage() {

  const [companyName, setCompanyName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [email, setEmail] = useState('')
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
        email,
        accessCode: accessCode || generateCode()
      })

      if (result?.error) throw new Error(result.error)

      setCompanyName('')
      setContactPerson('')
      setEmail('')
      setAccessCode('')

      alert('Company created!')

    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  return (
    <div className="acc-page-container drop-shadow-2xl">
      <p className="page-header">Company Creation</p>
      <div className="w-[70%] bg-capstone-grey border-[3px] border-capstone-grey-strong rounded p-8">

        <form onSubmit={handleSubmit}>

          <div className="flex justify-between gap-10 flex-wrap">

            {/* LEFT SIDE */}
            <div className="flex-1 min-w-[300px]">

              <div className="mb-6">
                <label className="block text-lg font-bold mb-2">
                  Company Name:
                </label>

                <input
                  className="w-full bg-white border-2 border-capstone-grey-strong rounded px-3 py-2 text-capstone-grey-strong"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block text-lg font-bold mb-2">
                  Contact Person:
                </label>

                <input
                  className="w-full bg-white border-2 border-capstone-grey-strong rounded px-3 py-2 text-capstone-grey-strong"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block text-lg font-bold mb-2">
                  Email:
                </label>

                <input
                  type="email"
                  className="w-full bg-white border-2 border-capstone-grey-strong rounded px-3 py-2 text-capstone-grey-strong"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 min-w-[300px]">

              <div className="mb-6">
                <label className="block text-lg font-bold mb-2">
                  Access Code:
                </label>

                <div className="flex gap-3">

                  <input
                    className="flex-1 bg-gray-100 border-2 border-capstone-grey-strong rounded px-3 py-2 text-capstone-grey-strong"
                    value={accessCode}
                    readOnly
                  />

                  <button
                    type="button"
                    onClick={generateCode}
                    className="button text-2xl"
                  >
                    Generate
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* BOTTOM */}
          <div className="flex flex-col items-center mt-6">

            {error && (
              <div className="mb-4">
                <p className="text-red-600 font-bold text-lg">
                  {error}
                </p>
              </div>
            )}

            <button
              className="button text-3xl"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Company'}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}