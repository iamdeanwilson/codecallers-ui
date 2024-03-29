import * as React from 'react';
import {Box, TextField, Stack, Button} from '@mui/material';
import { Password } from '@mui/icons-material';


export default function CreateAccount() {
  const[firstName, setFirstName]=React.useState('')
  const[lastName, setLastName]=React.useState('')
  const[username, setUsername]=React.useState('')
  const[email, setEmail]=React.useState('')
  const[password, setPassword]=React.useState('')
  const[verifyPassword, setVerifyPassword]=React.useState('')

  // Function that handles what happens when "Submit" gets clicked
  const handleClick=(event)=>{
    event.preventDefault()
    const user={firstName, lastName, username, email, password}
    if(firstName === '' | lastName === '' | username === '' | email === '' | password  === ''){
      alert("All fields are required!");
      event.preventDefault();
    } else if (verifyPassword !== password){
      alert("Passwords do not match!");
      event.preventDefault();
    } else if (password.length < 8){
      alert("Password must be 8 characters long or longer!");
      event.preventDefault();
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      alert("Invalid email address!");
      event.preventDefault();
    }
    else
    fetch("http://localhost:8080/user/create", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(user)
    }).then(()=>{
        alert(`New Account Created for ${username}!`)
    }).then(event =>  window.location.href=`/myaccount/${username}`) // Redirects to a list of users
    }
  

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px'}}
    >
      <div>
        <h1>Create Account</h1>
      </div>
      <div>
        <TextField id="firstName" label="First Name" variant="outlined" 
          value={firstName}
          onChange={(event)=>setFirstName(event.target.value)} 
          required
        />
      </div>
      <div>
        <TextField id="lastName" label="Last Name" variant="outlined" 
          value={lastName}
          onChange={(event)=>setLastName(event.target.value)} 
          required
        />
      </div>
      <div>
        <TextField id="username" label="Username" variant="outlined" 
          value={username}
          onChange={(event)=>setUsername(event.target.value)}
          required
        />
      </div>
      <div>
        <TextField type="email" id="email" label="Email" variant="outlined" 
          value={email}
          onChange={(event)=>setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <TextField type= "password" id="password" label="Password" variant="outlined" autoComplete="off" 
          value={password}  
          onChange={(event)=>setPassword(event.target.value)}
          required
        />
      </div>
      <div>
        <TextField type= "password" id="verifyPassword" label="Confirm Password" variant="outlined" autoComplete="off"
          value={verifyPassword}  
          onChange={(event)=>setVerifyPassword(event.target.value)}
          required
        />
      </div>
      <div>
        <Button variant="contained" onClick={handleClick}>
          Submit
        </Button>
      </div>
    </Box>
  );
}