// Client component so useState can be used
"use client";

import LoginForm from '../../components/loginForm';
import RegisterForm from '../../components/registerForm';


import { useState } from "react";



export default function Home() {
  const [loginRegister, setLoginRegister] = useState("Register");

  let registerForum = <RegisterForm></RegisterForm>
  let loginForum = <LoginForm></LoginForm>

  function registerButton() {
    setLoginRegister("Register")
  }

  function loginButton() {
    setLoginRegister("Login")
  }


  return (
    <div className='login-register-container'>
      <div className="login-register-btn-row ">

        <button className={loginRegister == "Register" ? "button" : "button-disabled"} onClick={registerButton}>
          Register
        </button>

        <button className={loginRegister == "Login" ? "button" : "button-disabled"} onClick={loginButton}>
          Login
        </button>

      </div>

      <div className="login-register-form-container">
        {
          loginRegister == "Register" ? registerForum : loginForum
        }
      </div>

    </div>
  );
}
