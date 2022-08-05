import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom';
export default function PublicProfileEvents(props){

  const [associatedEvents, setAssociatedEvents] = useState(null)
  const [doneOnce, setdoneOnce] = useState(false)
 

  function eventsAttendedByThisUser(){
    return fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/${props.userData.account_id}/events/attended`)
      .then(res => res.json())
      .then(res => setAssociatedEvents(res));
  }
  
  if (doneOnce == false){
    console.log("postnut", props.userData)
    eventsAttendedByThisUser()
    // eventsAttendedByThisUser()
    // console.log("abc", associatedEvents)
    // const tempstorage = []
    // for (anEvent in setAssociatedEvents){
    //   console.log("loop")
    //   fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/events/${anEvent}`)
    //     .then(res => res.json)
    //     .then(storage.push(res))
    // }
    // setStorage(tempstorage)
    setdoneOnce(true)
  }
    
  // }

  return (
    <div className='py-20 flex' id="about">
      <div className='max-w-[1300px] mx-auto py-10 mt-1 mb-6'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold uppercase'>Events</h2>
          <h3 className='text-xl font-semibold text-zinc-700'> swipe to see <span className='text-red-500 text-md'>more!</span></h3>
        </div>

        <div className='flex py-10'>
          <Swiper
            freeMode={true}
            grabCursor={false}
            modules={[FreeMode]}
            className='mySwiper'
            slidesPerView={3}
            spaceBetween={50}
          >
            {props.eventsData.map(event =>
              <SwiperSlide>
                <div className='border border-gray-300 py-10 rounded-xl shadow-lg text-center w-[300px] mb-4 bg-gray-200'>
                  <h1 className='text-blue-600 text-2xl font-semibold mt-4'>{event.event_name}</h1>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div className='w-full mx-auto py-10 mt-1'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold uppercase'>Events that they've attended</h2>
            <h3 className='text-xl font-semibold text-zinc-700'> swipe to see <span className='text-red-500 text-md'>more!</span></h3>
        </div>

        <div className='flex py-10'>
          {associatedEvents ? <Swiper
            freeMode={true}
            grabCursor={false}
            modules={[FreeMode]}
            className='mySwiper'
            slidesPerView={3}
            spaceBetween={50}
          >
            {associatedEvents.map(event =>
              <SwiperSlide>
                <div className='border border-gray-300 py-10 rounded-xl shadow-lg text-center w-[300px] mb-4 bg-gray-200'>
                  <h1 className='text-blue-600 text-2xl font-semibold mt-4'>{event.event_name}</h1>
                </div>
              </SwiperSlide>
            )}
          </Swiper>: ""}
        </div>
            
          </div>
        </div>
      </div>


  )
}



