import { Ionicons } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/profileScreens/Profile';
import Communities from '../screens/communityScreen/Communities';

function getTabBarIcon(routeName, focused, size, color) {
    let iconName;
  
    if (routeName === 'communities') {
      iconName = focused ? 'home' : 'home-outline'; 
    } else if (routeName === 'profile') {
      iconName = focused ? 'person' : 'person-outline'; 
    }
  
    return <Ionicons name={iconName} size={size} color={color} />;
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
      >
        <Tab.Screen name="communities" component={Communities} />
        <Tab.Screen name="profile" component={Profile} />
      </Tab.Navigator>
    );
  }

export default BottomNavigation
