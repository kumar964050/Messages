import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useAuth} from '../hooks/useAuth';

const Logout = () => {
  const navigate = useNavigation();
  const {handleLogout} = useAuth();

  useEffect(() => {
    handleLogout();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#292929" size={32} />
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
