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
  }, [])
  
  
  useEffect(() => {
    fetch(`http://localhost:8001/api/accounts/${eventData}`)
    .then(res1 => res1.json())
    .then(res1 => setUserData(res1))
  }, [])

  
  console.log(userData)

  return(
    <div className='w-screen py-20 flex' id="about">
        <div className='max-w-[1400px] mx-auto py-10 mt-1'>
            <div className='text-center'>
                <h2 className='text-2xl font-bold uppercase'>Events</h2>
            </div>

            <div className='flex py-10'>
              <Swiper
              freeMode={true}
              grabCursor={false}
              modules={FreeMode}
              className='mySwiper'
              slidesPerView={isOpen ? 1 : 3}
              spaceBetween={100}
              >
              {eventData.map(item => (
              
              <SwiperSlide className='pt-4 rounded-sm'  >
              <motion.div 
              onClick={() => setIsOpen(!isOpen)}
              transition={{ layout: {duration: 1, type: 'spring' }}}
              layout
              style={{
                borderRadius: "1rem",
              }}
              className='border rounded-xl shadow-md text-center p-6 bg-gray-100'>
                <div>
                <h2 layout="transition" className='text-xl font-semibold text-gray-800'>{item.event_name} hosted by {item.username}</h2>
                <p className='text-gray-700 py-4'>{item.event_date_time}</p>
                </div>
                <AnimatePresence>
                {isOpen && (
                  <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 1}}
                  layout
                  className='grid grid-rows-2 justify-center' id='expand'>
                  <motion.div className='px-16'>
                    <img className='w-[300px] ' src={require('../images/dogs.png')} />
                    <h1 className='py-3 font-semibold text-2xl'>Learn more about the event!</h1>
                  </motion.div>
                    <motion.div className='grid grid-cols-4 gap-10'>
                    <p className='text-gray-700 py-1'>User Image</p>
                    <p className='text-gray-700 py-1'>username</p>
                    <p className='text-gray-700 py-1'>Dog Image</p>
                    <p className='text-gray-700 py-1'>dog name</p>
                    </motion.div>
                    
                  </motion.div>
                )}
                </AnimatePresence>
              </motion.div>
              </SwiperSlide>
              
              ))}
              </Swiper>
            </div>
        </div>
    </div>
  )
}

