import React from 'react'
import { useFetchCards } from '../js/Cards'
import { useState, useEffect } from 'react'
import { useFirebaseDecks } from '../js/Decks.js';
import {Link} from 'react-router-dom';
import '../Style/CardsShowcase.css'

const CardsShowcaseDeck = () => {
    const {decks} = useFirebaseDecks();
    const [finalDeck, setFinalDeck] = useState([]);

    useEffect(() =>{
        if(decks){
            console.log(sessionStorage.getItem('currentDeck')-1);
            if(Object.keys(decks).length > sessionStorage.getItem('currentDeck')-1){
                setFinalDeck(decks[sessionStorage.getItem('currentDeck')-1]);
            }
        }

    },[decks])

  return (
    <>
        {
        finalDeck.length > 0?
        <div className='showcase'>
            {finalDeck.map(
                src => (
                    <Link key={src.pos} to='/CardDetails'
                        state= {{id: src.id, img:src.img}}>
                        <img loading='lazy' className='card' src={src.img} alt="" />
                    </Link>
                
                )
            )}
        </div>
        :
        <></>
        }
    </>
  )
}

export default CardsShowcaseDeck