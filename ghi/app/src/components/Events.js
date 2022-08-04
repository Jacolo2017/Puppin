import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';

import { AnimatePresence, motion } from 'framer-motion'
import { Link, Navigate } from 'react-router-dom';
import PublicProfile from './PublicProfile';


export default function Events(){
  
  let [eventData, setEventData] = useState([]);
  
  let [userData, setUserData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  let [storage, setStorage] = useState([])
  const [joinEventOpen, setJoinEventOpen] = useState(false)
  function getReviewsFromEvents(){
    return Promise.all(
    eventData.map((eventid) =>
        fetch(`http://localhost:8000/api/event/${eventid.event_id}/reviews`)
        .then(response => response.json())
        
        )
    )
}
function getUsersFromEvents(){
  return Promise.all(
  eventData.map((eventid) =>
      fetch(`http://localhost:8000/api/events/${eventid.event_id}/usersdogs`)
      .then(response => response.json())
      
      )
  )
}

  useEffect(() => {
    
    fetch(`http://localhost:8000/api/events`)
    .then(res => res.json())
    .then(res => setEventData(res))

    

    
    
  }
  
  
  
  , [])
// if eventid in eventData is the same as event id in reviews, add the corresponding review in that eventdata object
  useEffect(()=> {
    getReviewsFromEvents()
      .then((res)=> {
        for (const anEvent of eventData){
          for (let reviewlist of res){
            for (const review of reviewlist){
              if (review.event_id == anEvent.event_id && anEvent["review"] == undefined ){
                anEvent["review"] = []
                anEvent["review"].push(review);
                
                }
              else if (review.event_id == anEvent.event_id){
                anEvent["review"].push(review);
              }
            }
            }
          }
        
        });
      console.log(eventData)
      getUsersFromEvents()
      .then((res)=> {
        for (const anEvent of eventData){
            for (const userlist of res){
              for (const user of userlist){
              
              if (user.event_id == anEvent.event_id && anEvent["users"] == undefined){
                console.log(user.event_id)
                anEvent["users"] = []
                anEvent["users"].push(user)
  
                console.log(user.username)
              }
              else if (user.event_id == anEvent.event_id && (anEvent["users"].map(eventinneruser => eventinneruser["username"])).includes(user.username) == false && anEvent["users"] != undefined){
                console.log(user.username)
                console.log(anEvent["users"].map(eventinneruser => eventinneruser["username"]))
                anEvent["users"].push(user);
              }
            }
            }
          }
  });
        
   },
  [eventData])
  
  function EventPastChecker(event){
    const date = Date.parse(event)
            console.log("now", Date.now())
            console.log("event time", event)
            if (Date.now() < date) {
                console.log("event completed")
                return true}
            else {
                return false
            }
  }
  console.log(eventData)
  
  // useEffect(() => {
  //   fetch(`http://localhost:8001/api/accounts/${eventData}`)
  //   .then(res1 => res1.flatMap(id=> ))
  //   .then(res1 => setUserData(res1))
  // }, [])

  function JoinForm(){
    return <Navigate to='/registration/login'/>
  }
  

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
              modules={[FreeMode]}
              className='mySwiper w-screen'
              slidesPerView={isOpen ? 1 : 3}
              spaceBetween={100}
              >
                {eventData.map((item, index) => (

                <SwiperSlide className='pt-4 rounded-sm'>
                  <motion.div
                  
                  transition={{ layout: {duration: 1, type: 'spring' }}}
                  layout
                  style={{
                    borderRadius: "1rem",
                  }}
                  className='border rounded-xl shadow-md text-center p-6 bg-gray-100'
                  >
                    <button onClick={() => setIsOpen(!isOpen)}>open </button>
                    <motion.h1>{item.event_name} by <Link to={`/user/${item.username}`}>{item.username}</Link></motion.h1>
                    <motion.h2>{item.event_date_time}</motion.h2>
                    <motion.h2>Hosted by : {item.username}</motion.h2>
                    
                    {EventPastChecker(item.event_date_time) == true ? <Link to={`/join-event/${item.event_id}`}><button className = "h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" >Join this event </button></Link>: <div className = "text-xs">Event finished.</div>}
                    {isOpen && (
                      <motion.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{duration: 1}}
                      layout
                      >
                        <motion.div><b>Attendees:</b>{item["users"] != null ? item.users.map(user => <motion.div>{user.username}</motion.div>):""}</motion.div>
                        {item["review"] != null ? item.review.map(review => <motion.div>{review.reviewer_username} went! They says "{review.review_description}"</motion.div>): ""}
                        
                      </motion.div>
                    )}
                    {joinEventOpen && ( <motion.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{duration: 1}}
                      layout
                      > hello </motion.div>)}
                  </motion.div>
                </SwiperSlide>
                ))}
                
              </Swiper>
            </div>
        </div>
    </div>
  )
}
