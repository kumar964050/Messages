import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Initial from '../screens/Initial';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Forgot-Password" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
