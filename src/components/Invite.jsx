import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import {Box, TextField, Stack, Button} from '@mui/material';

const Invite = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Our EmailJS service ID, template ID, and Public Key for this form
    const serviceId = 'service_wsohobj';
    const templateId = 'template_1817ib2';
    const publicKey = 'JEEQ6sgoYE9S5a-cS';

    // Object containing dynamic template parameters for this form
    const templateParams = {
      from_name: name,
      recipient: email,
      message: message,
    };

    // Handler that takes the parameters and emailJS data in order to send the email
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        alert(`Email sent successfully!`)
        setName('');
        setEmail('');
        setMessage('');
        window.location.href = "/";
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert(`Error!`)
      });
  }

  return (
    //form that user inputs data into
    <form onSubmit={handleSubmit} className='emailForm'>
      <Box
        sx={{
          '& > :not(style)': { m: 7, width: '40ch' },
        }}
        noValidate
        autoComplete="off"
        style={{border: '5px solid rgba(, 0, 0, 0.96)', padding: '50px', borderRadius: '25px'}}>
          <div>
            <h2>Invite</h2>
          </div>
          <div>
              <TextField id="yourName" label="Name" variant="outlined"
                fullWidth
                type="text"
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required
              />
          </div>
          <div>
              <TextField id="inviteEmail" label="Email" variant="outlined"
                fullWidth
                type="text"
                placeholder="Their Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
          </div>
          <div>
              <TextField
                id="message"
                label="Message"
                multiline
                rows={5}
                
                value={message}
                fullWidth
                onChange={(e)=>setMessage(e.target.value)} 
              />
              
          </div>
          <div>
            <Button 
                type="submit"
                variant="contained">
                  Send Invite
            </Button> 
          </div>
        </Box>
    </form>
  )
}

export default Invite