import React, { useEffect, useState} from 'react'
import DogAbout from './DogAbout';
import DogBasicInfo from './DogBasicInfo';


const DogRegister = () => {
    const [breedOptions, setBreedOptions] = useState([]);
    const [check, setCheck] = useState(false)
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
          }

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
        console.log("dog create submit")
        const data = {...formData}
        data[spayed_neutered] = check
        // console.log(data)
        console.log(JSON.stringify(data))
        const dogUrl = "http://localhost:8001/api/dog/create"
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
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

    const changePage = (e) => {
      e.preventDefault()
      if (e.target.value === 'next') {
        setPage(page+1);
      } else if (e.target.value === 'previous') {
        setPage(page-1);
      }
    }

  

    const[page, setPage] = useState(0);
  
    const FormTitles = ["Register Your Dog!", "Tell Us What Your Dog is Like"];
    
    const PageDisplay = () => {
      if (page === 0) {
        return <DogBasicInfo formData = {formData} setFormData={setFormData} breedOptions = {breedOptions} setBreedOptions = {setBreedOptions}/>
      } else {
        return <DogAbout formData ={formData} setFormData={setFormData} check = {check} setCheck = {setCheck} toggleCheck = {toggleCheck}/>
      } 
    };


return (
    <div className='items-center h-screen w-screen bg-gradient-to-bl bg-[#eeb359] from-[#f5c57c] py-[140px]'>
        <div className='flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl' onSubmit={handleSubmit}>
                {/* <div className='p-8'>
                    <img  className='rounded-lg shadow-xl' src='https://img.freepik.com/free-photo/group-portrait-adorable-puppies_53876-64778.jpg?t=st=1658714676~exp=1658715276~hmac=b3e0ae6c222531949120b233a58326383236d7ae9f56ac110524a98258bd69bb&w=1380'/>
                </div> */}
                <h2 className='text-3xl text-black uppercase font-semibold text-center'>{FormTitles[page]}</h2>
                <div className='flex flex-col text-gray-900 py-2'>
                  {PageDisplay()}
                </div>
                <div className='container flex justify-around  gap-2 mt-4 mb-3 py-2'>
                    <button className='w-full py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white'
                    value='previous'
                    disabled={page == 0}
                    onClick={changePage}
                    >previous</button>
                    <button className='w-full py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white'
                    value='next'
                    disabled={page == FormTitles.length - 1}
                    onClick = {changePage}
                    >{page === FormTitles.length - 1 ? "": "Next"}</button>
                </div>
                <div className='flex justify-between item-center'>
                  <button className='w-full py-2 bg-green-500 rounded-xl font-bold uppercase hover:bg-green-400 shadow-sm text-white'>Register</button>
                </div>
            </form>
        </div>
    </div>
)
}

export default DogRegister;