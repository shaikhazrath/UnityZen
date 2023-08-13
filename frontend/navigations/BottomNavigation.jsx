import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/profileScreens/Profile';
import Communities from '../screens/communityScreen/Communities';
import Notifications from '../screens/notificationScreen/Notifications';
import Explore from '../screens/exploreScreen/Explore';
import Upload from '../screens/uploadScreen/Upload';

function getTabBarIcon(routeName, focused, size, color) {
  let iconName;
  
  if (routeName === 'communities') {
    iconName = focused ? 'home' : 'home'; 
  } else if (routeName === 'profile') {
    iconName = focused ? 'user' : 'user'; 
  } else if (routeName === 'notifications') {
    iconName = focused ? 'bell' : 'bell';
  } else if (routeName === 'explore') {
    iconName = focused ? 'globe' : 'globe';
  } else if (routeName === 'upload') {
    iconName = focused ? 'plus' : 'plus';
  }
  
  return <FontAwesome name={iconName} size={size} color={color} />;
}
  
const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return getTabBarIcon(route.name, focused, size, color);
        },
      })}
      options={{
        tabBarLabel: ''
      }}
    >
      <Tab.Screen name="communities" component={Communities} options={{tabBarLabel: ''}}/>
      <Tab.Screen name="explore" component={Explore} options={{tabBarLabel: ''}}/>
      <Tab.Screen name="upload" component={Upload}  options={{tabBarLabel: ''}}/>
      <Tab.Screen name="notifications" component={Notifications} options={{tabBarLabel: ''}} />
      <Tab.Screen name="profile" component={Profile}   options={{tabBarLabel: ''}}/>
    </Tab.Navigator>
  );
}

export default BottomNavigation;
