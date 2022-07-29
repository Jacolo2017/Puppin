import React, { useEffect, useState} from "react";
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'


import "react-datepicker/dist/react-datepicker.css";



export default function CreateEvent(props){
    const [startDate, setStartDate] = useState(new Date());
    let [gotToken, setGotToken] = useState(false)
    let [userdogs, setUserDogs] = useState()
    let [currentUser, setCurrentUser] = useState()
    let [userSelectedDog, setUserSelectedDog] = useState()
    const { control, register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    useEffect(() =>{
      
        
        
        
    }, []
    )

    const onSubmit = async function(data){
        console.log("submit button hit")
        console.log(data)
        const createeventURL = 'http://localhost:8000/api/events/'
        const fetchConfig = {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          }
        }
        const response = await fetch(createeventURL, fetchConfig);
        if (response.ok){
            console.log("response ok")
            reset()
          }
          else{
            console.log("nonononono")
          }

}

  if (props.token && gotToken == false){
    console.log("yes token")
    fetch(`http://localhost:8001/api/currentuser/${props.token}`)
        .then(response => response.json())
        .then(response => fetch(`http://localhost:8001/api/accounts/${response.id}/dogs`)
        .then(response => response.json())
        .then(response => setUserDogs(response)))
        
    
    setGotToken(true)
  }
  

return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
    <div>asdf</div>
    <form>
    <select onChange = {x => setUserSelectedDog(x.target.value)}id = "dog-select" className="form-select">
      {userdogs && userdogs.map(userdog => {
        return (
      <option key = {userdog.id} value ={userdog.dog_id} > 
          {userdog.dog_name} 
      </option>)})} 
      </select>
    </form>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}         
      {/* include validation with required or other standard HTML validation rules */}
      <div>Event Name</div>
      
      <input {...register("event_name", { required: true })} />
      <div>Event Location</div>
      <input {...register("event_location", {required: true})} />
      <div>Event Date/Time</div>
      <Controller
    control={control}
    name='date-input'
    render={({ field }) => (
      <DatePicker
        placeholderText='Select date'
        onChange={(date) => field.onChange(date)}
        dateFormat="MM/dd/yyyy"
        selected={field.value}
      />
   )}
  />
      <div>Event Time</div>
      <Controller
    control={control}
    name='event_time'
    render={({ field }) => (
      <DatePicker
        placeholderText='Select time'
        onChange={(time) => field.onChange(time.getHours)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        selected={field.value}
      />
   )}
  />
      <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />
      </form>
      </>)
}


