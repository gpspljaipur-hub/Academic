import React, { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { APP_TEXT } from '../../../comman/String';
import { styles } from './Styles';

const OtpScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    const typedValue = value.replace(/[^0-9]/g, '').slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = typedValue;
    setOtp(nextOtp);

    if (typedValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (value: string, index: number) => {
    if (!value && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
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
        <Text style={styles.subtitleHighlight}>+91 {APP_TEXT.otpPhoneNumber}</Text>

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

          <Button
            label={APP_TEXT.otpVerifyButton}
            onPress={() => {}}
            containerStyle={styles.verifyButton}
          />

          <Text style={styles.timerText}>
            {APP_TEXT.otpResendPrefix}{' '}
            <Text style={styles.timerValue}>{APP_TEXT.otpResendTime}</Text>
          </Text>
          <Text style={styles.changeText}>{APP_TEXT.otpChangePhoneNumber}</Text>
        </View>

        <Text style={styles.footerText}>{APP_TEXT.otpFooter}</Text>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
