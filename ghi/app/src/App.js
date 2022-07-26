import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Developers from './components/Developers';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DogRegister from './components/DogRegister';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useToken  } from './auth/Authentication';
import Events from './components/Events';


export default function App() {
  const [token, login, logout, signup] = useToken();

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="" element={[<Navbar/>,<Hero/>, <About/>, <Developers/>, <Footer/> ]}/>
          <Route path='registration'>
            <Route path="login" element={<Login token={token} login={login} />}/>
            <Route path="create" element={<SignUp token={token} signup={signup} />}/>
          </Route>
          <Route path='event'>
            <Route path='home'element={<Events/>} />
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}