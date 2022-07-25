import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Developers from './components/Developers';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Events from './components/Events';


export default function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="" element={[<Navbar/>,<Hero/>, <About/>, <Developers/>, <Footer/> ]}/>
          <Route path='registration'>
            <Route path="login" element={<Login  />}/>
            <Route path="create" element={<SignUp />}/>
          </Route>
          <Route path='event'>
            <Route path='home'element={<Events/>} />
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}