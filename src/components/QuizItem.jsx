import { useState } from "react";

const QuizItem = ({ question, onSelect }) => {
    const [selected, setSelected] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const handleOptionClick = (option) => {
        setSelected(option);
        onSelect(question.id, option);
    };

    return(
        <div>
            <h3>{question.text}</h3>
            {question.options.map((option) => ( <button 
            key={option} 
            style={{ backgroundColor: selected === option ? (option === question.correctAnswer ? "green" : "red") : "", 

            }}
            onClick={() => handleOptionClick(option)} >
                {option}
            </button>
        ))}
        <button onClick={() => setShowAnswer(!showAnswer)}>Show Answer</button>
        { showAnswer && <p>Correct Answer: {question.correctAnswer}</p>}
        </div>
    );
};

export default QuizItem;