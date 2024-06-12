import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './MainContent.css';  // Ensure you import your CSS file

const EmotionDetection = ({ setEmotion, setHeadPoseClassification }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-weights_manifest.json');
        await faceapi.nets.faceLandmark68Net.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-weights_manifest.json');
        await faceapi.nets.faceRecognitionNet.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-weights_manifest.json');
        await faceapi.nets.faceExpressionNet.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_expression_model-weights_manifest.json');
        console.log('Models loaded successfully');
        startVideo();
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            console.log('Video stream started');
          } else {
            console.error('Video reference is not available');
          }
        })
        .catch(err => {
          console.error('Error accessing webcam:', err);
        });
    };

    const estimateHeadPose = (landmarks) => {
      const eyeLeft = landmarks.getLeftEye();
      const eyeRight = landmarks.getRightEye();
      const nose = landmarks.getNose();
      const mouth = landmarks.getMouth();

      const yaw = Math.atan2(eyeRight[0].y - eyeLeft[0].y, eyeRight[0].x - eyeLeft[0].x) * 180 / Math.PI;
      const pitch = Math.atan2(mouth[3].y - nose[0].y, mouth[3].x - nose[0].x) * 180 / Math.PI;
      const roll = Math.atan2(nose[0].y - mouth[0].y, nose[0].x - mouth[0].x) * 180 / Math.PI;

      return { yaw, pitch, roll };
    };

    const classifyHeadPose = ({ yaw, pitch, roll }) => {
      const thresholds = {
        yaw: 10,   // Threshold in degrees for left/right turning
        pitch: 10, // Threshold in degrees for up/down tilting
        roll: 10   // Threshold in degrees for tilting to the sides
      };

      if (pitch > thresholds.pitch) {
        return 'down';
      } else if (pitch < -thresholds.pitch) {
        return 'up';
      } else if (yaw > thresholds.yaw) {
        return 'right';
      } else if (yaw < -thresholds.yaw) {
        return 'left';
      } else {
        return 'neutral';
      }
    };

    const detectEmotionAndHeadPose = async () => {
      if (videoRef.current) {
        console.log('Performing detection...');
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        console.log('Detections:', detections);

        if (detections.length > 0) {
          const emotions = detections[0].expressions;
          const landmarks = detections[0].landmarks;
          const maxValue = Math.max(...Object.values(emotions));
          const emotion = Object.keys(emotions).find(key => emotions[key] === maxValue);
          setEmotion(emotion);
          console.log(`Detected emotion: ${emotion}`);

          const headPose = estimateHeadPose(landmarks);
          console.log('Head pose:', headPose);
          const headPoseClassification = classifyHeadPose(headPose);
          setHeadPoseClassification(headPoseClassification);
          console.log(`Estimated head pose: Yaw: ${headPose.yaw}, Pitch: ${headPose.pitch}, Roll: ${headPose.roll}`);
          console.log(`Head pose classification: ${headPoseClassification}`);
        } else {
          console.log('No faces detected');
        }
      } else {
        console.error('Video reference is not available during emotion detection');
      }
    };

    loadModels();

    const intervalId = setInterval(detectEmotionAndHeadPose, 1000); // Check for emotions and head pose every second

    return () => {
      clearInterval(intervalId);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        console.log('Video stream stopped');
      }
    };
  }, [setEmotion, setHeadPoseClassification]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted className="hidden-video" />
    </div>
  );
};

export default EmotionDetection;
