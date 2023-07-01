import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState,  useEffect } from 'react';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Home from './pages/home';
import Profile from './pages/profile';
import Books from './pages/Books/books';
import Navbar from './components/navbar/navbar';
import About from './components/contact/contact';
import Footer from './components/footer/footer';
import './App.css';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/users" element={<SignUp />} />
          <Route path="/users/sign_in" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books" element={<Books />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
