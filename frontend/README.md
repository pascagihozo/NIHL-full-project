# Noise Detection App

This is a React Native application built with Expo to detect noise levels that could lead to noise-induced hearing loss. It monitors the noise process it on device to get noise level, collects user and environment data, sends this information to a backend with a machine learning model, and displays the prediction.

## Features

- **Real-time Noise Monitoring**: Continuously measures ambient noise levels.
- **Data Collection**: Gathers user and environmental data.
- **Machine Learning Analysis**: Sends data to a backend for prediction.
- **User-Friendly Interface**: Displays results in an intuitive format.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A smartphone with the Expo Go app installed (iOS/Android)

### Steps

1. **Clone the repository:**

   ```bash
   git clone 
   cd into frontend
   ```
2. **Install Dependences:**

   ```bash
   npm i
   ```
3. **Start the development server:**

   ```bash
   npx expo start
   ```
2. **Run the app:**

   - Open the Expo Go app on your device.
   - Scan the QR code from the terminal or browser.

## Usage

1. **Launch the App**: Open the app on your device.
2. **Enter User data**: fill the form with data.
3. **View Results**: See real-time noise impact predictions.
4. **Adjust Settings**: Access settings to modify variable data such as location type as needed.

## Backend Integration

The app is configured to communicate with a backend service for machine learning predictions.
