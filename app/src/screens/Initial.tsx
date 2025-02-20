import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../utils/storage';

const Initial = () => {
  const navigate = useNavigation();

  useEffect(() => {
    (async () => {
      const token = await getData('jwt-token');
      if (token) {
        navigate.replace('Chat');
      } else {
        navigate.replace('Login');
      }
    })();
  }, []);
  return (
    <View style={styles.screen_container}>
      <ActivityIndicator size={42} color="#27AE60" />
    </View>
  );
};

export default Initial;

const styles = StyleSheet.create({
  screen_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
