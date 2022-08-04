import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
const Footer = () => {
    return (
        <div className='w-screen mt-[750px] bg-black text-gray-300 justify-between items-center text-center py-3'>
            <div className='w-screen grid grid-cols-3 py-8 px-4'>
                <div>
                    <h2 className='text-2xl font-semibold uppercase py-3'>Registration</h2>
                    <div className='grid grid-rows-2'>
                        <Link className='py-2' to='/registration/login'>Sign In</Link>
                        <Link className='py-2' to='/registration/create'>Sign Up</Link>
                    </div>
                </div>
                <div className='grid grid-rows-1 gap-2 text-center'>
                    <h2 className='text-2xl font-semibold uppercase py-3'>Developers</h2>
                    <a href='#contact'>Mark</a>
                    <a href='#contact'>Jack</a>
                    <a href='#contact'>Roger</a>
                    <a href='#contact'>Cooper</a>
                </div>
                <div className='grid grid-rows-1text-center'>
                    <h2 className='text-2xl font-semibold uppercase py-3'>Navigation</h2>
                    <a href=''>Home</a>
                    <a href='#about'>About</a>
                    <a href='#contact'>Developers</a>
                </div>
            </div>
        </div>
    )
}

export default Footer