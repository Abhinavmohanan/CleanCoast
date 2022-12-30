import React from 'react'
import logo from '../../assets/images/logo.png'
import profile from '../../assets/images/Profile.jpg'
import "./Navbar.css"


function Navbar() {
  return (
    <div className='navbar'>
        <img className='logo'  src={logo} alt='cleanzo' />
        <img className='avatar'   src={profile} alt='profile' />
    </div>
  )
}

export default Navbar