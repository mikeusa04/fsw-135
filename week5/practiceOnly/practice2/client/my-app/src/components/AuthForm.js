import React from 'react'

export default function AuthForm(props){
  const {
    handleChange, 
    handleSubmit, 
    btnText, 
    inputs: {
      username, 
      password
    } 
  } = props
  
  return (
    <form className='user-form' onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"/>
      <input 
        type="password"
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"/>
      <button>{ btnText }</button>
    </form>
  )
}