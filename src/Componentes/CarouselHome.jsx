import React from 'react'
import { useFetchCards } from '../js/Cards'
import { useState, useEffect } from 'react'
import '../Style/CarouselHome.css'
const CarouselHome = ({endPoint}) => {
    const { cards, isLoading } = useFetchCards(endPoint);
    const [width,setWidth] = useState(window.matchMedia("(max-width: 650px)"));
    const [flag, setFlag] = useState(false)
    const [deck, setDeck] = useState({
        img: [],
        id: null
    });

    useEffect(() =>{
        if(!isLoading){
            let array = [];
            for (let i = 50; i < 70; i++){
              array.push({img: cards.data[i].card_images[0].image_url,
                id: cards.data[i].id
                }
              );
            }     
            setDeck(array)
        }
        console.log(width);
    },[isLoading, flag])

    width.onchange = (e) => 
    {
        if (e.matches) {
            setFlag(!flag);
        } else {
            null
        }
    }

  return (
    <>  
        {deck.length > 0 ?  
        <div className='container-xxl'>
            <div id="carouselExampleAutoplaying" className="carousel carousel-dark slide " data-bs-ride="carousel">
                <div className="carousel-inner">
                    {
                    width.matches?
                        <>
                            <div className="carousel-item active">
                                <img src={deck[0].img} className="carousel-card HOME fb" alt="..."/>
                                <img src={deck[1].img} className="carousel-card HOME" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src={deck[2].img} className="carousel-card HOME fb" alt="..."/>
                                <img src={deck[3].img} className="carousel-card HOME" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src={deck[5].img} className="carousel-card HOME fb" alt="..."/>
                                <img src={deck[6].img} className="carousel-card HOME" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src={deck[7].img} className="carousel-card HOME fb" alt="..."/>
                                <img src={deck[8].img} className="carousel-card HOME" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src={deck[10].img} className="carousel-card HOME fb" alt="..."/>
                                <img src={deck[11].img} className="carousel-card HOME" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src={deck[12].img} className="carousel-card HOME fb" alt="..."/>
                                <img src={deck[13].img} className="carousel-card HOME" alt="..."/>
                            </div>
                        </>
                    :
                        <>
                            <div className="carousel-item active">
                                <img src={deck[0].img} className="carousel-card HOME fb" alt="..."/>
                                <img src={deck[1].img} className="carousel-card HOME" alt="..."/>
                                <img src={deck[2].img} className="carousel-card HOME" alt="..."/>
                                <img src={deck[3].img} className="carousel-card HOME" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src={deck[5].img} className="carousel-card HOME fb" alt="..."/>
                                <img src={deck[6].img} className="carousel-card HOME" alt="..."/>
                                <img src={deck[7].img} className="carousel-card HOME" alt="..."/>
                                <img src={deck[8].img} className="carousel-card HOME" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src={deck[10].img} className="carousel-card HOME fb" alt="..."/>
                                <img src={deck[11].img} className="carousel-card HOME" alt="..."/>
                                <img src={deck[12].img} className="carousel-card HOME" alt="..."/>
                                <img src={deck[13].img} className="carousel-card HOME" alt="..."/>
                            </div>
                        </>
                    }
                    
                </div>
                <button className="carousel-control-prev HOME" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon HOME" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next HOME" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon HOME" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        
        : 
        
        <h2>Is Loading...</h2>        
        }
    </>
  )
}

export default CarouselHome
