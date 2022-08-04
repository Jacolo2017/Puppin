import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const DogUpdate = (props) => {
    const [breedOptions, setBreedOptions] = useState([]);
    let [gotToken, setGotToken] = useState(false)
    const [userDogs, setUserDogs] = useState([])
    const [selectedDog, setSelectedDog] = useState("")
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
        account_id: "",
    });
    let navigate = useNavigate();

    if (props.token && gotToken == false) {
        console.log("yes token")
        fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/currentuser/${props.token}`)
            .then(response => response.json())
            .then(response => fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/${response.id}/dogs`)
                .then(response => response.json())
                .then(response => setUserDogs(response)))

        setGotToken(true)
    };



    function breedConvert(breed_object) {
        let breedList = []
        for (let breed of Object.keys(breed_object)) {
            if (breed_object[breed].length === 0) {
                breedList.push(breed)
            } else {
                for (let type of breed_object[breed]) {
                    breedList.push(`${breed}, ${type}`)
                }
            }
        }
        return breedList
    };

    useEffect(() => {
        async function getBreeds() {
            // console.log("hello")
            const breedUrl = 'https://dog.ceo/api/breeds/list/all'
            const response = await fetch(breedUrl);
            if (response.ok) {
                const data = await response.json();
                const breedList = breedConvert(data['message'])
                setBreedOptions(breedList)
            }
        }
        getBreeds();
    }, []);


    const loadSelectedDogInfo = async (event) => {
        event.preventDefault();
        const dog_Id = event.target.value
        setSelectedDog(event.target.value)
        const dogUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/dog/${dog_Id}`
        const fetchConfig = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }

        const response = await fetch(dogUrl, fetchConfig)
        if (response.ok) {
            const dogInfo = await response.json()
            setFormData(dogInfo)
            setCheck(dogInfo.spayed_neutered)
        }

    }

    const deleteDog = async (event) => {
        event.preventDefault()
        console.log("delete requested")
        const dogId = selectedDog
        const accountId = formData.account_id
        console.log(accountId)
        const dogDeleteUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/${accountId}/dog/${dogId}`
        const fetchConfig = {
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }
        const response = await fetch(dogDeleteUrl, fetchConfig)
        if (response.ok) {
            const dogDeleteConfirm = await response.json()
            console.log(dogDeleteConfirm)
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
                account_id: "",
            })
            navigate("/profile");
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { ...formData }
        delete data[account_id]
        const dogId = selectedDog
        data.spayed_neutered = check
        console.log(JSON.stringify(data))
        const dogUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/dog/${dogId}`
        const fetchConfig = {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
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
                account_id: "",
            })
            navigate("/profile");
        }
    }


    const toggleCheck = () => {
        console.log("toggled")
        setCheck(!check);
    }

    return (
        <div className='items-center h-[1400px] w-screen bg-gradient-to-bl bg-[#eeb359] from-[#f5c57c] py-10'>
            <div className='flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl' onSubmit={handleSubmit}>
                    <h2 className='text-3xl text-black uppercase font-semibold text-center'>Update Dog</h2>
                    <div className='flex flex-col text-gray-900 py-2'>
                        <label>Select Dog</label>
                        <select onChange={event => loadSelectedDogInfo(event)} id="dog-select" className="form-select bg-blue-700 hover:bg-slate-700 py-2 px-4 rounded font-bold uppercase hover:bg-blue-300 shadow-sm text-white">
                            <option value="" id="dog_select" >Select Dog</option>
                            {userDogs && userDogs.map(userDog => {
                                return (
                                    <option key={userDog.id} value={userDog.dog_id} >
                                        {userDog.dog_name}
                                    </option>)
                            })}
                        </select>
                    </div>
                    <div className='flex flex-col text-gray-900 '>
                        <label className='pt-2'>Name</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' placeholder='name' type="text" value={formData.dog_name} onChange={(event) => setFormData({ ...formData, dog_name: event.target.value })} />
                        <label className='pt-2'>Age (Human years please!) </label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' placeholder='age' type="text" value={formData.dog_age} onChange={(event) => setFormData({ ...formData, dog_age: event.target.value })} />
                        <label className='pt-2'>Gender </label>
                        <div hidden='true' className='grid gap-4 grid-cols-3 grid-row-1 py-2 items-center justify-items-left' onChange={(event) => setFormData({ ...formData, dog_gender: event.target.value })}>
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
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' placeholder='Weight' type="text" value={formData.dog_weight} onChange={(event) => setFormData({ ...formData, dog_weight: event.target.value })} />
                        <label className='pt-2'>Size Class</label>
                        <select placeholder='select' name="size class" id="size_class" className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' onChange={(event) => setFormData({ ...formData, dog_size: event.target.value })}>
                            <option value={formData.dog_size} id="breed_name" >{formData.dog_size}</option>
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
                    <div className='flex justify-between item-center'>
                        <button className='w-full py-2 bg-green-500 rounded-xl font-bold uppercase hover:bg-green-400 shadow-sm text-white'>Update</button>
                    </div>
                    <div className='flex justify-between item-center'>
                        <button className='w-full py-2 bg-red-500 rounded-xl font-bold uppercase hover:bg-red-400 shadow-sm text-white' onClick={deleteDog}>Delete</button>
                    </div>
                </form>
            </div >
        </div >
    )
}


export default DogUpdate;