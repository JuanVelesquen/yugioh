import React from 'react'
import logo from '../Recursos/Imagenes/logo.png'
import { NavLink,useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';
import profilePhotoDefault from '../Recursos/Imagenes/ProfilePictures/Profile0.jpg'
import { useEffect } from 'react';
import '../Style/Navbar.css'
import logout from '../Recursos/Imagenes/exit.png'
const Navbar = () => {
  const {closeSession, user, loading} = useAuthContext();
  useEffect(() => {

  }, [loading])
  
  const navigate = useNavigate();
  const handleLogOut = async () =>{
    await closeSession();
    navigate('/');
  }

  return (
<nav className="navbar">
  <div className="container-fluid">
  <ul className="navbar-nav">
        <li>
            <ul className='navbar-nav'>
              <li className="nav-item ">
                <NavLink to='/Home' className="navbar-brand nav-link" aria-current="page" > 
                  <img src={logo} className='logo' />
                </NavLink>
              </li>
              <li className="nav-item dissapear">
                <NavLink to='/Home' className="nav-link active" aria-current="page" >Home</NavLink>
              </li>
              <li className="nav-item dissapear">
                <NavLink to='/myDecks' className="nav-link dk" >My decks</NavLink>
              </li>
            </ul>
        </li>
        <ul className='navbar-nav profile-logout dissapear'>
        {
          user?
          user.photoURL && !loading?  <li className="nav-item profile-container dissapear">
          <NavLink to='/Profile' className="nav-link profile-container" >
          <img className='profilePic' src={user.photoURL} alt="" />
          </NavLink>
  </li>
  :
  <li className="nav-item profile-container dissapear">
          <NavLink to='/Profile' className="nav-link profile-container" >
          <img className='profilePic' src={profilePhotoDefault} alt="" />
          </NavLink>
  </li>
  
  
          :
          <></>
        }
       
        <li className="nav-item dissapear logout-container">
              <button onClick={handleLogOut} className='logout'>
                <img src={logout} alt="" />
              </button>
        </li>
        </ul>
        <li className="nav-item toggler">
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        </li>
      </ul>
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <ul className='profile'>
        {
          user?
          user.photoURL && !loading?  <li className="nav-item profile-container">
          <NavLink to='/Profile' className="nav-link profile-container" >
          <img className='profilePic' src={user.photoURL} alt="" />
          </NavLink>
  </li>
  :
  <li className="nav-item profile-container">
          <NavLink to='/Profile' className="nav-link profile-container" >
          <img className='profilePic' src={profilePhotoDefault} alt="" />
          </NavLink>
  </li>
  
  
          :
          <></>
        }
        </ul>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
      <ul className="navbar-nav">
        <li>
            <ul className='navbar-nav'>
              <li className="nav-item">
                <NavLink to='/Home' className="nav-link active" aria-current="page" >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/myDecks' className="nav-link" >My decks</NavLink>
              </li>
            </ul>
        </li>
      </ul>
      <ul className="navbar-nav SingOut">
            <li className="nav-item">
            <button onClick={handleLogOut} className='logout'>
                <img src={logout} alt="" />
              </button>
              Log out
              </li>
            </ul>
      </div>
    </div>
  </div>
</nav>
  )
}

/*
<nav className="navbar">
  <div className="container-fluid">
      <ul className="navbar-nav">
        <li>
            <ul className='navbar-nav'>
              <li className="nav-item">
                <NavLink to='/Home' className="navbar-brand nav-link" aria-current="page" > 
                  <img src={logo} style={{width: "180px", height: "60px"}} />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/Home' className="nav-link active" aria-current="page" >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/myDecks' className="nav-link" >My decks</NavLink>
              </li>
            </ul>
        </li>
        <li className="nav-item">
                <NavLink to='/myDecks' className="nav-link" >
                <button className="btn btn-Register" type="button">My profile</button>
                </NavLink>
        </li>
      </ul>
  </div>
</nav>
*/





















/*<header>
    <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src={logo} style={{width: "180px", height: "60px"}} />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav">
        <li>
            <ul className='navbar-nav'>
              <li className="nav-item">
              
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page"  href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link"href="#">
                    My Decks
                </a>
              </li>
            </ul>
        </li>
        <li className="nav-item">
            <button className="btn btn-Register" type="button">My profile</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </header> */
export default Navbar;
