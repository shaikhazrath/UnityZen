import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import React, { useState } from 'react'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS,FONTSIZE } from '../../theme/theme';
import CustomTextInput from '../../components/CustomTextInput'
import GradientButton from '../../components/GradentButton'
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('name@gmail.com');
  const [password, setPassword] = useState('name12345678')
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError]= useState('')
  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      console.log(e)
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleLogin = () => {
    const data = {
      email: email,
      password: password
    }
    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/signin`, data, { headers: { 'content-type': 'application/json' } }).then((response) => {
      storeToken(response.data.token)
      navigation.navigate('main')
    }).catch((error) => {
      setError(error.response.data)
    })

  }



  return (
    <View style={styles.screenContainer}>
    <Text
      style={{
        fontSize: FONTSIZE.font_size_1,
        color: COLORS.primary,
        textTransform: 'uppercase',
        letterSpacing: 15,
      }}>
      Login
    </Text>
    {
error ? <Text style={{color:'red'}}>{error}</Text>:   <Text style={{fontSize: 10, color: COLORS.accent, fontWeight: 'normal'}}>
Welcome back to Unityzen
</Text>
    }
 

    <CustomTextInput
      placeholder="email"
      value={email}
      onChangeText={text => setEmail(text)}
    />

    <CustomTextInput
      placeholder="Password"
      value={password}
      onChangeText={text => setPassword(text)}
    />

    <View style={{alignItems: 'flex-end', gap: 10,marginBottom:30}}>
      <GradientButton title={'Login'} filled={true} size={300} onPress={handleLogin}/>

      <TouchableOpacity >
        <Text style={{color:COLORS.accent}}>Forget password</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={() => navigation.navigate('signup')}>
      <Text style={{color:COLORS.accent}}>Dont have account ? Signup</Text>
    </TouchableOpacity>
  </View>
);

};

const styles = StyleSheet.create({
screenContainer: {
  flex: 1,
  backgroundColor: COLORS.secondary,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
},
});

export default LoginScreen; 