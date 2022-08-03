import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useToken } from '../auth/Authentication'


class LoggedinNav extends React.Component{

    
    render(){
        if (!this.props.token){
           return <Navigate to='/registration/login'/>
        }

  return (
    <nav className="flex fixed justify-between items-center bg-white shadow-lg w-screen z-50">
            <div className='px-4 cursor-pointer'>
                <h2 className="text-3xl text-gray-800 font-bold">P<span className="text-red-600">U</span>PP<span className="text-red-800">I</span><span className="text-green-800">N</span></h2>
            </div>
            <div className="flex items-center space-x-10 font-semibold capitalize px-4">

                <Link className="text-gray-600 hover:text-gray-800 hover:underline" to='/event/home'>Events</Link>
                <Link className="text-gray-600 hover:text-gray-800 hover:underline" to='/profile'>Profile</Link>
                <Link className="text-gray-600 hover:text-gray-800 hover:underline" to='/profile/public'>PPProfile</Link>
                <a href="http://localhost:3000/event/create" className="text-gray-600 hover:text-gray-800 hover:underline">Create Event</a>

                <a href="https://gitlab.com/purely-puptonic/puppin" className="text-gray-600 hover:text-gray-800 hover:underline"><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' className='h-[20px]'></img></a>
            </div>
            
            <div className='px-8 py-2'>
                <button className='border border-blue-200 bg-blue-200 rounded-md h-[50px] w-[100px] font-semibold uppercase hover:bg-blue-300' onClick={this.props.logout}>Sign out</button>
            </div>
            
        </nav>
  )
}
}
export default LoggedinNav;