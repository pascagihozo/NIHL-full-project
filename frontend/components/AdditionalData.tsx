import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme } from 'react-native-paper';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0a7ea4',
  },
};


const AdditionalData = ({ update }: any) => {
  const [environment, setEnvironment] = useState<string>('Traffic');
  const [locationType, setLocationType] = useState<string>('Indoor');
  const [hearingProtectionUsed, setHearingProtectionUsed] = useState<string>('No');
  const [visibleEnvironmentMenu, setVisibleEnvironmentMenu] = useState(false);
  const [visibleLocationTypeMenu, setVisibleLocationTypeMenu] = useState(false);
  const [visibleProtectionUsedMenu, setVisibleProtectionUsedMenu] = useState(false);

  const openEnvironmentMenu = () => setVisibleEnvironmentMenu(true);
  const closeEnvironmentMenu = () => setVisibleEnvironmentMenu(false);

  const openLocationTypeMenu = () => setVisibleLocationTypeMenu(true);
  const closeLocationTypeMenu = () => setVisibleLocationTypeMenu(false);

  const openProtectionUsedMenu = () => setVisibleProtectionUsedMenu(true);
  const closeProtectionUsedMenu = () => setVisibleProtectionUsedMenu(false);

  const saveUserData = async (environment: string, locationType: string, protectionUsed: string) => {
    try {
      await AsyncStorage.setItem('@environment', environment);
      await AsyncStorage.setItem('@location_type', locationType);
      await AsyncStorage.setItem('@protection_used', protectionUsed);
      return true
    } catch (error) {
      return false
    }
  };
  

  const handleSubmit = async () => {

    try {
      const response = await saveUserData(environment, locationType, hearingProtectionUsed)

      if (response) {
        console.log('dditionl data updated successfully:');
        update()
      } else {
        console.error('Failed to update user info:');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <Provider theme={customTheme}>
      <View style={styles.container}>
        <Text style={styles.title}>Provide Additional Information</Text>

        <View style={styles.inputContainer}>
          <Menu
            visible={visibleEnvironmentMenu}
            onDismiss={closeEnvironmentMenu}
            anchor={
              <Button onPress={openEnvironmentMenu} mode="outlined" style={styles.menuButton}>
                Environment: {environment}
              </Button>
            }>
            <Menu.Item onPress={() => { setEnvironment('Traffic'); closeEnvironmentMenu(); }} title="Traffic" />
            <Menu.Item onPress={() => { setEnvironment('Industrial'); closeEnvironmentMenu(); }} title="Industrial" />
            <Menu.Item onPress={() => { setEnvironment('Residential'); closeEnvironmentMenu(); }} title="Residential" />
            <Menu.Item onPress={() => { setEnvironment('Workplace'); closeEnvironmentMenu(); }} title='Workplace' />
            <Menu.Item onPress={() => { setEnvironment('Recreational'); closeEnvironmentMenu(); }} title='Recreational' />
          </Menu>
        </View>

        <View style={styles.inputContainer}>
          <Menu
            visible={visibleLocationTypeMenu}
            onDismiss={closeLocationTypeMenu}
            anchor={
              <Button onPress={openLocationTypeMenu} mode="outlined" style={styles.menuButton}>
                Location Type: {locationType}
              </Button>
            }>
            <Menu.Item onPress={() => { setLocationType('Indoor'); closeLocationTypeMenu(); }} title="Indoor" />
            <Menu.Item onPress={() => { setLocationType('Outdoor'); closeLocationTypeMenu(); }} title="Outdoor" />
          </Menu>
        </View>

        <View style={styles.inputContainer}>
          <Menu
            visible={visibleProtectionUsedMenu}
            onDismiss={closeProtectionUsedMenu}
            anchor={
              <Button onPress={openProtectionUsedMenu} mode="outlined" style={styles.menuButton}>
                Hearing Protection Used: {hearingProtectionUsed}
              </Button>
            }>
            <Menu.Item onPress={() => { setHearingProtectionUsed('No'); closeProtectionUsedMenu(); }} title="No" />
            <Menu.Item onPress={() => { setHearingProtectionUsed('Yes'); closeProtectionUsedMenu(); }} title="Yes" />

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

export default AdditionalData;