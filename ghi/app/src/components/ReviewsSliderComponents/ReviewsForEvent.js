import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import { AnimatePresence, motion } from 'framer-motion'

export default function ReviewsByEvent(props) {
  let [eventReviews, setEventReviews] = useState(["Loading"]);
  let [gotToken, setGotToken] = useState(false);


  const openModel = () => {
    setOpen(true);
  };

  const closeModel = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/event/4/reviews/`)
      .then(response => response.json())
      .then(response => setEventReviews(response));

  }, []
  )



  return (
    <div className='w-screen py-20 ' id="about">
      <div className='max-w-[1300px] mx-auto py-10 mt-1'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold uppercase'>Event Reviews for a specific event</h2>
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
            {eventReviews.map(item => (

              <SwiperSlide className='pt-4 rounded-sm' >
                <motion.div className='border rounded-xl shadow-md text-center p-6 bg-gray-100 w-[350px] mb-5' onClick={closeModel}>
                  <h2 className='text-xl font-semibold text-gray-800'>{item.review_event} by {item.reviewer_username}</h2>
                  <p className='text-gray-700 py-4'>{item.review_description}</p>
                </motion.div>
              </SwiperSlide>))}


          </Swiper>
        </div>
      </div>
    </div>
  )
}