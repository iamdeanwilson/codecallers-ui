import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import FetchQuizData from './components/FetchQuizData';
import Login from './components/Login';
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
import { Fragment } from 'react';
import LightDark from './components/LightDark';
import './Switch.css'
import ProfilePicSelector from './components/ProfilePicSelector';
import ContactForm from './components/ContactForm';
import ThankYou from './components/ThankYou';
import Comments from './components/Comments';

let username;


function App() {

  return (

    <div>

      <Fragment>
        <NavBar />
        <AuthProvider>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />

            <Route element={<PrivateRoute />}>
              <Route path='/quiz' element={<TakeAQuiz />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path='/quiz/:topic/:difficulty' element={<FetchQuizData />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path='/leaderboard' element={<Leaderboard />} />
            </Route>



            <Route element={<PrivateRoute />}>
              <Route path='/Contact' element={<ContactForm />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path='/ThankYou' element={<ThankYou />} />
            </Route>



            <Route element={<PrivateRoute />}>
              <Route path='/invite' element={<Invite />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path='/myaccount/:username' element={<MyAccount />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path='/Comments' element={<Comments />} />
            </Route>



            <Route path="/create" element={<CreateAccount />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Contact" element={<ContactForm />} />
            <Route path='/invite' element={<Invite />} />
            <Route path='/ThankYou' element={<ThankYou />} />
            <Route path="/about" element={<About />} />
            <Route path="/Comments" element={<Comments />} />

            <Route element={<PrivateRoute />}>
              <Route path='/editaccount/:username' element={<EditAccount />} />
            </Route>


            <Route element={<PrivateRoute />}>
              <Route path='/deleteaccount/:username' element={<DeleteAccount />} />
            </Route>

            <Route path="/ProfilePicSelector/:username" element={<ProfilePicSelector />} />

            

          </Routes>
        </AuthProvider>
      </Fragment>


    </div>
  )

}

export default App