import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSetAtom, useAtomValue } from 'jotai';
import { userTokenAtom } from './atoms/userTokenAtom';
import { userIdAtom } from './atoms/userIdAtom';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Home from './pages/home';
import Getmember from './components/getmember/getmember';
import Profile from './pages/profile';
import './App.css';

function App() {
  // const [, setUser] = useAtom(userAtom);

  // useEffect(() => {
  //   const token = localStorage.getItem(token)
  //   const id = localStorage.getItem(id)

  //   if (token) {
  //     setUser({
  //       id: id,
  //       isLoggedIn: true,
  //       token: token,
  //     });
  //   }
  // }, []);

  return (
    <div>
    <BrowserRouter>
      {/* <Navbar /> */}
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/users' element={<SignUp />} />
          <Route path='/users/sign_in' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/member-data' element={<Getmember />} />
          {/* <Route path='/' element={}> /> */}
        </Routes>
      </BrowserRouter>
    </div>
)}

export default App
