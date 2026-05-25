'use client'

import { useState } from 'react'

import { signUp } from '../app/login/actions'

export default function RegisterForm() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    function validate() {
        if (fullName == '') {
            setError("Full Name cannot be blank");
            return false;
        }

        if (email == '') {
            setError("Email cannot be blank");
            return false;
        }

        if (!email.match(/^[\w\-\.]+@[\w-]+(?:\.[\w-]+)*\.[a-zA-Z]{2,}$/)) {
            setError("Please use a valid email format")
            return false
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Passwords must match");
            return false;
        }
        
        setError('');
        return true;
    }

    return (
        <form action={signUp} onSubmit={(e) => {if (!validate()) e.preventDefault() }} className="rounded px-8 pt-6 pb-8 mb-4">
        {/* <form onSubmit={(e) => {if (!validate()) e.preventDefault() }} className="rounded px-8 pt-6 pb-8 mb-4"> */}
            <div className="mb-4">
                <label className="login-form-label">
                    Full Name:
                </label>
                <input 
                    className="login-form-field"
                    id="fullname" name="fullname" 
                    type="text" 
                    placeholder="Jane Doe"
                    onChange={(e) => setFullName(e.target.value)}
                    >

                </input>
            </div>

            <div className="mb-4">
                <label className="login-form-label">
                    Email:
                </label>
                <input 
                    className="login-form-field" 
                    id="email" 
                    name="email" 
                    type="text" 
                    placeholder="example@exmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    >
                </input>
            </div>

            <div className="mb-6">
                <label className="login-form-label">
                    Password:
                </label>
                <input 
                    className="login-form-field" 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="******************"
                    onChange={(e) => setPassword(e.target.value)}
                >
                </input>
            </div>

            <div className="mb-6">
                <label className="login-form-label">
                    Confirm Password:
                </label>
                <input 
                    className="login-form-field" 
                    id="confirm-password" 
                    name="confirm-password" 
                    type="password" 
                    placeholder="******************"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </input>
            </div>

            <div className="flex items-center">
                {
                    error && <p className='login-register-error-text'>ERROR: {error}</p>
                }
            </div>

            <div className="flex items-center">
                <button className="button" type="submit">
                    Register
                </button>
            </div>
        </form>
    )
}