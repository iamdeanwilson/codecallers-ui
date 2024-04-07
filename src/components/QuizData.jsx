const QuizData = ({quiz}) => {
  return (
    <div className="quiz-data">
      {quiz[0].map(question => (
        <div className="quiz-question" key={question.id} >
          <h2>{ question.question }</h2>
          {/* <p>{ question.answers[answer_a] }</p> */}
        </div>
      ))}
    </div>
  );
}
 
export default QuizData;