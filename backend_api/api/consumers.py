import os
import json
from pathlib import Path
from channels.generic.websocket import AsyncWebsocketConsumer
from keras.models import load_model
import numpy as np
import pickle
from django.utils import timezone
from .models import PessimismPrediction

class PessimismDetectionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        # Define the base directory
        base_dir = Path(__file__).resolve().parent

        # Load the model and encoders when the connection is established
        self.model = load_model(base_dir / 'pessimism_model.h5')

        with open(base_dir / 'label_encoder_emotion.pkl', 'rb') as f:
            self.label_encoder_emotion = pickle.load(f)

        with open(base_dir / 'label_encoder_head_pose.pkl', 'rb') as f:
            self.label_encoder_head_pose = pickle.load(f)

        with open(base_dir / 'label_encoder_pessimism.pkl', 'rb') as f:
            self.label_encoder_pessimism = pickle.load(f)

        with open(base_dir / 'scaler.pkl', 'rb') as f:
            self.scaler = pickle.load(f)

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            print("Received data:", data)  # Log the received data

            interaction_type = data.get('interaction_type', '')
            attempts = data.get('attempts', 0)
            errors = data.get('errors', 0)
            correct = data.get('correct', 0)
            emotion = data.get('emotion', '')
            head_pose = data.get('head_pose', '')

            # Encode categorical features
            emotion_encoded = self.label_encoder_emotion.transform([emotion])[0]
            head_pose_encoded = self.label_encoder_head_pose.transform([head_pose])[0]

            # Prepare the data for prediction
            features = np.array([[attempts, errors, correct, emotion_encoded, head_pose_encoded]])
            features_scaled = self.scaler.transform(features)

            # Predict the pessimism level
            prediction = self.model.predict(features_scaled)
            predicted_pessimism_level = self.label_encoder_pessimism.inverse_transform(np.argmax(prediction, axis=1))[0]

            # Log the prediction or perform any other required operations
            print(f"Predicted Pessimism Level: {predicted_pessimism_level}")

            # Send the prediction back to the client
            await self.send(text_data=json.dumps({
                'pessimism_level': predicted_pessimism_level
            }))
        except Exception as e:
            print("Error:", str(e))
            await self.send(text_data=json.dumps({'error': str(e)}))
