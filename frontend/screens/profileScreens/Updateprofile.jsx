import React, { useEffect, useState } from 'react';
import { View, Image, Button,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = ({ navigation }) => {
  const [profileimageUri, setProfileImageUri] = useState(null);
  const [disabledbutton, setDisablebutton] = useState(true)
  const [uploadLoader,setUploadLoader] = useState(true)

  useEffect(() => {
    if (profileimageUri != null) {
      setDisablebutton(false)
    }
  }, [profileimageUri])




  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImageUri(result.assets[0].uri);
    }
  };
  const handleUpdateProfile = async () => {
    try {
      setUploadLoader(false)
      const value = await AsyncStorage.getItem('token');
      const formData = new FormData();
      if (profileimageUri) {
        const uriParts = profileimageUri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        formData.append("profileImage", {
          uri: profileimageUri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await axios.post(
        'http://192.168.151.38:7080/updateprofile',
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
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {profileimageUri && (
        <Image source={{ uri: profileimageUri }} style={{ width: 200, height: 200 }} />
      )}
      { uploadLoader?
        <Button
        title='update'
        onPress={handleUpdateProfile}
        disabled={disabledbutton}
      />
      :
      <Text>uploading...</Text>
      }
      
    </View>
  );
};

export default UserProfile;
