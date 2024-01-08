import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTSIZE } from '../theme/theme';

const GradientButton = ({ onPress, title, filled, size }) => {
  const buttonColors = filled
    ? ['#8E2DE2', '#4A00E0']
    : ['#8E2DE2', '#4A00E0'];

  const textColor = filled ? 'white' : 'black';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} >
      <LinearGradient
        colors={buttonColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 4,
          borderWidth: filled ? 0 : 1, // Add border for unfilled state
          width:size ,
          height:40 ,
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <Text style={{ fontSize: FONTSIZE.font_size_2, color:textColor, fontWeight: 'bold' }}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
