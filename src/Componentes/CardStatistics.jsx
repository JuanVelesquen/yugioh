import React from 'react'
import { useFetchCards } from '../js/Cards'
import { useState, useEffect } from 'react';
import '../Style/CardStatistics.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield,faFlask, faBook } from '@fortawesome/free-solid-svg-icons';
import attack from '../Recursos/Imagenes/battle.png'
/*
'https://images.ygoprodeck.com/images/cards/'+obj.attribute+'.jpg'
https://images.ygoprodeck.com/images/cards/icons/race/+obj.race+.png
'https://images.ygoprodeck.com/images/cards/icons/'+obj.race+'/Beast.png'

*/ 
const CardStatistics = () => {

    const {cards, isLoading} = useFetchCards(sessionStorage.getItem('Cardid').trim()); 
    const [card, setCard] = useState({});

    useEffect(() =>{
      if(!isLoading){
          if(!cards.error){
              let obj = {};
              if(cards.data.length == 1)
              {
                obj = {img: cards.data[0].card_images[0].image_url,
                          id: cards.data[0].id,
                          desc: String(cards.data[0].desc),
                          name: cards.data[0].name,
                          race: cards.data[0].race,
                          type: cards.data[0].type,
                        }
                if(cards.data[0].archetype){ obj.archtype = cards.data[0].archetype;}
                if(String(obj.type).includes('Monster')){
                  obj.atk = cards.data[0].atk;
                  obj.def = cards.data[0].def;
                  obj.level = cards.data[0].level;
                  obj.attribute = cards.data[0].attribute;
                }
                setCard(obj);
              }
          }
      }
  },[isLoading, cards])
  return (
    <>
      {
        !Object.keys(card).length == 0?
        <>
        {console.log(card)}
        <div className='img-decp-container'>
          <img className='img' src={card.img} alt={card.name} />
          <div className='decp-container'>
            <div>
              <h3 className='title-decp'>{card.name}</h3>
              <h4 className='subtitle-decp'>Description</h4>
              <p className='decp'>{card.desc}</p>
            </div>
            <div className='stats'>
            {card.type? 
              <div className='stats-item'>
                <h5>Type</h5>
                <div className='stats-item-content'><FontAwesomeIcon className='icon' icon={faBook} style={{color: "#322f2f"}} /><p> {card.type}</p></div>
              </div>  
              :
              <></>}
              {card.attribute? 
              <div className='stats-item'>
                <h5>Attribute</h5>
                <div className='stats-item-content'><img src={'https://images.ygoprodeck.com/images/cards/'+card.attribute+'.jpg'} alt=""style={{width: "16px", height:'16px'}} /><p> {card.attribute}</p></div>
              </div>  
              :
              <></>}
              {card.race? 
              <div className='stats-item'>
                <h5>Race</h5>
                <div className='stats-item-content'><img src={'https://images.ygoprodeck.com/images/cards/icons/race/'+card.race+'.png'} alt="" style={{width: "16px", height:'16px'}}/><p> {card.race}</p></div>
              </div>
              : 
              <></>}
              {card.level? 
              <div className='stats-item'>
                <h5>Level</h5>
                <div className='stats-item-content'><img src="https://ygoprodeck.com/wp-content/uploads/2017/01/level.png" alt="" style={{width: "16px", height:'16px'}}/><p> {card.level}</p></div>
                
               </div>
               : 
               <></>}
              {card.atk? 
              <div className='stats-item'>
                <h5>Attack</h5>
                <div className='stats-item-content'><img src={attack} alt="" style={{width: "16px", height:'16px'}}/><p> {card.atk}</p></div>
              </div>  
              :
              <></>}
              {card.def?
              <div className='stats-item'>
                <h5>Def</h5>
                <div className='stats-item-content'><FontAwesomeIcon className='icon' icon={faShield} style={{color: "#322f2f"}} /><p> {card.def}</p></div>
              </div>  
              : 
              <></>}
              {card.archetype? 
                <div className='stats-item'>
                  <h5>Archetype</h5>
                  <div className='stats-item-content'><FontAwesomeIcon className='icon' icon={faFlask} style={{color: "#322f2f"}} /><p> {card.archetype}</p></div>
                </div> 
              : 
              <></>}
            </div>
          </div>
        </div>
        
        
        
        </>
        
        
        :
        <h2>Is Loading...</h2>

      }
    </>
  )
}

export default CardStatistics

/*
    <FontAwesomeIcon icon={faShield} style={{color: "#ffffff"}} />
    <FontAwesomeIcon icon={faFlask} style={{color: "#ffffff"}} />
    <img src={attack} alt="" style={{width: "16px", height:'16px'}}/>
*/