import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileAbout from './profile page components/ProfileAbout'
import ProfileDogs from './profile page components/ProfileDogs'
import ProfileEvents from './profile page components/ProfileEvents'
import ProfileReviews from './profile page components/ProfileReviews'



export default function Profile(props) {

  let [currentUser, setCurrentUser] = useState()
  let [userData, setUserData] = useState();
  let [userDogData, setuserDogData] = useState();
  let [gotToken, setGotToken] = useState(false)
  let [dogsData, setDogsData] = useState();
  let [eventsData, setEventsData] = useState();

  if (props.token && gotToken == false) {
    fetch(`http://localhost:8001/api/currentuser/${props.token}`)
      .then(response => response.json())
      .then(response => setCurrentUser(response.id))


    fetch(`http://localhost:8001/api/accounts/${props.currentUser}`)
      .then(res => res.json())
      .then(res => setUserData(res))
    fetch(`http://localhost:8001/api/accounts/${props.currentUser}/dogs`)
      .then(res1 => res1.json())
      .then(res1 => setuserDogData(res1))
    fetch(`http://localhost:8001/api/accounts/${props.currentUser}/events`)
    .then(response2 => response2.json())
    .then(response2 => setEventsData(response2))
      
    setGotToken(true)
  }



  const [page, setPage] = useState(0);
  const pageTitles = ["Reviews" , "Events", "Dogs", "About"]

  const PageDisplay = () => {
    if (page === 0) {
      return <ProfileReviews currentUser={currentUser}/>
    } else if (page === 1) {
      return <ProfileEvents currentUser={currentUser } eventsData={eventsData}/>
    } else if (page === 2) {
      return <ProfileDogs userDogData={userDogData}/>
    } else {
      return <ProfileAbout userData={userData}/>
    }
  };

function pageChange(index) {

  const changePage = (e) => {
    e.preventDefault()
    
    }
    setPage(index)
  }


  return (
    <div className='px-44 bg-gray-50'>
      <div className='relative h-96 rounded-b flex justify-center'>
        <img className='object-cover w-full h-full rounded-b shadow-sm' src='https://snappygoat.com/o/ddb9495535cdadf967535da29c8e058f2935a972/Paw-Prints-Background.jpg' />
        <div className='absolute -bottom-6 '>
          <img className='object-cover w-40 h-40 rounded-full border-4 border-gray-300 shadow-md' src='https://www.thesprucepets.com/thmb/YQzfza2oKOCzQIvX-K66BRi1DjI=/1080x1080/filters:no_upscale():max_bytes(150000):strip_icc()/30078352_448703938920062_6275637137232625664_n-5b0de8c443a1030036f9e15e.jpg' />
        </div>
      ))}
      </div>
      <div className='flex justify-center items-center'>
        <div className='text-center mt-12 text-3xl text-fBlack font-bold'>{userData ? userData.username : ''}</div>
        <Link to='/profile/update' className='flex px-6 bg-green-400 rounded-xl font-bold uppercase w-30 text-center mt-12 ml-6 hover:bg-green-500'>Edit</Link>
      </div>
      <div className='border border-gray-800 mt-6 border-opacity-30' />
      <div className='flex justify-center px-8'>
        <div className='flex gap-3'>
          {pageTitles.map((pages, index) =>
          <div 
          onClick={() => {pageChange(index);}}
          className='px-4 py-5 text-blue-800 hover:bg-gray-300 '>
            {pages}
          </div>
          )}
        </div>
      </div>
      <div className='py-4'>
        <PageDisplay/>
      </div>
    </div>
  )
}
