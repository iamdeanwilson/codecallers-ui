import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import {Radio, RadioGroup, FormControlLabel,FormControl, FormLabel, Button} from '@mui/material';

function FetchQuizData() {

    const { topic, difficulty } = useParams();

    let [questions, setQuestions] = useState('');

    useEffect(() => {
      fetch(`https://quizapi.io/api/v1/questions?apiKey=VsDMbtp8OFRwNTdLxnpFqtTpdkst98Mxw2tiOHHH&difficulty=${difficulty}&limit=10&tags=${topic}`)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      }) 
    }, []);
  
    function returnCorrectAnswer(){
      if (question.correct_answers == "answer_a_correct"){
        return "Answser A";
      } else if (question.correct_answers == "answer_b_correct"){
        return "Answser B";
      } else if (question.correct_answers == "answer_c_correct"){
        return "Answser C";
      } else if (question.correct_answers == "answer_d_correct"){
        return "Answser D";
      } else if (question.correct_answers == "answer_e_correct"){
        return "Answser E";
      } else if (question.correct_answers == "answer_f_correct"){
        return "Answser F";
      }
    }

    
    return (
      <div>
        <FormControl>
          {questions && <div>{questions.map((question, index) => (
            <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '10px', borderRadius: '25px', margin : '5px'}}>
              <h3>Question {index +1}: {question.question}</h3 >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="answer_a"
                name="radio-buttons-group"
              >
                {question.answers.answer_a && <FormControlLabel value="answer_a" control={<Radio />} label={"A: " + question.answers.answer_a} style={{marginLeft: '30%'}} />}
                {question.answers.answer_b && <FormControlLabel value="answer_b" control={<Radio />} label={"B: " + question.answers.answer_b} style={{marginLeft: '30%'}} />}
                {question.answers.answer_c && <FormControlLabel value="answer_c" control={<Radio />} label={"C: " + question.answers.answer_c} style={{marginLeft: '30%'}} />}
                {question.answers.answer_d && <FormControlLabel value="answer_d" control={<Radio />} label={"D: " + question.answers.answer_d} style={{marginLeft: '30%'}} />}
                {question.answers.answer_e && <FormControlLabel value="answer_e" control={<Radio />} label={"E: " + question.answers.answer_e} style={{marginLeft: '30%'}} />}
                {question.answers.answer_f && <FormControlLabel value="answer_f" control={<Radio />} label={"F: " + question.answers.answer_f} style={{marginLeft: '30%'}} />}
              </RadioGroup>
              <h3>Correct Anwswer:</h3>
              {question.correct_answers.answer_a_correct === "true" && <h3>Answer A: "{question.answers.answer_a}"</h3>}
              {question.correct_answers.answer_b_correct === "true" && <h3>Answer B: "{question.answers.answer_b}"</h3>}
              {question.correct_answers.answer_c_correct === "true" && <h3>Answer C: "{question.answers.answer_c}"</h3>}
              {question.correct_answers.answer_d_correct === "true" && <h3>Answer D: "{question.answers.answer_d}"</h3>}
              {question.correct_answers.answer_e_correct === "true" && <h3>Answer E: "{question.answers.answer_e}"</h3>}
              {question.correct_answers.answer_f_correct === "true" && <h3>Answer F: "{question.answers.answer_f}"</h3>}
            </div>
          ))}</div>}
          <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained">
            Submit Quiz!
          </Button>
        </FormControl>
      </div>
    );
}

export default FetchQuizData;