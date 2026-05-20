import React, { useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Styles';
import { APP_TEXT } from '../../../comman/String';
import { handleNavigation } from '../../../navigation/RootNavigator';
import Button from '../../../components/Button';
import Helper from '../../../Lib/HelperFiles/Helper';
import { Auth_Api } from '../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../Lib/ApiService/ApiUrl';
import validate from '../../../Lib/HelperFiles/validation/validate_wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../Redux/Reducers/Userslice';
import Config from '../../../Lib/ApiService/Config';
import AsyncStorageHelper from '../../../Lib/HelperFiles/AsyncStorageHelper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userType } = useSelector((state: any) => state.user);
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [mobileError, setMobileError] = useState('');

  // Configure Google Sign-In
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GoogleWebClientId, // Replace with your actual web client ID from Google Console
      offlineAccess: true,
    });
  }, []);

  const checkValidation = () => {
    const mobileErr = validate('mobile', mobileNumber);
    if (mobileErr) {
      setMobileError(mobileErr);
      return false;
    }
    setMobileError('');
    return true;
  };

  const LoginHandler = async () => {
    setLoading(true);
    if (!checkValidation()) {
      setLoading(false);
      return;
    }

    try {
      const payload = { number: mobileNumber, userType: userType };
      const res = await Auth_Api(ApiUrl.LOGIN, payload)();
      if (res?.data?.status === true) {
        setLoading(true);
        const userData = { ...res.data.user, token: res.data.token };
        dispatch(loginSuccess(userData));
        await AsyncStorageHelper.setData(Config.TOKEN, res.data.token);
        await AsyncStorageHelper.setData(Config.USER_DATA, res.data.user);
        if (userType === 'JobSeeker') {
          handleNavigation({ type: 'setRoot', page: 'BottomTabs', navigation });
        } else {
          handleNavigation({ type: 'setRoot', page: 'RecruiterBottomTabs', navigation });
        }
      }
      else {
        Helper.showToast(res?.data?.message || 'Registration failed');
        setLoading(false);
        return;
      }


    } catch (error) {
      setLoading(false);
      console.warn('LOGIN error', error);
    }


  }

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const user = response.data?.user;

      if (user) {
        console.log('Google user info:', user);

        const payload = {
          email: user.email,
          userType: userType
        };

        const res = await Auth_Api(ApiUrl.authGoogleLogin, payload)();
        console.log('Google login response:', res);
        if (res?.data?.status === true) {
          if (res.data.exists === true) {
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
            console.log('User not found');
            // User doesn't exist, navigate to signup with pre-filled info
            Helper.showToast('Account not found. Please sign up.');
            handleNavigation({
              type: 'push',
              page: 'Signup',
              navigation: navigation,
              passProps: {
                name: user.name,
                Email: user.email
              },
              // Note: You might want to pass user info here if Signup screen is set up to receive it
            });
          }
        } else {
          Helper.showToast(res?.data?.message || 'Google login failed');
        }
      }
    } catch (error: any) {
      console.warn('Google login error:', error);
      if (error.code === 'CANCELED') {
        Helper.showToast('Google login cancelled');
      } else {
        Helper.showToast('Google login failed');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{APP_TEXT.CareerArchitect}</Text>
      </View>
      <View style={styles.MainContainer}>
        <Text style={styles.title}>{APP_TEXT.loginTitle}</Text>
        <Text style={styles.subtitle}>{APP_TEXT.loginSubtitle}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>{APP_TEXT.loginSectionLabelMobileNumber}</Text>

        <View style={styles.mobileRow}>
          <View style={styles.countryCodeBox}>
            <Text style={styles.countryCodeText}>+91</Text>

          </View>
          <View style={styles.mobileInputBox}>
            <TextInput
              value={mobileNumber}
              onChangeText={(text) => {
                setMobileNumber(text);
                if (mobileError) setMobileError('');
              }}
              style={styles.mobileInputText}
              keyboardType="number-pad"
              placeholder="Enter Mobile Number"
              placeholderTextColor="#A5ACB7"
              maxLength={10}
            />
          </View>
        </View>

        {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}

        <Button
          loading={loading}
          label={APP_TEXT.loginButton}
          onPress={() => { LoginHandler() }}

        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{APP_TEXT.loginOrContinueWith}</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin} disabled={googleLoading}>
          <Text style={styles.socialText}>
            {googleLoading ? 'Signing in...' : APP_TEXT.loginButtonGoogle}
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.secureButton}>
          <Text style={styles.secureText}>{APP_TEXT.loginButtonSecure}</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.footerHighlightContainer}>
        <Text style={styles.footerText}>{APP_TEXT.loginNewToAppName}?{' '}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => { handleNavigation({ type: 'push', page: 'Signup', navigation: navigation, }) }}>
          <Text style={styles.footerHighlight}>{APP_TEXT.loginJoinTheCollective}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
