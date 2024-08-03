import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Audio } from 'expo-av';

interface RecordingContextProps {
  recording: Audio.Recording | null;
  status: Audio.RecordingStatus | null;
}

interface RecordingProviderProps {
  children: ReactNode;
}

const RecordingContext = createContext<RecordingContextProps | undefined>(undefined);

const RecordingProvider = ({ children }: RecordingProviderProps) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [status, setStatus] = useState<Audio.RecordingStatus | null>(null);

  useEffect(() => {
    const startRecording = async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();

      setRecording(newRecording);

      const updateStatus = async () => {
        const stat = await newRecording.getStatusAsync();
        setStatus(stat);
      };

      const interval = setInterval(updateStatus, 1000);

      return () => {
        clearInterval(interval);
        newRecording.stopAndUnloadAsync();
      };
    };

    startRecording().catch(console.error);

    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  return (
    <RecordingContext.Provider value={{ recording, status }}>
      {children}
    </RecordingContext.Provider>
  );
};

export { RecordingContext, RecordingProvider };
