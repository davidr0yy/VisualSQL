  import React, { useEffect, useState, useContext } from 'react';
  import AuthContext from '../context/AuthContext';
  import EmotionDetection from './EmotionDetection';

  const RealTimePessimism = ({ interactionType, attempts, errors, correct }) => {
    const { authTokens } = useContext(AuthContext);
    const [pessimismLevel, setPessimismLevel] = useState(null);
    const [emotion, setEmotion] = useState('');
    const [headpose, setHeadPose] = useState('');

    useEffect(() => {
      const socket = new WebSocket('ws://localhost:8000/ws/pessimism_detection/');

      socket.onopen = () => {
        console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setPessimismLevel(data.pessimism_level);
      };

      socket.onclose = () => {
        console.log('WebSocket disconnected');
      };

      const sendData = () => {
        if (socket.readyState === WebSocket.OPEN) {
          const interactionData = {
            token: authTokens.access,
            interaction_type: interactionType,
            attempts: attempts,
            errors: errors,
            correct: correct,
            emotion: emotion,
            head_pose: headpose,
          };  
          socket.send(JSON.stringify(interactionData));
        }
      };

      const intervalId = setInterval(sendData, 5000); // Send data every 5 seconds

      return () => {
        clearInterval(intervalId);
        socket.close();
      };
    }, [authTokens, interactionType, attempts, errors, correct, emotion, headpose]);

    return (
      <div>
        <EmotionDetection setEmotion={setEmotion} setHeadPoseClassification={setHeadPose} />
      </div>
    );
  };

  export default RealTimePessimism;
