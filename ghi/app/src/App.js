import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Developers from './components/Developers';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Events from './components/Events';
import { AuthProvider } from './auth/Authentication';
import { useToken } from './auth/Authentication';

export default function App() {
  const [token, login, logout, signup, update] = useToken();

  return (
    <>
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="" element={[<Navbar/>,<Hero/>, <About/>, <Developers/>, <Footer/> ]}/>
            <Route path='registration'>
              <Route path="login" element={<Login  login={login} token={token}/>}/>
              <Route path="create" element={<SignUp signup={signup} token={token}/>}/>
            </Route>
            <Route path='event'>
              <Route path='home'element={<Events/>} />
            </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}