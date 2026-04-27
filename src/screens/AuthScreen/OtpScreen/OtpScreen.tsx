import React, { useRef, useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { APP_TEXT } from '../../../comman/String';
import { styles } from './Styles';
import { handleNavigation } from '../../../navigation/RootNavigator';
import { Auth_Api } from '../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../Lib/ApiService/ApiUrl';
import Helper from '../../../Lib/HelperFiles/Helper';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../Redux/Reducers/Userslice';

const OtpScreen = ({ route }: any) => {
  const { mobile, otp: otpParam } = route?.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userType } = useSelector((state: any) => state.user);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [verifying, setVerifying] = useState<boolean>(false);
  const RESEND_SECONDS = 30;
  const [resendSeconds, setResendSeconds] = useState<number>(RESEND_SECONDS);
  const [resending, setResending] = useState<boolean>(false);
  const [otpError, setOtpError] = useState('');

  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  useEffect(() => {
    if (otpParam && typeof otpParam === 'string') {
      const digits = otpParam.split('').slice(0, 6);
      const nextOtp = Array(6).fill('');
      digits.forEach((d, i) => (nextOtp[i] = d));
      setOtp(nextOtp);
      const lastIndex = digits.length - 1;
      if (lastIndex >= 0) {
        const idx = Math.min(lastIndex, 5);
        // slight delay to ensure refs are set
        setTimeout(() => {
          inputRefs.current[idx]?.focus();
        }, 100);
      }
    }
  }, [otpParam]);

  // countdown timer for resend
  useEffect(() => {
    if (resendSeconds <= 0) return;
    const id = setInterval(() => {
      setResendSeconds(s => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [resendSeconds]);

  const handleResend = async () => {
    if (!mobile) {
      Helper.showToast('Mobile number missing');
      return;
    }
    if (resendSeconds > 0) return;
    setResending(true);
    try {
      const payload = { number: mobile };
      const res = await Auth_Api(ApiUrl.REQUEST_OTP, payload)();
      console.log('REQUEST_OTP response', res);
      if (res?.data?.status === true) {
        Helper.showToast(res?.data?.message || 'OTP sent');
        const otp = res?.data?.otp;
        setOtp(Array(6).fill(''));
        if (otp && typeof otp === 'string') {
          const digits = otp.split('').slice(0, 6);
          const nextOtp = Array(6).fill('');
          digits.forEach((d, i) => (nextOtp[i] = d));
          setOtp(nextOtp);
          const lastIndex = digits.length - 1;
          if (lastIndex >= 0) {
            const idx = Math.min(lastIndex, 5);
            // slight delay to ensure refs are set
            setTimeout(() => {
              inputRefs.current[idx]?.focus();
            }, 100);
          }
        }
        setResendSeconds(RESEND_SECONDS);
      } else {
        Helper.showToast(res?.data?.message || 'Failed to resend OTP');
      }
    } catch (e) {
      console.warn('REQUEST_OTP error', e);
      Helper.showToast('Network error');
    } finally {
      setResending(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const typedValue = value.replace(/[^0-9]/g, '').slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = typedValue;
    setOtp(nextOtp);

    if (typedValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (otpError) setOtpError('');
  };

  const handleBackspace = (value: string, index: number) => {
    if (!value && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    console.log('Verifying OTP', { mobile, code });
    if (!mobile) {
      Helper.showToast('Mobile number missing');
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      setOtpError('Please enter complete OTP');
      return;
    }
    setOtpError('');
    setVerifying(true);
    try {
      const payload = { number: mobile, otp: code, userType: userType };
      const res = await Auth_Api(ApiUrl.VERIFY_OTP, payload)();
      if (res?.data?.status === true) {
        console.log('VERIFY_OTP response', res);

        const userData = { ...res.data.user, token: res.data.token };
        dispatch(loginSuccess(userData));

        Helper.showToast(res?.data?.message || 'Verified');
        if (res?.data?.user?.userType === 'JobSeeker') {
          handleNavigation({ type: 'setRoot', page: 'BottomTabs', navigation });
        } else {
          handleNavigation({ type: 'setRoot', page: 'RecruiterBottomTabs', navigation });
        }
      } else {
        Helper.showToast(res?.data?.message || 'Verification failed');
      }
    } catch (e) {
      console.warn('VERIFY_OTP error', e);
      Helper.showToast('Network error');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={APP_TEXT.otpHeader}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.centerArea}>
        <View style={styles.iconWrap}>
          <Text style={styles.iconText}>🔐</Text>
        </View>

        <Text style={styles.title}>{APP_TEXT.otpTitle}</Text>
        <Text style={styles.subtitle}>{APP_TEXT.otpSubtitlePrefix}{' '} </Text>
        <Text style={styles.subtitleHighlight}>+91 {mobile}</Text>

        <View style={styles.card}>
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={`otp-input-${index}`}
                ref={ref => {
                  inputRefs.current[index] = ref;
                }}
                value={digit}
                onChangeText={value => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleBackspace(digit, index);
                  }
                }}
                style={styles.otpInput}
                keyboardType="number-pad"
                textAlign="center"
                maxLength={1}
              />
            ))}
          </View>
          {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}

          <Button
            label={APP_TEXT.otpVerifyButton}
            onPress={handleVerify}
            loading={verifying}
            containerStyle={styles.verifyButton}
          />

          {resendSeconds > 0 ? (
            <Text style={styles.timerText}>
              {APP_TEXT.otpResendPrefix}{' '}
              <Text style={styles.timerValue}>{formatTime(resendSeconds)}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend} activeOpacity={0.8}>
              <Text style={[styles.timerText, styles.timerValue]}>Resend Code</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Text style={styles.changeText}>{APP_TEXT.otpChangePhoneNumber}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>{APP_TEXT.otpFooter}</Text>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
