import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import './styles.css';

// import required modules
import { EffectCards } from 'swiper/modules';
import PokeCard from '@/components/PokeCard';





const PokeSlider = () => {
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper "
      >
        <SwiperSlide className='w-[70%]'><PokeCard/></SwiperSlide>
        {/* <SwiperSlide className='w-[70%]'><PokeCard/></SwiperSlide> */}
        {/* <SwiperSlide className='w-[70%]'><PokeCard/></SwiperSlide> */}
      
     
      </Swiper>
    </>
  )
}

export default PokeSlider
