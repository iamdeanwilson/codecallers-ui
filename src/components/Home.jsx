import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

function Home() {

  return (
    <div  style={{  
      backgroundImage: "url(" + "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" + ")",
      height:'100vh',
      width: '100vw',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      position: 'absolute', left:0, right:0, top:0
    }}>
      <div style={{  position: 'absolute', left:'10%', top:'10%' }}>
        <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Garamond Bold"}}>Test your programming knowledge.</h2>
        <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Garamond Bold"}}>Uncover areas for improvement.</h2>
        <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Garamond Bold"}}>See how your programming knowledge stacks up against other programmers.</h2>
        <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Garamond Bold"}}>Start taking quizzes now!</h2>
        <div align="left" >
          {localStorage.getItem('site') && <Button variant="contained" onClick={event =>  window.location.href=`/quizzes`} style={{margin : '5px'}}>
            Take a Quiz!
          </Button >}
          {!localStorage.getItem('site') && <Button variant="contained" onClick={event =>  window.location.href=`/login`} style={{margin : '5px'}}>
            Login
          </Button >}
          {!localStorage.getItem('site') && <Button variant="contained" onClick={event =>  window.location.href=`/create`} style={{margin : '5px'}}>
            Create Account
          </Button >}
        </div>
      </div>
    </div>
  );
}

export default Home;