import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'


const CreateReview = (props) => {
    // const [eventData, setEventData] = useState([]);
    let [gotToken, setGotToken] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState([])
    const [userEvents, setSelectionMenu] = useState([])
    const [userInfo, setUserInfo] = useState()
    const [eventAttendees, setEventAttendees] = useState([])
    const [existingReviews, setExistingReviews] = useState()
    const [enableForm, setEnableForm] = useState()
    const { register, handleSubmit } = useForm();

    // checking conditions and calling loadUserToken
    if (props.token && gotToken == false) {
        loadUserToken()
    }


    // loads userInfo (id, username, account_password (hashed) based on token)    
    async function loadUserToken() {
        if (props.token && gotToken == false) {
            await fetch(`http://localhost:8001/api/currentuser/${props.token}`)
                .then(response => response.json())
                .then(response => setUserInfo(response));
            setGotToken(true);
        }
    }
    // calls load existing reviews by user after the userInfo is loaded and if there is no existingReviews loaded
    useEffect(() => {
        if (userInfo && existingReviews == undefined) {
            loadExistingReviews()
        }
    }, [userInfo])

    // querries API and pulls in reviews already submitted by the user and turns data into a list of event IDs reviewed by user
    const loadExistingReviews = async () => {
        const url = `http://localhost:8000/api/event/reviews/account=${userInfo.id}`
        let fetchConfig = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }
        let response = await fetch(url, fetchConfig)
        if (response.ok) {
            const data = await response.json()

            let existing = []
            for (let i of data) {
                existing.push(i['event_id'])
            }
            console.log("existing reviews: ", existing)
            setExistingReviews(existing)
        }
    }

    // Calls the function to load the event selection menu, checks is existingReviews has loaded
    useEffect(() => {
        if (existingReviews) {
            loadEventSelectionMenu()
        }
    }, [existingReviews])

    // makes API call to get all events user is registered to and filters the events that have already been reviewed
    const loadEventSelectionMenu = async () => {
        const response = await fetch(`http://localhost:8000/api/events/myevents=${userInfo.id}/`)
        if (response.ok) {
            const registeredEvents = await response.json()
            const events = registeredEvents.filter(event => (!existingReviews.includes(event['event_id'])))
            setSelectionMenu(events)
        }
    }

    // loads user selected event from the drop down table and pulls in the event details and loads the attendees at the event.
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
            setSelectedEvent(eventInfo);
            // check to see if selected event is an hour or more after the event time therefore the form can be submitted
            const date = Date.parse(eventInfo.event_date_time)
            console.log(Date.now() + 360000)
            console.log(date)
            if (Date.now() + 360000 > date) {
                console.log("event completed")
                setEnableForm(true)
            } else {
                setEnableForm(false)
            }
        };

        const attendeeUrl = `http://localhost:8000/api/events/${eventId}/usersdogs`
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
            setEventAttendees(attendeeInfo)
        }
    }

    useEffect(() => {
    }, [enableForm])



    const onSubmit = async (reviewData) => {
        // filtering out the attendee ratings from the form data
        let ratings = {}
        for (let i in reviewData) {
            console.log(i)
            if (!isNaN(i) && ratings[i] === undefined) {
                ratings[i] = reviewData[i]
                delete reviewData[i]
            }
        }
        console.log(ratings)
        // // submitting review data
        reviewData["review_event"] = selectedEvent.event_name
        reviewData["reviewer_username"] = userInfo.username
        console.log("submitted data body: ", JSON.stringify(reviewData))
        const reviewUrl = `http://localhost:8000/api/event/${selectedEvent.event_id}/reviews/create?account_id=${userInfo.id}`
        const reviewFetchConfig = {
            method: 'post',
            body: JSON.stringify(reviewData),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }
        const response = await fetch(reviewUrl, reviewFetchConfig)
        if (response.ok) {
            const newReview = await response.json()
            console.log(newReview)
        }
        // submitting all attendee rating data for each attendee
        const reviewer = userInfo.id
        const eventId = selectedEvent.event_id
        const attendeeFetchConfig = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }
        for (let i in ratings) {
            let attendeeRatingUrl = `http://localhost:8000/api/event/${eventId}/reviews/${i}/${reviewer}?rating=${ratings[i]}`
            const response = await fetch(attendeeRatingUrl, attendeeFetchConfig)
            if (response.ok) {
                const newReview = await response.json()
                console.log(newReview)
            }
        }
    }



    return (
        <div className='flex flex-col text-gray-1000 py-2'>
            <div className='flex flex-col justify-center'>
                <form className='max-w-[600px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl'>
                    <h2 className='text-3xl text-black uppercase font-semibold text-center'>Review My Events</h2>
                    <div className='flex flex-col text-gray-900 py-2'>
                        <label>Select Event to Review</label>
                        <select onChange={event => loadSelectedEvent(event)} id="dog-select" className="form-select bg-blue-700 hover:bg-slate-700 py-2 px-4 rounded font-bold uppercase hover:bg-blue-300 shadow-sm text-white">
                            <option value="" id="dog_select" >Select Event</option>
                            {userEvents && userEvents.map(userEvent => {
                                return (
                                    <option key={userEvent.event_id} value={userEvent.event_id} >
                                        {userEvent.event_name}, {userEvent.event_date_time.slice(0, 10)}
                                    </option>)
                            })}
                        </select>
                    </div>
                </form>

                <form className='max-w-[600px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl' onSubmit={handleSubmit(onSubmit)}>
                    {(enableForm !== undefined && !enableForm) ? (
                        <div>
                            <p className='text-med text-red-600 font-semibold justify-center'>Dayum, I know you're not trying to review an event that hasn't happened yet &#x1F440;</p>
                        </div>) : (<div></div>)
                    }
                    <fieldset disabled={!enableForm}>
                        <div className='flex flex-col text-gray-900 py-2'>
                            <label>Event Review</label>
                            <input {...register("review_description")} placeholder="Tell us about the event" id='the id' className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" />
                            <label className='py-3'>Would you meetup with these Dog/Owner pairs again?</label>
                            {eventAttendees && eventAttendees.map(attendee => {
                                if (attendee.account_id != userInfo.id) {
                                    return (
                                        <div className='grid gap-4 grid-cols-2 grid-row-1 border-b-4 border-blue-600 py-2 items-center justify-items-center'>
                                            <div>
                                                <img className='rounded-lg shadow-xl max-w-[200px]' key={`${attendee.account_id}, image`} src='https://img.freepik.com/free-vector/people-walking-park-with-their-dogs_52683-37181.jpg?w=2000' />
                                                <label className="form-label inline-block text-gray-800 p-2" key={`${attendee.account_id}, name`} htmlFor="flexCheckChecked">{attendee.first_name} with {attendee.dog_name}</label>
                                            </div>
                                            <div>
                                                <div className="form-check form-check-inline px-5">
                                                    <input {...register(attendee.account_id.toString())} value="true" key={`${attendee.account_id}, true`} className="form-check-input appearance-none h-8 w-8 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" />
                                                    <label className="form-check-label inline-block text-xl py-1.5 font-semibold text-gray-800" key={`${attendee.account_id}, true label`} htmlFor="inlineCheckbox1">YES</label>
                                                </div>
                                                <div className="form-check form-check px-5">
                                                    <input {...register(attendee.account_id.toString())} value='false' key={`${attendee.account_id}, false`} className="form-check-input appearance-none h-8 w-8 border border-gray-300 rounded-sm bg-white checked:bg-red-600 checked:bg-red-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" />
                                                    <label className="form-check-label font-semibold inline-block text-xl py-1.5 text-gray-800" key={`${attendee.account_id}, false label`} htmlFor="inlineCheckbox1">NO</label>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                            <label className='py-2'>Location Rating</label>
                            <input {...register('location_rating')} placeholder="Tell us about the location" className='rounded-lg bg-gray-300 mt-2 p-2  hover:bg-gray-400' type="textarea" />
                        </div>
                        <div className='flex justify-between item-center'>
                            {(!enableForm) ? (
                                <button className='w-full py-2 bg-gray-500 rounded-xl font-bold uppercase shadow-sm text-white'>Submit</button>
                            ) : (<button className='w-full py-2 bg-green-500 rounded-xl font-bold uppercase hover:bg-green-500 shadow-sm text-white'>Submit</button>)
                            }
                        </div>
                    </fieldset>

                </form>
            </div>
        </div>
    )
}

export default CreateReview;