import React from 'react'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='w-screen mt-[750px] bg-black text-gray-300 justify-between items-center text-center py-3'>
        <div className='w-screen grid grid-cols-3 py-8 px-4'>
            <div>
                <h2 className='text-2xl font-semibold uppercase py-3'>Registration</h2>
                <ul>
                    <li className='py-2'>Sign In</li>
                    <li className='py-2'>Sign Up</li>
                </ul>
            </div>
            <div className='grid grid-rows-1 gap-2 text-center'>
                <h2 className='text-2xl font-semibold uppercase py-3'>Developers</h2>
                <a>Mark</a>
                <a>Jack</a>
                <a>Roger</a>
                <a>Cooper</a>
            </div>
            <div className='grid grid-rows-1text-center'>
                <h2 className='text-2xl font-semibold uppercase py-3'>Navigation</h2>
                <a>Home</a>
                <a>About</a>
                <a>Developers</a>
            </div>
        </div>
    </div>
  )
}

export default Footer