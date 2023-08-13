import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Upload = ({navigation}) => {
  return (
    <View>
      <Text>Upload</Text>
      <Button title='createcommunity' onPress={()=>{navigation.navigate('createcommunity')}}/>
    </View>
  )
}

export default Upload

const styles = StyleSheet.create({

})