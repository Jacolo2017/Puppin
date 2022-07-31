import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Developers from './components/Developers';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DogRegister from './components/DogRegister';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Events from './components/Events';
import { useToken } from './auth/Authentication';
import LoggedinNav from './components/LoggedinNav';
import CreateEvent from './components/CreateEvent';
import DogUpdate from './components/DogUpdate';
import CreateReview from './components/ReviewFrom';
export default function App() {
  const [ token, login, logout] = useToken();

  return (
    <>
    <BrowserRouter>
          <Routes>
            <Route path="" element={[ <Navbar/>,<Hero token={token}/>, <About/>, <Developers/>, <Footer/> ]}/>
              <Route path="myreviews/submit" element={<CreateReview token={token}/>}/>
            <Route path='registration'>
              <Route path="login" element={<Login  login={login} token={token}/>}/>
              <Route path="create" element={<SignUp token={token}/>}/>
              <Route path="dog" element={<DogRegister token={token}/>}/>
              <Route path="dog/update" element={<DogUpdate token={token}/>}/>
            </Route>
            <Route path='event'>
              <Route path = 'create'element = {<CreateEvent token={token}/>}/>
              <Route path='home'element={[<LoggedinNav/>, <Events/>]} />
            </Route>
          </Routes>
    </BrowserRouter>
    </>
  )
}