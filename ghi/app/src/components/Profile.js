import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import ProfileAbout from './profile page components/ProfileAbout'
import ProfileDogs from './profile page components/ProfileDogs'
import ProfileEvents from './profile page components/ProfileEvents'
import ProfileReviews from './ReviewsSliderComponents/ProfileReviews';
import ReviewsByCurrentUser from './ReviewsSliderComponents/ReviewsByCurrentUser';


export default function Profile(props) {

  let [currentUser, setCurrentUser] = useState()
  let [userData, setUserData] = useState();
  let [userDogData, setuserDogData] = useState();
  let [gotToken, setGotToken] = useState(false)
  let [dogsData, setDogsData] = useState();
  let [eventsData, setEventsData] = useState();

  if (props.token && gotToken == false) {
    fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/currentuser/${props.token}`)
      .then(response => response.json())
      .then(response => setCurrentUser(response.id))


    fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/${props.currentUser}`)
      .then(res => res.json())
      .then(res => setUserData(res))
    fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/${props.currentUser}/dogs`)
      .then(res1 => res1.json())
      .then(res1 => setuserDogData(res1))
    fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/${props.currentUser}/events`)
      .then(response2 => response2.json())
      .then(response2 => setEventsData(response2))

    setGotToken(true)
  }



  const [page, setPage] = useState(0);
  const pageTitles = ["Reviews", "Events", "Dogs", "About"]

  const PageDisplay = () => {
    if (page === 0) {
      return <ProfileReviews token={props.token} />
    } else if (page === 1) {
      return <ProfileEvents currentUser={currentUser} eventsData={eventsData} token={props.token} />
    } else if (page === 2) {
      return <ProfileDogs userDogData={userDogData} />
    } else {
      return <ProfileAbout userData={userData} />
    }
  };

  function pageChange(index) {

    const changePage = (e) => {
      e.preventDefault()

    }
    setPage(index)
  }


  return (
    props.token?
    <div className='px-44 bg-gray-50'>
      <div className='relative h-96 rounded-b flex justify-center'>
        <img className='object-cover w-full h-full rounded-b shadow-sm' src='https://img.freepik.com/premium-vector/seamless-pattern-with-heads-different-breeds-dogs_192280-226.jpg?w=826S' />
        <div className='absolute -bottom-6 '>
          <img className='object-cover w-40 h-40 rounded-full border-4 border-gray-300 shadow-md' src={userData ? userData.photo_url : ''} />
        </div>

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
              onClick={() => { pageChange(index); }}
              className='px-4 py-5 text-blue-800 hover:bg-gray-300 '>
              {pages}
            </div>
          )}
        </div>
      </div>
      <div className='py-4'>
        <PageDisplay />
      </div>

    </div> : <Navigate to='/profile'/>
  )
}
