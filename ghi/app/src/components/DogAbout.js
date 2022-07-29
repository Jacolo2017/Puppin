import React from 'react'

const DogAbout = ({formData, setFormData}, {check, setCheck}) => {
  return (
    <div className='flex flex-col text-gray-900 py-2'>
        
        <label>About</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.dog_about} onChange={(event) => setFormData({...formData, dog_about: event.target.value})}/>
        <label>Temperament</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.dog_temperament} onChange={(event) => setFormData({...formData, dog_temperament: event.target.value})}/>
        <label>Spayed or Neutered?</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="checkbox" value={formData.spayed_neutered} onClick={() => setCheck(check => !check)}/>
        <label>Vaccination History</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.vaccination_history} onChange={(event) => setFormData({...formData, vaccination_history: event.target.value})}/>
        <label>Photo URL</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.dog_photo} onChange={(event) => setFormData({...formData, dog_photo: event.target.value})}/>
    </div>
    
  )
}

export default DogAbout