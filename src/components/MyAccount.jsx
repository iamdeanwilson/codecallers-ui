import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuth } from './AuthProvider';


function MyAccount() {

  let user = {};
  let profilePic;
  let highScore = [];
  let tempTopic = [];
  const [users, setUsers] = useState([]);
  const [quizData, setQuizData] = useState([])
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

    fetch(`http://localhost:8080/quiz/index`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },})
      .then(response => response.json())
      .then(data => setQuizData(data))
      .catch(error => console.error('Error fetching quiz data:', error));
    }, 
  []);

  for ( let i = 0; i < users.length; i++ ){
    if(users[i].username === username){
      user = users[i];
    }
  };

  let j = 0;
  for (let i = 0; i < quizData.length; i++ ){
    if(quizData[i].userID === user.id){
      highScore[i] = quizData[i].score; 
      tempTopic[j] = quizData[i].topic;
      j++;
    }
  };
  highScore.sort((a, b) => b - a);

  let mode = function(arr) {
    let counts = {};
    for (let i = 0; i < arr.length; i++) {
        counts[arr[i]] = (counts[arr[i]] || 0) + 1
    }
    let max = 0;
    let values = [];
    for (let key in counts) {
        if (counts.hasOwnProperty(key)) {
            if (counts[key] > max) {
                max = counts[key];
                values = [key];
            } else if (counts[key] === max) {
                max = counts[key];
                values.push(key);
            }
        }
    }
    return values;
    }

  if (user.profilePic === '' | user.profilePic === null ){
    profilePic = <p>No profile pic selected! </p>
  } else { profilePic =<div> <img src={user.profilePic} alt="avatar" width="300" height="300"/> </div>}


  return (
    
    <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '35px', borderRadius: '25px'}}>
      <div align="center">
      <h1 className="username"><b>{user.username}'s profile</b></h1><br></br>
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
      <div className="c1">
        <p align="left"><b>Stats:</b></p>
        <p align="left">Current Score: {user.score}</p>
        <p align="left">Most Played Category: {mode(tempTopic)}</p>
      </div>
      <div className="c2">
        <p align="left"> All Time High Score: {highScore[0]} </p>
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


// fetch(`http://localhost:8080/quiz/index`, {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${token}`
//   },})
// .then(response => response.json())
// .then(data => setTopic(data), setScore(data))
// .catch(error => console.error('Error fetching quiz data:', error));
// }, []);

// // users.sort((a, b) => b.score - a.score)
// console.log(topic);
// console.log(score);