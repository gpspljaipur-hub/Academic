import React, { useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import { APP_TEXT } from '../../../comman/String';
import { styles } from './Styles';
import { handleNavigation } from '../../../navigation/RootNavigator';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{APP_TEXT.signupTitle}</Text>
        <Text style={styles.subtitle}>{APP_TEXT.signupSubtitle}</Text>

        <Text style={styles.label}>{APP_TEXT.signupFullNameLabel}</Text>
        <View style={styles.inputWrap}>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.inputText}
            placeholder={APP_TEXT.signupFullNamePlaceholder}
            placeholderTextColor="#6F7784"
          />
          <Text style={styles.iconText}>👤</Text>
        </View>

        <Text style={styles.label}>{APP_TEXT.signupMobileLabel}</Text>
        <View style={styles.inputWrap}>
          <TextInput
            value={mobile}
            onChangeText={setMobile}
            style={styles.inputText}
            placeholder={APP_TEXT.signupMobilePlaceholder}
            placeholderTextColor="#6F7784"
            keyboardType="phone-pad"
          />
          <Text style={styles.iconText}>📱</Text>
        </View>

        <Button
          rightArrow={true}
          label={APP_TEXT.signupButton}
          onPress={() => {}}
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
