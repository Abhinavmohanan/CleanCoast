import React from 'react'
import Navbar from '../Navbar/Navbar'
import Banner from '../Banner/Banner'
import Imageslider from '../ImageSlider/Imageslider'
import Footer from '../Footer/Footer'
import './Homepage.css'

export default function Homepage() {
  return (
    <div>
            <Navbar/>
      <Banner/>
      <div className='image_slider'>
        <Imageslider/>
      </div>
      <Footer/>
    </div>
  )
}
