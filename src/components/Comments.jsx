import React, { useEffect, useState, Component } from 'react';
import {Box, TextField, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';


const token = localStorage.getItem('site');
const username = localStorage.getItem('username');

export default function Comments() {

    const [comments, setComments] = useState([]);
    const userID = localStorage.getItem('userID');
    const username = localStorage.getItem('username');
    const[comment, setComment]=React.useState('')
    const date = new Date();

    useEffect(() => {
        fetch(`http://localhost:8080/comments/index`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },})
                .then(response => response.json())
                .then(data => setComments(data))
                .catch(error => console.error('Error fetching quiz data:', error));
            }, []);



    const handleClick=(event)=> {
        event.preventDefault()
        const commentInfo = {userID, username, date, comment}

        fetch("http://localhost:8080/comments/create", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
              },
            body:JSON.stringify(commentInfo)
            }).then(()=>{
            alert("Comment added!")})
            .then(window.location.reload());
    }

    comments.sort((a, b) => b.id - a.id);

    
      return (
        
        <div style={{border: '2px solid rgba(0, 0, 0, 0.96)', padding: '35px', borderRadius: '25px'}}>
            <form onSubmit={handleClick} className='commentForm'>
                <Box sx={{ '& > :not(style)': { m: 7, width: '80ch' },}}
                noValidate
                autoComplete="off">
                    <div>
                    <h1>Comment Board</h1>
                    <p>Talk to other users here!</p>
                    </div>
                    <div>
                        <TextField id="yourComment" label="Comment" variant="outlined"
                        fullWidth
                        type="text"
                        placeholder="Comment" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        />
                    </div>
                    <div>
                    <Button  type="submit" variant="contained" >
                        Post
                    </Button> 
                    </div>
                    <div>
                    <TableContainer className="messageBoard"  component={Paper}>
                        <Table sx={{ minWidth: 650, border: 1}}  aria-label="customized table">
                            <TableHead>
                            </TableHead>
                            <TableBody>
                            {comments.map((val, key) => (
                                <TableRow 
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0, } }}
                                >
                                <TableCell align="left" >
                                    <a href={`/myaccount/${val.username}`} style={{ color: 'blue', fontWeight: 'bold'  }} >{val.username}  </a>
                                </TableCell>
                                <TableCell align="justify">{val.comment}</TableCell>
                                <TableCell align="right">{val.date.split("-").reverse().join("-")}</TableCell>
                                </TableRow >
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </div>
                </Box>
            </form>
        </div>
      );
}