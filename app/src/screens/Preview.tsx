import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

// todo add zooming feature
const Preview = ({route}) => {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{uri: data.image.url}} />
      <Text>hi</Text>
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  container: {flex: 1},
  img: {
    width: '100%',
    height: '100%',
    flex: 1,
    objectFit: 'cover',
  },
});
