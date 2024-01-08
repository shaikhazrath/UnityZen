import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS,SPACING } from '../theme/theme';

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.accent}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 10,
  },
  input: {
    height: 40,
    paddingLeft: 10,
    borderWidth: 1,
    borderBottomColor: COLORS.primary,
    color: COLORS.primary,
  },
});

export default CustomTextInput;
