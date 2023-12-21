import React from 'react'
import SingIn from '../Componentes/SingIn';
import Navbar from '../Componentes/Navbar';
import Footer from '../Componentes/Footer';
import '../Style/Login.css'
const Login = () => {
  return (
    <>
        <Navbar/>
        <div className='Login'>
            <h4>Welcome back!</h4>
            <h2>Log in to your</h2>
            <h2>account</h2>
            <SingIn/>
        </div>
        <Footer/>
    </>
  )
}

export default Login;
