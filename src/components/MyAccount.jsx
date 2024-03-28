import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import Button from '@mui/material/Button';



function MyAccount() {

  let user = {};
  let profilePic;
  const [users, setUsers] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    fetch('http://localhost:8080/user/index')
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
  } else { profilePic =<div> <img src={user.profilePic} alt="avatar"/> </div>}


  return (
    <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px'}}>
      {profilePic}
      <Button variant="contained" onClick={event =>  window.location.href=`/ProfilePicSelector/${username}`} style={{margin : '5px'}}>
        Edit Profile Picture
      </Button >
      <h1>{user.username}'s<br></br>Profile</h1>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Current Score: {user.score}</p>
      <p>Birthday: {user.birthday}</p>
      <p>Bio: {user.bio}</p>
      <Button variant="contained" onClick={event =>  window.location.href=`/editaccount/${username}`} style={{margin : '5px'}}>
        Edit Profile
      </Button >
      <Button variant="contained" onClick={event =>  window.location.href=`/deleteaccount/${username}`} style={{margin : '5px', backgroundColor: "red"}}>
        Delete Profile
      </Button>
    </div>
  );

}

export default MyAccount;