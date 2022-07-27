import React from 'react';
import { Navigate } from 'react-router-dom';



class Login extends React.Component{
   
    state = {
        username: '',
        account_password: '',
        error: '',
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]: value})
    };

    handleSubmit = async (e) => {
        e.preventDefault()
        const error = await this.props.login(this.state.username, this.state.account_password);
        this.setState({ error: error })
        console.log(this.state)
        this.setState({
            username: '',
            account_password: '',

        });
    }
    render(){
        if (this.props.token){
           return <Navigate to='/event/home'/>
        }
    

    return (
        <div className='items-center h-screen w-screen bg-gradient-to-bl bg-[#eeb359] from-[#f5c57c] py-[180px] '>
            <div className='flex flex-col justify-center'>
                <form onSubmit={this.handleSubmit} className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl'>
                    <h2 className='text-3xl text-black uppercase font-semibold text-center'>Sign In</h2>
                    <div className='flex flex-col text-gray-900 py-2'>
                        <label>Username</label>
                        <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" onChange={this.handleChange} name='username' id='username'/>
                    </div>
                    <div className='flex flex-col text-gray-900 py-2'>
                        <label>Password</label>
                        <input className='rounded-lg bg-gray-300 hover:bg-gray-400 mt-2 p-2' type="password" onChange={this.handleChange} name='account_password' id='account_password'/>
                    </div>
                    <button className='w-full my-5 py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white'>Login</button>
                    <div>
                        <ul>
                            <a className='text-sm text-blue-600 hover:to-blue-800 cursor-pointer text-center' href='http://localhost:3000/registration/login'>Don't have an account?</a>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    )
}
}

export default Login;
// bg-[#CE6D8B] from-[#9EB7E5]
// import React, { useState} from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import { useToken } from '../auth/Authentication';
// import { useAuthContext } from '../auth/Authentication';




// export default function Login () {
//     const [token_, login, logout] = useState(null);
//     const [user, setUser]  = useState(null);
//     const [username, setUsername] = useState("")
//     const [password, setPassword] =  useState("")
//     const [errors, setErrors] = useState({})
//     const { token } = useAuthContext();


//     const handleSubmit = async(e) => {
//         e.PreventDefault()
//         setErrors(await login(username, password))
//         if (token) {
//             return <Navigate to="/events/home" />;
//         }
//     }
//     return (
//                 <div className='items-center h-screen w-screen bg-gradient-to-bl bg-[#eeb359] from-[#f5c57c] py-[180px] '>
//                     <div className='flex flex-col justify-center'>
//                         <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl'>
//                             {/* <div className='p-8'>
//                                 <img  className='rounded-lg shadow-xl' src='https://img.freepik.com/free-vector/people-walking-park-with-their-dogs_52683-37181.jpg?w=2000'/>
//                             </div> */}
//                             <h2 className='text-3xl text-black uppercase font-semibold text-center'>Sign In</h2>
//                             <div className='flex flex-col text-gray-900 py-2'>
//                                 <label>Username</label>
//                                 <input className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="text" onChange={(e)=> setUsername(e.target.value)} value={username}/>
//                             </div>
//                             <div className='flex flex-col text-gray-900 py-2'>
//                                 <label>Password</label>
//                                 <input className='rounded-lg bg-gray-300 hover:bg-gray-400 mt-2 p-2' type="password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
//                             </div>
//                             <button className='w-full my-5 py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white'>Login</button>
//                             <div>
//                                 <ul>
//                                     <a className='text-sm text-blue-600 hover:to-blue-800 cursor-pointer text-center' href='http://localhost:3000/registration/login'>Don't have an account?</a>
//                                 </ul>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )
// }