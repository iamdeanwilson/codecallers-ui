import React, { useState } from "react";
import {Box, TextField, Stack, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert  } from '@mui/material';

const FORM_ENDPOINT = "https://public.herotofu.com/v1/22c03130-f85a-11ee-bf9d-5f9a26e8739d"; // TODO - update to the correct endpoint

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false)
    const [firstName, setFirstName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [message, setMessage] = React.useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstName === '' || email === '' || message === '') {
            alert("All fields are required!");
            e.preventDefault();
        } else if (message.length < 30) {
            console.log(message.length);
            alert("Message must be 30 characters long or longer!");
            e.preventDefault();
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            alert("Invalid email address!");
            e.preventDefault();
        }

        const data = { firstName, email, message };



        try {


            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Form response was not ok');
            }

            setSubmitted(true);
        } catch (error) {
            // Submit the form manually
            e.target.submit();
        };
    };

    if (submitted) {
        return (
            <>
                <div className="text-2xl">Thank you!</div>
                <div className="text-md">We'll be in touch soon.</div>
            </>
        );
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
            <form
                action={FORM_ENDPOINT}
                onSubmit={handleSubmit}
                method="POST"
            >


                <div>
                    <h2>Contact Us!</h2>
                </div>



                <div style={{margin : '5px'}}>
                    <TextField id="firstName" label="First Name" variant="outlined" 
                        type="text"
                        placeholder="Your name"
                        name="firstName"
                        className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                    
                <div style={{margin : '5px'}}>
                    <TextField id="email" label="Email" variant="outlined" 
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>


                <div style={{margin : '5px'}}>
                    <TextField id="message" label="Message" variant="outlined" 
                        placeholder="Your message"
                        name="message"
                        className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        multiline
                        rows={4}
                        required
                    />
                </div>

                <div className="pt-0 mb-3">
                    <Button 
                        variant="contained"
                        type="submit"
                    >
                        Send a message
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default ContactForm;