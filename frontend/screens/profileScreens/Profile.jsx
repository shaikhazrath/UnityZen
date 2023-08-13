import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserDetails = async (value) => {
    try {
      const response = await axios.get('http://192.168.151.38:7080/profile', {
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
      const response = await axios.get('http://192.168.151.38:7080/userposts', {
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
  }, [user]);

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
          <Image
            source={{ uri: user.profiledetails.profileImage.url }}
            style={{ width: 100, height: 100 }}
          />
           <Image
            source={{ uri: user.profiledetails.bannerImage.url }}
            style={{ width: 100, height: 100 }}
          />

          <Text>Email: {user.user.email}</Text>
          <Text>Username: {user.user.username}</Text>
          <Button title="logout" onPress={handleLogout} />
          <Button title="Updateprofile" onPress={() => { navigation.navigate('updateprofile') }} />



          <FlatList
            data={posts}
            renderItem={({ item }) =>
              <View key={item._id}>
                <Text>{item.title}</Text>
                <Text>{item.content}</Text>
              </View>
            }
            keyExtractor={(item) => (item._id ? item._id.toString() : Math.random().toString())}
          />
        </>
      ) : (
        <Button title="Logout" onPress={handleLogout} />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
