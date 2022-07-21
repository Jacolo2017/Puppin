import React from 'react'

const Login = () => {
  return (
    <div className='items-center h-screen w-screen bg-gradient-to-bl bg-[#eeb359] from-[#f5c57c] py-[180px] '>
        <div className='flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl'>
                {/* <div className='p-8'>
                    <img  className='rounded-lg shadow-xl' src='https://img.freepik.com/free-vector/people-walking-park-with-their-dogs_52683-37181.jpg?w=2000'/>
                </div> */}
                <h2 className='text-3xl text-black uppercase font-semibold text-center'>Sign In</h2>
                <div className='flex flex-col text-gray-900 py-2'>
                    <label>Username</label>
                    <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" />
                </div>
                <div className='flex flex-col text-gray-900 py-2'>
                    <label>Password</label>
                    <input className='rounded-lg bg-gray-300 hover:bg-gray-400 mt-2 p-2' type="password" />
                </div>
                <button className='w-full my-5 py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white'>Login</button>
                <div>
                    <ul>
                        <li className='text-sm text-blue-600 hover:to-blue-800 cursor-pointer text-center'>Don't have an account?</li>
                    </ul>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
// bg-[#CE6D8B] from-[#9EB7E5]