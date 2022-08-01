import React, {useState} from 'react'
import { motion } from 'framer-motion'
const EventCard = (eventData) => {

  console.log(eventData.data)
  return (
    <div className='grid grid-cols-3 gap-4'>
      {eventData.data.map(item => (
      <div className='border rounded-xl shadow-xl text-center p-6 bg-white w-[300px] '>
        {/* <div className='mt-[-1rem] '>
            <img className='w-[90px] rounded-full border-2 border-blue-500' src='https://static.vecteezy.com/system/resources/previews/004/111/270/non_2x/faces-profile-avatars-people-expression-simple-heads-male-female-persons-cartoon-illustrations-profile-male-female-people-face-user-happy-free-vector.jpg'/>
        </div> */}
        {/* <div className='w-full'>
          <img className='' src='https://img.freepik.com/free-vector/woman-walking-dog-park-girl-playing-with-her-pet-outside-cartoon-illustration_74855-14567.jpg?w=2000'/>
        </div> */}
        <h2 className='text-xl font-semibold text-gray-800'>{item.event_name}</h2>
        <p className='text-gray-700 py-4'>{item.event_date_time}</p>
      </div>
      ))}
    </div>
  )
}

export default EventCard;