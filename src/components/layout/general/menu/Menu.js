import React from 'react'
import { NavLink } from 'react-router-dom'

import './Menu.css'

const Menu = () =>(
  <nav className="menu">
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/videos">Videos</NavLink></li>
    </ul>
  </nav>
)

export default Menu
