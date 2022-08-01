import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import EventCard from './EventCard';
import 'swiper/css';
import 'swiper/css/free-mode';
import { AnimatePresence, motion } from 'framer-motion'
import Overlay from './Overlay';
import ExpandedCard from './ExpandedCard';

export default function Events(){

  const openModel = () => {
    setOpen(true);
  };

  const closeModel = () => {
    setOpen(false);
  };
  
  let [eventData, setEventData] = useState([])
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    fetch(`http://localhost:8000/api/events`)
    .then(res => res.json())
    .then(res => setEventData(res))
  }, [])
  

  return(
    <div className='w-screen py-20 ' id="about">
        <div className='max-w-[1300px] mx-auto py-10 mt-1'>
            <div className='text-center'>
                <h2 className='text-2xl font-bold uppercase'>Events</h2>
            </div>

            <div className=' grid-flow-row gap-10 px-4 py-20 text-center'>
              <Swiper
              freeMode={true}
              grabCursor={false}
              modules={FreeMode}
              className='mySwiper py-10'
              slidesPerView={3}
              spaceBetween={100}
              >
              {eventData.map(item => (
              
              <SwiperSlide className='pt-4 rounded-sm' >
              <motion.div className='border rounded-xl shadow-md text-center p-6 bg-gray-100 w-[350px]' close={closeModel}>
                {/* <div className='mt-[-1rem] '>
                    <img className='w-[90px] rounded-full border-2 border-blue-500' src='https://static.vecteezy.com/system/resources/previews/004/111/270/non_2x/faces-profile-avatars-people-expression-simple-heads-male-female-persons-cartoon-illustrations-profile-male-female-people-face-user-happy-free-vector.jpg'/>
                </div> */}
                {/* <div className='w-full'>
                  <img className='' src='https://img.freepik.com/free-vector/woman-walking-dog-park-girl-playing-with-her-pet-outside-cartoon-illustration_74855-14567.jpg?w=2000'/>
                </div> */}
                <h2 className='text-xl font-semibold text-gray-800'>{item.event_name}</h2>
                <p className='text-gray-700 py-4'>{item.event_date_time}</p>
              </motion.div>
              </SwiperSlide>
              
              ))}
              </Swiper>
            </div>
        </div>
    </div>
  )
}

