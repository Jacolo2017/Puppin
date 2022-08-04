import React from 'react'

const Other = ({ formData, setFormData }) => {
  return (
    <div className='flex flex-col text-gray-900 py-2'>
      <label>City</label>
      <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.city} onChange={(event) => setFormData({ ...formData, city: event.target.value })} />
      <label>State</label>
      <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.state} onChange={(event) => setFormData({ ...formData, state: event.target.value })} />
    </div>
  )
}

export default Other