import React, { useState } from "react";
import { BsArrowLeftShort } from 'react-icons/bs';
import { AiFillEnvironment } from 'react-icons/ai';
import paw from "../assets/paw.jpg"


const Nav = () => {
    const [open, setOpen] = useState(true);
  return(
    <div className="flex">
        <div
        className={`bg-[#839788] h-screen p-5 pt-8 ${open ? "w-72": "w-20"} duration-300 relative`}
        >
            <BsArrowLeftShort
            className={`bg-white text-[#586F5E] text-3xl rounded-full absolute -right-3 top-9 border border-[#839788] cursor-pointer
            ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}
            />

            <div className='inline-flex'>
                <AiFillEnvironment className='bg-amber-300 text-4xl rounded cursor-pointer'/>
            </div>
        </div>
    </div>
  )
}
export default Nav;