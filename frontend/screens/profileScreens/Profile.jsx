import { StyleSheet, Text, View, Button ,FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserDetails = async (value) => {
    try {
      const response = await axios.get('http://192.168.55.107:7080/', {
        headers: {
          'content-type': 'application/json',
          'Authorization': value,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async (value) => {
    try {
      const response = await axios.get('http://192.168.55.107:7080/userposts', {
        headers: {
          'content-type': 'application/json',
          'Authorization': value,
        },
      });

      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          if (value !== null) {
            getUserDetails(value)
            getUserPosts(value)
            setLoading(false)
          }
        } catch (e) {
          console.log(e);
        }
      };
      getToken();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : user ? (
        <>
          <Text>Email: {user.email}</Text>
          <Text>Username: {user.username}</Text>
          <Button title="logout" onPress={handleLogout} />


          <FlatList
      data={posts}
      renderItem={({item}) => 
      <View key={item._id}>
      <Text>{item.title}</Text>
      <Text>{item.content}</Text>
      </View>
    }
    keyExtractor={(item) => (item._id ? item._id.toString() : Math.random().toString())}
    />
        </>
      ) : (
        <Text>No user data available.</Text>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
