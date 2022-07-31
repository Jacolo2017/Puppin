import React, { useEffect, useState} from 'react'


const CreateReview = (props) => {
    // const [eventData, setEventData] = useState([]);
    let [gotToken, setGotToken] = useState(false)
    const [selectedEvent, setEvent] = useState("")
    const [userEvents, setEvents] = useState([])
    const [formData, setFormData] = useState({
        reviewer_username: "",
        review_event_id: "",
        review_event: "",
        review_description: "",
        attendee_rating: true,
        location_rating: ""
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

    
        useEffect(() => {
        async function getEvents(){
        // console.log("hello")
        const breedUrl = '/api/events/myevents/'
        const response = await fetch(breedUrl);
        if (response.ok) {
            const data = await response.json();
            const breedList = breedConvert(data['message'])
            setEventData(breedList)
        }}
        getEvents();
        }, []);
        

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const data = {...formData}
        // console.log(data)
        const reviewUrl = "/api/event/reviews/create"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
        
        const response = await fetch(reviewUrl, fetchConfig)
        if (response.ok) {
            const newReview = await response.json()
            console.log(newReview )
            setFormData({
                reviewer_username: "",
                review_event_id: "",
                review_event: "",
                review_description: "",
                attendee_rating: true,
                location_rating: ""
            })
        }
    
    }


return (
<div className='flex flex-col text-gray-900 py-2'>
      <label>Event Review</label>
        <select  name="size class" id="size_class" className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' onChange={(event) => setFormData({...formData, dog_breed: event.target.value})}>
            <option value="" id="event" >Choose Event</option>
            <option key = "teacup" value="teacup" id="teacup" >Teacup (less than 5 lbs)</option>
        </select>
      <label>Event Review</label>
      <input  className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.review_description} onChange={(event) => setFormData({...formData, review_description: event.target.value})}/>
      <label>Attendee Review</label>
      {/* List attendees with checkboxes */}
      <label>Location Rating</label>
      <input  className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.review_description} onChange={(event) => setFormData({...formData, review_description: event.target.value})}/>
  </div>
)
}

export default CreateReview