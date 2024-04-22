import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuth } from './AuthProvider';



function MyAccount() {

  let user = {};
  let profilePic;
  const [users, setUsers] = useState([]);
  const { username } = useParams();
  const auth = useAuth();
  const token = localStorage.getItem('site')

  useEffect(() => {
    fetch('http://localhost:8080/user/index', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },})
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  for ( let i = 0; i < users.length; i++ ){
    if(users[i].username === username){
      user = users[i];
    }
  };

  if (user.profilePic === '' | user.profilePic === null ){
    profilePic = <p>No profile pic selected! </p>
  } else { profilePic =<div> <img src={user.profilePic} alt="avatar" width="300" height="300"/> </div>}

  console.log(quiz);

  return (
    <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '35px', borderRadius: '25px'}}>
      <div align="center">
      <h1 class="username"><b>{user.username}'s profile</b></h1><br></br>
        {profilePic}
      </div>
      {username === localStorage.getItem('username') && <Button size="small" variant="contained" onClick={event =>  window.location.href=`/ProfilePicSelector/${username}`} style={{margin : '5px'}}>
        Edit Profile Picture
      </Button >}
      <br></br><br></br>
      <div>
        <p align="left"><b>Name:</b> {user.firstName} {user.lastName}</p>
        <p align="left"><b>Birthday:</b> {user.birthday}</p>
        <p align="left"><b>Bio:</b> {user.bio}</p><br></br>
      </div>
      <div class="c1">
        <p align="left"><b>Stats:</b></p>
        <p align="left">Current Score: {user.score}</p>
      </div>
      <div class="c2">
        <p align="left">Current Quiz Count: {user.quizCount}</p>
      </div>
      <br></br><br></br>
      {username === localStorage.getItem('username') && <Button variant="contained" onClick={event =>  window.location.href=`/editaccount/${username}`} style={{margin : '5px'}}>
        Edit Profile
      </Button >}
      {username === localStorage.getItem('username') && <Button variant="contained" onClick={event =>  window.location.href=`/deleteaccount/${username}`} style={{margin : '5px', backgroundColor: "red"}}>
        Delete Profile
      </Button>}
    </div>
  );

}

export default MyAccount;