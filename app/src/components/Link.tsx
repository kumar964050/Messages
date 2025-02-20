import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface LinkProps {
  to: any;
  type?: 'navigate' | 'push' | 'replace';
  children: React.ReactNode;
  style?: object;
}

const Link: React.FC<LinkProps> = ({to, type, children, style}) => {
  const navigation = useNavigation();

  const handleClick = () => {
    if (type === 'push') {
      navigation.push(to);
    } else if (type === 'replace') {
      navigation.replace(to);
    } else {
      navigation.navigate(to);
    }
  };

  return (
    <TouchableOpacity onPress={handleClick} style={[styles.link, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  link: {},
});
