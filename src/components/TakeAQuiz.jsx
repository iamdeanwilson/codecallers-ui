import React, { useEffect, useState } from 'react';
import { Button, Box, InputLabel, MenuItem, FormControl, Select, List, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@mui/material';

function TakeAQuiz() {

  const [topic, setTopic] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const javaScriptDifficultyOptions = ["Easy"];
  const htmlDifficultyOptions = ["Easy", "Medium", "Hard"];
  const mySQLDifficultyOptions = ["Easy", "Medium", "Hard"];
  const bashDifficultyOptions = ["Easy", "Medium", "Hard"];
  const phpDifficultyOptions = ["Easy", "Medium", "Hard"];
  const dockerDifficultyOptions = ["Easy", "Medium"];
  const linuxDifficultyOptions = ["Easy", "Medium", "Hard"];
  const devopsDifficultyOptions = ["Easy"];

  let difficultyOptions = null; 
  
  let optionsDropDown = null; 

  const handleTopicChange = (event) => {
    setTopic(event.target.value)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (topic === "javaScript") { 
    difficultyOptions = javaScriptDifficultyOptions; 
  } else if (topic === "html") { 
    difficultyOptions = htmlDifficultyOptions; 
  } else if (topic === "mysql") { 
    difficultyOptions = mySQLDifficultyOptions; 
  } else if (topic === "bash") { 
    difficultyOptions = bashDifficultyOptions; 
  } else if (topic === "php") { 
    difficultyOptions = phpDifficultyOptions; 
  } else if (topic === "docker") { 
    difficultyOptions = dockerDifficultyOptions; 
  } else if (topic === "linux") { 
    difficultyOptions = linuxDifficultyOptions; 
  } else if (topic === "devops") { 
    difficultyOptions = devopsDifficultyOptions; 
  }

  if (difficultyOptions) { 
    optionsDropDown = difficultyOptions.map((el) => <MenuItem value={el} key={el}>{el}</MenuItem>); 
  } 

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleGoClicked = () => {
    if(topic  === '' | difficulty  === '' ){
      alert("All fields are required!");
      event.preventDefault(); 
    } else
    window.location.href=`/quiz/${topic}/${difficulty}`;
  }


  return (
    <div>
      <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px', margin: "5px"}}>
        <h3>Scoring</h3>
        <p>The difficulty that you choose determines how many points each question is worth.</p>
        <p>
          "Easy" questions are each worth one point.
          <br></br>"Medium" questions are each worth two points.
          <br></br>"Hard" questions are each worth three points.
        </p>
        <p>Quizzes are timed. The timer starts as soon as questions finish loading, 
          <br></br>and the faster you complete your quiz, the larger your "time multiplier" bonus will be!</p>
      </div>
      <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px', margin: "5px"}}>
        <div>
          <h2>Select Your Quiz Preferences</h2>
        </div>
        <div>
          <Box sx={{ minWidth: 120 }} style={{margin : '5px'}}>
            <FormControl fullWidth>
              <InputLabel id="topic">Topic</InputLabel>
              <Select
                labelId="topic"
                id="topic"
                value={topic}
                label="Topic"
                onChange={handleTopicChange}
              >
                <MenuItem value={"javaScript"}>JavaScript</MenuItem>
                <MenuItem value={"html"}>HTML</MenuItem>
                <MenuItem value={"mysql"}>MySQL</MenuItem>
                <MenuItem value={"bash"}>Bash</MenuItem>
                <MenuItem value={"php"}>PHP</MenuItem>
                <MenuItem value={"docker"}>Docker</MenuItem>
                <MenuItem value={"linux"}>Linux</MenuItem>
                <MenuItem value={"devops"}>DevOps</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ minWidth: 120 }} style={{margin : '5px'}}>
            <FormControl fullWidth>
              <InputLabel id="difficulty">Difficulty</InputLabel>
              <Select
                labelId="difficulty"
                id="difficulty"
                value={difficulty}
                label="Difficulty"
                onChange={handleDifficultyChange}
              >
                {optionsDropDown}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
        <React.Fragment>
        <Button variant="contained" onClick={handleClickOpen} style={{margin : '5px'}}>
            Go!
          </Button >
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you ready to start your quiz?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You selected "{topic}" as your topic, and "{difficulty}" as your difficulty.
                <br></br>The timer will begin as soon as questions finish loading.
                <br></br>Are you ready?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined">Wait! I'm not ready!</Button>
              <Button onClick={handleGoClicked} autoFocus variant="contained">
                I'm ready!
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
          
        </div>
      </div>
    </div>
  );
}

export default TakeAQuiz;