import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {formatMessageDate} from '../utils/dates';
import getMsgStatusIcon from '../utils/getMsgStatusIcon';

import Ionicons from '@react-native-vector-icons/ionicons';

const EachUser = ({data}) => {
  const navigate = useNavigation();

  return (
    <Pressable
      style={styles.eachUser_container}
      onPress={() => navigate.navigate('Message', {data})}>
      {data.image ? (
        <Image
          alt="user-profile"
          style={styles.user_image}
          source={{uri: data.image.url}}
        />
      ) : (
        <Image
          style={styles.user_image}
          source={require('../assets/images/superman.jpeg')}
          alt="user-profile"
        />
      )}
      <View style={styles.user_details}>
        <View style={styles.details_header}>
          <Text style={styles.name}>{data.name ?? 'User'}</Text>
          <Text style={styles.date}>{formatMessageDate(data.createdAt)}</Text>
        </View>
        <View style={styles.details_footer}>
          <Text style={styles.msg}>Image </Text>
          <Ionicons
            name={getMsgStatusIcon('seen')}
            size={16}
            color={true ? '#27ae72' : 'gray'}
          />
        </View>
      </View>
    </Pressable>
  );
};

const UsersList = ({users}) => {
  return (
    <ScrollView style={styles.container}>
      {users.map((each, index) => (
        <EachUser key={index} data={each} />
      ))}
    </ScrollView>
  );
};

export default memo(UsersList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  eachUser_container: {
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
    borderRadius: 45,
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
