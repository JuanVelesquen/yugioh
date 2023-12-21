import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Componentes/NavbarHome'
import Footer from '../Componentes/Footer'
import CardStatistics from '../Componentes/CardStatistics'

const CardDetails = () => {
    const { state } = useLocation();
    const [flag, setflag] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
      /*if(id){
        
      }*/
      console.log(state);
      if (state){
        sessionStorage.setItem('Cardid',('?id='+state.id))
        setflag(true)
      }
      else{navigate('/MyDecks')}
    }, [state])
    
  return (
    <>
        <Navbar/>
        {
          flag?
          <CardStatistics/>
          :
          <h2>Is Loading...</h2>
        }
        
        <Footer/>
    </>
  )
}

export default CardDetails