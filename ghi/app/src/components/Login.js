import React from 'react';
import { Link, Navigate } from 'react-router-dom';



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
                        <Link className='text-sm text-blue-600 hover:to-blue-800 cursor-pointer text-center' to='/registration/create' onClick={this.props.login}>Don't have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
}

export default Login;
