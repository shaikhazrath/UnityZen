import { StyleSheet, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('hazrath@gmail.com');
  const [password, setPassword] = useState('hazrathali123')

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      console.log(e)
    }
  };


  const handelLogin = () => {
    const data = {
      email: email,
      password: password
    }
    axios.post('http://192.168.55.107:7080/signin', data, { headers: { 'content-type': 'application/json' } }).then((response) => {
      storeToken(response.data.token)
      navigation.navigate('main')
    }).catch((error) => {
      console.log(error.response.data)
    })

  }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='email'
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        placeholder='password'
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <Button title='Login' onPress={handelLogin} />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})