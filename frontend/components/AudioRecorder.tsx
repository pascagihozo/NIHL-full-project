import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './NotificationHelper';
import { RecordingContext } from '@/components/RecordingContext';

interface PredictionProps {
  location_type: string;
  environment: string;
  age: number;
  gender: string;
  hearing_protection_used: string;
  hearing_sensitivity: string;
  health_issues: string;
}

function AudioRecorder({ location_type, environment, age, gender, health_issues, hearing_protection_used, hearing_sensitivity }: PredictionProps) {
  const { status } = useContext(RecordingContext)!;
  const [prediction, setPrediction] = useState<string | null>(null);

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {});

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('res', response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      if (status?.metering) {
        const sample = {
          "Location_Type": location_type,
          "Environment": environment,
          "Age": age,
          "Gender": gender,
          "Hearing_Protection_Used": hearing_protection_used,
          "Hearing_Sensitivity": hearing_sensitivity,
          "Health_Issues": health_issues,
          "Noise_Level_dB": Math.floor((status.metering + 160) * 5 / 8),
          "Duration_Minutes": 60,
        };

        try {
          const response = await fetch('https://backend-nihl-latest.onrender.com/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sample),
          });

          if (response.ok) {
            const data = await response.json();
            setPrediction(data.prediction);
            if (data.prediction === 'Harmful') {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Noise Alert',
                  body: 'The current noise level is harmful to your health',
                  sound: undefined,
                },
                trigger: {
                  seconds: 1,
                },
              });
            }
          } else {
            console.error('Failed to send status:', response);
          }
        } catch (error) {
          console.error('Error sending status:', error);
        }
      } else console.log('not metering');
    };

    checkStatus();
  }, [status]);

  const getProgressColor = (prediction: string | null) => {
    if (prediction === "Harmless") return '#4caf50'; // Green
    if (prediction === "Harmful") return '#f44336'; // Red
    return '#b0b0b0'; // Grey
  };

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.title}>Noise Level Monitor</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {prediction === 'Harmful' ? 'The current noise level is likely to cause' : 'The current level of noise is'}
        </Text>
        <Text style={[styles.statusValue, { color: getProgressColor(prediction) }]}>
          {prediction === 'Harmful' ? 'Noise Induced Hearing Loss' : `${prediction || 'Unknown'}`}
        </Text>
      </View>
      {prediction === 'Harmful' && (
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationText}>Recommendation:</Text>
          <Text style={styles.recommendationDetail}>Move away some distance from the source of the noise</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a7ea4',
    marginBottom: 20,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statusText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  statusValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  recommendationContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recommendationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f44336', 
    marginBottom: 10,
  },
  recommendationDetail: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});

export default AudioRecorder;
