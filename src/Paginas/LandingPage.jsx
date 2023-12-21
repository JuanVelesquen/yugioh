import React from 'react'
import Navbar from '../Componentes/Navbar'
import CarouseLandingPage from '../Componentes/CarouselLandingPage'
import SingIn from '../Componentes/SingIn'
import Footer from '../Componentes/Footer'
import '../Style/LandingPage.css'
import Swal from 'sweetalert2'
const LandingPage = () => {
  return (
    <>
      <main>
          <Navbar/>
          <div className='LogIn-LandingPage'>
              <div className='Carousel'>
                  <h1>Create your own decks</h1>
                  <div className='carousel-cards'>
                  <CarouseLandingPage/>
                  </div>  
              </div>
              <div className='SignIn'>
                  <h4>Welcome back!</h4>
                  <h2>Log in to your</h2>
                  <h2>account</h2>
                  <SingIn/>
              </div>
          </div>
      </main>
      <Footer/>
    </>
  )
}

export default LandingPage
