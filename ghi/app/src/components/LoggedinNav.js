import React from 'react'

const LoggedinNav = () => {
  return (
    <nav class="flex fixed justify-between items-center bg-white shadow-lg w-screen">
            <div className='px-4 cursor-pointer'>
                <h2 className="text-3xl text-gray-800 font-bold">P<span className="text-red-600">U</span>PP<span className="text-red-800">I</span><span className="text-green-800">N</span></h2>
            </div>
            <div className="flex items-center space-x-10 font-semibold capitalize px-4">
                <a href="#about" className="text-gray-600 hover:text-gray-800 hover:underline">Events</a>
                <a href="#contact" className="text-gray-600 hover:text-gray-800 hover:underline">Profile</a>
                <a href="https://gitlab.com/purely-puptonic/puppin" className="text-gray-600 hover:text-gray-800 hover:underline"><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' className='h-[20px]'></img></a>
            </div>
            <div className='px-8 py-2'>
                <a href="http://localhost:3000/registration/login" className="px-9 py-2.5 relative rounded group overflow-hidden font-medium bg-blue-50 text-blue-800 inline-block">
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-blue-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">Sign Out</span>
                </a>
            </div>
        </nav>
  )
}

export default LoggedinNav