import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert} from '@mui/material';

function DeleteAccount() {

  let date;

  let userID;
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const[open, setOpen] = React.useState(false);
  const[dialogHeader, setDialogHeader] = React.useState('');
  const[dialogBody, setDialogBody] = React.useState('');
  const token = localStorage.getItem('site')


  useEffect(() => {
    fetch('http://localhost:8080/user/index', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },})
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  for ( let i = 0; i < users.length; i++ ){
    if(users[i].username === username){
      userID = users[i].id;
    }
  };

  const handleDoNotDelete=(event)=>{
    event.preventDefault()
    setOpen(true);
    setDialogHeader("Thank you!");
    setDialogBody("We're happy you stayed!")
  }


  const handleDelete=(event)=>{
    event.preventDefault()
    setOpen(true);
    setDialogHeader("Final Warning!");
    setDialogBody("Are you SURE you want to delete your account?!")
  }

  const handleFinalDelete=(event)=>{
    event.preventDefault()
    const user = username
      fetch(`http://localhost:8080/user/${userID}/delete`, {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(user)
      }).then(()=>{
        setOpen(true);
        setDialogHeader("Account Deleted");
        setDialogBody("Come back any time!")
      }).then(event => window.location.href='/logout')
  }




  const handleClose = () => {
    setOpen(false);
    window.location.href=`/myaccount/${username}`;
  };

  return (
    <div>
      {username != localStorage.getItem('username') && <div>
        <h2>You can only delete your own account!</h2>
      </div>}
      {username === localStorage.getItem('username') && <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px'}}>
        <div>
          <h1>Are you<br></br>REALLY REALLY<br></br>sure you want to delete<br></br>{username}'s<br></br>Account?</h1>
        </div>
        <div>
          <p>This action cannot be undone!</p>
        </div>
        <div>
          <Button variant="contained" onClick={handleDoNotDelete} style={{margin : '5px'}}>
            No, wait! I'm having second thoughts! Get me outta here!
          </Button >
        </div>
        <div>
          <Button variant="contained" onClick={handleDelete} style={{margin : '5px', backgroundColor: "red"}}>
            Yes, I'm sure, delete my account!
          </Button >
        </div>
        <React.Fragment>
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
            <DialogActions>
              {dialogHeader=== "Thank you!" && <Button onClick={handleClose} variant="contained">Close</Button>}
              {dialogHeader=== "Final Warning!" && <Button style={{margin : '5px', backgroundColor: "red"}} onClick={handleFinalDelete} autoFocus variant="contained">
                Yes, Delete my Account!
              </Button>}{dialogHeader=== "Final Warning!" && <Button onClick={handleDoNotDelete} autoFocus variant="contained" style={{margin : '5px'}}>
                No, Wait, I Changed my Mind!!
              </Button>}
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>}
    </div>
  );

}

export default DeleteAccount;