import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

// need to run the following commands for dates to work:
// npm install @mui/x-date-pickers
// npm install dayjs
// npm install @mui/lab

function EditAccount() {

  let date;

  let userID;
  let profilePic;
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const[firstName, setFirstName]=React.useState('')
  const[lastName, setLastName]=React.useState('')
  const[birthday, setBirthday]=React.useState('')
  const[bio, setBio]=React.useState('')

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

  const handleClick=(event)=>{
    event.preventDefault()
    const user={firstName, lastName, birthday, bio}
    fetch(`http://localhost:8080/user/${userID}/update`, {
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(user)
    }).then(()=>{
        alert("Account Updated!")
    }).then(event =>  window.location.href=`/myaccount/${username}`) // Redirects back to user's profile
    }

  return (
    <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px'}}>
      <div>
        <h1>Edit<br></br>{username}'s<br></br>Account</h1>
      </div>
      <div>
        <TextField id="firstName" label="First Name" variant="outlined" style={{margin : '5px'}}
          value={firstName}
          onChange={(event)=>setFirstName(event.target.value)}
        />
      </div>
      <div>
        <TextField id="lastName" label="Last Name" variant="outlined" style={{margin : '5px'}}
          value={lastName}
          onChange={(event)=>setLastName(event.target.value)}
        />
      </div>
      <div style={{margin : '5px'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DatePicker label="Birthday"  
          value={date}
          onChange={date => setBirthday(date.format('MMM DD YYYY').toString())}
          />
        </LocalizationProvider>
      </div>
      <div>
        <TextField id="bio" label="Bio" variant="outlined" multiline rows={4} style={{margin : '5px'}}
          value={bio}
          onChange={(event)=>setBio(event.target.value)}
        />
      </div>
      <div>
        <Button variant="contained" onClick={handleClick} style={{margin : '5px'}}>
          Submit
        </Button >
      </div>
    </div>
  );

}

export default EditAccount;