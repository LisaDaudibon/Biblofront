import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Home from './pages/home';
import Profile from './pages/profile';
import './App.css';

function App() {


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
          {/* <Route path='/' element={}> /> */}
          {/* <Route path='/' element={}> /> */}
          {/* <Route path='/' element={}> /> */}
        </Routes>
      </BrowserRouter>
    </div>
)}

export default App
