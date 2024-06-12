import React, { createContext, useState, useEffect } from 'react';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoStream, setVideoStream] = useState(null);

  useEffect(() => {
    // Initialize the video stream
    const initializeVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    initializeVideoStream();
  }, []);

  return (
    <VideoContext.Provider value={{ videoStream }}>
      {children}
    </VideoContext.Provider>
  );
};
