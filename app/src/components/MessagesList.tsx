import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import IonIcons from '@react-native-vector-icons/ionicons';
import {formatMessageDate} from '../utils/dates';
import getMsgStatusIcon from '../utils/getMsgStatusIcon';
import {useAuth} from '../hooks/useAuth';

const EachMessage = ({data}) => {
  const {userDetails} = useAuth();
  const id = userDetails._id;
  const navigate = useNavigation();

  const getMsg = (type, content) => {
    switch (type) {
      case 'image':
        return (
          <TouchableOpacity
            onPress={() => navigate.navigate('Preview', {data})}>
            <Image style={styles.img_msg} source={{uri: data.image.url}} />
          </TouchableOpacity>
        );

      default:
        return (
          <Text
            style={[
              styles.text_msg,
              id === data.from && {backgroundColor: '#25ae75', color: '#fff'},
            ]}>
            {content}
          </Text>
        );
    }
  };

  return (
    <View
      style={[
        styles.each_msg,
        id === data.from && {
          justifyContent: 'flex-end',
        },
      ]}>
      <View>
        {/* <Text
            style={[
              styles.text_msg,
              id === data.from && {backgroundColor: '#25ae75', color: '#fff'},
            ]}>
            {data.content}
          </Text> */}
        {getMsg(data.type, data.content)}

        <View
          style={[
            {flexDirection: 'row', gap: 10},
            id === data.from && {justifyContent: 'flex-end'},
          ]}>
          <Text style={styles.date}>{formatMessageDate(data.createdAt)}</Text>
          {id === data.from && (
            <IonIcons
              name={getMsgStatusIcon(data.status)}
              size={16}
              color={data.status === 'seen' ? '#27ae72' : 'gray'}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const MessagesList = ({messages}) => {
  return (
    <ScrollView style={styles.body_container}>
      {messages.map((msg, index) => (
        <EachMessage data={msg} key={index} />
      ))}
    </ScrollView>
  );
};

export default MessagesList;

const styles = StyleSheet.create({
  body_container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  each_msg: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 3,
  },
  text_msg: {
    backgroundColor: 'grey',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  img_msg: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: 'lightgrey',
  },
  date: {fontSize: 12},
});
