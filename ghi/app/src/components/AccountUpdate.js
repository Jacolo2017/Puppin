import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AccountUpdate = (props) => {
    let [gotToken, setGotToken] = useState(false)
    const [UserAccount, setUserAccount] = useState()
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        account_password: "",
        city: "",
        state: "",
        gender: "",
        photo_url: "",
        about: "",
    });
    let navigate = useNavigate()

    if (props.token && gotToken == false) {
        
        fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/currentuser/${props.token}`)
            .then(response => response.json())
            .then(response => fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/${response.id}`)
                .then(response => response.json())
                .then(response => setUserAccount(response)))

        setGotToken(true)
    };


    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = { ...formData }
        const accountId = UserAccount
        const accountUrl = `${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/update/${accountId.account_id}`
        const fetchConfig = {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }

        const res = await fetch(accountUrl, fetchConfig)
        if (res.ok) {
            const updatedAccount = await res.json()
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                username: "",
                account_password: "",
                city: "",
                state: "",
                gender: "",
                photo_url: "",
                about: "",
            })
            navigate("/profile");
        }
    }


    return (
        <div className='items-center h-screen w-screen bg-gradient-to-bl bg-[#eeb359] from-[#f5c57c] py-[50px]'>
            <div className='flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl' onSubmit={handleSubmit}>
                    <h2 className='text-3xl text-black uppercase font-semibold text-center'>Update Account</h2>
                    <div className='flex flex-col text-gray-900 py-2'>
                        <label>First Name</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.first_name} onChange={(event) => setFormData({ ...formData, first_name: event.target.value })} />
                        <label>Last Name</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.last_name} onChange={(event) => setFormData({ ...formData, last_name: event.target.value })} />
                        <label>Email</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
                        <label>Username</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.username} onChange={(event) => setFormData({ ...formData, username: event.target.value })} />
                        <label>Password</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.account_password} onChange={(event) => setFormData({ ...formData, account_password: event.target.value })} />
                        <label>City</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.city} onChange={(event) => setFormData({ ...formData, city: event.target.value })} />
                        <label>State</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.state} onChange={(event) => setFormData({ ...formData, state: event.target.value })} />
                        <label>Gender</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.gender} onChange={(event) => setFormData({ ...formData, gender: event.target.value })} />
                        <label>Photo</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.photo_url} onChange={(event) => setFormData({ ...formData, photo_url: event.target.value })} />
                        <label>About</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.about} onChange={(event) => setFormData({ ...formData, about: event.target.value })} />
                    </div>
                    <div className='flex justify-between item-center'>
                        <button className='w-full py-2 bg-green-500 rounded-xl font-bold uppercase hover:bg-green-400 shadow-sm text-white'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AccountUpdate;
