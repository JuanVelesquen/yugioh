import React from 'react'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useFirebaseDecks } from '../js/Decks.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import DeckImage from '../Recursos/Imagenes/Deck.png'
import '../Style/FirebaseDecks.css'

const FirebaseDecks = () => {
    const {isLoading, decks} = useFirebaseDecks();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(sessionStorage.getItem('userUid'));
    }, [isLoading])

    const handleDeckEvent = (e) =>{
        sessionStorage.setItem('currentDeck', Object.keys(decks).length + 1 );
        sessionStorage.setItem('AlreadyCreatedDeck', false);
        navigate('/Deck');
    }

    const handleCreatedDeckEvent = (e) =>{
        Swal.fire({
            title: "What do you want to do?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Check deck",
            denyButtonText: `Edit Deck`,
            customClass: {
                denyButton: 'DeckCreatedCC',
            }
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                sessionStorage.setItem('currentDeck', Object.keys(decks).length);
                sessionStorage.setItem('AlreadyCreatedDeck', true);
                navigate('/CheckDeck');
            } else if (result.isDenied) {
                sessionStorage.setItem('currentDeck', Object.keys(decks).length);
                sessionStorage.setItem('AlreadyCreatedDeck', true);
                navigate('/Deck');
            }
            
          });
        
    }
  
  return (
    <div className='container-xl'> 
    {
        isLoading? 
            <h2>Is Loading...</h2>
        :
        !decks?
        <></>
        :
        Object.keys(decks).length == 0 ?
            <div className='Decks'>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            </div> 
            :

            Object.keys(decks).length == 1?
            <div className='Decks'>
            <button onClick={handleCreatedDeckEvent} className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
            </div> 

                :

                Object.keys(decks).length == 2?
                <div className='Decks'>
                <button onClick={handleCreatedDeckEvent} className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                <button onClick={handleCreatedDeckEvent} className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
                <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
                </div> 
                    :

                    Object.keys(decks).length == 3?
                    <div className='Decks'>
                    <button onClick={handleCreatedDeckEvent} className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button onClick={handleCreatedDeckEvent} className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button onClick={handleCreatedDeckEvent} className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button onClick={handleDeckEvent} className='btnNewDeck'><FontAwesomeIcon className='addIcon' icon={faPlus} /></button>
                    </div> 
                    :
                    <div className='Decks'>
                    <button onClick={handleCreatedDeckEvent} className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button onClick={handleCreatedDeckEvent} className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button onClick={handleCreatedDeckEvent} className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    <button onClick={handleCreatedDeckEvent} className='btnDeck'><img className='deck' src={DeckImage} alt="" /></button>
                    </div> 
    }
    </div>
  )
}

export default FirebaseDecks