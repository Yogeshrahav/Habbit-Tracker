import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className='register-container'>
      <div className='register-box'>
        <h3> Register Now </h3>
        <input type='text' placeholder='Enter Name'/>
        <input type='text' placeholder='Enter Email'/>
        <input type='password' placeholder='password' />
        <button onClick={Register}> Register </button>
        </div>
    </div>
  )
}

export default Register