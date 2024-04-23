import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import {Radio, RadioGroup, FormControlLabel,FormControl, FormLabel, Button, CircularProgress, Box } from '@mui/material';

function FetchQuizData() {

    const { topic, difficulty } = useParams();
    let questionPointValue

    if (difficulty === 'Easy'){
      questionPointValue = 1;
    } else if (difficulty === 'Medium'){
      questionPointValue = 2;
    } else if (difficulty === 'Hard'){
      questionPointValue = 3;
    }

    const [questions, setQuestions] = useState('');
    const [userScore, setUserScore] = useState(null);
    const [userQuizCount, setQuizCount] = useState(null);
    const [backgroundColors, setBackgroundColors] = useState([]);
    const [userCorrectAnswers, setUserCorrectAnswers] = useState(null);
    const [userTimeTaken, setUserTimeTaken] = useState(null);
    const [userTimeMultiplier, setUserTimeMultiplier] = useState(null);
    const token = localStorage.getItem('site');
    const userID = localStorage.getItem('userID');
    const username = localStorage.getItem('username');
    const date = new Date().toISOString().slice(0, 10).replace('T', ' ');
    const [scoreFlag, setScoreFlag] = useState(false);
    let correctAnswers = [];
    let userAnswers = [];
    let backgroundColorArray=[]
    let timeMultiplier=1; 
    let score = 0;
    let numberOfCorrectAnswers = 0;

    let startTime = performance.now();

    useEffect(() => {
      fetch(`https://quizapi.io/api/v1/questions?apiKey=VsDMbtp8OFRwNTdLxnpFqtTpdkst98Mxw2tiOHHH&difficulty=${difficulty}&limit=1&tags=${topic}`)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        for(let i= 0 ; i < userAnswers.length ; i++ ){
          userAnswers.push('');
        };  
      })
    }, []);
    
    const handleSubmit = () => {
      let endTime = performance.now();
      for(let i= 0 ; i < userAnswers.length ; i++ ){
        if (userAnswers[i] === correctAnswers [i]){
          backgroundColorArray.push("#52b202")
          score = score + questionPointValue;
          numberOfCorrectAnswers++
        } else backgroundColorArray.push("#e3504b")
      };
      let quizTime = Math.floor((endTime - startTime)/1000);
      if (quizTime <= 300 && quizTime > 270){timeMultiplier = 2;} 
      else if (quizTime <= 270 && quizTime > 240){timeMultiplier = 3;} 
      else if (quizTime <= 240 && quizTime > 210){timeMultiplier = 4;} 
      else if (quizTime <= 210 && quizTime > 180){timeMultiplier = 5;} 
      else if (quizTime <= 180 && quizTime > 150){timeMultiplier = 6;} 
      else if (quizTime <= 150 && quizTime > 120){timeMultiplier = 7;} 
      else if (quizTime <= 120 && quizTime > 90){timeMultiplier = 8;} 
      else if (quizTime <= 90 && quizTime > 60){timeMultiplier = 9;} 
      else if (quizTime <= 60 && quizTime > 60){timeMultiplier = 10;} 
      else if (quizTime <= 60 && quizTime > 30){timeMultiplier = 11;} 
      else if (quizTime <= 30){timeMultiplier = 12;}
      if(score != 0) {
        score = (score*timeMultiplier);
      }
      setScoreFlag(true);
      setBackgroundColors(backgroundColorArray);
      setUserCorrectAnswers(numberOfCorrectAnswers);
      setUserTimeMultiplier(timeMultiplier);
      setUserTimeTaken(quizTime);
      setUserScore(score);
      setQuizCount(1);
      window.scrollTo(0, 0);
      event.preventDefault(); 
    }

    const submitScore=(event)=>{
      event.preventDefault()
      let score = userScore;
      let quizCount = userQuizCount;
      const user={score, quizCount};
      fetch(`http://localhost:8080/user/${userID}/update`, {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(user)
      })

      const quiz = {userID, date, topic, difficulty, score};
      fetch(`http://localhost:8080/quiz/${topic}/${difficulty}`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(quiz)

      }).then(()=>{
          alert("Score added to profile!")
      }).then(event =>  window.location.href=`/myaccount/${username}`) // Redirects back to user's profile
      }

    return (
      <div>
        {!questions && 
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>}
        {scoreFlag && <div style={{padding: '10px', borderRadius: '25px', margin : '5px', background:"#1565c0", color: "white"}}>
          <h1>Your Score: {userScore} Points</h1>
          <h3>Number of Correct Answers: {userCorrectAnswers}</h3>
          <h3>Point Value per Question: {questionPointValue} ({difficulty} Difficulty)</h3>
          <h3>Time Taken: {userTimeTaken} Seconds</h3>
          <h3>Time Multiplier: {userTimeMultiplier}</h3>
          </div>}
        <FormControl>
          {questions && <div>{questions.map((question, index) => (
            <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '10px', borderRadius: '25px', margin : '5px', background: backgroundColors[index]}}>
              <h3>Question {index +1}: {question.question}</h3 >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(event)=>(userAnswers[index] = event.target.value)}
              >
                {question.answers.answer_a && <FormControlLabel value="answer_a" control={<Radio />} label={"A: " + question.answers.answer_a} style={{marginLeft: '30%'}} />}
                {question.answers.answer_b && <FormControlLabel value="answer_b" control={<Radio />} label={"B: " + question.answers.answer_b} style={{marginLeft: '30%'}} />}
                {question.answers.answer_c && <FormControlLabel value="answer_c" control={<Radio />} label={"C: " + question.answers.answer_c} style={{marginLeft: '30%'}} />}
                {question.answers.answer_d && <FormControlLabel value="answer_d" control={<Radio />} label={"D: " + question.answers.answer_d} style={{marginLeft: '30%'}} />}
                {question.answers.answer_e && <FormControlLabel value="answer_e" control={<Radio />} label={"E: " + question.answers.answer_e} style={{marginLeft: '30%'}} />}
                {question.answers.answer_f && <FormControlLabel value="answer_f" control={<Radio />} label={"F: " + question.answers.answer_f} style={{marginLeft: '30%'}} />}
              </RadioGroup>

              {question.correct_answers.answer_a_correct === "true" && <script>function() {correctAnswers.push('answer_a')} </script>}
              {question.correct_answers.answer_b_correct === "true" && <script>function() {correctAnswers.push('answer_b')} </script>}
              {question.correct_answers.answer_c_correct === "true" && <script>function() {correctAnswers.push('answer_c')} </script>}
              {question.correct_answers.answer_d_correct === "true" && <script>function() {correctAnswers.push('answer_d')} </script>}
              {question.correct_answers.answer_e_correct === "true" && <script>function() {correctAnswers.push('answer_e')} </script>}
              {question.correct_answers.answer_f_correct === "true" && <script>function() {correctAnswers.push('answer_f')} </script>}
              {scoreFlag && <h3>{"Correct Answer: Answer " + correctAnswers[index].charAt(7).toUpperCase()}</h3>}

            </div>
          ))}</div>}
          {questions && !scoreFlag && <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained" onClick={handleSubmit}>
            Submit Quiz!
          </Button>}
          {scoreFlag && <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained" onClick={submitScore}>
            Add Score to Your Profile!
          </Button>}
        </FormControl>
      </div>
    );
}

export default FetchQuizData;