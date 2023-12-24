import React from 'react'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useFirebaseDecks } from '../js/Decks.js';
import { useNavigate } from 'react-router-dom';
import DeckImage from '../Recursos/Imagenes/Deck.png'
import '../Style/FirebaseDecks.css'

const FirebaseDecks = () => {
    const {isLoading, decks} = useFirebaseDecks();
    const navigate = useNavigate();
    useEffect(() => {

    }, [isLoading])

    const handleDeckEvent = (e) =>{
        navigate('/Deck');
    }
  
  return (
    <div className='container-xl'> 
    {
        isLoading? 
            <h2>Is Loading...</h2>
        :
        decks.length == 0 ?
            <div className='Decks'>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            </div> 
            :

            decks.length == 1?
            <div className='Decks'>
            <button  className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            </div> 

                :

                decks.length == 2?
                <div className='Decks'>
                <button className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                <button className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
                <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
                </div> 
                    :

                    decks.length == 3?
                    <div className='Decks'>
                    <button className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
                    </div> 
                    :
                    <div className='Decks'>
                    <button className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    </div> 
    }
    </div>
  )
}

export default FirebaseDecks