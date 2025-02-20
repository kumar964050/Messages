import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Input from '../components/Input';
import UsersList from '../components/UsersList';
import Link from '../components/Link';

const Chat = () => {
  const [searchText, setSearchText] = useState<String>('');

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={{alignItems: 'center'}}>
          Hello!
          <Text style={styles.name}> User</Text>
        </Text>
        <Link to={'Update-Details'}>
          <Image
            style={styles.header_img}
            source={require('../assets/images/user.jpeg')}
          />
        </Link>
      </View>
      {/* search user or msg */}
      <View style={styles.search_container}>
        <Input
          label=""
          type="normal-text"
          placeholder="Search here..."
          value={searchText}
          handleChange={v => setSearchText(v)}
          style={{borderColor: '#27AE60'}}
        />
      </View>
      {/* chat Lists here */}
      <UsersList />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_img: {width: 45, height: 45},
  name: {color: '#27AE60', fontWeight: 'bold'},
  search_container: {
    padding: 10,
    marginTop: -35,
  },
});
