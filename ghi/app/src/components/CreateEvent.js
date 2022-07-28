import React, { useEffect, useState} from "react";
import { useForm } from "react-hook-form";


export default function CreateEvent(){

    let [userdogs, setUserDogs] = useState()
    let [userSelectedDog, setUserSelectedDog] = useState()
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    useEffect(() =>{
        fetch(`http://localhost:8001/api/accounts/1/dogs`)
        .then(response => response.json())
        .then(response => setUserDogs(response))
        .catch(e => console.error(e));
        console.log(userdogs)
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
      <div>Event Date</div>
      <input {...register("event_date", {required: true})} />
      <div>Event Time</div>
      <input {...register("event_time", {required: true})} />
      <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />
      </form>
      </>)
}