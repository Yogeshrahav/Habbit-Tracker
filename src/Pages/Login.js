import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';


const Login = () => {
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [ error, setError] = useState('');
  const [ role, setRole ] = useState("user")
  const navigate = useNavigate();

 useEffect(() =>{
  const token = sessionStorage.getItem("token");
  if(token){
    if( role === 'admin'){
      navigate('/admin')
    } else {
      navigate('/Home')
    }
  }
 }, [navigate, role])

 const handleLogin = async () => {
  if (!email || !password) {
    setError("Please fill in both email and password.");
    return;
  }

  try {
    const credentials = btoa(`${password}`);
    const response = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password
    }, {
      headers: {
        Authorization: `Basic ${credentials}`
      }
    });

    const data = response.data;
    console.log(data);

    sessionStorage.setItem("token", data);

    if (response.status === 200) {
      if (role === 'admin') {
        navigate('/Admin-dashboard');
      } else {
        navigate('/Home');
      }
    } else {
      setError(data.message || "Login Failed");
    }
  } catch (err) {
    setError('Something went wrong');
    console.error('Login Error', err);
  }
};
const handleRegister =()=>{
  navigate('/')
}

    
  return (
    <div className='login-container'>
    <div className='login-box'>
      <h3> Login Now </h3>
      <select className='user-val' value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
  type='email'
  placeholder='Email'
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
<input
  type='password'
  placeholder='Password'
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>

        <button onClick={handleLogin}> Login </button>
        { error && <p style={{color: 'red'}}>{error}</p>} 
        <button onClick={handleRegister} className="back-button">Back to Register</button>

    </div>
    </div>
  )
}


export default Login