import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Createpost = () => {

    const [title , setTitle]= useState('namendhjdsjh');
    const [content,setContent] = useState('hsdhv sdjcjdscsdncmds cm dsjkcnsdkncm mds ckjwsckls sk cdsjkclsncs csdklmcmw lwvopd wkldlsc msd clowkdejfv kswkfd');
    const route = useRoute();
    const id = route.params.params.communityId
    
    const handelOnSubmit=async()=>{
      const value = await AsyncStorage.getItem('token');
        const data={
            title,
            content,
        }
        axios.post(`http://192.168.55.107:7080/createcommunityposts/${id}`, data, { headers: { 'content-type': 'application/json','Authorization': value } }).then((response) => {
          console.log(response)
        }).catch((error) => {
            console.log(error.response.data);
        })
    }
  return (
    <View>
        <TextInput
        placeholder='title'
        value={title}
        onChangeText={(value)=>setTitle(value)}
        />
         <TextInput
        placeholder='description'
        value={content}
        onChangeText={(value)=>setContent(value)}
        />
        <Button title='submit' onPress={handelOnSubmit}/>
    </View>
  )
}

export default Createpost

const styles = StyleSheet.create({})