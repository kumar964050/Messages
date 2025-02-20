import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const EachUser = () => {
  const navigate = useNavigation();
  return (
    <Pressable
      style={styles.eachUser_container}
      onPress={() => navigate.navigate('Message')}>
      <Image
        style={styles.user_image}
        source={require('../assets/images/user.jpeg')}
      />
      <View style={styles.user_details}>
        <View style={styles.details_header}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.date}>date</Text>
        </View>
        <View style={styles.details_footer}>
          <Text style={styles.msg}>msg</Text>
          <Text style={styles.status}>status</Text>
        </View>
      </View>
    </Pressable>
  );
};

const UsersList = () => {
  const list = new Array(100).fill(null);
  return (
    <ScrollView style={styles.container}>
      {list.map((each, index) => (
        <EachUser key={index} />
      ))}
    </ScrollView>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  eachUser_container: {
    // backgroundColor: '#f2f2f2',
    backgroundColor: '#fff',
    elevation: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 1,
    flexDirection: 'row',
    gap: 10,
    marginBlock: 5,
  },
  user_image: {
    width: 45,
    height: 45,
  },
  user_details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  details_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {fontSize: 14},
  date: {fontSize: 12, color: 'grey'},
  details_footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  msg: {fontSize: 12, color: 'grey'},
  status: {fontSize: 11, color: 'grey'},
});
