import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/authScreens/LoginScreen';
import RegisterScreen from './screens/authScreens/RegisterScreen';
import Profile from './screens/profileScreens/ProfileScreen'
import BottomNavigation from './navigations/BottomNavigation';
import SettingsScreen from './screens/settings/SettingsScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  const [loader, setLoader] = useState(true);
  const [token, setToken] = useState();
  const [fontsLoaded] = useFonts({
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [token]);

  if (!fontsLoaded || loader) {
    return <Text>Loading....</Text>;
  }

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={token ? 'main' : 'login'}>
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="main" component={BottomNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="settings" component={SettingsScreen}  />
          <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="signup" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;