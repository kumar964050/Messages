import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {AuthProvider, useAuth} from './hooks/useAuth'; // Use the new AuthContext
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import FullLoading from './components/FullLoading';

const RootNavigation = () => {
  const {isLoading, isAuthenticated} = useAuth(); // Get user state from AuthContext

  if (isLoading) return <FullLoading />;

  return (
    <NavigationContainer>
      {!isLoading && isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RootNavigation />
      <Toast />
    </AuthProvider>
  );
};

export default App;
