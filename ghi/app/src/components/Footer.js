import React from 'react'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='w-full mt-[1100px] bg-black text-gray-300 py-y px-[100px]'>
        <div className='max-w-[1240px] mx auto grid md:grid-cols-5 border-b-2 border-gray-600 py-8 px-4 justify-between'>
            <div>
                <h6 className='font-bold uppercase pt-2'>Developers</h6>
                <ul>
                    <li className='py-1'>Jack Lemieux</li>
                    <li className='py-1'>Mark Esposito</li>
                    <li className='py-1'>Roger Wang</li>
                    <li className='py-1'>Cooper Edmondson</li>
                </ul>
            </div>
            <div>
                <h6 className='font-bold uppercase pt-2'>Registration</h6>
                <ul>
                    <li className='py-1'>Sign In</li>
                    <li className='py-1'>Sign Up</li>
                </ul>
            </div>
            
            <div className='col-span-2 px-8 pt-8 md:pt-2'>
            <h2 class="text-3xl text-gray-200 font-bold">P<span class="text-red-600">U</span>PP<span class="text-red-800">I</span><span class="text-green-800">N</span></h2>
            </div>
            
            <div>
                <h6 className='font-bold uppercase pt-2'>Purely Puptonic</h6>
                <ul>
                    <li className='py-1'>Home</li>
                    <li className='py-1'>About</li>
                    <li className='py-1'>GitLab</li>
                    
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer