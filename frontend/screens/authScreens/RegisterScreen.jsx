import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS,FONTSIZE } from '../../theme/theme';
import CustomTextInput from '../../components/CustomTextInput'
import GradientButton from '../../components/GradentButton'

const RegisterScreen = ({ navigation }) => {
    const [username,setUsername] = useState('name')
  const [email, setEmail] = useState('name@gmail.com');
  const [password, setPassword] = useState('name12345678')

  const [error,setError] = useState('')


  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      console.error('Error storing token:', e);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/signup`,
        {
          username: username,
          email: email,
          password: password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      storeToken(response.data.token);
      navigation.navigate('main');
    } catch (error) {
      console.error('Signup error:', error);

      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError('Network error. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };



  return (
    <View style={styles.screenContainer}>
    <Text
      style={{
        fontSize: FONTSIZE.font_size_1,
        color: COLORS.primary,
        textTransform: 'uppercase',
        letterSpacing: 15,
      }}>
      SignUp
    </Text>
    {
  error ? (
    <Text style={{ color: 'red' }}>{error}</Text>
  ) : (
    <Text style={{ fontSize: 10, color: COLORS.accent, fontWeight: 'normal' }}>
      Welcome to Unityzen
    </Text>
  )
}


    <CustomTextInput
      placeholder="Username"
      value={username}
      onChangeText={text => setUsername(text)}
    />

    <CustomTextInput
      placeholder="Email"
      keyboardType="email-address"
      value={email}
      onChangeText={text => setEmail(text)}
    />

    <CustomTextInput
      placeholder="Password"
      secureTextEntry={true}
      value={password}
      onChangeText={text => setPassword(text)}
    />

    <View style={{alignItems: 'flex-end', gap: 10, marginBottom: 30}}>
      <GradientButton title={'Signup'} filled={true} size={300}  onPress={handlesignup}/>
    </View>

    <TouchableOpacity onPress={() => navigation.navigate('login')}>
      <Text style={{ color: COLORS.accent}}>Already have account ? Login </Text>
    </TouchableOpacity>
  </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});