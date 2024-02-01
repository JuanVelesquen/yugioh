import React from 'react'
import CardsShowcase from '../Componentes/CardsShowcaseDeck.jsx'
import Navbar from '../Componentes/NavbarHome'
import Footer from '../Componentes/Footer'
import { useState, useEffect } from 'react'
import FirebaseDecks from '../Componentes/FirebaseDecks.jsx'
import '../Style/MyDecks.css'
const MyDecks = () => {
  
  useEffect(() => {

  }, [])

  return (
    <>
      <Navbar/>
      <CardsShowcase/>
      <Footer/>
    </>
  )
}

export default MyDecks