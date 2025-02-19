import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../utils/storage';

const Initial = () => {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const token = await getData('jwt-token');
      if (token) {
        navigation.replace('home'); // Move to Home if token exists
      } else {
        console.log('Move to login');
        navigation.replace('login'); // Move to Login if no token
      }
    })();
  }, []);
  return (
    <View style={styles.screen_container}>
      <ActivityIndicator size={42} color="#66abcf" />
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
