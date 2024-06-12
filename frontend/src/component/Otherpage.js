import React, { useContext, useEffect, useRef } from 'react';
import { VideoContext } from '../context/VideoContext';

const OtherPage = () => {
  const { videoStream } = useContext(VideoContext);
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <div>
      <h1>Other Page</h1>
      <video ref={videoRef} width="640" height="480" autoPlay muted></video>
    </div>
  );
};

export default OtherPage;
