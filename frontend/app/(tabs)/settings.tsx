import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Menu, Button, Provider, TextInput } from 'react-native-paper';

const ProfileScreen: React.FC = () => {
  const [age, setAge] = useState('');
  const [healthIssue, setHealthIssue] = useState('None');
  const [locationType, setLocationType] = useState('Urban');
  const [environment, setEnvironment] = useState('Quiet');
  const [gender, setGender] = useState('Male');
  const [hearingProtectionUsed, setHearingProtectionUsed] = useState('No');
  const [hearingSensitivity, setHearingSensitivity] = useState('Normal');
  const [isEditing, setIsEditing] = useState(false);

  const [visibleMenu, setVisibleMenu] = useState({
    healthIssue: false,
    locationType: false,
    environment: false,
    gender: false,
    hearingProtectionUsed: false,
    hearingSensitivity: false,
  });

  const navigation = useNavigation();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedAge = await AsyncStorage.getItem('@age');
      const storedHealthIssue = await AsyncStorage.getItem('@health_issue');
      const storedLocationType = await AsyncStorage.getItem('@location_type');
      const storedEnvironment = await AsyncStorage.getItem('@environment');
      const storedGender = await AsyncStorage.getItem('@gender');
      const storedHearingProtectionUsed = await AsyncStorage.getItem('@hearing_protection_used');
      const storedHearingSensitivity = await AsyncStorage.getItem('@hearing_sensitivity');

      if (storedAge) setAge(storedAge);
      if (storedHealthIssue) setHealthIssue(storedHealthIssue);
      if (storedLocationType) setLocationType(storedLocationType);
      if (storedEnvironment) setEnvironment(storedEnvironment);
      if (storedGender) setGender(storedGender);
      if (storedHearingProtectionUsed) setHearingProtectionUsed(storedHearingProtectionUsed);
      if (storedHearingSensitivity) setHearingSensitivity(storedHearingSensitivity);
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('@age', age);
      await AsyncStorage.setItem('@health_issue', healthIssue);
      await AsyncStorage.setItem('@location_type', locationType);
      await AsyncStorage.setItem('@environment', environment);
      await AsyncStorage.setItem('@gender', gender);
      await AsyncStorage.setItem('@hearing_protection_used', hearingProtectionUsed);
      await AsyncStorage.setItem('@hearing_sensitivity', hearingSensitivity);
      alert('your data is saved')
    } catch (error) {
      console.error('Failed to save user data', error);
    }
  };

  const toggleEditing = () => {
    if (isEditing) saveUserData();
    setIsEditing(!isEditing);
  };

  const toggleMenu = (field: string) => {
    setVisibleMenu((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  };

  const renderProfileItem = (label: string, value: string, field: string, options: string[]) => (
    <View style={styles.profileItem}>
      {isEditing ? (
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileLabel}>{label}</Text>
          <Menu
            visible={visibleMenu[field as keyof typeof visibleMenu]}
            onDismiss={() => toggleMenu(field)}
            anchor={
              <Button onPress={() => toggleMenu(field)} mode="outlined" style={styles.menuButton}>
                {value}
              </Button>
            }>
            {options.map((option) => (
              <Menu.Item
                key={option}
                onPress={() => {
                  setFieldValue(field, option);
                  toggleMenu(field);
                }}
                title={option}
              />
            ))}
          </Menu>
        </View>
      ) : (
        <View style={styles.row}>
          <Text style={styles.profileLabel}>{label}: </Text>
          <Text style={styles.profileValue}>{value || 'Not provided'}</Text>
        </View>
      )}
    </View>
  );

  const setFieldValue = (field: string, value: string) => {
    switch (field) {
      case 'healthIssue':
        setHealthIssue(value);
        break;
      case 'locationType':
        setLocationType(value);
        break;
      case 'environment':
        setEnvironment(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'hearingProtectionUsed':
        setHearingProtectionUsed(value);
        break;
      case 'hearingSensitivity':
        setHearingSensitivity(value);
        break;
      default:
        break;
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <ScrollView>
          <View style={styles.profileItem}>
            <View style={styles.profileTextContainer}>
              {isEditing ? (
                <View>
                  <Text style={styles.profileLabel}>Age</Text>
                  <TextInput
                    style={styles.input}
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                  />
                </View>

              ) : (
                <View style={styles.row}>
                <Text style={styles.profileLabel}>Age: </Text>
                <Text style={styles.profileValue}>{age || 'Not provided'}</Text>
              </View>
              )}
            </View>
          </View>
          {renderProfileItem('Health Issue', healthIssue, 'healthIssue', ['Healthy', 'Hypertension', 'Heart Disease', 'Other', 'Diabetes'])}
          {renderProfileItem('Location Type', locationType, 'locationType', ['Indoor', 'Outdoor'])}
          {renderProfileItem('Environment', environment, 'environment', ['Residential', 'Workplace', 'Traffic', 'Recreational','Industrial'])}
          {renderProfileItem('Gender', gender, 'gender', ['Other', 'Female', 'Male'])}
          {renderProfileItem('Hearing Protection Used', hearingProtectionUsed, 'hearingProtectionUsed', ['Yes', 'No'])}
          {renderProfileItem('Hearing Sensitivity', hearingSensitivity, 'hearingSensitivity', ['Moderate', 'Severe', 'Normal', 'Mild'])}
          <TouchableOpacity style={styles.editButton} onPress={toggleEditing}>
            <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
          <View style={styles.navigateButtons}>
            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('faq' as never)}>
              <Text style={styles.linkButtonText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('privacy' as never)}>
              <Text style={styles.linkButtonText}>Privacy</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileItem: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#0a7ea4',
    borderRadius: 5,
  },
  profileTextContainer: {
    marginBottom: 10,
  },
  profileLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  profileValue: {
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#0a7ea4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    width: '45%',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  linkButtonText: {
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
  navigateButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuButton: {
    justifyContent: 'flex-start',
  },
});

export default ProfileScreen;
