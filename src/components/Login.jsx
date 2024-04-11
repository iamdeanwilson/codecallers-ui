import React, { useState } from 'react';
import {Box, TextField, Stack, Button} from '@mui/material';

import { useAuth } from './AuthProvider';

import '../App.css';

export default function Login(){
  const[username, setUsername]=React.useState('')
  const[password, setPassword]=React.useState('')


  const auth = useAuth();
  const handleClick = (e) => {
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
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </div>
      </Box>
    );
};