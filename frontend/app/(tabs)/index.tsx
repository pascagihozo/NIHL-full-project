import AudioRecorder from '@/components/AudioRecorder';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserData from '@/components/UserData';
import AdditionalData from '@/components/AdditionalData';


export default function HomeScreen() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [healthIssue, setHealthIssue] = useState('');
  const [hearingSensitivity, setHearingSensitivity] = useState('');
  const [environment, setEnvironment] = useState<string>('');
  const [locationType, setLocationType] = useState<string>('');
  const [hearingProtectionUsed, setHearingProtectionUsed] = useState<string>('');
  const [dataVersion, setDataVersion] = useState(0);


  useEffect(() => {
    loadUserData().then((data) => {
      setAge(data.newAge);
      setGender(data.newGender);
      setHealthIssue(data.newHealthIssue);
      setHearingSensitivity(data.newHearingSensitivity);
      setEnvironment(data.newEnvironment);
      setLocationType(data.newLocationType);
      setHearingProtectionUsed(data.newProtectionUsed);
    })
  }, [dataVersion]);

  const loadUserData = async () => {
    try {
      const storedAge = await AsyncStorage.getItem('@age');
      const storedGender = await AsyncStorage.getItem('@gender');
      const storedHealthIssue = await AsyncStorage.getItem('@health_issue');
      const storedHearingSensitivity = await AsyncStorage.getItem('@hearing_sensitivity');
      const storedEnvironment = await AsyncStorage.getItem('@environment');
      const storedLocationType = await AsyncStorage.getItem('@location_type');
      const storedProtectionUsed = await AsyncStorage.getItem('@protection_used');
      const newAge = storedAge ? storedAge : '';
      const newGender = storedGender ? storedGender : '';
      const newHealthIssue = storedHealthIssue ? storedHealthIssue : '';
      const newHearingSensitivity = storedHearingSensitivity ? storedHearingSensitivity : '';
      const newEnvironment = storedEnvironment ? storedEnvironment : '';
      const newLocationType = storedLocationType ? storedLocationType : '';
      const newProtectionUsed = storedProtectionUsed ? storedProtectionUsed : '';

      return {newAge, newGender, newHealthIssue, newHearingSensitivity, newEnvironment, newLocationType, newProtectionUsed};
    } catch (error) {
      console.error('Failed to load user data', error);
      return {
        newAge: '',
        newGender: '',
        newHealthIssue: '',
        newHearingSensitivity: '',
        newEnvironment: '',
        newLocationType: '',
        newProtectionUsed: ''
      }
    }
  };


  const renderScreen = () => {
    if (age && gender && healthIssue && hearingSensitivity) {
      if (environment && locationType && hearingProtectionUsed) {
        return <AudioRecorder age={parseInt(age)} gender={gender} location_type={locationType} environment={environment} hearing_protection_used={hearingProtectionUsed} hearing_sensitivity={hearingSensitivity} health_issues={healthIssue}/>;
      } else {
        return <AdditionalData update={() => setDataVersion(prev => prev + 1)}/>;
      }
    } else {
      return <UserData update={() => setDataVersion(prev => prev + 1)} />;
    }
  };

  return (
      <SafeAreaView style={{ flex: 1 }}>
          {renderScreen()}
      </SafeAreaView>
  );
};