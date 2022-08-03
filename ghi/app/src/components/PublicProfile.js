import React, { useEffect} from 'react';
import { useParams } from 'react-router-dom';

export default function PublicProfile(){
    let params = useParams();
    
    return (
        <div>{params.username}</div>
    )
}