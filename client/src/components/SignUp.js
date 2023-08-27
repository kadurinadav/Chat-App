import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png'
import '../pages/LoginPage.css'

function Signup({setCurrentUser}) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userNotCreated, setUserNotCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/users', {
        username: username,
        email: email,
        password: password
      });

      const data = response.data;
      
      // User created successfully
      if (data.success) {
        // Save current user
        setCurrentUser(data.data)
        // Navigate to setAvatar page
        navigate('../setAvatar');
      } else {
      // User was not created
      setUserNotCreated(true);
      setErrorMessage(data.message)
      // Reset the form
      setUsername('');
      setEmail('');
      setPassword('');
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
  };

  return (
    <div className="login">
      <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
      </div>
      <h2 className="login-title"> REALTIME CHAT </h2>
      <form className="login-form" onSubmit={submitHandler}>
        <input className="login-input" placeholder="User Name" value={username} onChange={usernameHandler} required/>
        <input className="login-input" type="email" placeholder="Email" value={email} onChange={emailHandler} required/>
        <input className="login-input" type="password" placeholder="Password" value={password} onChange={passwordHandler} required/>
        <button className="login-button" type="submit"> Create User </button>
        {userNotCreated && (
        <p className="error-message">
          Sorry, a {errorMessage} Please try again or <Link to="/" className="signin-link"> sign in here </Link>. 
        </p>)}
        <h3> Already a user? <Link to="../" className="signin-link"> Sign in now </Link></h3>
      </form>
    </div>
  );
}

export default Signup