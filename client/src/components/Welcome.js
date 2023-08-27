import React from 'react'
import Robot from '../assets/welcome_robot.gif'
import './Welcome.css'

function Welcome({currentUser}) {

  return (
    <div className='welcome'>
      <img src={Robot} alt="" />
      <h1> Welcome <span> {currentUser?.username} </span> </h1>
      <h3> Please select a chat to start messaging </h3>
    </div>
  )
}

export default Welcome
