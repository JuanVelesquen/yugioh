import React from 'react'
import { useState } from 'react'
import Navbar from '../Componentes/NavbarHome'
import Carousel from '../Componentes/CarouselHome'
import Footer from '../Componentes/Footer'
import '../Style/Home.css'
const Home = () => {

  const [endPoint, setendPoint] = useState('?level=gte9')

  return (
    
    <>
      <Navbar/>
      <h1 className='Home-Title'>Create your own decks</h1>
      <div className='container-SubTitle'>
        <h4 className='Home-SubTitle'>Save your Yu Gi Oh cards in your </h4>
        <h4 className='Home-SubTitle'>own personalized decks</h4>
      </div>
      <Carousel endPoint={endPoint}/>
      <Footer/>
    </>
  )
}

export default Home