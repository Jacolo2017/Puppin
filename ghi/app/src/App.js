import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Developers from './components/Developers';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DogRegister from './components/DogRegister';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Events from './components/Events';
import { useToken } from './auth/Authentication';
import LoggedinNav from './components/LoggedinNav';
import ReviewsGivenSlide from './components/ReviewsSliderComponents/ReviewsByCurrentUser';
import Profile from './components/Profile';
import ReviewsByEvent from './components/ReviewsSliderComponents/ReviewsForEvent';
import CreateEvent from './components/CreateEvent';
import DogUpdate from './components/DogUpdate';
import CreateReview from './components/ReviewFrom';
import React, { useState, useEffect } from 'react';
import PublicProfile from './components/PublicProfile';
import AccountUpdate from './components/AccountUpdate';

import JoinEvent from './components/JoinEvent/JoinEvent';

export default function App() {
  const [ token, login, logout] = useToken();
  let [currentUser, setCurrentUser] = useState()
  



  fetch(`http://localhost:8001/api/currentuser/${token}`)
  .then(response => response.json())
  .then(response => setCurrentUser(response.id))
  
  return (
    <>
    <BrowserRouter>
          <Routes>
            <Route path="" element={[ <Navbar/>,<Hero />, <About/>, <Developers/>, <Footer/> ]}/>
              <Route path="myreviews/submit" element={<CreateReview token={token}/>}/>
            <Route path='registration'>
              <Route path="login" element={<Login  login={login} token={token}/>}/>
              <Route path="create" element={<SignUp token={token}/>}/>
              <Route path="dog" element={<DogRegister token={token}/>}/>
              <Route path="dog/update" element={<DogUpdate token={token}/>}/>
            </Route>
            <Route path='event'>
            <Route path = 'create'element = {<CreateEvent token={token}/>}/>
              <Route path='home'element={[<LoggedinNav logout={logout} token={token}/>, <Events/>, <ReviewsGivenSlide token={token}/>, <ReviewsByEvent/>]} />
            </Route>
            <Route path='profile'>
              <Route path=''element={[<LoggedinNav logout={logout} token={token}/>, <Profile currentUser={currentUser} token={token}/>]} />
              <Route path="update" element={<AccountUpdate token={token}/>}/>         
            </Route>
            <Route path='user/:username' element={[ <PublicProfile/>]} />
            <Route path='join-event/:event' element={[ <JoinEvent token={token}/> ]} />                 
          </Routes>
    </BrowserRouter>
    </>
  )
}