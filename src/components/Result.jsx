import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Result = () => {
    const{ result, fetchResults } = useContext(AuthContext);
    
    useEffect(() => {
        fetchResults();
    }, []);

    return(
        <div>
            <h1> Quiz Results </h1>
            {result ? (
                <p>You Answered {result.correct} out of {result.total} questions correctly!</p>
            ) : ( <p> Loading...</p>

            )}
        </div>
    );
};

export default Result;