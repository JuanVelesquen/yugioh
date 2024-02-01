import React from 'react'
import { useFetchCards } from '../js/Cards'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import '../Style/CardsShowcase.css'

const CardsShowcase = () => {
    const [endpoint, setendpoint] = useState("");
    const { cards, isLoading } = useFetchCards(endpoint);
    const [MaxAmountCards, setMaxAmountCards] = useState(20);
    const [searchURL, setsearchURL] = useState("");
    const [deck, setDeck] = useState({
        img: [],
        id: null
    });

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
    },[isLoading, MaxAmountCards, cards])

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


  return (
    <div>
        {isLoading? 
            <h2>Is Loading...</h2> 
        :
        <>
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
                                <Link key={src.id} to='/CardDetails'
                                    state= {{id: src.id, img:src.img}}>
                                    <img loading='lazy' className='card' src={src.img} alt="" />
                                </Link>
                            
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

export default CardsShowcase