import {Box, TextField, Stack, Button} from '@mui/material';
import { useAuth } from './AuthProvider';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Password } from '@mui/icons-material';
import '../App.css';
  
export default function Login(){

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const[usernameError, setUsernameError]=React.useState(false)
  const[passwordError, setPasswordError]=React.useState(false)
  const[usernameHelperText, setUsernameHelperText]=React.useState('')
  const[passwordHelperText, setPasswordHelperText]=React.useState('')

  useEffect(() => {

    setUsernameError(false)
    setPasswordError(false)
    setUsernameHelperText('')
    setPasswordHelperText('')
  }, [username, password]);

  const auth = useAuth();
  const handleClick = (e) => {
    if (username === ''){
        setUsernameError(true);
        setUsernameHelperText("Username is required!");
        } else if (password  === ''){
        setPasswordError(true);
        setPasswordHelperText("Password is required!");
        event.preventDefault();
        }
    e.preventDefault();
    const input={username, password}
    if (input.username !== "" && input.password !== "") {
      
      auth.loginAction(input);
      return;
      
    }
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
          <h1>Login</h1>
        </div>
        
        <div>
          <TextField id="username" label="Username" variant="outlined" 
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
            error={usernameError}
            helperText= {usernameHelperText}
            required
          />
        </div>
        
        <div>
          <TextField type= "password" id="password" label="Password" variant="outlined" autoComplete="off" 
            value={password}  
            onChange={(event)=>setPassword(event.target.value)}
            error={passwordError}
            helperText= {passwordHelperText}
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
};