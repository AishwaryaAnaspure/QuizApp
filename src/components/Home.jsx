import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        const success = await login(username, password);
        if(success){
            navigate("/quiz");
        } else{
            setError("Invalid credentials");
        }
    };

    return (
        <div>
            <h1> Welcome to the Quiz App</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: "red"}}>{error}</p>}
        </div>
    );
};

export default Home;