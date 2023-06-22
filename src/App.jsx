import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from './atoms/userAtom';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Home from './pages/home';
import Profile from './pages/profile';
import Cookies from 'js-cookie';
import './App.css';

function App() {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    if (token) {
      setUser({
        id: id,
        isLoggedIn: true,
        token: token,
      });
    }
  }, []);

  return (
    <div>
    <BrowserRouter>
      {/* <Navbar /> */}
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/users' element={<SignUp />} />
          <Route path='/users/sign_in' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/' element={}> /> */}
          {/* <Route path='/' element={}> /> */}
        </Routes>
      </BrowserRouter>
    </div>
)}

export default App
