import React from 'react';
import { Dimensions, Image, ImageSourcePropType, Platform, Text, View, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../comman/Colors';
import { styles } from './Styles';
import Images from '../../../comman/Images';
import HomeScreen from './HomeScreen/HomeScreen';
// import Dashboard from './Dashboard/Dashboard';
import JobsScreen from './JobsScreen/JobsScreen';
import ExamsScreen from './ExamsScreen/ExamsScreen';
import ApplicationsScreen from './ApplicationScreen/ApplicationsScreen';

const Tab = createBottomTabNavigator();

const ICONS: Record<string, string> = {
  // HomeScreen: 'Home',
  Dashboard: 'Dashboard',
  JobsScreen: 'Jobs',
  ExamsScreen: 'Exams',
  ApplicationScreen: 'Apps',
  ProfileScreen: 'Profile',
};

const ICONS_IMAGES: Record<string, any> = {
  // HomeScreen: Images.home,
  Dashboard: Images.home,
  JobsScreen: Images.jobs,
  ExamsScreen: Images.exams,
  ApplicationScreen: Images.application,
  ProfileScreen: Images.ProfileIcon,
};
const EmptyScreen = () => <View style={styles.screen} />;
const { width, height } = Dimensions.get('window');

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      // initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [styles.tabBarStyle, { height: Platform.OS === 'ios' ? 70 : 90 }],
        tabBarItemStyle: { width: width / 5, maxWidth: width / 5 },
        tabBarIcon: ({ focused }) => {
          const iconText = ICONS[route.name] ?? '•';
          return (
            <View style={styles.iconWrap}>
              <Image source={ICONS_IMAGES[route.name]} resizeMode='contain' style={[styles.tabIconImage, { tintColor: focused ? Colors.selectedTabIconGray : Colors.UnselectedTabIcon }]} />
              <Text numberOfLines={1} style={[styles.tabIcon, { color: focused ? Colors.selectedTabIconGray : Colors.UnselectedTabIcon }]}>{iconText}</Text>
            </View>
          );
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Tab.Screen name="Dashboard" component={Dashboard} /> */}
      <Tab.Screen name="JobsScreen" component={JobsScreen} />
      <Tab.Screen name="ExamsScreen" component={ExamsScreen} />
      <Tab.Screen name="ApplicationScreen" component={ApplicationsScreen} />
      <Tab.Screen name="ProfileScreen" component={EmptyScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
