import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function Login({login}){
    let navigate = useNavigate();
    let [data, setData] = useState({
        username: '',
        account_password: '',
        error: '',
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = await login(data.username, data.account_password, () => navigate("/event/home"));
        setData({error: error})
        setData({ 
            username: '',
            account_password: '',
        })
        
    }
    
    
    

    return (
        <div className='items-center h-screen w-screen bg-gradient-to-bl bg-[#eeb359] from-[#f5c57c] py-[180px] '>
            <div className='flex flex-col justify-center'>
                <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl'>
                    <h2 className='text-3xl text-black uppercase font-semibold text-center'>Sign In</h2>
                    <div className='flex flex-col text-gray-900 py-2'>
                        <label>Username</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" onChange={(event) => setData({ ...data, username: event.target.value })} name='username' id='username'/>
                    </div>
                    <div className='flex flex-col text-gray-900 py-2'>
                        <label>Password</label>
                        <input className='rounded-lg bg-gray-300 hover:bg-gray-400 mt-2 p-2' type="password" onChange={(event) => setData({ ...data, account_password: event.target.value })} name='account_password' id='account_password'/>
                    </div>
                    <button className='w-full my-5 py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white'>Login</button>
                    <div>
                        <Link className='text-sm text-blue-600 hover:to-blue-800 cursor-pointer text-center' to='/registration/create' onClick={login}>Don't have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}



