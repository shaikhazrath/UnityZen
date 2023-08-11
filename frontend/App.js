import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/authScreens/LoginScreen';
import RegisterScreen from './screens/authScreens/RegisterScreen';
import Profile from './screens/profileScreens/Profile';
import Communities from './screens/communityScreen/Communities';
import BottomNavigation from './navigations/BottomNavigation';
import Communitposts from './screens/communityScreen/Communitposts';
import Createpost from './screens/communityScreen/Createpost';

const Stack = createNativeStackNavigator();



const App = () => {
  const [loader, setLoader] = useState(true);
  const [token, setToken] = useState();
  const [fontsLoaded] = useFonts({
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setLoader(false);
          setToken(value);
        } else {
          setLoader(false); 
        }
      } catch (error) {
        console.log(error);
        setLoader(false); 
      }
    };

    getToken();
  }, []);

  if (!fontsLoaded || loader) {
    return <Text>Loading....</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? "main" : "login"}>
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Communities" component={Communities} options={{ headerShown: false }} />
        <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="createpost" component={Createpost}  />
        <Stack.Screen name="communitposts" component={Communitposts}  />
        <Stack.Screen name="main" component={BottomNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
