import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import UsersList from '../components/UsersList';
import Link from '../components/Link';
import {useAuth} from '../hooks/useAuth';
import API_BASE from '../utils/api_base';
import {getData} from '../utils/storage';

const Chat = () => {
  const [searchText, setSearchText] = useState<String>('');
  const {userDetails} = useAuth();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // get all users from server
  useEffect(() => {
    (async () => {
      try {
        const url = `${API_BASE}/api/user`;
        const token = await getData('jwt-token');
        const res = await fetch(url, {
          method: 'GET',
          headers: {Authorization: `Bearer ${token}`},
        });
        const data = await res.json();
        if (data.status === 'success') {
          setUsers(data.data.users);
        }
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      [user.name, user.email, user.username].some(field =>
        field?.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }, [users, searchText]);
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={{alignItems: 'center', fontSize: 16}}>
          Hello!
          <Text style={styles.name}> {userDetails?.name ?? 'User'}</Text>
        </Text>
        <Link to={'UserProfile'}>
          {userDetails.image ? (
            <Image
              style={styles.header_img}
              source={{uri: userDetails?.image?.url}}
            />
          ) : (
            <Image
              style={styles.header_img}
              source={require('../assets/images/user.jpeg')}
            />
          )}
        </Link>
      </View>

      {/* loading  */}
      {isLoading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={32} />
        </View>
      )}
      {/* render users */}
      {!isLoading && filteredUsers.length > 0 && (
        <UsersList users={filteredUsers} />
      )}
      {/* user not found */}
      {!isLoading && filteredUsers.length === 0 && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Not Found</Text>
        </View>
      )}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_img: {width: 45, height: 45, borderRadius: 45, objectFit: 'cover'},
  name: {color: '#27AE60', fontWeight: 'bold'},
  search_container: {
    paddingHorizontal: 15,
    marginHorizontal: 10,
    height: 52,
    backgroundColor: '#eeeeee',
    borderColor: 'lightgrey',
    borderWidth: 0.9,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 52,
  },
});
