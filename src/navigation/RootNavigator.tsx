import React from 'react';
import OtpScreen from '../screens/AuthScreen/OtpScreen/OtpScreen';
import Step from '../screens/StepScreen/Step';
import SplashScreen from '../screens/Splash/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../comman/Colors';
import LoginScreen from '../screens/AuthScreen/LoginScreen/LoginScreen';
import SignupScreen from '../screens/AuthScreen/SignupScreen/SignupScreen';
import RecruiterBottomTabs from '../screens/recuriter/BottomTabs/RecruiterBottomTabs';
import BottomTabs from '../screens/JobSeeker/BottomTabs/BottomTabs';
import Premium from '../screens/JobSeeker/Premium/Premium';
import Apply from '../screens/JobSeeker/ApplyScreen/Apply';
import ProfileSetup from '../screens/JobSeeker/BottomTabs/ProfileScreen/ProfileSetup';
import CareerArchitect from '../screens/JobSeeker/CareerArchitect/Career';
import Notification from '../components/Notification';
import Setting from '../components/Setting';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Otp: undefined;
  Step: undefined;
  Splash: undefined;
  Notification: undefined;
  BottomTabs: undefined;
  RecruiterBottomTabs: undefined;
  Premium: undefined;
  Apply: undefined;
  ProfileSetup: undefined;
  CareerArchitect: undefined;
  Setting: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash"
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
      <Stack.Screen name="RecruiterBottomTabs" component={RecruiterBottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} options={{ headerShown: false }} />
      <Stack.Screen name="Premium" component={Premium} options={{ headerShown: false }} />
      <Stack.Screen name="Apply" component={Apply} options={{ headerShown: false }} />
      <Stack.Screen name="CareerArchitect" component={CareerArchitect} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
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
