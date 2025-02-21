import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';

const FullLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={32} color={'#454545'} />
    </View>
  );
};

export default FullLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
