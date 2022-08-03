import React, {useState} from 'react'

const ProfileDogs = (props) => {
  
  console.log(props.userDogData)
  return (
    <div className='py-20 flex' id="about">
        <div className='w-full mx-auto py-10 mt-1'>
            <div className=''>
                <h2 className='text-xl font-bold uppercase text-left'>Dogs</h2>
            </div>
        </div>
    </div>
  )
}

export default ProfileDogs