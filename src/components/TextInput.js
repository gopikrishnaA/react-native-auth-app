import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: '#3D6DCC',
    borderWidth: 1,
    padding: 10
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 15,
    marginRight: 15
  }
});

const CustomTextInput = ({
  placeholder = 'Text',
  isError = false,
  errorMessage = 'Input error',
  maxLength = 40,
  onChangeText = () => { },
  secureTextEntry = false,
  value = ''
}) => {
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        placeholder={placeholder}
        placeholderTextColor="#cdcdcd"
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={text => onChangeText(text)}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        value={value}
      />
    {isError && <Text style={styles.error}>
        {errorMessage}</Text>}
    </View>
  );
};

export default CustomTextInput;
