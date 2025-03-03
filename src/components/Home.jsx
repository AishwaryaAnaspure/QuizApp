import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const [username, setUsername] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username);
        navigate('/quiz');
    };

    return (
        <div>
            <h1>Welcome to the Quiz App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button type="submit">Start Quiz</button>
            </form>
        </div>
    );
};

export default Home;