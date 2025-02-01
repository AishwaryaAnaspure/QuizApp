import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://quiz-api-glitch.glitch.me/";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    //handle login
    const login = async (username, password) => {
        try{
            const res = await axios.post(`${API_BASE_URL}/login`,{ username, password });
            if (res.data.success) {
                setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            return true;

            }
        } catch(error){
            console.error("Login Failed:", error);
        }
        return false;
    };

    //fetch quiz questions
    const fetchQuestions = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/questions`);
            setQuestions(res.data);
        } catch (error){
            console.error("Error fetching questions:", error);
        }
    };

    //select answer
    const selectAnswer = (questionId, selectedOption) => {
        setAnswers((prevAnswers) => ({...prevAnswers, [questionId]: selectedOption}));
    };

    //submit quiz
    const submitQuiz = async () => {
        try {
            await axios.post(`${API_BASE_URL}/submit`, { answers });
            fetchResults();
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
        
    };

    //fetch results
    const fetchResults = async () => {
        try {
            if (!user) return;
            const res = await axios.get(`${API_BASE_URL}/result/${user.id}`);
            setResult(res.data);
        } catch (error) {
            console.error("Error fetching results:", error);
        }
        
    };

    return(
        <AuthContext.Provider value={{user, login, questions, fetchQuestions, selectAnswer, answers, submitQuiz, result}}>
            {children}
        </AuthContext.Provider>
    );
};
