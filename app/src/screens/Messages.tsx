import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import IonIcons from '@react-native-vector-icons/ionicons';
import Link from '../components/Link';

import MessagesList from '../components/MessagesList';
import API_BASE from '../utils/api_base';
import {getData} from '../utils/storage';
import {useAuth} from '../hooks/useAuth';
import uuid from 'react-native-uuid';
import * as ImagePicker from 'react-native-image-picker';

import {v4 as uuidv4} from 'uuid';

interface Message {
  msg_id: string;
  type: 'text' | 'image' | 'video';
  content: string;
  from: string;
  to: string;
  status: 'pending' | 'sent' | 'delivered' | 'seen';
  createdAt: number; // Using Date.now() which returns a timestamp
  [key: string]: any; // Allow unknown additional fields
}

const Messages = ({route}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [textMessage, settextMessage] = useState<String>('');
  const {data} = route.params;
  const {userDetails} = useAuth();
  const isOnline = true;

  const handleUpdateMsgStatus = (msgId: string, status: string) => {};
  const handleDeleteMsg = (msgId: string) => {
    setMessages(prev => prev.filter(msg => msg.msg_id !== msgId));
  };

  const handleSendMessage = async () => {
    const content = textMessage.trim();
    if (content === '') return;
    const msg = {
      msg_id: uuid.v4(),
      type: 'text',
      content: content,
      from: userDetails._id,
      to: data._id,
      status: 'pending',
      createdAt: Date.now(),
    };

    // send via socket here

    try {
      setMessages((preV): Message[] => [...preV, msg]);
      const url = `${API_BASE}/api/msg/send`;
      const token = await getData('jwt-token');
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(msg),
      });
      const resData = await res.json();

      // updating msg status here
      setMessages(preValue =>
        preValue.map((eachMsg): Message => {
          if (eachMsg.msg_id === resData.data.message.msg_id) {
            return {...resData.data.message, status: 'sent'};
            // return {...resData.data.message, status :"sent"};
          }
          return eachMsg;
        }),
      );
    } catch (error) {
    } finally {
      //
    }

    settextMessage('');
  };

  const handleSendImage = async imageAsset => {
    if (!imageAsset) return;
    const formData = new FormData();
    formData.append('image', {
      uri: imageAsset.uri,
      type: imageAsset.type || 'image/jpeg',
      name: imageAsset.fileName || `IMG_${Date.now()}.jpg`,
    });
    formData.append('to', data._id);

    try {
      const url = `${API_BASE}/api/msg/send-image`;
      const token = await getData('jwt-token');
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const resData = await res.json();
      setMessages(preValue => [...preValue, resData.data.message]);
      // send via socket here
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };
  const handlePickImage = () => {
    console.log('first');
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', quality: 1},
      response => {
        if (!response.didCancel && response.assets) {
          handleSendImage(response.assets[0]);
        }
      },
    );
  };

  // get messages from DB
  useEffect(() => {
    (async () => {
      try {
        const url = `${API_BASE}/api/msg/get`;
        const token = await getData('jwt-token');
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({from: userDetails._id, to: data._id}),
        });
        const resData = await res.json();
        setMessages(resData.data.messages);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        {data.image ? (
          <Image
            style={styles.user_image}
            source={{uri: data.image.url}}
            alt="user-profile"
          />
        ) : (
          <Image
            style={styles.user_image}
            source={require('../assets/images/user.jpeg')}
            alt="user-profile"
          />
        )}
        <View style={styles.details_container}>
          <Text style={styles.name}>{data.name ?? 'User'}</Text>
          <Text style={[styles.online_status, !isOnline && {color: 'red'}]}>
            {isOnline ? 'online' : 'offline'}
          </Text>
        </View>

        <Link to="Call">
          <IonIcons name="videocam" size={22} color="#27AE60" />
        </Link>
      </View>
      {!isLoading && messages.length === 0 && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No Messages found</Text>
        </View>
      )}
      {messages.length > 0 && <MessagesList messages={messages} />}
      <View style={styles.footer_container}>
        <IonIcons name="attach" size={26} onPress={handlePickImage} />
        <TextInput
          style={styles.input}
          value={textMessage}
          onChangeText={v => settextMessage(v)}
          placeholder="here..."
        />
        <IonIcons name="send" size={22} onPress={handleSendMessage} />
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
  },
  user_image: {
    width: 45,
    height: 45,
    borderRadius: 45,
  },
  details_container: {
    flex: 1,
  },
  name: {
    fontSize: 16,
  },
  online_status: {
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '500',
  },
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

  footer_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 8,
    marginTop: 12,
    backgroundColor: 'lightgrey',
    paddingEnd: 9,
  },
  input: {flex: 1, paddingRight: 7},
});
