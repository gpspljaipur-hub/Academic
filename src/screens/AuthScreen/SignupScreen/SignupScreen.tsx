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

const SignupScreen = ({ route }: any) => {
  const userType = route?.params?.userType;
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');


 const HandleSignup = async () => {
    let isValid = true;
    if (!fullName) {
      setNameError('Full name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!mobile || mobile.length !== 10) {
      setMobileError('Please enter a valid 10-digit mobile number');
      isValid = false;
    } else {
      setMobileError('');
    }

    if (!isValid) return;
    setLoading(true);
    try {
      const payload = { name: fullName,number: mobile, email: email,userType: userType };
      
      const res = await Auth_Api(ApiUrl.REGISTER, payload)();
      console.log('REGISTER response', res);
      if (res?.data?.status === true) {
         setLoading(false);
         const otp = res?.data?.otp;
         handleNavigation({ type: 'push', page: 'OtpScreen', navigation: navigation as any, passProps: { mobile,otp, userType },});
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
          onPress={() => {HandleSignup()}}
          containerStyle={styles.joinButton}
          labelStyle={styles.joinButtonText}
        />

        <Text style={styles.orText}>{APP_TEXT.signupOrText}</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleText}>{APP_TEXT.signupGoogleButton}</Text>
        </TouchableOpacity>

        <View style={styles.footerHighlightContainer}>
            <Text style={styles.footerText}>{APP_TEXT.signupAlreadyAccount}{' '}</Text>
          <TouchableOpacity  activeOpacity={0.8} onPress={() => {handleNavigation({type: 'push', page: 'Login', navigation: navigation as any})}}>   
           <Text style={styles.footerHighlight}>{APP_TEXT.signupLoginAction}</Text>
         </TouchableOpacity>
       </View>
     </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
