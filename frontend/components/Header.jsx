import { StyleSheet, Text, View,StatusBar ,TouchableOpacity} from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme'
import Icon from 'react-native-vector-icons/AntDesign';
import IconIoni from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
const Header = ({navigation}) => {
  const route = useRoute()
  const getIconComponent = () => {
    switch (route.name) {
      case 'Home':
        return <Icon name="search1" size={20} color={COLORS.primary} />;
      case 'Profile':
        return  <TouchableOpacity onPress={() => navigation.navigate('settings')}>
        <IconIoni name="settings" size={20} color={COLORS.primary} />
      </TouchableOpacity>
      default:
        return <Icon name="search1" size={20} color={COLORS.primary} />
    }
  };
  return (
    <>
    <StatusBar
    barStyle={COLORS.contentPrimary}
    hidden={false}
    backgroundColor={COLORS.secondary}
    translucent={true}
  />
    <View style={styles.header}>
      
      <Text style={styles.headerText}>UnityZen</Text>
      {getIconComponent()}
    </View> 
  
    </>
  )
}

export default Header

const styles = StyleSheet.create({
  header:{
    height:70,
    marginTop:25,
    backgroundColor:COLORS.secondary,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:25,
  },
  headerText:{
    color:COLORS.primary,
    fontWeight:'bold',
    fontSize:25
  }
})