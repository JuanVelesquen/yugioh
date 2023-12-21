import React from 'react'
import Navbar from '../Componentes/NavbarHome'
import Footer from '../Componentes/Footer'
import EditarPerfil from '../Componentes/EditarPerfil'
import { useEffect } from 'react'
import { useAuthContext } from '../Context/AuthContext'
const Profile = () => {
  const {user} = useAuthContext()
  useEffect(() => {

  }, [user])
  
  return (
    <>
      <Navbar/>

      <EditarPerfil/>

      <Footer/>
    </>
  )
}

export default Profile