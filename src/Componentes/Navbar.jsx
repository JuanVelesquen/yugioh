import React from 'react'
import logo from '../Recursos/Imagenes/logo.png'
import { NavLink } from 'react-router-dom'
import '../Style/Navbar.css'
const Navbar = () => {
  return (
<nav className="navbar">
  <div className="container-fluid">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to='/' className="navbar-brand nav-link" aria-current="page" > 
              <img className="logo" src={logo} />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/Register' className="nav-link" aria-current="page" > 
            <button className="btn btn-Register" type="button">Register</button>
          </NavLink>
        </li>
      </ul>
  </div>
</nav>
  )
}

export default Navbar;
