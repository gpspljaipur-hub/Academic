import React, { useState } from 'react';
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import { APP_TEXT } from '../../../comman/String';
import { styles } from './Styles';
import { handleNavigation } from '../../../navigation/RootNavigator';
import { useNavigation } from '@react-navigation/native';
import Images from '../../../comman/Images';
import { Auth_Api } from '../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../Lib/ApiService/ApiUrl';
import Helper from '../../../Lib/HelperFiles/Helper';
import validate from '../../../Lib/HelperFiles/validation/validate_wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../Redux/Reducers/Userslice';
import AsyncStorageHelper from '../../../Lib/HelperFiles/AsyncStorageHelper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from '../../../Lib/ApiService/Config';

const SignupScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { name, Email } = route?.params || {};
  console.log('Signup screen params:', name, Email);
  const { userType } = useSelector((state: any) => state.user);
  const [fullName, setFullName] = useState(name || '');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState(Email || '');
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  // Configure Google Sign-In
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GoogleWebClientId, // Replace with your actual web client ID from Google Console
      offlineAccess: true,
    });
  }, []);

  const checkValidation = () => {
    const nameErr = validate('full_name', fullName);
    const mobileErr = validate('mobile', mobile);
    const emailErr = validate('email', email);
    if (nameErr || mobileErr || emailErr) {
      setNameError(nameErr);
      setMobileError(mobileErr);
      setEmailError(emailErr);
      return false;
    }

    setNameError('');
    setMobileError('');
    setEmailError('');
    return true;
  };

  const HandleSignup = async () => {
    if (!checkValidation()) {
      return;
    }
    setLoading(true);
    try {
      const payload = { name: fullName, number: mobile, email: email, userType: userType };

      const res = await Auth_Api(ApiUrl.REGISTER, payload)();
      console.log('REGISTER response', res);
      if (res?.data?.status === true) {
        setLoading(false);
        const otp = res?.data?.otp;
        handleNavigation({ type: 'push', page: 'OtpScreen', navigation: navigation as any, passProps: { mobile, otp }, });
      }
      else {
        Helper.showToast(res?.data?.message || 'Registration failed');
        setLoading(false);
        return;
      }


    } catch (error) {
      setLoading(false);
      console.warn('REGISTER error', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const user = response.data?.user;

      if (user) {
        console.log('Google user info:', user);

        // Call backend to check if user exists
        const payload = {
          email: user.email,
          userType: userType
        };

        const res = await Auth_Api(ApiUrl.authGoogleLogin, payload)();
        console.log('Google login response:======:::', res);

        if (res?.data?.status === true) {
          if (res.data.exists === true) {
            // User already exists, log them in and navigate to home
            const userData = { ...res.data.user, token: res.data.token };
            dispatch(loginSuccess(userData));
            await AsyncStorageHelper.setData(Config.TOKEN, res.data.token);
            await AsyncStorageHelper.setData(Config.USER_DATA, res.data.user);

            Helper.showToast('Login successful');
            if (userType === 'JobSeeker') {
              handleNavigation({ type: 'setRoot', page: 'BottomTabs', navigation });
            } else {
              handleNavigation({ type: 'setRoot', page: 'RecruiterBottomTabs', navigation });
            }
          } else {
            // User doesn't exist, pre-fill form for signup
            setEmail(user.email || '');
            setFullName(user.name || '');
            // Helper.showToast('Details pre-filled from Google');
          }
        } else {
          Helper.showToast(res?.data?.message || 'Google login failed');
        }
      }

    } catch (error: any) {
      console.warn('Google login error:', error);
      if (error.code === 'CANCELED') {
        Helper.showToast('Google sign-in cancelled');
      } else {
        Helper.showToast('Google sign-in failed');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{APP_TEXT.signupTitle}</Text>
        <Text style={styles.subtitle}>{APP_TEXT.signupSubtitle}</Text>

        <Text style={styles.label}>{APP_TEXT.signupFullNameLabel}</Text>
        <View style={styles.inputWrap}>
          <TextInput
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (nameError) setNameError('');
            }}
            style={styles.inputText}
            placeholder={APP_TEXT.signupFullNamePlaceholder}
            placeholderTextColor="#6F7784"
          />
        </View>
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <Text style={styles.label}>{APP_TEXT.signupMobileLabel}</Text>
        <View style={styles.inputWrap}>
          <TextInput
            value={mobile}
            onChangeText={(text) => {
              setMobile(text);
              if (mobileError) setMobileError('');
            }}
            style={styles.inputText}
            placeholder={APP_TEXT.signupMobilePlaceholder}
            placeholderTextColor="#6F7784"
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
        {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}

        <Text style={styles.label}>{APP_TEXT.emailLabel}</Text>
        <View style={styles.inputWrap}>
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            style={styles.inputText}
            placeholder={APP_TEXT.emailPlaceholder}
            placeholderTextColor="#6F7784"
            keyboardType="email-address"
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Button
          loading={loading}
          rightArrow={true}
          label={APP_TEXT.signupButton}
          onPress={() => { HandleSignup() }}
          containerStyle={styles.joinButton}
          labelStyle={styles.joinButtonText}
        />

        <Text style={styles.orText}>{APP_TEXT.signupOrText}</Text>

        <TouchableOpacity onPress={() => { handleGoogleLogin() }} style={styles.googleButton} disabled={googleLoading}>
          <Text style={styles.googleText}>
            {googleLoading ? 'Signing in...' : APP_TEXT.signupGoogleButton}
          </Text>
        </TouchableOpacity>

        <View style={styles.footerHighlightContainer}>
          <Text style={styles.footerText}>{APP_TEXT.signupAlreadyAccount}{' '}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => { handleNavigation({ type: 'push', page: 'Login', navigation: navigation as any }) }}>
            <Text style={styles.footerHighlight}>{APP_TEXT.signupLoginAction}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
