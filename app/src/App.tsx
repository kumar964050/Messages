import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';

// screens
import Initial from './screens/Initial';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ForgotPassword from './screens/ForgotPassword';
import Logout from './screens/Logout';

// need to implement
import UpdateDetails from './screens/UpdateDetails';
import Messages from './screens/Messages';
import Chat from './screens/Chat';
import Call from './screens/Call';

// navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  );
};

const StackNavigation = () => {
  const options = {headerShown: false};
  return (
    <Stack.Navigator>
      <Stack.Screen name="Initial" component={Initial} options={options} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot-Password" component={ForgotPassword} />
      <Stack.Screen name="Update-Details" component={UpdateDetails} />
      <Stack.Screen name="Chat" component={BottomTabNavigation} />
      <Stack.Screen name="Call" component={Call} />
      <Stack.Screen name="Message" component={Messages} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
