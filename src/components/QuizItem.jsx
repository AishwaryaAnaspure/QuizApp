import React from 'react';

const QuizItem = ({ question, handleAnswer }) => {
  console.log('Question in QuizItem:', question); // Debugging: Check the question prop
  return (
    <div>
      <h2>{question.question}</h2>
      {question.answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(answer.isCorrect, answer.text)} // Pass answer text
        >
          {answer.text}
        </button>
      ))}
    </div>
  );
};

export default QuizItem;