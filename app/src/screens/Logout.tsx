import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {removeAll} from '../utils/storage';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const UserDetails = () => {
  const navigate = useNavigation();
  useEffect(() => {
    (async () => {
      await removeAll();
      Toast.show({type: 'success', text1: 'Logout Successfully'});
      navigate.replace('Login');
    })();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#292929" size={32} />
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
