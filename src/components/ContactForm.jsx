import React, { useState } from "react";
import { Box, TextField, Stack, Button } from '@mui/material';

const FORM_ENDPOINT = "https://public.herotofu.com/v1/22c03130-f85a-11ee-bf9d-5f9a26e8739d"; // TODO - update to the correct endpoint

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();

        const inputs = e.target.elements;
        const data = {};

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].name) {
                data[inputs[i].name] = inputs[i].value;
            }
        }

        fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Form response was not ok');
                }

                setSubmitted(true);
            })
            .catch((err) => {
                // Submit the form manually
                e.target.submit();
            });
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



                <div className="pt-0 mb-3">
                    <input
                        type="text"
                        placeholder="Your name"
                        name="name"
                        className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                        required
                    />
                </div>
                <div className="pt-0 mb-3" >
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                        required
                    />
                </div>
                <div className="pt-0 mb-3">
                    <textarea
                        placeholder="Your message"
                        name="message"
                        className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                        required
                    />
                </div>
                <div className="pt-0 mb-3">
                    <button
                        className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
                        type="submit"
                    >
                        Send a message
                    </button>
                </div>
            </form>
        </Box>
    );
};

export default ContactForm;