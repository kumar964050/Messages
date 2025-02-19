import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface LinkProps {
  to: any;
  title: string;
  style?: any;
}

const Link: React.FC<LinkProps> = ({to, title, style}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(to)}>
      <Text style={[{fontSize: 12, textDecorationLine: 'underline'}, style]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Link;
