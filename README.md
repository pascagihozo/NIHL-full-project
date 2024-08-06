# NIHL-full-project

![Owner Avatar](https://github.com/pascagihozo.png)

## Overview

This repository contains the full project for an AI-powered mobile application designed to prevent Noise-Induced Hearing Loss (NIHL). The application monitors environmental noise in real-time and provides recommendations to users based on their noise exposure and personal health data.

## Project Structure

The project is organized into the following directories:

- **backend**: Contains the backend code, including API endpoints, data processing,models, and machine learning model integration.
- **frontend**: Contains the React Native code for the mobile application interface.
- **ml**: Contains the dataset and ipynb script used to predict the risk of hearing damage.

## Features

- **Real-Time Noise Monitoring**: Continuously monitors environmental noise and provides immediate feedback.
- **Personalized Recommendations**: Tailored advice based on user-specific factors such as health information and noise exposure history.
- **Cross-Platform Compatibility**: Runs on both Android and iOS devices using a single codebase.
- **Secure Data Handling**: Stores sensitive user data locally on the device to ensure privacy.

## Installation

To set up the project locally, follow these steps:

1. **Navigate to the backend directory and install dependencies:**

   ```bash
   cd backend
   pip install -r requirements.txt
2. **Navigate to the frontend directory and install dependencies::**

   ```bash
   cd ../frontend
npm install

3. **Start the backend server:**

   ```bash
   cd ../backend
uvicorn main:app --reload

4. **Start the frontend application:**

   ```bash
   cd ../frontend
npm start

