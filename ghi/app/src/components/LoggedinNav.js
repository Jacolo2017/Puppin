import React from 'react'
import { Link } from 'react-router-dom';
import { useToken } from '../auth/Authentication'
const LoggedinNav = ({logout}) => {




  return (
    <nav class="flex fixed justify-between items-center bg-white shadow-lg w-screen">
            <div className='px-4 cursor-pointer'>
                <h2 className="text-3xl text-gray-800 font-bold">P<span className="text-red-600">U</span>PP<span className="text-red-800">I</span><span className="text-green-800">N</span></h2>
            </div>
            <div className="flex items-center space-x-10 font-semibold capitalize px-4">

                <Link className="text-gray-600 hover:text-gray-800 hover:underline" to='/event/home'>Events</Link>
                <Link className="text-gray-600 hover:text-gray-800 hover:underline" to='/profile'>Profile</Link>

                <a href="#about" className="text-gray-600 hover:text-gray-800 hover:underline">Events</a>
                <a href="#contact" className="text-gray-600 hover:text-gray-800 hover:underline">Profile</a>
                <a href="http://localhost:3000/event/create" className="text-gray-600 hover:text-gray-800 hover:underline">Create Event</a>

                <a href="https://gitlab.com/purely-puptonic/puppin" className="text-gray-600 hover:text-gray-800 hover:underline"><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' className='h-[20px]'></img></a>
            </div>
            
            <div className='px-8 py-2'>
                <button className='border border-blue-200 bg-blue-200 rounded-md h-[50px] w-[100px] font-semibold uppercase hover:bg-blue-300' onClick={logout}>Sign out</button>
            </div>
            
        </nav>
  )
}

export default LoggedinNav;