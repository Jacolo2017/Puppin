import React from 'react'

const ProfileAbout = (userData) => {
  
  return (
    <div className='py-20 grid grid-rows-2' id="about">
        <div className='w-full mx-auto py-6 mt-1'>
            <div className='text-center'>
                <h2 className='text-xl font-bold uppercase'>About</h2>
            </div>
        </div>
        <div className='w-full bg-white border border-gray-300 shadow-lg rounded-md'>
          <div className='w-full py-4 mt-1'>
            <div className='text-center font-bold text-xl'>
              {userData.userData.first_name} {userData.userData.last_name}
            </div>
            <div className='w-full grid grid-rows-4 text-center'>
            <div className='px-4 mt-4 font-semibold'>
                Gender: {userData.userData.gender}
              </div>
              <div className='px-4 mt-4 font-semibold'>
                Location: {userData.userData.state}
              </div>
              <div className='px-4 mt-2 font-semibold'>
                Date of Birth: {userData.userData.date_of_birth}
              </div>
              <div className='px-4 mt-2 font-semibold'>
                Bio: {userData.userData.about}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProfileAbout