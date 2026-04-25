import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_TEXT } from '../../comman/String';
import { styles } from './Styles';
import { useNavigation } from '@react-navigation/native';
import { handleNavigation } from '../../navigation/RootNavigator';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNavigation({ type: 'push', page: 'Step',navigation});
    }, 2000);
    return () => clearTimeout(timer);  
  }, []);

 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSpacer} />

      <View style={styles.contentWrapper}>
        <View style={styles.iconCard}>
          <Text style={styles.iconText}>🎓</Text>
        </View>

        <Text style={styles.appTitle}>{APP_TEXT.appName}</Text>
        <Text style={styles.subtitle}>{APP_TEXT.splashSubtitle}</Text>
      </View>

      
    </SafeAreaView>
  );
};

export default SplashScreen;
