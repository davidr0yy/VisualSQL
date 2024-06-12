import React, { useState, useEffect } from 'react';
import RealTimePessimism from './RealTimePessimism';
import './MainContent.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const exercises = [
  {
    name: 'SQL SELECT',
    question: 'Insert the missing statement to get all the columns from the Customers table.',
    placeholder: 'Enter the missing keyword...',
    query: '* FROM Customers;',
    correctAnswer: 'SELECT'
  },
  {
    name: 'SQL WHERE',
    question: 'Insert the missing statement to filter the rows in the Customers table.',
    placeholder: 'Enter the missing keyword...',
    query: 'SELECT * FROM Customers WHERE CustomerID = 1;',
    correctAnswer: 'WHERE'
  },
  {
    name: 'SQL ORDER BY',
    question: 'Insert the missing statement to sort the Customers table by LastName.',
    placeholder: 'Enter the missing keyword...',
    query: 'SELECT * FROM Customers ORDER BY LastName;',
    correctAnswer: 'ORDER BY'
  },
  {
    name: 'SQL INSERT INTO',
    question: 'Insert the missing statement to add a new record to the Customers table.',
    placeholder: 'Enter the missing keyword...',
    query: 'INSERT INTO Customers (CustomerName, ContactName, Country) VALUES ("Cardinal", "Tom B. Erichsen", "Norway");',
    correctAnswer: 'INSERT INTO'
  },
  {
    name: 'SQL UPDATE',
    question: 'Insert the missing statement to update the CustomerName in the Customers table.',
    placeholder: 'Enter the missing keyword...',
    query: 'UPDATE Customers SET CustomerName = "Alfred Schmidt" WHERE CustomerID = 1;',
    correctAnswer: 'UPDATE'
  },
  {
    name: 'SQL DELETE',
    question: 'Insert the missing statement to delete a record from the Customers table.',
    placeholder: 'Enter the missing keyword...',
    query: 'DELETE FROM Customers WHERE CustomerID = 1;',
    correctAnswer: 'DELETE'
  },
  {
    name: 'SQL JOIN',
    question: 'Insert the missing statement to join Customers and Orders tables.',
    placeholder: 'Enter the missing keyword...',
    query: 'SELECT Customers.CustomerName, Orders.OrderID FROM Customers JOIN Orders ON Customers.CustomerID = Orders.CustomerID;',
    correctAnswer: 'JOIN'
  },
  {
    name: 'SQL GROUP BY',
    question: 'Insert the missing statement to group the Customers table by Country.',
    placeholder: 'Enter the missing keyword...',
    query: 'SELECT COUNT(CustomerID), Country FROM Customers GROUP BY Country;',
    correctAnswer: 'GROUP BY'
  },
  {
    name: 'SQL HAVING',
    question: 'Insert the missing statement to filter groups in the Customers table.',
    placeholder: 'Enter the missing keyword...',
    query: 'SELECT COUNT(CustomerID), Country FROM Customers GROUP BY Country HAVING COUNT(CustomerID) > 5;',
    correctAnswer: 'HAVING'
  },
  {
    name: 'SQL ALIAS',
    question: 'Insert the missing statement to create an alias for the Customers table.',
    placeholder: 'Enter the missing keyword...',
    query: 'SELECT c.CustomerName FROM Customers AS c;',
    correctAnswer: 'AS'
  }
];

const motivationalMessages = {
  low: [
    "Keep going, you're doing great!",
    "You're on the right track!",
    "Keep pushing forward!",
    "Every step forward is a step towards your goal.",
    "You have the power to achieve anything.",
    "Stay consistent and watch yourself succeed.",
    "Believe in the process and trust yourself.",
    "Keep moving forward, one step at a time.",
    "Small progress is still progress.",
    "Your efforts are paying off, keep it up!"
  ],
  medium: [
    "Don't give up, you're almost there!",
    "You're getting better, keep it up!",
    "You can do it, stay focused!",
    "Push through the challenges, success is near.",
    "Your hard work is showing, keep going!",
    "Stay determined, you're doing great!",
    "Focus on your goals and keep striving.",
    "You're stronger than you think.",
    "Every challenge you overcome makes you better.",
    "Keep your head up and keep pushing forward."
  ],
  high: [
    "Stay positive, keep pushing forward!",
    "Believe in yourself!",
    "Every mistake is a learning opportunity!",
    "You have the strength to get through this.",
    "Keep your eyes on the prize and keep working hard.",
    "Challenges are opportunities to grow.",
    "Stay resilient, success is within reach.",
    "Your potential is limitless, keep going!",
    "Embrace the journey and keep moving forward.",
    "You are capable of amazing things, don't stop now."
  ]
};

