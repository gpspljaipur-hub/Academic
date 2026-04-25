import React from 'react';
import { Dimensions, Image, ImageSourcePropType, Platform, Text, View, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../comman/Colors';
import { styles } from './Styles';
import Images from '../../../comman/Images';
import Dashboard from './Dashboard/Dashboard';
import Job from './JobPost/Job';
import Message from './messenger/Message';
import application from './applicants/application';
const Tab = createBottomTabNavigator();

const ICONS: Record<string, string> = {
  Dashboard: 'Dashboard',
  Job: 'Jobs',
  Applicants: 'Applicants',
  Messages: 'Messages',
};

const ICONS_IMAGES: Record<string, any> = {
  Dashboard: Images.home,
  Job: Images.jobs,
  Applicants: Images.application,
  Messages: Images.bellIcon,
};
const EmptyScreen = () => <View style={styles.screen} />;
const { width, height } = Dimensions.get('window');

const RecruiterBottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [styles.tabBarStyle, { height: Platform.OS === 'ios' ? 70 : 90 }],
        tabBarItemStyle: { width: width / 4, maxWidth: width / 4 },
        tabBarIcon: ({ focused }) => {
          const iconText = ICONS[route.name] ?? '•';
          return (
            <View style={styles.iconWrap}>
              <Image source={ICONS_IMAGES[route.name]} resizeMode='contain' style={[styles.tabIconImage, { tintColor: focused ? Colors.selectedTabIconGray : Colors.UnselectedTabIcon }]} />
              <Text numberOfLines={1} style={[styles.tabIcon, {color: focused ? Colors.selectedTabIconGray : Colors.UnselectedTabIcon  }]}>{iconText}</Text>
            </View>
          );
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Job" component={Job} />
      <Tab.Screen name="Applicants" component={application} />
      <Tab.Screen name="Messages" component={Message} />
    </Tab.Navigator>
  );
};

export default RecruiterBottomTabs;
