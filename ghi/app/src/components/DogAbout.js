import React from 'react'

const DogAbout = ({ formData, setFormData }) => {
  return (
    <div className='flex flex-col text-gray-900'>

      <label>About</label>
      <textarea className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' value={formData.dog_about} onChange={(event) => setFormData({ ...formData, dog_about: event.target.value })} />
      <label>Temperament</label>
      <textarea className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.dog_temperament} onChange={(event) => setFormData({ ...formData, dog_temperament: event.target.value })} />
      <label className='pt-2'>Spayed or Neutered?</label>
      <div className='grid gap-4 grid-cols-3 grid-row-1 py-2 items-center justify-items-left' onChange={(event) => setFormData({ ...formData, spayed_neutered: event.target.value })}>
        <div>
          <input value='true' name='spayed-neutered check' className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-blue-500 first-line:focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" />
          <label className="form-check-label inline-block text-gray-800" htmlFor="inlineCheckbox1">Yes</label>
        </div>
        <div>
          <input value="false" name='spayed-neutered check' className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" />
          <label className="form-check-label inline-block text-gray-800" htmlFor="inlineCheckbox1">No</label>
        </div>
      </div>
      <label>Vaccination History</label>
      <textarea className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.vaccination_history} onChange={(event) => setFormData({ ...formData, vaccination_history: event.target.value })} />
      <label>Photo URL</label>
      <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.dog_photo} onChange={(event) => setFormData({ ...formData, dog_photo: event.target.value })} />
    </div>

  )
}

export default DogAbout