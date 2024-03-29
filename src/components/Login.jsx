import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

export default function Login(){

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('/user/login', { username, password });
      fetch("http://localhost:8080/user/login", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(user)
    }).then(event =>  window.location.href='/')
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <form onSubmit={handleClick}>
      <input
        className="inputBox"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='button' type="submit">Login</button>
    </form>
    </div>
  );
  };