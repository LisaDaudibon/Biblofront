import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sign_up from './pages/sign_up';
import Sign_in from './pages/sign_in';
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
          <Route path='/users' element={<Sign_up />} />
          <Route path='/users/sign_in' element={<Sign_in />} />
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/' element={}> /> */}
          {/* <Route path='/' element={}> /> */}
        </Routes>
      </BrowserRouter>
    </div>
)}

export default App
