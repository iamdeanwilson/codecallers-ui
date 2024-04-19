import * as React from 'react';
import { Box, TextField, Stack, Button } from '@mui/material';

function Contact() {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')

  const handleClick = (event) => {
    event.preventDefault()
    const contact = { firstName, lastName, username, email, message }
    if (firstName === '' || lastName === '' || username === '' || email === '' || message === '') {
      alert("All fields are required!");
      event.preventDefault();
    } else if (message.length < 75) {
      alert("Message must be 75 characters long or longer!");
      event.preventDefault();
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      alert("Invalid email address!");
      event.preventDefault();
    }
    else
      fetch("http://localhost:8080/Contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          alert("Message Received!");
          window.location.href = '/contact';
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          alert("Error occurred while submitting the form. Please try again later.");
        });
  }




  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      style={{ border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px' }}
    >
      <div>
        <h2>Contact Us!</h2>
      </div>

      <div>
        <TextField id="firstName" label="First Name" variant="outlined"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
      </div>
      <div>
        <TextField id="lastName" label="Last Name" variant="outlined"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
      </div>
      <div>
        <TextField id="username" label="Username" variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
      <div>
        <TextField type="email" id="email" label="Email" variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <TextField type="text" id="message" label="Message" variant="outlined"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          multiline
          rows={4}
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

export default Contact;