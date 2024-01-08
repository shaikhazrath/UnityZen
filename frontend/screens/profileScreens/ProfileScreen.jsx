import { StyleSheet, Text, View, Button, FlatList, Image,ScrollView,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS,FONTSIZE,SPACING } from '../../theme/theme';
import GradientButton from '../../components/GradentButton';
import Header from '../../components/Header'
import Loading from '../../components/Loading';
const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState()


  const getUser = async (value) => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/profile`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': value,
        },
      });
      console.log(response.data)
      setUser(response.data);
    } catch (error) {
      setError(error);
    }
  };


 useEffect(() => {
  const fetchresponse = async () => {
    try {
      setLoading(true); 
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        await getUser(value);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false); 
    }
  };
  fetchresponse();
}, []);
 
if(loading ==  true) {
return(
<Loading/>
)
}

  return (
    <ScrollView style={styles.screenContainer}>
  <Header navigation={navigation} />
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: SPACING.space_1,
        paddingVertical: SPACING.space_2,
      }}>
      <Image
        source={{ uri: user.profiledata.profileImage.url }}
        style={styles.profileImage}
      />
      <View style={{gap: 2}}>
        <Text style={styles.primaryText}>{user.user.username}</Text>
        <Text style={styles.subText}>UI/UX designer</Text>
      </View>
    </View>
    {/* countsection */}
    {/* <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10,
        paddingHorizontal: SPACING.space_1,
        paddingVertical: SPACING.space_2,
      }}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.primaryText}>20k</Text>
        <Text>communities</Text>
      </View>
    
      <View style={{alignItems: 'center'}}>
        <Text style={styles.primaryText}>20k</Text>
        <Text>connections</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.primaryText}>20k</Text>
        <Text>posts</Text>
      </View>
    </View> */}
    {/* actionbuttons */}
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: SPACING.space_1,
        paddingVertical: SPACING.space_2,
      }}>
      <GradientButton title="connect" filled={true} size={300} />

    </View>
    {/* aboutsection */}
    <View
      style={{
        gap: 10,
        paddingHorizontal: SPACING.space_1,
        paddingVertical: SPACING.space_2,
        flexDirection: 'column',
      }}>
      <Text style={styles.secondaryText}>About</Text>
      <Text style={styles.subText}>
        Hello, I'm a passionate UI/UX designer with a keen eye for creating
        intuitive and visually appealing digital experiences. My expertise
        lies in blending creativity with user-centric design principles to
        craft interfaces that not only look stunning but also enhance user
        satisfaction and functionality I thrive on solving design challenges
        and staying abreast of emerging trends to deliver innovative and
        user-friendly solutions. Let's collaborate to bring your digital
        visions to life!
      </Text>
    </View>
    {/* communities */}
    {/* <View
      style={{
        gap: 10,
        paddingHorizontal: SPACING.space_1,
        paddingVertical: SPACING.space_2,
        flexDirection: 'column',
      }}>
      <Text style={styles.secondaryText}>Communities</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
        {imageData.map((url, index) => (
          <View style={{}}>
            <Image
              key={index}
              source={{uri: url}}
              style={{width: 90, height: 90, margin: 5 ,borderRadius:100}}
            />
            <Text style={styles.subText}>Community name</Text>
          </View>
        ))}
      </View>
    </View> */}
  </ScrollView>
);
};

export default ProfileScreen;

const styles = StyleSheet.create({
screenContainer: {
  flex: 1,
  backgroundColor: COLORS.secondary,
},
profileImage: {
  height: 100,
  width: 100,
  borderRadius: 100,
},
primaryText: {
  fontSize: FONTSIZE.font_size_1,
  fontWeight: 'bold',
  color: COLORS.primary,
},
secondaryText: {
  fontSize: FONTSIZE.font_size_2,
  fontWeight: 'normal',
  color: COLORS.primary,
},
subText: {
  fontSize: FONTSIZE.font_size_3,
  fontWeight: 'normal',
  color: COLORS.accent,
  letterSpacing: -0.5,
  lineHeight: 25,
},
});