import React from 'react'


const DogAbout = ({formData, setFormData, check, setCheck, toggleCheck}) => {
  return (
    <div className='flex flex-col text-gray-900 py-2'>
        <label>About</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.dog_about} onChange={(event) => setFormData({...formData, dog_about: event.target.value})}/>
        <label>Temperament</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.dog_temperament} onChange={(event) => setFormData({...formData, dog_temperament: event.target.value})}/>
        <div className='py-4'>
          <label class="form-check-label inline-block text-gray-800" for="flexCheckChecked">Spayed or Neutered?</label>
          <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked" onClick={() => toggleCheck()}/>
        </div>
        <label>Vaccination History</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.vaccination_history} onChange={(event) => setFormData({...formData, vaccination_history: event.target.value})}/>
        <label>Photo URL</label>
        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.dog_photo} onChange={(event) => setFormData({...formData, dog_photo: event.target.value})}/>
    </div>
    
  )
}




export default DogAbout