import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';
import { AnimatePresence, motion } from 'framer-motion'

const ProfileEvents = (props) => {

  console.log(props.eventsData)

  return (
    <div className='py-20' id="about">
    <div className='w-full max-w-[1300px] mx-auto py-10 mt-1'>
        <div className='text-center'>
            <h2 className='text-2xl font-bold uppercase'>Events that you've hosted</h2>
        </div>
    </div>
    <div className='flex py-4 px-12 ml-4'>
    <Swiper
      freeMode={true}
      grabCursor={false}
      modules={[FreeMode]}
      className='mySwiper w-screen'
      slidesPerView={3}
      spaceBetween={50}
      >
        {props.eventsData.map(event =>
        <SwiperSlide>
          <div className='border py-10 rounded-xl shadow-md text-center w-[300px] mb-4 bg-gray-200'>
            <h1 className='text-blue-600 text-2xl font-semibold mt-4'>{event.event_name}</h1>
          </div>
        </SwiperSlide>
        )}
    </Swiper>
    </div>
    <div className='w-full mx-auto py-10 mt-1'>
        <div className=''>
            <h2 className='text-2xl font-bold uppercase text-left'>Events that you've attended</h2>
        </div>
    </div>
  </div>
  )
}

export default ProfileEvents