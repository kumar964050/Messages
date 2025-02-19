import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {removeAll} from '../utils/storage';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const nav = useNavigation();
  useEffect(() => {
    (async () => {
      // await removeAll();
      // nav.replace('login');
    })();
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
