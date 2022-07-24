import React, { useEffect, useState} from 'react'


const RegisterDog = () => {
    const [breedOptions, setBreedOptions] = useState([]);
    const [formData, setFormData] = useState({
            dog_name: "",
            dog_breed: "",
            dog_age: "",
            dog_gender: "",
            dog_photo: "",
            dog_temperament: "",
            dog_about: "",
            dog_size: "",
            dog_weight: "",
            spayed_neutered: "",
            vaccination_history: "",
        });

    useEffect(() => {
        async function getBreeds(){
        // console.log("hello")
        const breedUrl = 'https://dog.ceo/api/breeds/list/all'
        const response = await fetch(breedUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setBreedOptions({breeds: data});
        }}
        getBreeds();
        }, []);
        
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const data = {...formData}
        // console.log(data)
        const dogUrl = "http://localhost:8001/api/dog/create"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        
        const response = await fetch(dogUrl, fetchConfig)
        if (response.ok) {
            const newDog = await response.json()
            console.log(newDog)
            setFormData({
                dog_name: "",
                dog_breed: "",
                dog_age: "",
                dog_gender: "",
                dog_photo: "",
                dog_temperament: "",
                dog_about: "",
                dog_size: "",
                dog_weight: "",
                spayed_neutered: "",
                vaccination_history: "",
            })
        }
    


    }

return (
    <div className='items-center h-screen w-screen bg-gradient-to-bl bg-[#eeb359] from-[#f5c57c] py-[140px]'>
        <div className='flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl' onSubmit={handleSubmit}>
                {/* <div className='p-8'>
                    <img  className='rounded-lg shadow-xl' src='https://img.freepik.com/free-vector/people-walking-park-with-their-dogs_52683-37181.jpg?w=2000'/>
                </div> */}
                <h2 className='text-3xl text-black uppercase font-semibold text-center'>Register Your Dog</h2>
                <div className='flex flex-col text-gray-900 py-2'>
                  Tell us about your poop machine!
                </div>
                <div className='flex flex-col text-gray-900 py-2'>
                    <label>Name</label>
                    <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.dog_name} onChange={(event) => setFormData({...formData, dog_name: event.target.value})}/>
                    <label>Breed</label>
                    <select  required name="technician" id="technician" className="form-select">
                      <option value="" id="breed_name" >Choose Breed</option>
                      {/* {this.state.breeds.map(breed=> {
                        return (
                          <option key={breed.name} value={breed.name}>{breed.name}</option>
                        )
                      })} */}
                    </select>
                    {/* <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.dog_breed} onChange={(event) => setFormData({...formData, dog_breed: event.target.value})}/> */}
                    <label>Age</label>
                    <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.dog_breed} onChange={(event) => setFormData({...formData, dog_age: event.target.value})}/>
                    <label>Gender</label>
                    <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.dog_breed} onChange={(event) => setFormData({...formData, dog_gender: event.target.value})}/>
                    <label>Photo URL</label>
                    <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" value={formData.dog_breed} onChange={(event) => setFormData({...formData, dog_photo: event.target.value})}/>
                </div>
                
                
                {/* <div className='container flex justify-around  gap-2 mt-4 mb-3 py-2'>
                  <button className='w-full py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white'
                  value='previous'
                  >previous</button>
                  <button className='w-full py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white'
                  value='next'
                  >stuff</button>
                </div> */}
                <div className='flex justify-between item-center'>
                  <button className='w-full py-2 bg-green-500 rounded-xl font-bold uppercase hover:bg-green-400 shadow-sm text-white'>Register</button>
                </div>
            </form>
        </div>
    </div>
)
}




export default RegisterDog