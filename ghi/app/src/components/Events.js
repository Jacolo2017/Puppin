import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide, slideTo } from 'swiper/react';
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';

import { AnimatePresence, motion } from 'framer-motion'
import { Link, Navigate } from 'react-router-dom';
import PublicProfile from './PublicProfile';
import { GoPlus } from 'react-icons/go'

export default function Events(props) {

  const [eventData, setEventData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [storage, setStorage] = useState([])
  const [joinEventOpen, setJoinEventOpen] = useState(false)
  const [myIndex, setMyIndex] = useState();
  const sliderRef = useRef();

  useEffect(() => {
    sliderRef.current?.swiper.slideTo(myIndex);
  }, [myIndex]);


  const handleExpand = (e, index) => {
    e.preventDefault();
    setMyIndex(index);
    setIsOpen(!isOpen);
  };
  const handleClick = (e) => {
    e.preventDefault();
    <Navigate to='/event/create'/>
  };


  let [currentUser, setCurrentUser] = useState();
  let [gotToken, setGotToken] = useState(false)



  if (props.token && gotToken == false) {
  fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/currentuser/${props.token}`)
  .then(response => response.json())
  .then(response => setCurrentUser(response.username));

  setGotToken(true)
}


  function getReviewsFromEvents() {
    return Promise.all(
      eventData.map((eventid) =>
        fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/event/${eventid.event_id}/reviews`)
          .then(response => response.json())

      )
    )
  }
  function getUsersFromEvents() {
    return Promise.all(
      eventData.map((eventid) =>
        fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/events/${eventid.event_id}/usersdogs`)
          .then(response => response.json())

      )
    )
  }

  useEffect(() => {

    fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/events`)
      .then(res => res.json())
      .then(res => setEventData(res))
  }
    , [])
  // if eventid in eventData is the same as event id in reviews, add the corresponding review in that eventdata object
  useEffect(() => {
    getReviewsFromEvents()
      .then((res) => {
        for (const anEvent of eventData) {
          for (let reviewlist of res) {
            for (const review of reviewlist) {
              if (review.event_id == anEvent.event_id && anEvent["review"] == undefined) {
                anEvent["review"] = []
                anEvent["review"].push(review);

              }
              else if (review.event_id == anEvent.event_id) {
                anEvent["review"].push(review);
              }
            }
          }
        }

      });
    getUsersFromEvents()
      .then((res) => {
        for (const anEvent of eventData) {
          for (const userlist of res) {
            for (const user of userlist) {

              if (user.event_id == anEvent.event_id && anEvent["users"] == undefined) {
                anEvent["users"] = []
                anEvent["users"].push(user)

              }
              else if (user.event_id == anEvent.event_id && (anEvent["users"].map(eventinneruser => eventinneruser["username"])).includes(user.username) == false && anEvent["users"] != undefined) {
                anEvent["users"].push(user);
              }
            }
          }
        }
      });

  },
    [eventData])

  function EventPastChecker(event) {
    const date = Date.parse(event)
    if (Date.now() < date) {
      return true
    }
    else {
      return false
    }
  }
  console.log("praise", eventData.map(eventinneruser => eventinneruser["account_id"]))

  // useEffect(() => {
  //   fetch(`http://localhost:8001/api/accounts/${eventData}`)
  //   .then(res1 => res1.flatMap(id=> ))
  //   .then(res1 => setUserData(res1))
  // }, [])

  function JoinForm() {
    return <Navigate to='/registration/login' />
  }

  function conditionalButtonRender(item){
    
    if (item["users"] != null){
      console.log("curr user", currentUser)
      console.log("check this item", item) 
      return (item.users.map(eventinneruser => eventinneruser["username"]).includes(currentUser) ? 
      "You have joined" : <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" >Join this event </button>)
    }
  }

  console.log(eventData)
 

  return ( 
    props.token?
    <div className='w-screen py-12 flex bg-gray-50 bg-[url(https://img.freepik.com/free-vector/polka-dot-pattern-background-aesthetic-design-vector_53876-143523.jpg?w=1480&t=st=1660173718~exp=1660174318~hmac=c039bf958188c7480a929d7014fbc3085325b22340d6c66268928d70c101bb3b)]' id="about">
      <div className='max-w-[1400px] mx-auto py-10 mt-1'>
        <div className=" bg-[#a0d0f2] border border-gray-100 h-[130px] shadow-2xl">
          <h2 className='text-3xl font-bold uppercase text-center mt-8'>Events</h2>
          <h3 className='text-xl font-semibold text-[#495867] text-center'> swipe to see more</h3>
        </div>
        <div className='flex py-10 px-10 items-center justify-center bg-white h-[600px] shadow-xl'>
          <Swiper
            ref={sliderRef}
            freeMode={true}
            grabCursor={false}
            modules={[FreeMode]}
            className='mySwiper w-screen'
            slidesPerView={isOpen ? 1 : 3}
            spaceBetween={100}
          >
            {eventData.map((item, index) => (

              <SwiperSlide className='pt-4 rounded-sm mb-6' key={index}>
                <motion.div
                  onClick={e => { handleExpand(e, index) }}
                  transition={{ layout: { duration: 1, type: 'spring' } }}
                  layout
                  style={{
                    borderRadius: "1rem",
                  }}
                  className='border rounded-xl shadow-lg text-center p-6 bg-gray-50'
                >
                  <motion.h1 className='font-bold text-xl'>{item.event_name} </motion.h1>
                  <motion.h2>{item.event_date_time}</motion.h2>
                  <motion.h2 className='font-semibold text-lg'>Hosted by : <Link className='text-green-600' to={`/user/${item.username}`}>{item.username}</Link></motion.h2>

                  {EventPastChecker(item.event_date_time) == true ? <Link to={`/join-event/${item.event_id}`}>{conditionalButtonRender(item)}</Link> : 
                  <div className="text-lg">Event finished.</div>}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      layout
                    >
                      <motion.div><b>Attendees:</b>{item["users"] != null ? item.users.map(user => <motion.div>{user.username}</motion.div>) : ""}</motion.div>
                      {item["review"] != null ? item.review.map(review => <motion.div className='font-semibold'><span className='font-bold text-green-700'>
                        {review.reviewer_username}</span> went! They said "<span className='text-purple-700'>{review.review_description}</span>"</motion.div>) : ""}
                    </motion.div>
                  )}
                  {joinEventOpen && (<motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    layout
                  > hello </motion.div>)}
                </motion.div>
              </SwiperSlide>
            ))}
            <SwiperSlide className='pt-4 rounded-sm mb-6 h-[400px]'>
                    <div className='bg-gray-50 h-[130px] rounded-lg shadow-lg border border-gray-200'>

                      <div className='grid grid-cols-4'>
                        <div className='bg-gray-300 border border-gray-200 w-14 h-14  rounded-full ml-2 mt-2'/>
                        <div className=' col-span-3'>
                            <h1 className='bg-gray-300 border border-gray-200 w-40 h-8  rounded-md mt-6 ml-10'/>
                            <h2 className='bg-gray-300 border border-gray-200 w-64 h-8  rounded-md mt-4'/>
                        </div>
                      </div>
                    </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div> : <Navigate to='/event/home'/>
  ) 
}
