import React from "react";

const DogBasicInfo = ({formData, setFormData, breedOptions, setBreedOptions} ) => {

  return (
<div className='flex flex-col text-gray-900 py-2'>
      <label>Name</label>
      <input  className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.dog_name} onChange={(event) => setFormData({...formData, dog_name: event.target.value})}/>
      <label>Age</label>
      <input  className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.dog_age} onChange={(event) => setFormData({...formData, dog_age: event.target.value})}/>
      <label>Gender</label>
      <input  className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.dog_gender} onChange={(event) => setFormData({...formData, dog_gender: event.target.value})}/>
      <label>Weight</label>
      <input  className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.size} onChange={(event) => setFormData({...formData, dog_size: event.target.value})}/>
      <label>Size Class</label>
      <select  name="size class" id="size_class" className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' onChange={(event) => setFormData({...formData, dog_breed: event.target.value})}>
        <option value="" id="breed_name" >Size Class</option>
        <option key = "teacup" value="teacup" id="teacup" >Teacup (less than 5 lbs)</option>
        <option key = "toy" value="toy" id="toy" >Toy (5-12 lbs)</option>
        <option key = "small" value="small" id="small" >Small (12-24 lbs)</option>
        <option key = "medium" value="medium" id="medium" >Medium (24-59 lbs)</option>
        <option key = "large" value="large" id="large" >Large (59-99 lbs)</option>
        <option key = "giant" value="giant" id="giant" >Giant (100+ lbs)</option>
      </select>
      <label>Breed</label>
      <select  name="breed" id="breed" className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' onChange={(event) => setFormData({...formData, dog_breed: event.target.value})}>
        <option value="" id="breed_name" >Choose Breed</option>
          {breedOptions.map((breed) => {return (
            <option key = {breed} value = {breed} >{breed}</option>
          );})}
      </select>
  </div>
  )
}

  export default DogBasicInfo