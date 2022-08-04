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
  console.log(userReviews);

  if (props.token && gotToken == false) {
    console.log("yes token")
    fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/currentuser/${props.token}`)
      .then(response => response.json())
      .then(response => fetch(`${process.env.REACT_APP_EVENTS_HOST}/api/event/reviews/account=${response.id}`))
      .then(response => response.json())
      .then(response => setUserReviews(response));
    fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/currentuser/${props.token}`)
      .then(response => response.json())
      .then(response => setCurrentUser(response.username));


    setGotToken(true);
  }
  else {
    console.log("NONONO")
  }
  return (

    <div className='py-20 ' id="about">
      <div className='w-full max-w-[1300px] mx-auto py-10 mt-1'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold uppercase'>Your Reviews</h2>
          <Link to='/reviews/submit'> Create a review? </Link>
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
            {userReviews.map(item => (
              <SwiperSlide className='pt-4 rounded-sm' >
                <motion.div className='border rounded-xl shadow-md text-center p-6 bg-gray-100 w-[350px]' close={closeModel}>
                  <h2 className='text-xl font-semibold text-gray-800'>{item.review_event}</h2>
                  <p className='text-gray-700 py-4'>{item.review_description}</p>
                  <p className='text-blue-700 py-4 font-bold text-3xl'>Rating: <span></span>{item.location_rating}</p>
                </motion.div>
              </SwiperSlide>))}
          </Swiper>
        </div>
      </div>
    </div>

  )
}



