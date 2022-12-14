import React, { useState } from 'react'
import SignUpInfo from './SignUpInfo';
import PersonalInfo from './PersonalInfo';
import AboutInfo from './AboutInfo';
import Other from './Otherinfo';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    account_password: "",
    date_of_birth: "",
    city: "",
    state: "",
    gender: "",
    photo_url: "",
    about: "",
  })
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formData }
    const accountUrl = `${process.env.REACT_APP_PUPPIN_HOST}/api/accounts`
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch(accountUrl, fetchConfig)
    if (response.ok) {
      const newAccount = await response.json()
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        account_password: "",
        date_of_birth: "",
        city: "",
        state: "",
        gender: "",
        photo_url: "",
        about: "",
      })
      navigate("/registration/login");
    }
  }

  const changePage = (e) => {
    e.preventDefault()
    if (e.target.value === 'next') {
      setPage(page + 1);
    } else if (e.target.value === 'previous') {
      setPage(page - 1);
    }
  }

  const [page, setPage] = useState(0);

  const FormTitles = ["Sign Up", "Your Information", "Location", "Tell us a little more about you!"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />
    } else if (page === 2) {
      return <Other formData={formData} setFormData={setFormData} />
    } else {
      return <AboutInfo formData={formData} setFormData={setFormData} />
    }
  };


  return (
    <div className='items-center h-screen w-screen bg-gradient-to-bl bg-[#A9FDAC] from-[#97e19a] py-[140px]'>
      <div className='flex flex-col justify-center'>
        <form className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl' onSubmit={handleSubmit}>
          {/* <div className='p-8'>
                      <img  className='rounded-lg shadow-xl' src='https://img.freepik.com/free-vector/people-walking-park-with-their-dogs_52683-37181.jpg?w=2000'/>
                  </div> */}
          <h2 className='text-3xl text-black uppercase font-semibold text-center'>{FormTitles[page]}</h2>
          <div className='flex flex-col text-gray-900 py-2'>
            {PageDisplay()}
          </div>
          <div className='container flex justify-around  gap-2 mt-4 mb-3 py-2'>
            {(page === 0) ? (<button disabled={page == 0} className='w-full py-2 bg-gray-500 rounded-xl font-bold uppercase hover:bg-gray-400 shadow-sm text-white' value='previous' onClick={changePage} >Previous</button>)
              : (<button className='w-full py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white' value='previous' onClick={changePage} >Previous</button>)}
            {(page === FormTitles.length - 1) ? (<button disabled={page == FormTitles.length - 1} className='w-full py-2 bg-gray-500 rounded-xl font-bold uppercase hover:bg-gray-400 shadow-sm text-white' value='next' onClick={changePage} >Next</button>)
              : (<button className='w-full py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white' value='next' onClick={changePage} >Next</button>)}
          </div>
          <div className='flex justify-between item-center'>
            <button className='w-full py-2 bg-green-500 rounded-xl font-bold uppercase hover:bg-green-400 shadow-sm text-white'>Create</button>
          </div>
          <div className='py-4'>
            <Link className='text-md text-blue-600 hover:to-blue-800 cursor-pointer text-center py-8' to='/registration/login'>Have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;


{/* <button className='w-full py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white'
              value='previous'
              disabled={page == 0}
              onClick={changePage}
            >previous</button>
            <button className='w-full py-2 bg-blue-500 rounded-xl font-bold uppercase hover:bg-blue-300 shadow-sm text-white'
              value='next'
              disabled={page == FormTitles.length - 1}
              onClick={changePage}
            >{page === FormTitles.length - 1 ? "Submit" : "Next"}</button> */}


{/* <div>
      <div>
        <div>
          <h1>{FormTitles[page]}</h1>
        </div>
        <div>{PageDisplay()}</div>
          <div>
            <button
            disabled={page == FormTitles.length - 1}
            onClick={() => {
              setPage((currPage) => currPage + 1)
            }}
            >next</button>
            <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1)
            }}
            >previous</button>
          </div>
      </div>
    </div> */}