const helpHeadings = [
  "Need Help?",
  "Having Trouble?",
  "Struggling?",
  "Looking for Assistance?"
];

const helpMessages = [
  "It looks like you are having some trouble. Consider reviewing these modules:",
  "You seem to be struggling. These modules might help you out:",
  "Here are some modules that might help you understand better:",
  "Having difficulties? Check out these modules:"
];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomMessage = (level) => {
  const messages = motivationalMessages[level];
  return messages[Math.floor(Math.random() * messages.length)];
};

const Quizpage = () => {
  const [activeExercise, setActiveExercise] = useState(exercises[0]);
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [errors, setErrors] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [pessimisticLevel, setPessimisticLevel] = useState('low'); // Assume initial level is low
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [helpHeading, setHelpHeading] = useState(getRandomItem(helpHeadings));
  const [helpMessage, setHelpMessage] = useState(getRandomItem(helpMessages));

  useEffect(() => {
    let interval;

    if (pessimisticLevel === 'high') {
      interval = setInterval(() => {
        toast.info(getRandomMessage('high'), { autoClose: 1500 });
      }, 2000); // Every 2 seconds
    } else if (pessimisticLevel === 'medium') {
      interval = setInterval(() => {
        toast.info(getRandomMessage('medium'), { autoClose: 1500 });
      }, 5000); // Every 5 seconds
    } else if (pessimisticLevel === 'low') {
      interval = setInterval(() => {
        toast.info(getRandomMessage('low'), { autoClose: 1500 });
      }, 8000); // Every 8 seconds
    }

    return () => clearInterval(interval);
  }, [pessimisticLevel]);

  useEffect(() => {
    if (errors > 2) {
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
  }, [errors]);

  const handleSubmit = () => {
    setAttempts(attempts + 1);
    if (userInput.trim().toUpperCase() === activeExercise.correctAnswer) {
      toast.success('Correct!', { autoClose: 1200 });
      setCorrect(correct + 1);
    } else {
      toast.error('Incorrect. Please try again.', { autoClose: 1200 });
      setErrors(errors + 1);
      setHelpHeading(getRandomItem(helpHeadings)); // Update heading on incorrect answer
      setHelpMessage(getRandomItem(helpMessages)); // Update message on incorrect answer
    }
  };

  const renderExercise = () => {
    if (!activeExercise) return null;

    return (
      <div className="exercise">
        <h2>{activeExercise.name}:</h2>
        <p>{activeExercise.question}</p>
        <div className="sql-editor">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={activeExercise.placeholder}
          /> {activeExercise.query}
        </div>
        <button onClick={handleSubmit}>Submit Answer</button>
      </div>
    );
  };

  return (
    <div className="modules-container">
      <RealTimePessimism
        interactionType={activeExercise?.name}
        attempts={attempts}
        errors={errors}
        correct={correct}
        onPessimismLevelChange={setPessimisticLevel} // Assume this prop is used to update pessimistic level
      />
      <div className="modules-sidebar">
        <h1>Exercises</h1>
        <ul className="modules-list">
          {exercises.map((exercise, index) => (
            <li
              key={index}
              className={`nav-item ${activeExercise.name === exercise.name ? 'active' : ''}`}
              onClick={() => {
                setActiveExercise(exercise);
                setUserInput('');
              }}
            >
              {exercise.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="modules-content">
        {renderExercise()}
      </div>
      {showSuggestion && (
        <div className="suggestion-sidebar">
          <h2>{helpHeading}</h2>
          <p>{helpMessage}</p>
          <ul>
            <li><Link to="/modules/">Module 1: SELECT Statement</Link></li>
            <li><Link to="/modules/">Module 2: WHERE Clause</Link></li>
            <li><Link to="/modules/">Module 3: ORDER BY Statement</Link></li>
          </ul>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Quizpage;