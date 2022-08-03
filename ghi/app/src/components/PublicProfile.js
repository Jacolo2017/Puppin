import React, { useEffect} from 'react';
import { useParams } from 'react-router-dom';

export default function PublicProfile(){
    let params = useParams();
    console.log(params);
    
    return (
        <div>{params.username}</div>
    )
}