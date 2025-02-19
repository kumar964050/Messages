import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({children, handleClick}) => {
  return (
    <Pressable
      style={styles.container}
      android_ripple={{color: '#2990909'}}
      onPress={handleClick}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#282828',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    color: '#fff',
  },
});
