import React from 'react'
import { useNavigate } from 'react-router-dom'
import {BiPowerOff} from 'react-icons/bi'
import Logo from '../assets/logo.png'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate('../');
  }

  return (
    <div className='navbar'>
      <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
          <span className='chat-logo'> Chat App </span>
      </div>
      <button className='logout-button' onClick = {logoutHandler}> <BiPowerOff/> </button>
    </div>
  )
}

export default Navbar