import { useParams } from 'react-router-dom';
import React, { Controller, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker'



export default function JoinEvent(props){
    let params = useParams();
    let [eventData, setEventData] = useState([]);
    let [gotToken, setGotToken] = useState(false)
    let [userdogs, setUserDogs] = useState()
    let [currentUser, setCurrentUser] = useState()
    let [userSelectedDog, setUserSelectedDog] = useState()
    const { control, register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    if (props.token && gotToken == false){
        console.log("yes token")
        fetch(`http://localhost:8001/api/currentuser/${props.token}`)
            .then(response => response.json())
            .then(response => fetch(`http://localhost:8001/api/accounts/${response.id}/dogs`))
            .then(response => response.json())
            .then(response => setUserDogs(response))
        fetch(`http://localhost:8001/api/currentuser/${props.token}`)
            .then(response => response.json())
            .then(response => setCurrentUser(response.id))
            fetch(`http://localhost:8001/api/currentuser/${props.token}`)
            .then(response => response.json())
            .then(response => fetch(`http://localhost:8001/api/accounts/${response.id}/dogs`))
            .then(response => response.json())
            .then(response => setUserSelectedDog(response[0].dog_id))
        
        setGotToken(true)
      }
    useEffect(()=>{
        console.log(params)
        fetch(`http://localhost:8000/api/events/${params.event}`)
        .then(res => res.json())
        .then(res => setEventData(res))
    
    }, [params]
    )

    const onSubmit = async function(data){
        console.log("submit button hit")
        console.log(data)
        const joinEventURL = `http://localhost:8000/api/events/${params.event}/?dog_id=${userSelectedDog}&account_id=${currentUser}`
        const fetchConfig = {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          }
        }
        const response = await fetch(joinEventURL, fetchConfig);
        if (response.ok){
            console.log("response ok")
            reset()
          }
          else{
            console.log("nonononono")
          }

}

    return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
    <div className='items-center h-screen w-screen bg-gradient-to-bl bg-[#00A1E4] from-[#0093d2] py-[140px]'>
    <div className='flex flex-col justify-center'>
    <form method = "get" className = 'max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl' onSubmit={handleSubmit(onSubmit)}>
      <div>What dog are you bringing?</div>
    <select onChange = {x => setUserSelectedDog(x.target.value)}id = "dog-select" className="form-select bg-blue-700 hover:bg-slate-700 py-2 px-4 rounded font-bold  hover:bg-blue-300 shadow-sm text-white ">
      {userdogs && userdogs.map(userdog => {
        return (
      <option key = {userdog.id} value ={userdog.dog_id} > 
          {userdog.dog_name} 
      </option>)})} 
      </select>
  
      {/* {...register("dog_id", { required: true })} */} 
      {/* register your input into the hook by invoking the "register" function */}         
      {/* include validation with required or other standard HTML validation rules */}
      
      <input className="bg-blue-700 hover:bg-slate-700 mt-4 py-2 px-4 rounded font-bold  hover:bg-blue-300 shadow-sm text-white" type="submit" />
      </form></div></div>
      </>)
}