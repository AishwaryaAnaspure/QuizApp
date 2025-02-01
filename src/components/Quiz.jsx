import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import QuizItem from "./QuizItem";

const Quiz = () => {
    const { questions, fetchQuestions, selectAnswer, submitQuiz } = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchQuestions();
    }, []);

    return(
        <div>
            <h1> Quiz Page </h1>
            {questions.map((q) => (
                <QuizItem key={q.id} questions={q} onSelect={ selectAnswer} />
            ))}
            <button onClick={() => { submitQuiz(); navigate("/result"); }}>Submit Quiz</button>
        </div>
    );
};
export default Quiz;