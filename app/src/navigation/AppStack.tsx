import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Messages from '../screens/Messages';
import Call from '../screens/Call';
import Chat from '../screens/Chat';
import UserDetails from '../screens/UserDetails';
import Logout from '../screens/Logout';
import FontAwesome6 from '@react-native-vector-icons/ionicons';
import Preview from '../screens/Preview';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const screenOptions = ({route}) => {
    return {
      headerShown: false,
      tabBarIcon: ({focused, color, size}) => {
        let iconName = 'chatbubble-ellipses';
        if (route.name === 'Chat') {
          iconName = 'chatbubble-ellipses';
        } else if (route.name === 'UserProfile') {
          iconName = 'person';
        } else if (route.name === 'Logout') {
          iconName = 'log-out';
        } else {
        }

        return <FontAwesome6 name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#27AE60',
      tabBarStyle: {
        backgroundColor: '#fff',
        height: 60,
      },
    };
  };

  return (
    <Tab.Navigator initialRouteName="Chat" screenOptions={screenOptions}>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="UserProfile" component={UserDetails} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChatTab" component={BottomTabNavigation} />
      <Stack.Screen name="Call" component={Call} />
      <Stack.Screen name="Message" component={Messages} />
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
