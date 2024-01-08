import { View,ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme'
const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:COLORS.secondary }}>
    <ActivityIndicator size="large" color="white"  />
  </View>
  )
}

export default Loading
