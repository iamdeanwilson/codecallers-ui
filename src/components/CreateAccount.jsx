import React, { useState, useEffect } from "react";
import {Box, TextField, Stack, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert  } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Password } from '@mui/icons-material';



export default function CreateAccount() {
  const[firstName, setFirstName]=React.useState('')
  const[lastName, setLastName]=React.useState('')
  const[username, setUsername]=React.useState('')
  const[email, setEmail]=React.useState('')
  const[password, setPassword]=React.useState('')
  const[verifyPassword, setVerifyPassword]=React.useState('')
  const[firstNameError, setFirstNameError]=React.useState(false)
  const[lastNameError, setLastNameError]=React.useState(false)
  const[usernameError, setUsernameError]=React.useState(false)
  const[emailError, setEmailError]=React.useState(false)
  const[passwordError, setPasswordError]=React.useState(false)
  const[verifyPasswordError, setVerifyPasswordError]=React.useState(false)
  const[firstNameHelperText, setFirstNameHelperText]=React.useState('')
  const[lastNameHelperText, setLastNameHelperText]=React.useState('')
  const[usernameHelperText, setUsernameHelperText]=React.useState('')
  const[emailHelperText, setEmailHelperText]=React.useState('')
  const[passwordHelperText, setPasswordHelperText]=React.useState('')
  const[verifyPasswordHelperText, setVerifyPasswordHelperText]=React.useState('')
  const[open, setOpen] = React.useState(false);
  const[dialogHeader, setDialogHeader] = React.useState('');
  const[dialogBody, setDialogBody] = React.useState('');
  const navigate = useNavigate();

  // Function that handles what happens when "Submit" gets clicked
  const handleClick=(event)=>{
    event.preventDefault()
    const user={firstName, lastName, username, email, password}
    if(firstName === ''){
      setFirstNameError(true);
      setFirstNameHelperText("First name is required!");
      event.preventDefault();
    } else if (lastName === ''){
      setLastNameError(true);
      setLastNameHelperText("Last name is required!");
      event.preventDefault();
    } else if (username === ''){
      setUsernameError(true);
      setUsernameHelperText("Username is required!");
      event.preventDefault();
    } else if (email === ''){
      setEmailError(true);
      setEmailHelperText("Email is required!");
      event.preventDefault();
    } else if (password  === ''){
      setPasswordError(true);
      setPasswordHelperText("Password is required!");
      event.preventDefault();
    } else if (verifyPassword  === ''){
      setVerifyPasswordError(true);
      setVerifyPasswordHelperText("Confirm password is required!");
      event.preventDefault();
    } else if (verifyPassword !== password){
      setVerifyPasswordError(true);
      setVerifyPasswordHelperText("Passwords do not match!");
      event.preventDefault();
    } else if (password.length < 8){
      setPasswordError(true);
      setPasswordHelperText("Password must be 8 characters long or longer!");
      event.preventDefault();
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError(true);
      setEmailHelperText("Invalid email format!");
      event.preventDefault();
    }
    else
    fetch("http://localhost:8080/user/create", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(user)
    }).then((response)=>{
      console.log(response);
      return response.json();
    }).then(function(data) {
      console.log(data);
      if (data.message.includes("Error")){
        setOpen(true);
        setDialogHeader("Uh oh!");
        setDialogBody(data.message);
      } else {
        setOpen(true);
        setDialogHeader("Thank You!");
        setDialogBody(data.message);
      } 
     })
    }
  
    useEffect(() => {
      setFirstNameError(false)
      setLastNameError(false)
      setUsernameError(false)
      setEmailError(false)
      setPasswordError(false)
      setVerifyPasswordError(false)
      setFirstNameHelperText('')
      setLastNameHelperText('')
      setUsernameHelperText('')
      setEmailHelperText('')
      setPasswordHelperText('')
      setVerifyPasswordHelperText('')
    }, [firstName, lastName, username, email, password, verifyPassword]);

    const handleClose = () => {
      setOpen(false);
    };

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
      {localStorage.getItem('site') &&  <div>
        <h3>You're already logged in, {localStorage.getItem('username')}! </h3>
      </div>}
      {!localStorage.getItem('site') &&  <div>
        <div>
          <h1>Create Account</h1>
        </div>
        <div style={{margin : '5px'}}>
          <TextField id="firstName" label="First Name" variant="outlined" 
            error={firstNameError}
            helperText= {firstNameHelperText}
            value={firstName}
            onChange={(event)=>setFirstName(event.target.value)} 
            required
          />
        </div>
        <div style={{margin : '5px'}}>
          <TextField id="lastName" label="Last Name" variant="outlined" 
            error={lastNameError}
            helperText= {lastNameHelperText}
            value={lastName}
            onChange={(event)=>setLastName(event.target.value)} 
            required
          />
        </div>
        <div style={{margin : '5px'}}>
          <TextField id="username" label="Username" variant="outlined" 
            error={usernameError}
            helperText= {usernameHelperText}
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
            required
          />
        </div>
        <div style={{margin : '5px'}}>
          <TextField type="email" id="email" label="Email" variant="outlined" 
            error={emailError}
            helperText= {emailHelperText}
            value={email}
            onChange={(event)=>setEmail(event.target.value)}
            required
          />
        </div>
        <div style={{margin : '5px'}}>
          <TextField type= "password" id="password" label="Password" variant="outlined" autoComplete="off" 
            error={passwordError}
            helperText= {passwordHelperText}
            value={password}  
            onChange={(event)=>setPassword(event.target.value)}
            required
          />
        </div>
        <div style={{margin : '5px'}}>
          <TextField type= "password" id="verifyPassword" label="Confirm Password" variant="outlined" autoComplete="off"
            error={verifyPasswordError}
            helperText= {verifyPasswordHelperText}
            value={verifyPassword}  
            onChange={(event)=>setVerifyPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <Button variant="contained" onClick={handleClick} style={{margin : '5px'}}>
            Submit
          </Button>
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {dialogHeader}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialogBody}
              </DialogContentText>
            </DialogContent>
            {dialogHeader === "Uh oh!" && <DialogActions>
              <Button onClick={handleClose} variant="contained">Ok</Button>
            </DialogActions>}
            {dialogHeader === "Thank you!" && <DialogActions>
              <Button onClick={event => window.location.href = '/login'} variant="contained">Go to Login</Button>
            </DialogActions>}
          </Dialog>
      </div>}
    </Box>
  );
}