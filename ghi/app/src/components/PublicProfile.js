import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewsByAnyUser from './ReviewsSliderComponents/ReviewsByAnyUser';
import { Link } from 'react-router-dom';


export default function PublicProfile() {
    let [userData, setUserData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8001/api/accounts/by_username/${params.username}`)
            .then(response => response.json())
            .then(response => setUserData(response))
    }, [])

    const [page, setPage] = useState(0);
    const pageTitles = ["Reviews", "Events", "Dogs", "About"]
    let params = useParams();

    console.log(userData)



    const PageDisplay = () => {
        if (page === 0) {
        //   return <ReviewsByAnyUser userData={userData} />
        }
      };



    return (
        <div className='px-44 bg-gray-50'>
            <div className='relative h-96 rounded-b flex justify-center'>
                <img className='object-cover w-full h-full rounded-b shadow-sm' src='https://snappygoat.com/o/ddb9495535cdadf967535da29c8e058f2935a972/Paw-Prints-Background.jpg' />
                <div className='absolute -bottom-6 '>
                    <img className='object-cover w-40 h-40 rounded-full border-4 border-gray-300 shadow-md' src='' />
                </div>

            </div>
            <div className='flex justify-center items-center'>
                <div className='text-center mt-12 text-3xl text-fBlack font-bold'></div>
                <Link to='/profile/update' className='flex px-6 bg-green-400 rounded-xl font-bold uppercase w-30 text-center mt-12 ml-6 hover:bg-green-500'>Edit</Link>
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

        </div>
    )
}
{/* <ReviewsByAnyUser userData={userData} /> */ }

