import React, { useRef, useEffect, useState } from 'react';
import * as mp from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
import * as faceapi from 'face-api.js';

const HeadPoseAndEmotionDetection = ({ setHeadPose, setEmotion }) => {
  const videoRef = useRef(null);
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);

  useEffect(() => {
    const loadFaceApiModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      setIsModelsLoaded(true);
    };

    const startVideoAndDetection = async () => {
      const faceMesh = new mp.FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults(onResults);

      let camera;
      if (typeof videoRef.current !== 'undefined' && videoRef.current !== null) {
        camera = new cam.Camera(videoRef.current, {
          onFrame: async () => {
            await faceMesh.send({ image: videoRef.current });
            if (isModelsLoaded) {
              detectEmotion();
            }
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }

      function onResults(results) {
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
          const landmarks = results.multiFaceLandmarks[0];

          const noseTip = landmarks[1];
          const leftCheek = landmarks[33];
          const rightCheek = landmarks[263];

          const dx = rightCheek.x - leftCheek.x;
          const dy = rightCheek.y - leftCheek.y;
          const angleY = Math.atan2(dy, dx) * (180 / Math.PI);

          const noseBottom = landmarks[2];
          const chin = landmarks[152];

          const dz = chin.y - noseBottom.y;
          const angleX = Math.atan2(dz, dx) * (180 / Math.PI);

          let pose = 'forward';
          if (angleY < -10) {
            pose = 'left';
          } else if (angleX > 17) {
            pose = 'up';
          } else if (angleX < -1) {
            pose = 'down';
          }

          setHeadPose(pose);
        }
      }

      const detectEmotion = async () => {
        if (videoRef.current) {
          const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
          if (detections.length > 0) {
            const emotions = detections[0].expressions;
            const maxValue = Math.max(...Object.values(emotions));
            const emotion = Object.keys(emotions).find(key => emotions[key] === maxValue);
            setEmotion(emotion);
          }
        }
      };
    };

    loadFaceApiModels().then(startVideoAndDetection);

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [setHeadPose, setEmotion, isModelsLoaded]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="640" height="480" />
    </div>
  );
};

export default HeadPoseAndEmotionDetection;
