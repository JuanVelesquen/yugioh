import React from 'react'
import BlueEyes from '../Recursos/Imagenes/Cards/BlueEyesWhiteDragon.jpg'
import EmberoarRedDragon from '../Recursos/Imagenes/Cards/EmberoarRedDragon.jpg'
import ExodiaTheAfterlife from '../Recursos/Imagenes/Cards/ExodiaTheAfterlife.jpg'
import GodOfExodia from '../Recursos/Imagenes/Cards/GodOfExodia.jpg'
import LegendaryKnight from '../Recursos/Imagenes/Cards/LegendaryKnight.jpg'
import Silfer from '../Recursos/Imagenes/Cards/SliferTheSkyDragon.jpg'
import '../Style/CarouselLandingPage.css'
const CarouseLandingPage = () => {
  return (
    <div id="carouselExampleAutoplaying" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={BlueEyes} className="carousel-card" alt="..."/>
                <img src={EmberoarRedDragon} className="carousel-card" alt="..."/>
            </div>
            <div className="carousel-item">
                <img src={Silfer} className="carousel-card" alt="..."/>
                <img src={ExodiaTheAfterlife}className="carousel-card" alt="..."/>
            </div>
            <div className="carousel-item">
                <img src={LegendaryKnight} className="carousel-card" alt="..."/>
                <img src={GodOfExodia}className="carousel-card" alt="..."/>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
  )
}

export default CarouseLandingPage
