import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// components
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Toast from 'react-native-toast-message';
import Link from '../components/Link';
//
import {storeData} from '../utils/storage';

interface formProps {
  email: string;
  password: string;
  errorMsg: string;
  emailError: string;
  passwordError: string;
}

// TODO : add link
const Login: React.FC = () => {
  const [formData, setFormData] = useState<formProps>({
    email: 'example@example.com',
    password: 'Test@100',
    errorMsg: '',
    emailError: '',
    passwordError: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigation();

  const handleChange = (key: string, value: string) => {
    setFormData(preValue => ({...preValue, [key]: value}));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const {email, password} = formData;

      if (email.trim() === '' && password.trim() === '') {
        setFormData(preValue => ({
          ...preValue,
          emailError: 'required*',
          passwordError: 'required*',
          errorMsg: 'Please enter your credentials',
        }));
        return;
      }
      if (email.trim() === '') {
        setFormData(preValue => ({
          ...preValue,
          emailError: 'required*',
          passwordError: '',
          errorMsg: 'Please enter your email id',
        }));
        return;
      }
      if (password.trim() === '') {
        setFormData(preValue => ({
          ...preValue,
          emailError: '',
          passwordError: 'required*',
          errorMsg: 'Please enter your password',
        }));
        return;
      }
      setFormData(preValue => ({
        ...preValue,
        emailError: '',
        passwordError: '',
        errorMsg: '',
      }));
      const url = 'https://messages-ttbf.onrender.com/api/auth/login';
      const res = await fetch(url, {
        method: 'POST',
        headers: {'COntent-Type': 'application/json'},
        body: JSON.stringify({password, identifier: email}),
      });
      const data = await res.json();

      if (data.status === 'success') {
        Toast.show({
          type: 'success', // success | error | info
          text1: 'Login Success',
          text2: 'user login successfully',
          visibilityTime: 4000,
          position: 'top',
        });
        await storeData('jwt-token', data.token);
        navigate.replace('home');
      } else {
        setFormData(preValue => ({
          ...preValue,
          errorMsg: data.message,
        }));
      }

      // do validation
      // api call
      // store token in local storage , and redux store
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch',
        text2: error?.message,
        visibilityTime: 2500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screen_container}>
      <View style={styles.form_container}>
        {/* form title */}
        <View style={styles.title_container}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.description}>Please login with your details</Text>
        </View>
        {/* email input */}
        <Input
          type="email-address"
          value={formData.email}
          handleChange={v => handleChange('email', v)}
          label="Please enter your Email or Username"
          placeholder="Email or Username"
          errorMsg={formData.emailError}
        />
        {/* password input */}
        <Input
          type="password"
          value={formData.password}
          handleChange={v => handleChange('password', v)}
          label="Please enter your Password"
          placeholder="Password"
          errorMsg={formData.passwordError}
        />
        <View style={styles.link_container}>
          <Text style={styles.error_msg}>{formData.errorMsg}</Text>
          <Link
            to="forgot-password"
            title="forgot password?"
            style={{marginTop: 5}}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator size={30} color="#282828" />
        ) : (
          <CustomButton handleClick={handleSubmit}>Login</CustomButton>
        )}
        <Link to="signup" title="Create an account?" style={{marginTop: 5}} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },
  form_container: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  title_container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  description: {
    fontSize: 14,
  },
  link_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  link: {},
  error_msg: {color: 'red', fontSize: 12},
});
