import React, { useEffect, useState} from 'react'

const DogUpdate = () => {
    const [breedOptions, setBreedOptions] = useState([]);
    const [check, setCheck] = useState(false)
    const [userdogs, setUserDogs] = useState()
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
            vaccination_history: "",
        });

    if (props.token && gotToken == false){
        console.log("yes token")
        fetch(`http://localhost:8001/api/currentuser/${props.token}`)
            .then(response => response.json())
            .then(response => fetch(`http://localhost:8001/api/accounts/${response.id}/dogs`)
            .then(response => response.json())
            .then(response => setUserDogs(response)))
            
        
        setGotToken(true)
    };

    function breedConvert(breed_object) {
            let breedList = []
            for (let breed of Object.keys(breed_object)){
              if(breed_object[breed].length === 0){
                  breedList.push(breed)
              } else {
                for (let type of breed_object[breed]){
                  breedList.push(`${breed}, ${type}`)
                }
              }
            }
            return breedList
    };

    useEffect(() => {
        async function getBreeds(){
        // console.log("hello")
        const breedUrl = 'https://dog.ceo/api/breeds/list/all'
        const response = await fetch(breedUrl);
        if (response.ok) {
            const data = await response.json();
            const breedList = breedConvert(data['message'])
            setBreedOptions(breedList)
        }}
        getBreeds();
        }, []);
        

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const data = {...formData}
        data[spayed_neutered] = check
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
                spayed_neutered: false,
                vaccination_history: "",
            })
        }
    
    }
    
    const toggleCheck = () => {
      console.log("toggled")
      setCheck(!check);
    }


return (
    <div className='items-center h-screen w-screen bg-gradient-to-bl bg-[#eeb359] from-[#f5c57c] py-[140px]'>
        <div className='flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl' onSubmit={handleSubmit}>
                <h2 className='text-3xl text-black uppercase font-semibold text-center'>{FormTitles[page]}</h2>
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
                <div className='flex justify-between item-center'>
                  <button className='w-full py-2 bg-green-500 rounded-xl font-bold uppercase hover:bg-green-400 shadow-sm text-white'>Update</button>
                </div>
            </form>
        </div>
    </div>
)
}

export default DogUpdate;