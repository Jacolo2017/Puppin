import React from 'react'

const AboutInfo = ({formData, setFormData}) => {
  return (
      <div className='flex flex-col text-gray-900 py-2'>
        <label>About</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.about} onChange={(event) => setFormData({...formData, about: event.target.value})}/>
        <label>Photo</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.photo_url} onChange={(event) => setFormData({...formData, photo_url: event.target.value})}/>
      </div>
  )
}

export default AboutInfo