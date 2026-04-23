import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_TEXT } from '../../comman/String';
import { styles } from './Styles';

const SplashScreen = () => {
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
