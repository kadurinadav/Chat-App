import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png'
import '../pages/LoginPage.css'

function Signin({setCurrentUser, socket}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.get('http://localhost:3001/users/auth', {
        params: {
          email: email,
          password: password
        }
      });
  
      const data = response.data;
  
      if (data.success === true) {
          // Save current user
          setCurrentUser(data.data);
          sessionStorage.setItem('currentUser', JSON.stringify(data.data));
          socket.emit("add_user", {userId: data.data._id});
          // Navigate to home Page
          navigate('../chat');
      } else {
        // User does not exist
        setUserError(data.message);
        // reset the form
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
            <input className="login-input" type="email" placeholder="Email" value={email} onChange={emailHandler} required/>
            <input className="login-input" type="password" placeholder="Password" value={password} onChange={passwordHandler} required/>
            <button className="login-button" type="submit"> Sign In </button>
            {userError && (
            <p className="error-message">
                {userError}
            </p>)}
            <h3> Don't have an account yet? <Link to="/signup" className="signup-link"> Register here </Link></h3>
        </form>
    </div>
  );
};

export default Signin;