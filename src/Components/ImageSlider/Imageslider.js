import React from 'react'
import SimpleImageSlider from "react-simple-image-slider"
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'


export const Imageslider = () => {

    const images = [
        { url: image1 },
        { url: image2 },
        { url: image3 },

      ];

  return (
    <div className='slider_div'>
        <SimpleImageSlider
        width={896}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
        
        />
    </div>
  )
}

export default Imageslider