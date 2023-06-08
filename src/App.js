//import logo from "./logo.svg";
import "./App.css";
//import React, { useEffect, useState } from "react";
import Posts from "./Components/Posts";
import LoginUser from "./Components/Login";
import SignUp from "./Components/SignUp";
import Profile from "./Components/Profile";
import { useState, useEffect } from "react";
//import ReactDOM from "react-dom";
import { Route, Routes, Link } from "react-router-dom";



//import './bootstrap.css';
//import '.style.css';

const App = () => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const localToken= localStorage.getItem('token');
    if (localToken) 
    {
      setToken(localToken)}
}, []);


  useEffect(() => {
    if (token) 
    {
      getProfiledata();
    fetchMessages()}
}, [token]);

  const getProfiledata = async () => {
    try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-CT-WEB-PT/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        },
    });
    const result = await response.json();
    setData(result.data)
    
    console.log(result);
    return(result)  
    } catch (err) {
        console.error(err);
    }
}


const fetchMessages = async () => {

  try {
    const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-CT-WEB-PT/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    setMessages(result.data.messages);
    return result
  } catch (err) {
    console.error(err);
  }
}
  
  
  return (
    <>
      <header>
     
      <nav class="nav">
      <h1 class="home">Homepage</h1>
      <ul class="na">
        <b class="nav"><Link to="/signup">Sign Up </Link></b> 
        

        <b class="nav"><Link to="/login"> Login </Link></b>

        <b class="nav"><Link to="/posts"> Posts </Link></b>

        <b class="nav"><Link to="/profile"> Profile </Link></b>
      </ul>
      </nav>
      </header>
      
    <Routes>
      <Route
        path="/signup"
        element={
          <SignUp
          setToken={setToken}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          />
        }
        />
      <Route path="/login" element={
          <LoginUser 
          setToken={setToken} 
          />
        } 
        /> 
      <Route path="/profile" element={
            <Profile 
            myToken={token}
            data={data} 
            />
        } 
        />

      <Route path="/posts" element={
        <Posts token={token}
        data={data} />
      }
      />
        
        </Routes>
   </>
     );
};

export default App;
