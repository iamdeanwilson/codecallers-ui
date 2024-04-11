import React from 'react';
import { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import NavBar from './components/NavBar';

import FetchQuizData from './components/FetchQuizData';
import Login  from './components/Login';
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

              <Route path="/quizzes" 
                element={
                <PrivateRoute>
                  <TakeAQuiz/>
                </PrivateRoute>
                }
              /> 
              <Route path="/quiz" 
                element={
                <PrivateRoute>
                  <FetchQuizData/>
                </PrivateRoute>
                }
              />

              <Route path="/leaderboard" 
                element={
                <PrivateRoute>
                  <Leaderboard/>
                </PrivateRoute>
                }
              />
                
              <Route path="/contact" 
                element={
                <PrivateRoute>
                  <Contact/>
                </PrivateRoute>
                }
              />
                
              <Route path="/invite" 
                element={
                <PrivateRoute>
                  <Invite/>
                </PrivateRoute>
                }
              />

              <Route path="/myaccount/:username" 
                element={
                <PrivateRoute>
                  <MyAccount/>
                </PrivateRoute>
                }
              />

              <Route path="/create"  element={<CreateAccount/>}/> 

              <Route path="/login"  element={<Login/>}/>

              <Route path="/editaccount/:username" 
                element={
                <PrivateRoute>
                  <EditAccount/>
                </PrivateRoute>
                }
              />
  
              <Route path="/deleteaccount/:username" 
                element={
                <PrivateRoute>
                  <DeleteAccount/>
                </PrivateRoute>
                }
              />
            
            </Routes>
          </AuthProvider>
          </Fragment>
        
        
      </div>
      
   
  )
  
}

export default App