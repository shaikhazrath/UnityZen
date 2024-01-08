import { StyleSheet, Text, View, FlatList, TouchableOpacity,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Header from '../../components/Header';

const HomeScreen = ({ navigation }) => {
  const [UserCommunity, setUserCommunity] = useState();
  const [loading, setLoading] = useState(true);
4

  const getUserCommunity = async (value) => {
    try {
      const response = await axios.get('http://192.168.151.38:7080/getusercommunity', {
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
  useEffect(() => {
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
  },[])

  const handleViewCommunity = (event, communityId) => {
    event.preventDefault();
    navigation.navigate('communitposts', { communityId });

  }

  return (
    <View>
      <Header/>
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
                  <Image 
                    source={{ uri: item.communityImage.url }}
                    style={{ width: 100, height: 100 }}
                  />
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

export default HomeScreen

const styles = StyleSheet.create({})