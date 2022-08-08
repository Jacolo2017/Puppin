import React, { useEffect, useState } from "react";
import { Controller, set, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import {useNavigate} from 'react-router-dom'

import "react-datepicker/dist/react-datepicker.css";

//abcd


export default function CreateEvent(props) {
  let [gotToken, setGotToken] = useState(false)
  let [userdogs, setUserDogs] = useState()
  let [currentUser, setCurrentUser] = useState()
  let [userSelectedDog, setUserSelectedDog] = useState()
  const { control, register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  let navigate = useNavigate();
  useEffect(() => {




  }, []
  )

  const onSubmit = async function (data) {
    
    
    const createeventURL = `${process.env.REACT_APP_PUPPIN_HOST}/api/events/${currentUser}/${userSelectedDog}`
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const response = await fetch(createeventURL, fetchConfig);
    if (response.ok) {
      
      reset()
      navigate("/event/home");
    }
    else {
      
    }

  }

  if (props.token && gotToken == false) {
    
    fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/currentuser/${props.token}`)
      .then(response => response.json())
      .then(response => fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/${response.id}/dogs`))
      .then(response => response.json())
      .then(response => setUserDogs(response))
    fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/currentuser/${props.token}`)
      .then(response => response.json())
      .then(response => setCurrentUser(response.id))
    fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/currentuser/${props.token}`)
      .then(response => response.json())
      .then(response => fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/${response.id}/dogs`))
      .then(response => response.json())
      .then(response => setUserSelectedDog(response[0].dog_id))

    setGotToken(true)
  }


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <div className='items-center h-screen w-screen bg-gradient-to-bl bg-[#00A1E4] from-[#0093d2] py-[140px]'>
        <div className='flex flex-col justify-center'>
          <form method="get" className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl' onSubmit={handleSubmit(onSubmit)}>
            <div>What dog are you bringing?</div>
            <select onChange={x => setUserSelectedDog(x.target.value)} id="dog-select" className="form-select bg-blue-700 hover:bg-slate-700 py-2 px-4 rounded font-bold  hover:bg-blue-300 shadow-sm text-white ">
              {userdogs && userdogs.map(userdog => {
                return (
                  <option key={userdog.id} value={userdog.dog_id} >
                    {userdog.dog_name}
                  </option>)
              })}
            </select>

            {/* {...register("dog_id", { required: true })} */}
            {/* register your input into the hook by invoking the "register" function */}
            {/* include validation with required or other standard HTML validation rules */}
            <div>Event Name</div>

            <input {...register("event_name", { required: true })} className="bg-blue-700 hover:bg-slate-700 py-2 px-4 rounded font-bold hover:bg-blue-300 shadow-sm text-white" />
            <div>Event Location</div>
            <input {...register("event_location", { required: true })} className="bg-blue-700 hover:bg-slate-700 py-2 px-4 rounded font-bold  hover:bg-blue-300 shadow-sm text-white" />
            <div>Event Date/Time</div>
            <Controller
              control={control}
              name='event_date_time'
              render={({ field }) => (
                <DatePicker style={{ width: '33%' }} className="bg-blue-700 hover:bg-slate-700 py-2 px-4 rounded font-bold uppercase hover:bg-blue-300 shadow-sm text-white"
                  placeholderText='Select time'
                  onChange={(date) => field.onChange(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  selected={field.value}
                />
              )}
            />
            <input className="bg-blue-700 hover:bg-slate-700 mt-4 py-2 px-4 rounded font-bold  hover:bg-blue-300 shadow-sm text-white" type="submit" />
          </form></div></div>
    </>)
}

