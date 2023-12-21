import React from 'react'
import CardsShowcase from '../Componentes/CardsShowcase'
import DeckImage from '../Recursos/Imagenes/Deck.png'
import iconAddDeck from '../Recursos/Imagenes/AddDeck.png'
import Navbar from '../Componentes/NavbarHome'
import Footer from '../Componentes/Footer'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../Style/MyDecks.css'
const MyDecks = () => {

  
  useEffect(() => {

  }, [])
  
  const handleNewDeck = (e) =>{
    console.log(e.currentTarget.className);
    console.log(e.currentTarget.className);
  }

  return (
    <>
      <Navbar/>
      <div className='container-xl'>  
            <div className='Decks'>
              <button className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
              <button className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
              <button className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
              <button className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
          </div> 
      </div>
      <CardsShowcase/>
      <Footer/>
    </>
  )
}

export default MyDecks