import React from 'react'
import { useFetchCards } from '../js/Cards'
import { useState, useEffect } from 'react'
import { useFirebaseDecks } from '../js/Decks.js';
import { postDeck } from '../js/Decks';
import Swal from 'sweetalert2'
import '../Style/CardsShowcase.css'
import '../Style/SelectCards.css'

const SelectCards = () => {
    const [endpoint, setendpoint] = useState("");
    const {decks} = useFirebaseDecks();
    const { cards, isLoading } = useFetchCards(endpoint);
    const [counter, setCounter] = useState(0);
    const [cardID, setCardID] = useState(0);
    const [MaxAmountCards, setMaxAmountCards] = useState(20);
    const [searchURL, setsearchURL] = useState("");
    const [refresh, setrefresh] = useState(false)
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
        if(decks){
            console.log(sessionStorage.getItem('currentDeck')-1);
            if(Object.keys(decks).length > sessionStorage.getItem('currentDeck')-1){
                setFinalDeck(decks[sessionStorage.getItem('currentDeck')-1]);
                setCounter(decks[sessionStorage.getItem('currentDeck')-1]);
            }
        }

    },[isLoading, MaxAmountCards, cards, counter,decks, refresh])

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

    const saveDeck = async () => {
        try
        {
            await postDeck(finalDeck);
            Swal.fire({
                icon: "success",
                title: "Your deck was saved succesfully",
                showConfirmButton: false,
                timer: 1500
                });
        }catch(error)
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                footer: '<a href="#">Why do I have this issue?</a>'
                });
        }
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
                id: e.target.id,
                pos: finalDeck.length
            })
            setFinalDeck(obj);
            console.log(finalDeck)
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
                timer: 500
              });
        }
    }

    const selectedCard = (e) =>{
        Swal.fire({
            title: "Remove card from deck?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
          }).then((result) => {
            if (result.isConfirmed) {
                let tempDeck = finalDeck;
                let index = parseInt(e.target.id);
                tempDeck.splice(index,1);
                for(let i = index; i < finalDeck.length; i++){
                    tempDeck[i].pos = tempDeck[i].pos - 1; 
                }
                setFinalDeck(finalDeck);
                setrefresh(!refresh);
            } else if (result.isDenied) {

            }
          });
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
        finalDeck.map(
            (element) => <img onClick={selectedCard} loading='lazy' key={element.pos} id={element.pos} className='cardSelected' src={element.img}/>   
        )
        :
        <></>
        }
        {finalDeck.length >= 19?
        <button onClick={saveDeck} className="btn btn-saveDeck btn-Register" type="button">Save Deck</button>
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