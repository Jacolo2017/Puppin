import React from 'react'

const PersonalInfo = ({ formData, setFormData }) => {
  return (
    <div className='flex flex-col text-gray-900 py-4 gap-1'>
      <label className='py-2'>First Name</label>
      <input className='rounded-lg bg-gray-300 mt-2 p-2  hover:bg-gray-400' type="text" value={formData.first_name} onChange={(event) => setFormData({ ...formData, first_name: event.target.value })} />
      <label className='py-2'>Last Name</label>
      <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.last_name} onChange={(event) => setFormData({ ...formData, last_name: event.target.value })} />
      <label className='py-2'>Date Of Birth</label>
      <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="date" value={formData.date_of_birth} onChange={(event) => setFormData({ ...formData, date_of_birth: event.target.value })} />
      <label className='py-2'>Gender</label>
      <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.gender} onChange={(event) => setFormData({ ...formData, gender: event.target.value })} />

    </div>
  )
}

export default PersonalInfo