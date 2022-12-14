import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom';

export default function ReviewsByCurrentUser(props) {
  let [userReviews, setUserReviews] = useState(["Loading"]);
  let [gotToken, setGotToken] = useState(false);
  let [currentUser, setCurrentUser] = useState();


  const openModel = () => {
    setOpen(true);
  };

  const closeModel = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {


  }
  )

  if (props.token && gotToken == false) {
    fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/currentuser/${props.token}`)
      .then(response => response.json())
      .then(response => fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/event/reviews/account=${response.id}`))
      .then(response => response.json())
      .then(response => setUserReviews(response));
    fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/currentuser/${props.token}`)
      .then(response => response.json())
      .then(response => setCurrentUser(response.username));


    setGotToken(true);
  }
  else {
  }
  return (

    <div className='w-screen bg-[url(https://img.freepik.com/free-vector/polka-dot-pattern-background-aesthetic-design-vector_53876-143523.jpg?w=1480&t=st=1660173718~exp=1660174318~hmac=c039bf958188c7480a929d7014fbc3085325b22340d6c66268928d70c101bb3b)]' id="about">
      <div className='w-full max-w-[1400px] mx-auto h-screen'>
        <div className='text-center bg-[#BDE4A7] py-12 border border-gray-200 shadow-xl'>
          <h2 className='text-3xl font-bold uppercase'>Your Reviews</h2>
          <Link to='/reviews/submit' className='font-semibold text-lg'> Create a <span className='text-blue-600'>review?</span> </Link>
        </div>

        <div className='grid-flow-row gap-10 px-10 py-20 text-center  bg-white h-[600px] shadow-xl'>
          <Swiper
            freeMode={true}
            grabCursor={false}
            modules={FreeMode}
            className='mySwiper py-10'
            slidesPerView={3}
            spaceBetween={100}
          >
            {userReviews.map(item => (
              <SwiperSlide className='pt-4 rounded-sm' >
                <motion.div className='border border-gray-300 rounded-xl shadow-md text-center p-6 bg-gray-100 w-[350px] mb-8 ' onClick={closeModel}>
                  <h2 className='text-2xl font-bold text-gray-800'>{item.review_event}</h2>
                  <p className='text-gray-900 py-4 font-medium'>{item.review_description}</p>
                  <p className='text-blue-700 py-4 font-bold text-xl'>Rating: <span className='text-red-600'>{item.location_rating}</span></p>
                </motion.div>
              </SwiperSlide>))}
          </Swiper>
        </div>
      </div>
    </div>

  )
}



