import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

function Home() {

  return (
    <div  style={{  
      backgroundImage: "url(" + "https://cdn.discordapp.com/attachments/1173418560429756507/1231820191554338919/test22.png?ex=663858f3&is=6625e3f3&hm=78a13d1d1395552a85dea60dd35f2d008548375278507566829106e8769b59c5&" + ")",
      height:'100vh',
      width: '100vw',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      position: 'absolute', left:0, right:0, top:0
    }}>
      <div style={{  position: 'absolute', left:'10%', top:'10%' }}>
        <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Helvetica", color:"#1976d2"}}>Test your programming knowledge.</h2>
        <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Helvetica", color:"#1976d2"}}>Uncover areas for improvement.</h2>
        <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Helvetica", color:"#1976d2"}}>See how your programming knowledge stacks up against other programmers.</h2>
        <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Helvetica", color:"#1976d2"}}>Start taking quizzes now!</h2>
        <div align="left" >
          {localStorage.getItem('site') && <Button variant="contained" onClick={event =>  window.location.href=`/quiz`} style={{margin : '5px'}}>
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