import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import Header from './Header';
import Colors from '../comman/Colors';
import fonts from '../comman/fonts';
import MarginHW from '../comman/Sizes/MarginHW';
import FontsSize from '../comman/Sizes/FontsSize';
import ImageSize from '../comman/Sizes/ImageSize';
import Images from '../comman/Images';
import { APP_TEXT } from '../comman/String';

const Setting = ({ navigation }: any) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);

  const SettingItem = ({
    icon,
    title,
    onPress,
    showSwitch,
    switchValue,
    onSwitchChange,
    textColor = Colors.textCharcoal,
  }: any) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={showSwitch}
      style={styles.settingItem}>
      <View style={styles.settingItemLeft}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.settingIcon} />
        </View>
        <Text style={[styles.settingText, { color: textColor }]}>{title}</Text>
      </View>
      {showSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: Colors.dotInactive, true: Colors.brandBlue }}
          thumbColor={Colors.white}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={APP_TEXT.settings.headerTitle} onBackPress={() => navigation?.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        <View
          style={styles.profileSection}
        >
          <Image source={Images.userImage} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Iti Tiwari</Text>
          </View>
          <View style={styles.editButton}>
            <Image source={Images.pencil} style={styles.editIcon} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{APP_TEXT.settings.accountSection}</Text>
          <SettingItem icon={Images.ProfileIcon} title={APP_TEXT.settings.personalInfo} />
          <SettingItem icon={Images.verifieduser} title={APP_TEXT.settings.loginSecurity} />
          <SettingItem icon={Images.money} title={APP_TEXT.settings.Premium}
            onPress={() => navigation.navigate('Premium')} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{APP_TEXT.settings.preferencesSection}</Text>
          <SettingItem
            icon={Images.bellIcon}
            title={APP_TEXT.settings.notifications}
            showSwitch={true}
            switchValue={isNotificationsEnabled}
            onSwitchChange={setIsNotificationsEnabled}
          />
          <SettingItem
            icon={Images.eye}
            title={APP_TEXT.settings.darkMode}
            showSwitch={true}
            switchValue={isDarkMode}
            onSwitchChange={setIsDarkMode}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{APP_TEXT.settings.supportSection}</Text>
          <SettingItem icon={Images.aiIntelligence} title={APP_TEXT.settings.helpCenter} />
          <SettingItem icon={Images.aistar} title={APP_TEXT.settings.feedback} />
          <SettingItem icon={Images.rocket} title={APP_TEXT.settings.aboutApp} />
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>{APP_TEXT.settings.logout}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: MarginHW.MarginH20,
    paddingHorizontal: MarginHW.PaddingW20,
  },
  scrollContent: {
    paddingBottom: MarginHW.MarginH30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: MarginHW.PaddingH12,
    paddingHorizontal: MarginHW.PaddingW16,
    backgroundColor: Colors.aliceBlue,
    marginHorizontal: MarginHW.MarginW20,
    borderRadius: MarginHW.MarginW16,
    marginTop: MarginHW.MarginH20,
  },
  profileImage: {
    width: ImageSize.ImageW50,
    height: ImageSize.ImageW50,
    borderRadius: ImageSize.ImageW25,
  },
  profileInfo: {
    flex: 1,
    marginLeft: MarginHW.MarginW16,
  },
  userName: {
    fontFamily: fonts.LexendBold,
    fontSize: FontsSize.size16,
    color: Colors.brandBlue,
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    width: ImageSize.ImageW18,
    height: ImageSize.ImageW18,
    tintColor: Colors.brandBlue,
  },
  section: {
    marginTop: MarginHW.MarginH24,
    paddingHorizontal: MarginHW.PaddingW20,
  },
  sectionTitle: {
    fontFamily: fonts.Lexend_SemiBold,
    fontSize: FontsSize.size16,
    color: Colors.mutedSlate,
    marginBottom: MarginHW.MarginH12,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: MarginHW.PaddingH14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: MarginHW.MarginW16,
  },
  settingIcon: {
    width: ImageSize.ImageW20,
    height: ImageSize.ImageW20,
    tintColor: Colors.brandBlue,
  },
  settingText: {
    fontFamily: fonts.Lexend_Medium,
    fontSize: FontsSize.size16,
  },
  arrowIcon: {
    width: 14,
    height: 14,
    tintColor: Colors.dotInactive,
  },
  logoutButton: {
    marginTop: MarginHW.MarginH40,
    marginHorizontal: MarginHW.MarginW20,
    padding: MarginHW.PaddingH16,
    borderRadius: MarginHW.MarginW12,
    backgroundColor: Colors.lightRed,
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: fonts.LexendBold,
    fontSize: FontsSize.size16,
    color: Colors.errorRed,
  },
  versionText: {
    textAlign: 'center',
    fontFamily: fonts.Lexend_Regular,
    fontSize: FontsSize.size12,
    color: Colors.dotInactive,
    marginTop: MarginHW.MarginH20,
  },
});
