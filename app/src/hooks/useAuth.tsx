import React, {createContext, useContext, useEffect, useState} from 'react';

import {getData, removeAll} from '../utils/storage';
import API_BASE from '../utils/api_base';
import Toast from 'react-native-toast-message';

const AuthContext = createContext<object>({});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [userDetails, setUserDetails] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

  const handleLogin = data => {
    setUserDetails(data);
    setIsAuthenticated(true);
    setIsLoading(false);
  };
  const handleLogout = async () => {
    await removeAll();
    setUserDetails(null);
    setIsAuthenticated(false);
    setIsLoading(false);
    Toast.show({type: 'success', text1: 'Logout Successfully'});
  };

  const getMyProfile = async () => {
    const token = await getData('jwt-token');
    if (!token) {
      handleLogout();
      return;
    }
    try {
      const url = `${API_BASE}/api/user/my-profile`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {Authorization: `bearer ${token}`},
      });
      const data = await res.json();
      if (data.status === 'success') {
        Toast.show({type: 'success', text1: 'Authorized completed'});
        handleLogin(data.data.user);
      } else {
        Toast.show({type: 'error', text1: data.message});
      }
    } catch (error: any) {
      Toast.show({type: 'error', text1: error?.message});
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        userDetails,
        handleLogin,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
