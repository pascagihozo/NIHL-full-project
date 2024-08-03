NIHL-full-project


Overview
This repository contains the full project for an AI-powered mobile application designed to prevent Noise-Induced Hearing Loss (NIHL). The application monitors environmental noise in real-time, offers personalized recommendations based on user-specific data, and ensures continuous protection even in the background.

Features
Real-time Noise Monitoring: Continuously tracks noise levels and provides immediate feedback.
Personalized Recommendations: Tailors advice based on user profile data and noise exposure history.
Cross-Platform Compatibility: Built with React Native for seamless performance on Android and iOS.
Data Privacy: Stores sensitive data locally on the device, with optional cloud storage for anonymized data.
Machine Learning Integration: Uses advanced models to assess and predict hearing damage risks.
Project Structure
graphql
Copy code
NIHL-full-project/
├── backend/               # Python FastAPI backend for data processing and ML integration
├── frontend/              # React Native frontend for the mobile application
├── ml/                    # Machine learning models and scripts
├── .gitattributes         # Git attributes file
└── README.md              # Project documentation
Installation
Prerequisites
Node.js (for frontend development)
Python 3.7+ (for backend development)
Docker (for containerization of the backend)
Backend Setup
Clone the repository:
bash
Copy code
git clone https://github.com/pascagihozo/NIHL-full-project.git
cd NIHL-full-project/backend
Install Python dependencies:
bash
Copy code
pip install -r requirements.txt
Run the backend server:
bash
Copy code
uvicorn main:app --reload
Frontend Setup
Navigate to the frontend directory:
bash
Copy code
cd ../frontend
Install Node.js dependencies:
bash
Copy code
npm install
Start the React Native app:
bash
Copy code
npx react-native run-android # for Android
npx react-native run-ios # for iOS
Usage
Once the backend server and frontend application are running, you can start using the app to monitor noise levels, receive recommendations, and manage your hearing health.

Contributing
Contributions are welcome! Please fork this repository and submit a pull request with your changes.
