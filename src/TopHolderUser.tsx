import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/TopHolderAllRests.css'

function TopHolderUser() {
  const navigate = useNavigate()

  let goToMain = () => {
      navigate("/")
  }

  let logout = () => {
    localStorage.clear()
    goToMain()
  }

  return (
    <div className='topBlockAll'>
        <div className="appTitle" style={{cursor: 'pointer'}} onClick={goToMain}>RestApp</div>
        <div className="logoutUser" onClick={logout}>выйти</div>
    </div>
  )
}

export default TopHolderUser