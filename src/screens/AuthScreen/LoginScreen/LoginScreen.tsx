import React, { useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Styles';
import { APP_TEXT } from '../../../comman/String';
import { handleNavigation } from '../../../navigation/RootNavigator';
import Button from '../../../components/Button';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');

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
              onChangeText={setMobileNumber}
              style={styles.mobileInputText}
              keyboardType="number-pad"
              placeholder="98765 43210"
              placeholderTextColor="#A5ACB7"
              maxLength={10}
            />
          </View>
        </View>

        <Button
          label={APP_TEXT.loginButton}
          onPress={() => navigation.navigate('Otp' as never)}
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{APP_TEXT.loginOrContinueWith}</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>{APP_TEXT.loginButtonGoogle}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secureButton}>
          <Text style={styles.secureText}>{APP_TEXT.loginButtonSecure}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerHighlightContainer}>
      <Text style={styles.footerText}>{APP_TEXT.loginNewToAppName}?{' '}</Text>
      <TouchableOpacity activeOpacity={0.8} onPress={() => {handleNavigation({type: 'push', page: 'Signup', navigation: navigation as any})}}>
        <Text style={styles.footerHighlight}>{APP_TEXT.loginJoinTheCollective}</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
