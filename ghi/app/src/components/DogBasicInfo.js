import React from "react";

const DogBasicInfo = ({ formData, setFormData, breedOptions, setBreedOptions }) => {

  return (
    <div className='flex flex-col text-gray-900 '>
      <label className='pt-2'>Name</label>
      <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' placeholder='name' type="text" value={formData.dog_name} onChange={(event) => setFormData({ ...formData, dog_name: event.target.value })} />
      <label className='pt-2'>Age (Human years please!) </label>
      <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' placeholder='age' type="text" value={formData.dog_age} onChange={(event) => setFormData({ ...formData, dog_age: event.target.value })} />
      <label className='pt-2'>Gender </label>
      <div className='grid gap-4 grid-cols-3 grid-row-1 py-2 items-center justify-items-left' onChange={(event) => setFormData({ ...formData, dog_gender: event.target.value })}>
        <div>
          <input value="male" name='gender button' className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-blue-500 first-line:focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" />
          <label className="form-check-label inline-block text-gray-800" htmlFor="inlineCheckbox1">Male</label>
        </div>
        <div>
          <input value="female" name='gender button' className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" />
          <label className="form-check-label inline-block text-gray-800" htmlFor="inlineCheckbox1">Female</label>
        </div>
      </div>
      {/* <label className='pt-2'>Gender</label>
      <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' placeholder='gen' type="text" value={formData.dog_gender} onChange={(event) => setFormData({ ...formData, dog_gender: event.target.value })} /> */}
      <label className='pt-2'>Weight (lbs)</label>
      <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' placeholder='Weight' type="text" value={formData.size} onChange={(event) => setFormData({ ...formData, dog_weight: event.target.value })} />
      <label className='pt-2'>Size Class</label>
      <select placeholder='select' name="size class" id="size_class" className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' onChange={(event) => setFormData({ ...formData, dog_size: event.target.value })}>
        <option className='text-gray-500' value="" id="breed_name" >Select size class</option>
        <option key="teacup" value="teacup" id="teacup" >Teacup (less than 5 lbs)</option>
        <option key="toy" value="toy" id="toy" >Toy (5-12 lbs)</option>
        <option key="small" value="small" id="small" >Small (12-24 lbs)</option>
        <option key="medium" value="medium" id="medium" >Medium (24-59 lbs)</option>
        <option key="large" value="large" id="large" >Large (59-99 lbs)</option>
        <option key="giant" value="giant" id="giant" >Giant (100+ lbs)</option>
      </select>
      <label className='pt-2'>Breed</label>
      <select name="breed" id="breed" className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' onChange={(event) => setFormData({ ...formData, dog_breed: event.target.value })}>
        <option value="" id="breed_name" >Choose Breed</option>
        {breedOptions.map((breed) => {
          return (
            <option key={breed} value={breed} >{breed}</option>
          );
        })}
      </select>
    </div>
  )
}

export default DogBasicInfo