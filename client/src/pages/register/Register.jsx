import React, { useState } from 'react'
import './register.scss'
import { registerUser } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
export const Register = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);
      //Save token
      localStorage.setItem("token", data.token);
      //Redirect to Dashboard
      navigate("/");
    } catch(error) {
      console.error(error.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className='register'>
      <div className="formContainer">
        <form action="" onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input 
            name='username' 
            required minLength={3} 
            maxLength={20} 
            type="text" 
            placeholder='Username' 
            onChange={handleChange}
          />
          <input 
            name='email' 
            type="text" 
            placeholder='Email' 
            onChange={handleChange}
          />
          <input 
            name='password' 
            required minLength={8} 
            maxLength={15} 
            type="password" 
            placeholder='Password' 
            onChange={handleChange}
          />
          <button type='submit'>Register</button>
          <Link to="/register">{"Don't"} you have account?</Link>
        </form>
      </div>
    </div>
  )
}
