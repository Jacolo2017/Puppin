export default function PublicProfile(){
    let params = useParams();
    console.log(params);
    
    return (
        <div>{params.username}</div>
    )
}
