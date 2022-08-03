import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';
import { AnimatePresence, motion } from 'framer-motion'




export default function Events(){
  
  let [eventData, setEventData] = useState([]);

  let [userData, setUserData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  

  useEffect(() => {
    fetch(`http://localhost:8000/api/events`)
    .then(res => res.json())
    .then(res => setEventData(res))

    fetch(`http://localhost:8000/api/events`)
    .then(res2 => res2.json())
    .then(res2 => res2.flatMap(id => id.account_id))
    .then(res2=>setUserData(res2))
  }
 
  
  
  , [])
  
  
  // useEffect(() => {
  //   fetch(`http://localhost:8001/api/accounts/${eventData}`)
  //   .then(res1 => res1.flatMap(id=> ))
  //   .then(res1 => setUserData(res1))
  // }, [])

  
  

  return(
    <div className='w-screen py-20 flex' id="about">
        <div className='max-w-[1400px] mx-auto py-10 mt-1'>
            <div className='text-center'>
                <h2 className='text-2xl font-bold uppercase'>Events</h2>
                <h3 className='text-xl font-semibold text-zinc-700'> swipe to see more </h3>
            </div>

            <div className='flex py-10'>
            <Swiper
              freeMode={true}
              grabCursor={false}
              modules={FreeMode}
              className='mySwiper w-screen'
              slidesPerView={isOpen ? 1 : 3}
              spaceBetween={100}
              >
                {eventData.map(item => (

                <SwiperSlide className='pt-4 rounded-sm'>
                  <motion.div
                  onClick={() => setIsOpen(!isOpen)}
                  transition={{ layout: {duration: 1, type: 'spring' }}}
                  layout
                  style={{
                    borderRadius: "1rem",
                  }}
                  className='border rounded-xl shadow-md text-center p-6 bg-gray-100'
                  >
                    <motion.h1>{item.event_name}</motion.h1>
                    <motion.h2>{item.event_date_time}</motion.h2>
                    <motion.h2>Hosted by : {item.username}</motion.h2>
                    
                    {isOpen && (
                      <motion.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{duration: 1}}
                      layout
                      >
                        <p>testing if this works please work omfg I will legit die for this</p>
                      </motion.div>
                    )}
                  </motion.div>
                </SwiperSlide>
                ))}
                
              </Swiper>
            </div>
        </div>
    </div>
  )
}