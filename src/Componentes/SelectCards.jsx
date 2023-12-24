import React from 'react'
import { useFetchCards } from '../js/Cards'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import '../Style/CardsShowcase.css'
import '../Style/SelectCards.css'

const SelectCards = () => {
    const [endpoint, setendpoint] = useState("");
    const { cards, isLoading } = useFetchCards(endpoint);
    const [counter, setCounter] = useState(0)
    const [MaxAmountCards, setMaxAmountCards] = useState(20);
    const [searchURL, setsearchURL] = useState("");
    const [deck, setDeck] = useState({
        img: [],
        id: null
    });
    const [finalDeck, setFinalDeck] = useState([]);

    useEffect(() =>{
        if(!isLoading){
            if(!cards.error){
                let array = [];
                if(cards)
                {
                    if(cards.data.length > MaxAmountCards)
                    {
                        for (let i = 0; i < MaxAmountCards; i++){
                            array.push({img: cards.data[i].card_images[0].image_url,
                                id: cards.data[i].id
                                }
                            );
                        }  
                    }
                    else
                    {
                        for (let i = 0; i < cards.data.length; i++){
                            array.push({img: cards.data[i].card_images[0].image_url,
                                id: cards.data[i].id
                                }
                            );
                        } 
                    }
   
                }
                setDeck(array);
            }
        }
    },[isLoading, MaxAmountCards, cards, counter])

    function handleSeeMoreButton(){
        setMaxAmountCards(MaxAmountCards+15);
    }

    function handleSearchButton(){
        handleEndPoint();
    }

    const handleKeyPress =(e) => {
        if(e.key==="Enter"){
            handleEndPoint();
        }
    }

    function handleEndPoint(){
        let str = "?fname="+searchURL;
        str = str.split(" ").join("%20");
        setendpoint(str);
        setsearchURL("");
        
    }
    
    const handleSelectedCard = (e) => {
        let flag = true;
        let obj = finalDeck;

        if(obj.length > 39){
            flag = false;
            Swal.fire({
                title: 'Error!',
                text: 'You cannot choose any more cards',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
              
        }

        if(finalDeck.length > 1){
            const filteredCards = obj.filter((currentCard) => currentCard.id == e.target.id);
            if(filteredCards.length > 2){
                flag = false;
                Swal.fire({
                    title: 'Error!',
                    text: 'You have already reached the maximum limit for the same card.',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })   
            }
        }

        if(flag){
            obj.push({
                img: e.target.src,
                id: e.target.id
            })
            setFinalDeck(obj);
            setCounter(counter+1);
            Swal.fire({
                position: "top-end",
                imageUrl: 'check.png',
                width: 300,
                imageWidth: 40,
                imageHeight: 40,
                title: "Card added to your deck",
                showConfirmButton: false,
                customClass: {
                    title: 'addCardSwalTitle'
                },
                timer: 750
              });
        }
    }


  return (
    <div>
        {isLoading? 
            <h2>Is Loading...</h2> 
        :
        <>
        <div className='container-DeckCreated'>
        {
        finalDeck.length > 0?
        finalDeck.map((element) => <img className='cardSelected' src={element.img}/>
        )
        :
        <></>
        }
        </div>
         <div className='container-searchBar'>
            <div className='searchBar'>
                <button onClick={handleSearchButton} className="btn btn-Search-Card" type="button"></button>
                <input 
                className="search-Card" 
                name='search'
                type="text" 
                placeholder="Search cards" 
                aria-label="Search"
                value={searchURL}
                onChange={(e) => setsearchURL(e.target.value)} 
                onKeyDown ={handleKeyPress}
                />
            </div>
        </div>
        
        {cards.error ?
            <h2>No cards found</h2>
        :
            <div className='showcase'>
                {deck.length >= MaxAmountCards || deck.length == cards.data.length ?  
                    <>
                        {deck.map ( 
                            src => (
                                <button
                                    type='button'
                                    key={src.id}
                                    className='btn-SelectCard'
                                    onClick={handleSelectedCard}
                                    >
                                    <img loading='lazy' className='card' src={src.img}  
                                    id={src.id}
                                    />
                                </button>
                            
                            )
                        )}
                        {
                            deck.length == cards.data.length ? 
                            <>
                            </>
                            :
                            <button onClick={handleSeeMoreButton} className="btn center btn-Register btn-SeeMore" type="button">See more</button>
                        }
                    </>
                :
                <h2>Is Loading...</h2>    
                }
            </div>}
            </>
            }
    </div>
  )
}

export default SelectCards