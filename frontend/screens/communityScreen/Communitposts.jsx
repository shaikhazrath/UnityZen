import { StyleSheet, Text, View,TouchableOpacity,FlatList, Button } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Communitposts = ({navigation}) => {
    const [posts,setPosts] = useState();
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const communityId = route.params.communityId;

    const getCommunityPosts = async (value) => {
        try {
          const response = await axios.get(`http://192.168.151.38:7080/getcommunityposts/${communityId}`, {
            headers: {
              'content-type': 'application/json',
              'Authorization': value,
            },
          });
    
          setPosts(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(()=>{
        const runAll = async () => {
          try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
            getCommunityPosts(value);
              setLoading(false)
            }
          } catch (e) {
            console.log(e);
          }
        };
        runAll();
      },)


      const handelcreatepost=(event)=>{
  event.preventDefault();
  navigation.navigate('createpost',route); 


      }
  return (
    <View>
    <FlatList
  data={posts}
  renderItem={({ item }) => (
    <View key={item._id}>
      <Text>{item.title}</Text>
      <Text>{item.content}</Text>

    </View>

  )}
  keyExtractor={(item) => (item._id ? item._id.toString() : Math.random().toString())}
/>

<Button title='upload new post' onPress={(event) => handelcreatepost(event)}/>
    </View>
  )
}

export default Communitposts

const styles = StyleSheet.create({})