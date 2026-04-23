import React from 'react';
import OtpScreen from '../screens/AuthScreen/OtpScreen/OtpScreen';
import Step from '../screens/StepScreen/Step';
import SplashScreen from '../screens/Splash/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../comman/Colors';
import LoginScreen from '../screens/AuthScreen/LoginScreen/LoginScreen';
import SignupScreen from '../screens/AuthScreen/SignupScreen/SignupScreen';
import BottomTabs from '../screens/JobSeeker/BottomTabs/BottomTabs';

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabs" 
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: Colors.screenGray },
    }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Step" component={Step} options={{ headerShown: false }} />
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

export function handleNavigation(nav: any) {
  switch (nav.type) {
    case 'push':
      nav.navigation.navigate(nav.page, nav.passProps)
      break
    case 'setRoot':
      nav.navigation.reset({ index: 0, routes: [{ name: nav.page }] })
      break
    case 'pop':
      nav.navigation.goBack()
      break
    case 'popToTop':
      nav.navigation.popToTop()
      break
    case 'navigate':
      nav.navigation.push(nav.page, nav.passProps)
      break
  }
}
