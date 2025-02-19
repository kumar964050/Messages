import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// components
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Toast from 'react-native-toast-message';
import Link from '../components/Link';
//

interface formProps {
  email: string;
  errorMsg: string;
  emailError: string;
}

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState<formProps>({
    email: 'example@example.com',
    errorMsg: '',
    emailError: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigation();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const {email} = formData;

      if (email.trim() === '') {
        setFormData(preValue => ({
          ...preValue,
          emailError: 'required*',
          errorMsg: 'Please enter your email or username',
        }));
        return;
      }

      setFormData(preValue => ({
        ...preValue,
        errorMsg: '',
      }));
      const url = 'https://messages-ttbf.onrender.com/api/auth/forgot-password';
      const res = await fetch(url, {
        method: 'POST',
        headers: {'COntent-Type': 'application/json'},
        body: JSON.stringify({identifier: email}),
      });
      const data = await res.json();

      if (data.status === 'success') {
        Toast.show({
          type: 'success', // success | error | info
          text1: 'Forgot Password Request success',
          text2: data.message,
          visibilityTime: 4000,
          position: 'top',
        });
        navigate.replace('login');
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
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.description}>Please use your credentials</Text>
        </View>
        {/* email input */}
        <Input
          type="email-address"
          value={formData.email}
          handleChange={v => setFormData(prev => ({...prev, email: v}))}
          label="Please enter your Email or Username"
          placeholder="Email or Username"
          errorMsg={formData.emailError}
        />

        <View style={styles.link_container}>
          <Text style={styles.error_msg}>{formData.errorMsg}</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size={30} color="#282828" />
        ) : (
          <CustomButton handleClick={handleSubmit}>
            Forgot Password
          </CustomButton>
        )}
        <Link to="login" title="Back to Login?" style={{marginTop: 5}} />
      </View>
    </View>
  );
};

export default ForgotPassword;

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
