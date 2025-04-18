import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
        const navigate = useNavigate()
    
  return (
    <div className='login-container'>
    <div className='login-box'>
      <h3> Login Now </h3>
        <input type='text' placeholder='Name' />
        <input type='password' placeholder='password'/>
        <button onClick={() => navigate('/Tracker')}> Login </button>
    
    <h3> Don't Have an account </h3><button onClick={() => navigate('/Register')}> Register </button>
    </div>
    </div>
  )
}


export default Login