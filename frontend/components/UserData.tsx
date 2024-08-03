import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Menu, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserData = ({ update }: any) => {
  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<string>('');
  const [healthIssue, setHealthIssue] = useState<string>('None');
  const [hearingSensitivity, setHearingSensitivity] = useState<string>('Normal');
  const [visibleGenderMenu, setVisibleGenderMenu] = useState(false);
  const [visibleHealthIssueMenu, setVisibleHealthIssueMenu] = useState(false);
  const [visibleHearingSensitivityMenu, setVisibleHearingSensitivityMenu] = useState(false);

  const openGenderMenu = () => setVisibleGenderMenu(true);
  const closeGenderMenu = () => setVisibleGenderMenu(false);

  const openHealthIssueMenu = () => setVisibleHealthIssueMenu(true);
  const closeHealthIssueMenu = () => setVisibleHealthIssueMenu(false);

  const openHearingSensitivityMenu = () => setVisibleHearingSensitivityMenu(true);
  const closeHearingSensitivityMenu = () => setVisibleHearingSensitivityMenu(false);

  const saveUserData = async (age: number, gender: string, issue: string, sensitivity: string) => {
    try {
      await AsyncStorage.setItem('@age', age.toString());
      await AsyncStorage.setItem('@gender', gender);
      await AsyncStorage.setItem('@health_issue', issue);
      await AsyncStorage.setItem('@hearing_sensitivity', sensitivity);
      return true
    } catch (error) {
      return false
    }
  };

  const handleSubmit = async () => {

    try {
      const response = await saveUserData(parseInt(age), gender, healthIssue, hearingSensitivity)

      if (response) {
        console.log('User info updated successfully:');
        update()
      } else {
        console.error('Failed to update user info:');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Provide Your Information</Text>

        <View style={styles.inputContainer}>
          <Menu
            visible={visibleGenderMenu}
            onDismiss={closeGenderMenu}
            anchor={
              <Button onPress={openGenderMenu} mode="outlined" style={styles.menuButton}>
                Gender: {gender}
              </Button>
            }>
            <Menu.Item onPress={() => { setGender('Male'); closeGenderMenu(); }} title="Male" />
            <Menu.Item onPress={() => { setGender('Female'); closeGenderMenu(); }} title="Female" />
            <Menu.Item onPress={() => { setGender('Other'); closeGenderMenu(); }} title="Other" />
          </Menu>
        </View>

        <TextInput
          label="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          style={styles.input}
        />

        <View style={styles.inputContainer}>
          <Menu
            visible={visibleHealthIssueMenu}
            onDismiss={closeHealthIssueMenu}
            anchor={
              <Button onPress={openHealthIssueMenu} mode="outlined" style={styles.menuButton}>
                Health Issue: {healthIssue}
              </Button>
            }>
            <Menu.Item onPress={() => { setHealthIssue('Healthy'); closeHealthIssueMenu(); }} title="None" />
            <Menu.Item onPress={() => { setHealthIssue('Diabetes'); closeHealthIssueMenu(); }} title="Diabetes" />
            <Menu.Item onPress={() => { setHealthIssue('Hypertension'); closeHealthIssueMenu(); }} title="Hypertension" />
            <Menu.Item onPress={() => { setHealthIssue('Heart Disease'); closeHealthIssueMenu(); }} title="Heart Disease" />
            <Menu.Item onPress={() => { setHealthIssue('Other'); closeHealthIssueMenu(); }} title="Other" />
          </Menu>
        </View>

        <View style={styles.inputContainer}>
          <Menu
            visible={visibleHearingSensitivityMenu}
            onDismiss={closeHearingSensitivityMenu}
            anchor={
              <Button onPress={openHearingSensitivityMenu} mode="outlined" style={styles.menuButton}>
                Hearing Sensitivity: {hearingSensitivity}
              </Button>
            }>
            <Menu.Item onPress={() => { setHearingSensitivity('Normal'); closeHearingSensitivityMenu(); }} title="Normal" />
            <Menu.Item onPress={() => { setHearingSensitivity('Mild'); closeHearingSensitivityMenu(); }} title="Mild" />
            <Menu.Item onPress={() => { setHearingSensitivity('Moderate'); closeHearingSensitivityMenu(); }} title="Moderate" />
            <Menu.Item onPress={() => { setHearingSensitivity('Severe'); closeHearingSensitivityMenu(); }} title="Severe" />
          </Menu>
        </View>

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
        </Button>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  menuButton: {
    justifyContent: 'flex-start',
  },
  button: {
    marginTop: 20,
  },
});

export default UserData;