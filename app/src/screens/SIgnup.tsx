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
import API_BASE from '../utils/api_base';
import {useAuth} from '../hooks/useAuth';

interface formProps {
  email: string;
  password: string;
  errorMsg: string;
  emailError: string;
  passwordError: string;
}

//todo : toggle password
const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<formProps>({
    email: '',
    password: '',
    errorMsg: '',
    emailError: '',
    passwordError: '',
  });
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const navigate = useNavigation();
  const {handleLogin} = useAuth();

  const handleChange = (key: string, value: string) => {
    setFormData(preValue => ({...preValue, [key]: value}));
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const {email, password} = formData;

      if (email.trim() === '' && password.trim() === '') {
        setFormData(preValue => ({
          ...preValue,
          emailError: 'required*',
          passwordError: 'required*',
          errorMsg: 'Please enter your email & password',
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
      const url = `${API_BASE}/api/auth/signup`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {'COntent-Type': 'application/json'},
        body: JSON.stringify({password, email}),
      });
      const data = await res.json();

      if (data.status === 'success') {
        Toast.show({type: 'success', text1: data.message});
        await storeData('jwt-token', data.token);
        handleLogin(data.data.user);
      } else {
        setFormData(preValue => ({
          ...preValue,
          errorMsg: data.message,
        }));
      }
    } catch (error: any) {
      Toast.show({type: 'error', text1: error?.message});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screen_container}>
      <View style={styles.form_container}>
        {/* form title */}
        <View style={styles.title_container}>
          <Text style={styles.title}>Signup</Text>
          <Text style={styles.description}>
            Please Signup with your details
          </Text>
        </View>
        {/* email input */}
        <Input
          type="email-address"
          value={formData.email}
          handleChange={v => handleChange('email', v)}
          label="Please enter your Email"
          placeholder="Email address"
          errorMsg={formData.emailError}
        />
        {/* password input */}
        <Input
          type="password"
          value={formData.password}
          handleChange={v => handleChange('password', v)}
          label="Please enter a Password"
          placeholder="Password"
          errorMsg={formData.passwordError}
        />
        <View style={styles.link_container}>
          <Text style={styles.error_msg}>{formData.errorMsg}</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size={30} color="#282828" />
        ) : (
          <CustomButton handleClick={handleSubmit}>Signup</CustomButton>
        )}
        <Link to="Login" type="replace" style={{marginTop: 5}}>
          <Text>Already have an account?</Text>
        </Link>
      </View>
    </View>
  );
};

export default SignUp;

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
    color: '#27AE60',
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
