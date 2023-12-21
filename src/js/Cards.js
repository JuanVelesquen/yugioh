import { useState,useEffect } from "react";

export const useFetchCards = (endPoint) =>{
  
  const [cards,setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchCards = async() =>{
        try{
          const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php'+endPoint);
          const data = await response.json();
          setCards(data);
          setIsLoading(false)
        }
        catch(error){
          console.error();
        }
  }

  useEffect(() =>{
      fetchCards();
  },[endPoint])

  return {
    cards,
    isLoading
  }
}















/*import React, {useState,useEffect} from 'react'


const Cards = () => {
    const [cards,setCards] = useState([]);
    const [arrayCards,setArrayCards] = useState([])
    useEffect(() =>{
      fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then(data => data.json())
      .then(json => setCards(json.data))
    },[])

    function loadImgSrc(indexBegin,IndexEnd){
      let array = [];
      for (let i = indexBegin; i < IndexEnd; i++){
        array.push(cards[i].card_images[0].image_url);
      }     
      setArrayCards(array)
    }
}

export default setArrayCards;*/