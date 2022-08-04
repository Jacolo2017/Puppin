import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom';

export default function ReviewsByAnyUser(props){

    let [eventReviews, setEventReviews] = useState([]);
    let [gotToken, setGotToken] = useState(false);
    let [accountId, setAccountId] = useState(props.userData);
    let [isLoaded, setIsLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    console.log("userdata status", props.userData)
    const openModel = () => {
        setOpen(true);
      };
    
      const closeModel = () => {
        setOpen(false);
      };
  
    const [open, setOpen] = useState(false);
    // if (userDataLoaded == null){
    //     setUserDataLoaded(userdata)
    //     console.log(userDataLoaded)

      if (props.userData.length != 0 && isLoaded == false){
        console.log("effected", props.userData)
        fetch(`http://localhost:8000/api/event/reviews/account=${props.userData.account_id}`)
            .then(response => response.json())
            .then(response => setEventReviews(response));
            setIsLoaded(true);}
        

    
    // if (props.userData && isLoaded == false) {
    //     console.log("why is it fetching", props.userData);
    //     fetch(`http://localhost:8000/api/event/reviews/account=${props.userData.account_id}`)
    //         .then(response => response.json())
    //         .then(response => setEventReviews(response));
    //     setIsLoaded(true)
    // }
    
    if (eventReviews != "loading"){
        return(
            <div className='w-screen py-20 flex' id="about">
        <div className='max-w-[1400px] mx-auto py-10 mt-1'>
            <div className='text-center'>
                <h2 className='text-2xl font-bold uppercase'>Event Reviews Written</h2>
                {eventReviews.length > 3 ? <h3 className='text-xl font-semibold text-zinc-700 text-sky-400'> swipe to see more </h3> : "" }
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
                {eventReviews?.map(item => (

                <SwiperSlide className='pt-4 rounded-sm' onClick={() => setIsOpen(!isOpen)}>
                  <motion.div
                  
                  transition={{ layout: {duration: 1, type: 'spring' }}}
                  layout
                  style={{
                    borderRadius: "1rem",
                  }}
                  className='border rounded-xl shadow-md text-center p-6 bg-gray-100'
                  >
                    
                    <motion.h1>{item.review_event} by {item.reviewer_username}</motion.h1>
                    <motion.h2>{item.event_date_time}</motion.h2>
                    
                    {isOpen && (
                      <motion.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{duration: 1}}
                      layout
                      >
                        {item["review"] != null ? item.review.map(review => <motion.div>{review.reviewer_username} went! They says "{review.review_description}"</motion.div>): ""}
                        
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
        }

        //<h2 className='text-xl font-semibold text-gray-800'>{item.review_event} by {item.reviewer_username}</h2>
        // <p className='text-gray-700 py-4'>{item.review_description}</p>



