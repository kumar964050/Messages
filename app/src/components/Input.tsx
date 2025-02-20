import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

interface InputProps {
  label?: string;
  type: any;
  placeholder: string;
  value: any;
  handleChange: (value: string) => void;
  errorMsg?: string;
  style?: any;
  //   rest: any;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  value,
  handleChange,
  errorMsg,
  style,
}) => {
  const isSecureField = type === 'password' ? true : false;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={type}
        style={[styles.input, style]}
        value={value}
        onChangeText={(text: string) => handleChange(text)}
        placeholder={placeholder}
        placeholderTextColor={'#000'}
        secureTextEntry={isSecureField}
      />
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {width: '100%', marginTop: 15},
  label: {fontSize: 12, marginBottom: 5},
  input: {
    color: '#000',
    height: 52,
    fontSize: 14,
    borderRadius: 6,
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 15,
  },
  error: {color: 'red', fontSize: 12},
});
