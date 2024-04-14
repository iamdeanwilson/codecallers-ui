import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import {Button, TextField} from '@mui/material';

function DeleteAccount() {

  let date;

  let userID;
  const { username } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/user/index')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  for ( let i = 0; i < users.length; i++ ){
    if(users[i].username === username){
      userID = users[i].id;
    }
  };

  const handleDoNotDelete=(event)=>{
    event.preventDefault()
    alert("We're happy you stayed!");
    window.location.href=`/myaccount/${username}`;
    }


  const handleDelete=(event)=>{
    event.preventDefault()
    const user = username
    if (confirm("Are you SURE you want to delete your account?!") == true) {
      fetch(`http://localhost:8080/user/${userID}/delete`, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(user)
      }).then(()=>{
          alert("Account Deleted!")
      }).then(event =>  window.location.href=`/create`) // Redirects back to user's profile
    } else alert("We're happy you stayed!")
  }

  return (
    <div>
      {username != localStorage.getItem('username') && <div>
        <h2>You can only delete your own account!</h2>
      </div>}
      {username === localStorage.getItem('username') && <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px'}}>
        <div>
          <h1>Are you<br></br>REALLY REALLY<br></br>sure you want to delete<br></br>{username}'s<br></br>Account?</h1>
        </div>
        <div>
          <p>This action cannot be undone!</p>
        </div>
        <div>
          <Button variant="contained" onClick={handleDoNotDelete} style={{margin : '5px'}}>
            No, wait! I'm having second thoughts! Get me outta here!
          </Button >
        </div>
        <div>
          <Button variant="contained" onClick={handleDelete} style={{margin : '5px', backgroundColor: "red"}}>
            Yes, I'm sure, delete my account!
          </Button >
        </div>
      </div>}
    </div>
  );

}

export default DeleteAccount;