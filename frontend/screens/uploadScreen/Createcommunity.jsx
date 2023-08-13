import { StyleSheet, Text, TextInput, View ,Button,Image} from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Createcommunity = ({navigation}) => {
    const [name,setName] =  useState('jkdsjkjds')
    const [description,setDescription] = useState('jksdjksdjkcsjkkcsdkj')
    const [communityImage,setCommunityImage] = useState('')
    const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setCommunityImage(result.assets[0].uri);
      }
    };
    const handlecreatecommunity = async()=>{
      try {
        const value = await AsyncStorage.getItem('token');
        const formData = new FormData();
        formData.append('name',name)
        formData.append('description',description)

        if (communityImage) {
          const uriParts = communityImage.split(".");
          const fileType = uriParts[uriParts.length - 1];
          formData.append("communityImage", {
            uri: communityImage,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
          });
        }
  
        const response = await axios.post(
          'http://192.168.151.38:7080/createcommunity',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': value
            },
          }
        );
  
        navigation.navigate('main',{screen:'profile'});
  
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  return (
    <View>
      <Text>Createcommunity</Text>
      <TextInput
          placeholder="name"
          placeholderTextColor='#8D8D8D'
          onChangeText={text => setName(text)}
          value={name}
          autoCapitalize="none"
      />
       <TextInput
          placeholder="description"
          placeholderTextColor='#8D8D8D'
          onChangeText={text => setDescription(text)}
          value={description}
          autoCapitalize="none"
      />
         <Button title="Pick an image from camera roll" onPress={pickImage} />
      {communityImage && (
        <Image source={{ uri: communityImage }} style={{ width: 200, height: 200 }} />
      )}
      <Button title='createcommunity' onPress={handlecreatecommunity}/>

    </View>
  )
}

export default Createcommunity

const styles = StyleSheet.create({})