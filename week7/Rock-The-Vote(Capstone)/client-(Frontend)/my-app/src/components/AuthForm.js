import React from 'react'

export default function AuthForm(props) {
  const {
    handleChange, 
    handleSubmit, 
    btnText,
    errMsg, 
    inputs: {username, password}, 
  } = props
  
  return (
    <form className="authForm">
      <input 
        className="userName"
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="User Name"
      />
      <input
        className="password" 
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"
      />
      <button className="submitBtn" onClick={handleSubmit}>{ btnText }</button>
      <p className="errMsg">{errMsg}</p>
    </form>
  )
}