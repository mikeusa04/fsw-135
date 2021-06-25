import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

export default function Navbar(){
  const { logout, token } = useContext(UserContext)
  return (
    <div className="navbar">
      <h1>Rock The Vote</h1>
      { token && <Link className='link' to="/profile">Profile</Link> }
      { token && <Link className='link' to="/issues">Issues</Link> }
      { token && <button className='logout-button' onClick={logout}>Logout</button> }
    </div>
  )
}