import React from 'react'

const SignUpInfo = ({formData, setFormData}) => {
  return (
    <div className='flex flex-col text-gray-900 py-2'>
        <label>Email</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.email} onChange={(event) => setFormData({...formData, email: event.target.value})}/>
        <label>Username</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.username} onChange={(event) => setFormData({...formData, username: event.target.value})}/>
        <label>Password</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="password" value={formData.account_password} onChange={(event) => setFormData({...formData, account_password: event.target.value})}/>
    </div>
  )
}

export default SignUpInfo