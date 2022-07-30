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

import Profile from './components/Profile';





import CreateEvent from './components/CreateEvent';

export default function App() {
  const [ token, login, logout] = useToken();
  if (!{token}) {
    <Navigate to='localhost:3000'/>
  }
  return (
    <>
    <BrowserRouter>
          <Routes>
            <Route path="" element={[ <Navbar/>,<Hero token={token}/>, <About/>, <Developers/>, <Footer/> ]}/>
            <Route path='registration'>
              <Route path="login" element={<Login  login={login} token={token}/>}/>
              <Route path="create" element={<SignUp token={token}/>}/>
            </Route>
            <Route path='event'>

              <Route path='home'element={[<LoggedinNav logout={logout} token={token}/>, <Events/>]} />
            </Route>
            <Route path='profile'>
              <Route path=''element={[<LoggedinNav logout={logout} token={token}/>, <Profile/>]} />

              <Route path = 'create'element = {<CreateEvent token={token}/>}/>
              <Route path='home'element={[<LoggedinNav/>, <Events/>]} />

            </Route>
          </Routes>
    </BrowserRouter>
    </>
  )
}