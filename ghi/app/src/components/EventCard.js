import React from 'react'

export default function EventCard() {

  
  


  return (
    <div className='border rounded-xl shadow-xl text-center p-6 bg-white w-[400px] '>
      <div className='mt-[-1rem] '>
          <img className='w-[90px] rounded-full border-2 border-blue-500' src='https://static.vecteezy.com/system/resources/previews/004/111/270/non_2x/faces-profile-avatars-people-expression-simple-heads-male-female-persons-cartoon-illustrations-profile-male-female-people-face-user-happy-free-vector.jpg'/>
      </div>
      <div className='w-full'>
        <img className='' src='https://img.freepik.com/free-vector/woman-walking-dog-park-girl-playing-with-her-pet-outside-cartoon-illustration_74855-14567.jpg?w=2000'/>
      </div>
      <h2 className='text-xl font-semibold text-gray-800'>Event Name</h2>
      <p className='text-gray-700'> pup's big day is tommorrow and I don't have any friends to come and play with him</p>
      
      <div className=''>
        <button className='w-full py-4 text-blue-600'>Would you like to see more info?</button>
      </div>
    </div>
  )
}

