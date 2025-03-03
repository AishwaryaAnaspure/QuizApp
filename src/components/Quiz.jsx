import React, { useState, useEffect } from 'react';
import QuizItem from './QuizItem';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://quiz-api-glitch.glitch.me/api/questions')
      .then(response => response.json())
      .then(data => {
        console.log('API Data:', data); // Debugging: Check raw API response
        const formattedQuestions = data.questions.map(item => ({
          id: item.id, // Include question ID for submission
          question: item.question,
          answers: item.options.map(option => ({
            text: option,
            isCorrect: option === item.answer // Use `item.answer` instead of `item.correctAnswer`
          }))
        }));
        console.log('Formatted Questions:', formattedQuestions); // Debugging: Check formatted data
        setQuestions(formattedQuestions);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAnswer = (isCorrect, answerText) => {
    setUserAnswers([...userAnswers, answerText]);
    if (isCorrect) setScore(score + 1);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleSubmit(userAnswers);
      navigate('/result', { state: { score } });
    }
  };

  const handleSubmit = (answers) => {
    const formattedAnswers = questions.reduce((acc, question, index) => {
      acc[question.id] = answers[index]; // Map answers to question IDs
      return acc;
    }, {});

    fetch('https://quiz-api-glitch.glitch.me/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: formattedAnswers }),
    })
      .then(response => response.json())
      .then(data => navigate('/result', { state: { score: data.score } }))
      .catch(error => console.error('Error submitting answers:', error));
  };

  return (
    <div>
      <h1>Quiz</h1>
      {questions.length > 0 ? (
        <QuizItem
          question={questions[currentQuestion]}
          handleAnswer={handleAnswer}
        />
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;