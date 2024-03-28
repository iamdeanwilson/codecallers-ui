import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom';

function FetchQuizData() {

    const { topic, difficulty } = useParams();

    let [question, setQuestion] = useState(null);
    let [answerA, setAnswerA] = useState(null);
    let [answerB, setAnswerB] = useState(null);
    let [answerC, setAnswerC] = useState(null);
    let [answerD, setAnswerD] = useState(null);
    let [answerE, setAnswerE] = useState(null);
    let [answerF, setAnswerF] = useState(null);
    let [correctAnswer, setCorrectAnswer] = useState(null);
    useEffect(() => {
      fetch(`https://quizapi.io/api/v1/questions?apiKey=VsDMbtp8OFRwNTdLxnpFqtTpdkst98Mxw2tiOHHH&category=code&difficulty=${difficulty}&limit=1&tags=${topic}`)
        .then((response) => response.json())
        .then((data) => {
          setQuestion(data[0].question);
          if (data[0].answers["answer_a"] !== null){
            setAnswerA("A: " + data[0].answers["answer_a"]);
          }
          if (data[0].answers["answer_b"] !== null){
            setAnswerB("B: " + data[0].answers["answer_b"]);
          }
          if (data[0].answers["answer_c"] !== null){
            setAnswerC("C: " + data[0].answers["answer_c"]);
          }
          if (data[0].answers["answer_d"] !== null){
            setAnswerD("D: " + data[0].answers["answer_d"]);
          }
          if (data[0].answers["answer_e"] !== null){
            setAnswerE("E: " + data[0].answers["answer_e"]);
          }
          if (data[0].answers["answer_f"] !== null){
            setAnswerF("F: " + data[0].answers["answer_f"]);
          };
          for (let answer in data[0].correct_answers){
            if (data[0].correct_answers[answer] === "true"){
              setCorrectAnswer(answer);
            }
          }
          console.log(data);
        })
        .catch((error) => console.log(error));
    }, []);

    if (correctAnswer == "answer_a_correct"){
      correctAnswer = answerA;
    } else if (correctAnswer == "answer_b_correct"){
      correctAnswer = answerB;
    } else if (correctAnswer == "answer_c_correct"){
      correctAnswer = answerC;
    } else if (correctAnswer == "answer_d_correct"){
      correctAnswer = answerD;
    } else if (correctAnswer == "answer_e_correct"){
      correctAnswer = answerE;
    } else if (correctAnswer == "answer_f_correct"){
      correctAnswer = answerF;
    }


    return (
      <div>
        <p>Topic: {topic}</p>
        <p>Difficulty: {difficulty}</p>
        <h2>Question:</h2>
        {<p>{question}</p>}
        <h2>Options:</h2>
        {<p>{answerA}</p>}
        {<p>{answerB}</p>}
        {<p>{answerC}</p>}
        {<p>{answerD}</p>}
        {<p>{answerE}</p>}
        {<p>{answerF}</p>}
        <h2>Correct Answer:</h2>
        {<p>{correctAnswer}</p>}
      </div>
    );
  }

export default FetchQuizData;