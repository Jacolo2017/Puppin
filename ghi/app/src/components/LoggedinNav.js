import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useToken } from '../auth/Authentication'


class LoggedinNav extends React.Component {


    render() {
        if (!this.props.token) {
            return <Navigate to='/registration/login' />
        }

        return (
            <nav className="flex fixed justify-between items-center bg-white shadow-lg w-screen z-50">
                <div className='px-4 cursor-pointer'>
                    <Link to='/'><h2 className="text-3xl text-gray-800 font-bold">P<span className="text-red-600">U</span>PP<span className="text-red-800">I</span><span className="text-green-800">N</span></h2></Link>
                </div>
                <div className="flex items-center space-x-10 font-semibold capitalize px-4">

                    <Link className="text-gray-600 hover:text-gray-800 hover:underline" to='/event/home'>Events</Link>
                    <Link className="text-gray-600 hover:text-gray-800 hover:underline" to='/profile'>Profile</Link>
                    <Link to="https://gitlab.com/purely-puptonic/puppin" className="text-gray-600 hover:text-gray-800 hover:underline"><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' className='h-[20px]'></img></Link>
                </div>

                <div className='px-8 py-2'>
                    <Link to="/registration/login" className="px-9 py-2.5 relative rounded group overflow-hidden font-medium bg-blue-50 text-blue-800 inline-block">
                        <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-blue-600 group-hover:h-full opacity-90"></span>
                        <span className="relative group-hover:text-white" onClick={this.props.logout}>Logout</span>
                    </Link>
                </div>
            </nav>
        )
    }
}
export default LoggedinNav;