import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ReviewsByAnyUser from './ReviewsSliderComponents/ReviewsByAnyUser';
export default function PublicProfile(){
    let [userData, setUserData] = useState([])
    
    useEffect(()=>{
        fetch(`http://localhost:8001/api/accounts/by_username/${params.username}`)
        .then(response => response.json())
        .then(response => setUserData(response))
    } ,[])
    let params = useParams();

    return (
       <ReviewsByAnyUser userData={userData}/>
    )
}