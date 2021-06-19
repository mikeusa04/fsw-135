import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import { UserContext } from '../context/UserProvider.js'

const initInputs = { username: "", password: "" }

export default function Auth(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const { signup, login } = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  return (
    <div className="auth-container">
      <h1>Rock The Vote</h1>
      { !toggle ?
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Create Account"
          />
          <p >Already a user?<span className="sign-in-link" onClick={() => setToggle(prev => !prev)}> Sign In!</span></p>
        </>
      :
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
          />
          <p>New? <span className="create-acct-link" onClick={() => setToggle(prev => !prev)}>Create New Account</span></p>
        </>
      }
    </div>
  )
}