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
import CreateReview from './components/ReviewForm';
import React, { useState, useEffect } from 'react';
import PublicProfile from './components/PublicProfile';
import AccountUpdate from './components/AccountUpdate';

import JoinEvent from './components/JoinEvent/JoinEvent';

export default function App() {
  const [token, login, logout] = useToken();
  let [currentUser, setCurrentUser] = useState()




  fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/currentuser/${token}`)
    .then(response => response.json())
    .then(response => setCurrentUser(response.id))

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={[<Navbar />, <Hero />, <About />, <Developers />, <Footer />]} />
          <Route path='registration'>
            <Route path="login" element={<Login login={login} token={token} />} />
            <Route path="create" element={<SignUp token={token} />} />
            <Route path="dog" element={<DogRegister token={token} />} />
            <Route path="dog/update" element={<DogUpdate token={token} />} />
          </Route>
          <Route path='event'>
            <Route path='create' element={<CreateEvent token={token} />} />
            <Route path='home' element={[<LoggedinNav logout={logout} token={token} />, <Events token={token} />, <ReviewsGivenSlide token={token} />]} />
          </Route>
          <Route path='profile'>
            <Route path='' element={[<LoggedinNav logout={logout} token={token} />, <Profile currentUser={currentUser} token={token} />]} />
            <Route path="update" element={<AccountUpdate token={token} />} />
          </Route>
          <Route path='reviews'>
            <Route path="submit" element={<CreateReview token={token} />} />
          </Route>
          <Route path='user/:username' element={[<PublicProfile token={token} />]} />
          <Route path='join-event/:event' element={[<JoinEvent token={token} />]} />
        </Routes>
      </BrowserRouter>
    </>
  )
}