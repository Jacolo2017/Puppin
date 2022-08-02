import React, { useState, useEffect} from 'react';

export default function Profile(props){

  let [currentUser, setCurrentUser] = useState()
  let [userData, setUserData] = useState();
  let [userDogData, setuserDogData] = useState();
  let [gotToken, setGotToken] = useState(false)

  if (props.token && gotToken == false){
    fetch(`http://localhost:8001/api/currentuser/${props.token}`)
    .then(response => response.json())
    .then(response => setCurrentUser(response.id))
      

    fetch(`http://localhost:8001/api/accounts/${props.currentUser}`)
    .then(res => res.json())
    .then(res => setUserData(res))
      fetch(`http://localhost:8001/api/accounts/${props.currentUser}/dogs`)
      .then(res1 => res1.json())
      .then(res1 => setuserDogData(res1))
    setGotToken(true)
  }


  
  console.log(userData);
  console.log(userDogData);
  console.log(currentUser);
  

    return(
        <div className="shadow">
        <div className="h-[300px] flex justify-center">
          <div className="object-cover w-full h-full bg-[#FFB17A]"/>
          <div className=" flex absolute -bottom-8 gap-3">
            <img
              src="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png"
              className="object-cover border-4 border-gray-300 w-40 h-40 rounded-full shadow-xl mt-[-55rem]"
            />
            <img
              src="https://www.thesprucepets.com/thmb/YQzfza2oKOCzQIvX-K66BRi1DjI=/1080x1080/filters:no_upscale():max_bytes(150000):strip_icc()/30078352_448703938920062_6275637137232625664_n-5b0de8c443a1030036f9e15e.jpg"
              className="object-cover border-4 border-gray-300 w-40 h-40 rounded-full shadow-xl mt-[-55rem]"
            />
          </div>
        </div>
        <div className='grid grid-cols-3'>
            <div className='grid grid-rows-5 px-4 gap-4 py-8'>
                <div className='font-bold uppercase'>{userData ? userData.username : ''}</div>
                <div className='font-semibold text-gray-600'>{userData ? userData.gender : ''}</div>
               
              {userDogData?.map(dog =>
                <>
                <div className='font-bold uppercase'>{dog.dog_name}</div>
                <div className='font-semibold text-gray-600'>{dog.dog_about}</div>
                </>
                )}
            </div>
            <div className=' px-4 text-center'>
              <div className='py-8 font-semibold'>
              {userData ? userData.about : ''}
              </div>
            </div>
            <div className='text-right px-4 py-2'>
              <button className=' rounded-xl uppercase font-semibold border border-gray-800 w-[130px] bg-[#4F4789] hover:bg-[#6a60b8] text-gray-200'>edit profile</button>
            </div>
        </div>
      </div>

      //comment
    )
}