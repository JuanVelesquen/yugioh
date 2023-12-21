import React from 'react'
import NavbarRegister from '../Componentes/NavbarRegister'
import Footer from '../Componentes/Footer'
import RegisterAccount from '../Componentes/RegisterAccount'
import '../Style/Register.css'
const Register = () => {
  return (
    <>
        <NavbarRegister/>
        <div className='Register'>
            <h4>Welcome!</h4>
            <h2>Create your account</h2>
            <RegisterAccount/>
        </div>
        <Footer/>
    </>
  )
}

export default Register