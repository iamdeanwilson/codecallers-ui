import React from 'react';
import { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import NavBar from './components/NavBar';

import FetchQuizData from './components/FetchQuizData';
import Login  from './components/Login';
import Logout from './components/Logout';
import AuthProvider from './components/AuthProvider';
import PrivateRoute from "./components/PrivateRoute";
import Users from './components/Users';
import Home from './components/Home';
import CreateAccount from './components/CreateAccount';
import Leaderboard from './components/Leaderboard';
import Contact from './components/Contact';
import Invite from './components/Invite';
import About from './components/About';
import TakeAQuiz from './components/TakeAQuiz';
import MyAccount from './components/MyAccount';
import EditAccount from './components/EditAccount';
import DeleteAccount from './components/DeleteAccount';
import {Fragment} from 'react';


let username;

function App() {

  return (
   
      <div>
      
        
        
        <Fragment>
        <NavBar/>
          <AuthProvider>
            <Routes>
                
              <Route path="/"  element={<Home/>}/>

              <Route element={<PrivateRoute/>}>
                <Route path='/quizzes' element={<TakeAQuiz/>} />
              </Route>

              <Route element={<PrivateRoute/>}>
                <Route path='/quiz' element={<FetchQuizData/>} />
              </Route>

              <Route element={<PrivateRoute/>}>
                <Route path='/leaderboard' element={<Leaderboard/>} />
              </Route>

              
              <Route element={<PrivateRoute/>}>
                <Route path='/contact' element={<Contact/>} />
              </Route>

              <Route element={<PrivateRoute/>}>
                <Route path='/invite' element={<Invite/>} />
              </Route>
                
              <Route element={<PrivateRoute/>}>
                <Route path='/myaccount/:username' element={<MyAccount/>} />
              </Route>

              

              <Route path="/create"  element={<CreateAccount/>}/> 

              <Route path="/logout"  element={<Logout/>}/> 

              <Route path="/login"  element={<Login/>}/>

              <Route element={<PrivateRoute/>}>
                <Route path='/editaccount/:username' element={<EditAccount/>} />
              </Route>

              
              <Route element={<PrivateRoute/>}>
                <Route path='/deleteaccount/:username' element={<DeleteAccount/>} />
              </Route>
            
            </Routes>
          </AuthProvider>
          </Fragment>
        
        
      </div>
      
   
  )
  
}

export default App