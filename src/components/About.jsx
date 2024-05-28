import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

function About() {
  
  return (
    <div  style={{  
      backgroundImage: "url(" + "https://images.unsplash.com/photo-1629905679177-4c4e2623654f?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" + ")",
      height:'100vh',
      width: '100vw',
      backgroundPosition: 'bottom',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      position: 'absolute', left:0, right:0, top:0
    }}>
      <div>
        <div style={{  position: 'absolute', left:'10%', top:'10%' }} >
          <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Helvetica", color:"#1976d2"}}>
            Code Callers was founded when a group of four programming students wanted an easier way to study.
          </h2>
          <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Helvetica", color:"#1976d2"}}>
            They took it upon themselves to build an app that would allow them to test their programming knowledge, and help them 
            discover what areas needed improvement.
          </h2>
          <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Helvetica", color:"#1976d2"}}>
            But that wasn't enough. They wanted to incentivise users to <i>want</i> to take quizzes. The Leaderboard shows how users 
            stack up against each other, creating a competitive dynamic, encouraging users to come back for higher scores.
          </h2>
          <h2 align="left" style={{color: "black", width:"50%", fontFamily:"Helvetica", color:"#1976d2"}}>
            Whether you're a coding student looking for an easy way to practice your coding skills, or you're preparing for an interview
            in the tech world and want to be sure that you're ready for any question they might throw at you, we've got you covered!
          </h2>
          <div align="left" >
          </div>
        </div>
        <div style={{
            position: 'absolute',  right:'25%', top:'10%'
          }}>
          <div>
            <Button variant="contained" onClick={event =>  window.location.href=`/create`} style={{margin : '5px'}}>
              <h2>
                Create Account!
              </h2>
            </Button >
          </div>
          <div>
            <Button variant="contained" onClick={event =>  window.location.href=`/Contact`} style={{margin : '5px'}}>
              <h2>
                Contact Us!
              </h2>
            </Button >
          </div>
          <div>
            <Button variant="contained" onClick={event =>  window.location.href=`/Invite`} style={{margin : '5px'}}>
              <h2>
                Invite a Friend!
              </h2>
            </Button >
          </div>
          <div>
            <Button variant="contained" onClick={event =>  window.location.href=`/quizzes`} style={{margin : '5px'}}>
              <h2>
                Take a Quiz Now!
              </h2>
            </Button >
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;