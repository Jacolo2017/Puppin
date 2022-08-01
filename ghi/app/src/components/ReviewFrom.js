import React, { useEffect, useState} from 'react'


const CreateReview = (props) => {
    // const [eventData, setEventData] = useState([]);
    let [gotToken, setGotToken] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState([])
    const [userEvents, setEvents] = useState([])
    const [eventAttendees, setEventAttendees] = useState([])
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
            .then(response => fetch(`http://localhost:8000/api/events/myevents=${response.id}/`)
            .then(response => response.json())
            .then(response => setEvents(response)))
            
        setGotToken(true)
    };


    const loadSelectedEvent = async (event) => {
        event.preventDefault();
        const eventId = event.target.value
        const eventUrl = `http://localhost:8000/api/events/${eventId}`
        let fetchConfig = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }
        let response = await fetch(eventUrl, fetchConfig)
            if (response.ok) {
                const eventInfo = await response.json()
                setSelectedEvent(eventInfo)
            };
        
        const attendeeUrl = `http://localhost:8000/api/events/${eventId}/users`
        fetchConfig = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        };
        response = await fetch(attendeeUrl, fetchConfig)
            if (response.ok) {
                const attendeeInfo = await response.json()
                console.log(attendeeInfo)
                setEventAttendees(attendeeInfo)

            }

    }

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
            },
            credentials: "include"
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
<div className='flex flex-col text-gray-1000 py-2'>
    <div className='flex flex-col justify-center'>  
            <form className='max-w-[600px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl' onSubmit={handleSubmit}>
                <h2 className='text-3xl text-black uppercase font-semibold text-center'>Review My Events</h2>
                <div className='flex flex-col text-gray-900 py-2'>
                    <label>Select Event to Review</label>
                    <select onChange = {event => loadSelectedEvent(event)} id = "dog-select" className="form-select bg-blue-700 hover:bg-slate-700 py-2 px-4 rounded font-bold uppercase hover:bg-blue-300 shadow-sm text-white">
                        <option value="" id="dog_select" >Select Event</option>
                        {userEvents && userEvents.map(userEvent => {
                            return (
                                <option key = {userEvent.event_id} value ={userEvent.event_id} > 
                                    {userEvent.event_name}, {userEvent.event_date_time.slice(0,10)}
                                </option>)})} 
                    </select>
                </div>
                <div className='flex flex-col text-gray-900 py-2'>
                <label>Event Review</label>
                <input  placeholder = "Tell us about the event" className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.review_description} onChange={(event) => setFormData({...formData, review_description: event.target.value})}/>
                <label className='py-3'>Would you meetup with these Dog/Owner pairs again?</label>
                    {eventAttendees && eventAttendees.map(attendee => {
                        return(
                            <div>
                                <div className='grid gap-4 grid-cols-2 grid-row-1'>
                                <label className="form-label inline-block text-gray-800 p-2" htmlFor="flexCheckChecked">{attendee.first_name} with {attendee.dog_name}</label>
                                <img className='rounded-lg shadow-xl max-w-[200px]' src='https://img.freepik.com/free-vector/people-walking-park-with-their-dogs_52683-37181.jpg?w=2000'/>
                                </div>
                                <div className='grid gap-4 grid-cols-2 grid-row-2-flex'>
                                <input label= "yes" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked"/>
                                <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked"/>
                                </div>
                            </div>
                        )
                    })}
                <label>Location Rating</label>
                <input  placeholder = "Tell us about the location" className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.location_rating} onChange={(event) => setFormData({...formData, location_rating: event.target.value})}/>
                </div>
            </form>
    </div>
</div>
)
}

export default CreateReview