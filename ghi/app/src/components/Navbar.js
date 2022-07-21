import React from 'react'

const Navbar = () => {
  return (
        <nav class="flex justify-between items-center">
            <div className='px-4'>
                <h2 class="text-3xl text-gray-800 font-bold">P<span class="text-red-600">U</span>PP<span class="text-red-800">I</span><span class="text-green-800">N</span></h2>
            </div>
            <div class="flex items-center space-x-10 font-semibold capitalize px-4">
                <a href="#" class="text-gray-800 hover:underline">home</a>
                <a href="#about" class="text-gray-600 hover:text-gray-800 hover:underline">about</a>
                <a href="#" class="text-gray-600 hover:text-gray-800 hover:underline">contact</a>
                <a href="#" class="text-gray-600 hover:text-gray-800 hover:underline"><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' className='h-[20px]'></img></a>
            </div>
            <div className='px-4 py-2'>
                <a href="#_" class="px-9 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block">
                    <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-blue-600 group-hover:h-full opacity-90"></span>
                    <span class="relative group-hover:text-white">Login</span>
                </a>
            </div>
        </nav>
  )
}

export default Navbar