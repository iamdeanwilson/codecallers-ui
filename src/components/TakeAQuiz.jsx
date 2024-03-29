import React, { useEffect, useState } from 'react';
import { Button, Box, InputLabel, MenuItem, FormControl, Select, List } from '@mui/material';

function TakeAQuiz() {

  const [topic, setTopic] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('');
  const javaScriptDifficultyOptions = ["Easy"];
  const htmlDifficultyOptions = ["Easy", "Medium", "Hard"];

  let difficultyOptions = null; 
  
  let optionsDropDown = null; 

  const handleTopicChange = (event) => {
    setTopic(event.target.value)
  };

  if (topic === "javaScript") { 
    difficultyOptions = javaScriptDifficultyOptions; 
  } else if (topic === "html") { 
    difficultyOptions = htmlDifficultyOptions; 
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
    <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px'}}>
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
        <Button variant="contained" onClick={handleGoClicked} style={{margin : '5px'}}>
          Go!
        </Button >
      </div>
    </div>
  );
}

export default TakeAQuiz;