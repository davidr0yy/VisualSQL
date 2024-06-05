import React, { useState } from 'react';
import './MainContent.css';

const Quizpage = () => {
    const [activeExercise, setActiveExercise] = useState('exercise1');
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (correctAnswer) => {
        if (userInput.trim().toUpperCase() === correctAnswer) {
            setFeedback('Correct!');
        } else {
            setFeedback('Incorrect. Please try again.');
        }
    };

    const renderExercise = () => {
        switch (activeExercise) {
            case 'exercise1':
                return (
                    <div className="exercise">
                        <h2>Exercise 1:</h2>
                        <p>Insert the missing statement to get all the columns from the <strong>Customers</strong> table.</p>
                        <div className="sql-editor">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Enter the missing keyword..."
                            /> * FROM Customers;
                        </div>
                        <button onClick={() => handleSubmit('SELECT')}>Submit Answer</button>
                        <div className="feedback">{feedback}</div>
                    </div>
                );
            case 'exercise2':
                return (
                    <div className="exercise">
                        <h2>Exercise 2:</h2>
                        <p>Insert the missing statement to filter the rows in the <strong>Customers</strong> table.</p>
                        <div className="sql-editor">
                            SELECT * FROM Customers <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Enter the missing keyword..."
                            /> CustomerID = 1;  
                        </div>
                        <button onClick={() => handleSubmit('WHERE')}>Submit Answer</button>
                        <div className="feedback">{feedback}</div>
                    </div>
                );
            // Add more cases for additional exercises
            default:
                return <div>Select an exercise from the sidebar.</div>;
        }
    };

    return (
        <div className="modules-container">
            <div className="modules-sidebar">
                <h1>Exercises</h1>
                <ul className="modules-list">
                    <li className={`nav-item ${activeExercise === 'exercise1' ? 'active' : ''}`} onClick={() => setActiveExercise('exercise1')}>
                        SQL Select
                    </li>
                    <li className={`nav-item ${activeExercise === 'exercise2' ? 'active' : ''}`} onClick={() => setActiveExercise('exercise2')}>
                        SQL Where
                    </li>
                    {/* Add more nav items as needed */}
                </ul>
            </div>
            <div className="modules-content">
                {renderExercise()}
            </div>
        </div>
    );
};

export default Quizpage;
