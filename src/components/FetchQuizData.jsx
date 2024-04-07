import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import {Radio, RadioGroup, FormControlLabel,FormControl, FormLabel, Button} from '@mui/material';
import QuizData from "./QuizData";

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
  
    

    
    return (
      <div>
        <FormControl>
          {questions && <div>{questions.map((question, index) => (
            <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '10px', borderRadius: '25px', margin : '5px'}}>
              <FormLabel>Question {index +1}: {question.question}</FormLabel >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {question.answers.answer_a && <FormControlLabel value={question.answers.answer_a} control={<Radio />} label={question.answers.answer_a} />}
                {question.answers.answer_b && <FormControlLabel value={question.answers.answer_b} control={<Radio />} label={question.answers.answer_b} />}
                {question.answers.answer_c && <FormControlLabel value={question.answers.answer_c} control={<Radio />} label={question.answers.answer_c} />}
                {question.answers.answer_d && <FormControlLabel value={question.answers.answer_d} control={<Radio />} label={question.answers.answer_d} />}
                {question.answers.answer_e && <FormControlLabel value={question.answers.answer_e} control={<Radio />} label={question.answers.answer_e} />}
                {question.answers.answer_f && <FormControlLabel value={question.answers.answer_f} control={<Radio />} label={question.answers.answer_f} />}
              </RadioGroup>
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