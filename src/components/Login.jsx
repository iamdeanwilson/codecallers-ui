import {Box, TextField, Stack, Button} from '@mui/material';
import { useAuth } from './AuthProvider';
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Password } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import '../App.css';
/* npm install jwt-decode
  npm install @react-oauth/google@latest
 */
export default function Login(){

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const[usernameError, setUsernameError]=React.useState(false)
  const[passwordError, setPasswordError]=React.useState(false)
  const[usernameHelperText, setUsernameHelperText]=React.useState('')
  const[passwordHelperText, setPasswordHelperText]=React.useState('')
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  
  
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
        e.preventDefault();
        }
    e.preventDefault();
    const input={username, password}
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
      
    }
  }
  function handleCallbackResponse(response) {
    console.log("Token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    setUser(userObject);
    console.log(userObject);
    localStorage.setItem("username", userObject.email);
    localStorage.setItem("profilePic", userObject.picture);
    localStorage.setItem("site", response.credential);
    navigate("/");

    const newUser = {}
  }

  useEffect(() => {
    /* google */
    google.accounts.id.initialize({
      client_id: "1049693025889-kq9cae684vj2sg0o3tdelod6pof2lgo5.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("loginDiv"),
      {theme: "outline", size: "large"}
    );
  }, []);

  


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
        {localStorage.getItem('site') && <h3>You're already logged in, {localStorage.getItem('username')}! </h3>}
        {!localStorage.getItem('site') && <div>
          <h1>Login</h1>
        </div>}
        
        {!localStorage.getItem('site') && <div>
          <TextField id="username" label="Username" variant="outlined" 
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
            error={usernameError}
            helperText= {usernameHelperText}
            required
          />
        </div>}
        
        {!localStorage.getItem('site') && <div>
          <TextField type= "password" id="password" label="Password" variant="outlined" autoComplete="off" 
            value={password}  
            onChange={(event)=>setPassword(event.target.value)}
            error={passwordError}
            helperText= {passwordHelperText}
            required
          />
        </div>}
        
        {!localStorage.getItem('site') && 
        <div>
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>

        </div>
        }

        { Object.keys(user).length === 0 &&
        <div id= "loginDiv">Sign In As Guest With Google</div>
        }  
      </Box>
    );
};