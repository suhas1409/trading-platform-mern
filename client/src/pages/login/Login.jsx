import React, { useState } from 'react'
import './login.scss'
import { loginUser } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const data = await loginUser(formData);
      //Save token
      localStorage.setItem("token",data.token);
      //Ridected to Dashboard
      navigate("/");
    } catch(error) {
      console.error(error.response?.data?.message || "Login Failed");
    }
  }

  return (
    <div className='login' onSubmit={handleSubmit}>
      <div className="formContainer">
        <form action="">
          <h1>Welcome Back</h1>
          <input 
            name='email' 
            type="text" 
            placeholder='Email' 
            onChange={handleChange}
          />
          <input 
            name='password' 
            required minLength={8} 
            type="password" 
            placeholder='Password' 
            onChange={handleChange}
          />
          <button type='submit'>Login</button>
          <Link to="/register">{"Don't"} you have account?</Link>
        </form>
      </div>
    </div>
  );
}
