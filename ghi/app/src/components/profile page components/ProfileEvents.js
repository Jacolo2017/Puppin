import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom';
const ProfileEvents = (props) => {

  console.log(props.eventsData)

  return (
    <div className='w-full py-10 flex' id="about">
      <div className='max-w-[1200px] mx-auto py-10 mt-1'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold uppercase'>Events</h2>
          <h3 className='text-xl font-semibold text-zinc-700'> swipe to see more <span className='text-red-500 text-md'>or..</span> <Link to='/event/create' className='font-bold text-blue-700'>create an event?</Link></h3>
        </div>
        <div className='flex py-10'>
          <Swiper
            freeMode={true}
            grabCursor={false}
            modules={[FreeMode]}
            className='mySwiper w-screen'
            slidesPerView={3}
            spaceBetween={100}
          >
            {props.eventsData.map(event =>
              <SwiperSlide className='pt-4 rounded-sm mb-6'>
                <div className='border border-gray-300 py-10 rounded-xl shadow-lg text-center w-[300px] mb-4 bg-gray-200'>
                  <h1 className='text-blue-600 text-xl font-semibold mt-4'>{event.event_name}</h1>
                </div>
              </SwiperSlide>
            )}

          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ProfileEvents

// fixing
{/* <div className='max-w-[1300px] mx-auto py-10 mt-1 mb-4'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold uppercase'>Events</h2>
          <h3 className='text-xl font-semibold text-zinc-700'> swipe to see more <span className='text-red-500 text-md'>or..</span> <Link to='/event/create' className='font-bold text-blue-700'>create an event?</Link></h3>
        </div>

        <div className='py-10 flex-auto'>
          <Swiper
            freeMode={true}
            grabCursor={false}
            modules={[FreeMode]}
            className='mySwiper'
            slidesPerView={3}
            spaceBetween={100}
          >
            {props.eventsData.map(event =>
              <SwiperSlide className='pt-4 rounded-sm mb-6'>
                <div className='border border-gray-300 py-10 rounded-xl shadow-lg text-center w-[200px] mb-4 bg-gray-200'>
                  <h1 className='text-blue-600 text-xl font-semibold mt-4'>{event.event_name}</h1>
                </div>
              </SwiperSlide>
            )}
          </Swiper> */}