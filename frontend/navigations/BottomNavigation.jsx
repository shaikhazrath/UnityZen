import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, FlatList, Animated} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {COLORS} from '../theme/theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import ProfileScreen from '../screens/profileScreens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,

        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            color = focused ? COLORS.primary : 'grey';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
            color = focused ? COLORS.primary : 'grey';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 55,
    borderTopWidth: 0, 
    backgroundColor: COLORS.secondary,
  },
  headerStyle: {
    height:100,
    backgroundColor: COLORS.secondary,
  },
  headerRight: {
    marginRight: 20,
  },
});

export default BottomNavigation;