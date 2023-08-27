import React from 'react'
import {Outlet} from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
  return (
    <div className="login-page">
      <Outlet/>
    </div>

  )
}

export default LoginPage