import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = () =>{
    navigate('/Login')
  }

  const fetchregister = async (e) => {
    e.preventDefault();
    try{

      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log(data);
      if(response.ok){
        navigate('/Login')
      } else {
        alert(data.message || "Regitration Failed")
      }
    } catch(err){
      console.log("Error", err);
      alert("Something went wrong")
    }
  };
  

  return (
    <div className='register-container'>
      <div className='register-box'>
        <h3>Register Now</h3>
        <input type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
        <input type='text' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <button onClick={(e) => fetchregister(e)}>Register</button>
        <h4> Already have an account </h4><button onClick={login}> Login </button>
      </div>
    </div>
  );
};

export default Register;
