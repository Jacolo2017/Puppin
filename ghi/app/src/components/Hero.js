import React from 'react'
import { Link } from 'react-router-dom'
import SignUp from './SignUp'
const Hero = () => {
  return (
    <div className='bg-white h-screen flex flex-col justify-center items-center' id="home">
      <div>
        <img className='' src='https://img.freepik.com/premium-vector/people-walk-play-with-dogs-cats_506604-148.jpg' />
      </div>
      <h1 className='lg:text-7xl md:text-7xl sm:text-7xl text-4xl font-black mb-14 uppercase'>
        <span className="text-red-600">P</span>urely P<span class="text-blue-600">U</span><span class="text-red-600">P</span>Tonic
      </h1>
      <div>
      </div>
      <Link className='bg-blue-400 rounded-full w-[160px] h-[50px] text-center py-3 shadow-lg hover:bg-blue-600 hover:text-gray-400 cursor-pointer' to='/registration/create'>
        <button className='uppercase text-center font-bold text-white'>Sign Up</button>
      </Link>
    </div>
  )
}

export default Hero