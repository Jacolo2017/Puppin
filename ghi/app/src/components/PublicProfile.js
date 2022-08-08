import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewsByAnyUser from './ReviewsSliderComponents/ReviewsByAnyUser';
import { Link, Navigate } from 'react-router-dom';
import ProfileAbout from './profile page components/ProfileAbout'
import PublicProfileDogs from './profile page components/PublicProfileDogs'
import PublicProfileEvents from './profile page components/PublicProfileEvents'


export default function PublicProfile(props) {
    let [userData, setUserData] = useState([])
    let [userDogData, setuserDogData] = useState();
    let [eventsData, setEventsData] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/by_username/${params.username}`)
            .then(response => response.json())
            .then(response => setUserData(response))
        fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/by_username/${params.username}`)
            .then(response => response.json())
            .then(response => fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/${response.account_id}/dogs`))
            .then(res1 => res1.json())
            .then(res1 => setuserDogData(res1));
        fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/by_username/${params.username}`)
            .then(response3 => response3.json())
            .then(response3 => fetch(`${process.env.REACT_APP_PUPPIN_HOST}/api/accounts/${response3.account_id}/events`))
            .then(response2 => response2.json())
            .then(response2 => setEventsData(response2))
    }, [])


    const [page, setPage] = useState(0);
    const pageTitles = ["Reviews", "Events", "Dogs", "About"]
    let params = useParams();




    const PageDisplay = () => {
        if (page === 0) {
            return <ReviewsByAnyUser userData={userData} />
        } else if (page === 1) {
            return <PublicProfileEvents userData={userData} eventsData={eventsData} />
        } else if (page === 2) {
            return <PublicProfileDogs userDogData={userDogData} />
        } else {
            return <ProfileAbout userData={userData} />
        }
    };
    function pageChange(index) {

        const changePage = (e) => {
            e.preventDefault()

        }
        setPage(index)
    }



    return (
        props.token ?
            <div className='px-44 bg-gray-50'>
                <div className='relative h-96 rounded-b flex justify-center'>
                    <img className='object-cover w-full h-full rounded-b shadow-sm' src='https://img.freepik.com/premium-vector/seamless-pattern-with-black-white-doodle-dogs_102034-127.jpg?w=1060' />
                    <div className='absolute -bottom-6 '>
                        <img className='object-cover w-40 h-40 rounded-full border-4 border-gray-300 shadow-md' src={userData ? userData.photo_url : 'https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg'} />
                    </div>

                </div>
                <div className='flex justify-center items-center'>
                    <div className='text-center mt-12 text-3xl text-fBlack font-bold'>{userData ? userData.username : ''}</div>

                </div>
                <div className='border border-gray-800 mt-6 border-opacity-30' />
                <div className='flex justify-center px-8'>
                    <div className='flex gap-3'>
                        {pageTitles.map((pages, index) =>
                            <div
                                onClick={() => { pageChange(index); }}
                                className='px-4 py-5 text-blue-800 hover:bg-gray-300 '>
                                {pages}
                            </div>
                        )}
                    </div>
                </div>
                <div className='py-4'>
                    <PageDisplay />
                </div>

            </div> : <Navigate to='/user/:username' />
    )
}
{/* <ReviewsByAnyUser userData={userData} /> */ }

