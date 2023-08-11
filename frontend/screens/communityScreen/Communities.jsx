import { StyleSheet, Text, View ,FlatList,TouchableOpacity, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Communities = ({navigation}) => {
  const [UserCommunity,setUserCommunity] = useState();
  const [loading, setLoading] = useState(true);

  const getUserCommunity = async (value) => {
    try {
      const response = await axios.get('http://192.168.55.107:7080/getusercommunity', {
        headers: {
          'content-type': 'application/json',
          'Authorization': value,
        },
      });

      setUserCommunity(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    const runAll = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          getUserCommunity(value);
          setLoading(false)
        }
      } catch (e) {
        console.log(e);
      }
    };
    runAll();
  },)

const  handleViewCommunity =(event, communityId)=>{
  event.preventDefault();
  navigation.navigate('communitposts', { communityId }); 

}

  return (
    <View>
    {loading ? (
      <Text>Loading...</Text>
    ) : (
      <>
<FlatList
  data={UserCommunity}
  renderItem={({ item }) => (
    <View key={item._id}>
    <TouchableOpacity onPress={(event) => handleViewCommunity(event, item._id)}>
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>

    </View>

  )}
  keyExtractor={(item) => (item._id ? item._id.toString() : Math.random().toString())}
/>
      </>
    )}


  
  </View>
  )
}

export default Communities

const styles = StyleSheet.create({})