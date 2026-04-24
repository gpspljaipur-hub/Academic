import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../../comman/Colors';
import { APP_TEXT } from '../../../../comman/String';
import Images from '../../../../comman/Images';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import styles from './Styles';


const ProfileSetup = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [jobPreference, setJobPreference] = useState<string>(APP_TEXT.profileSetup.jobPreferenceGovt);

  const preferences = [
    APP_TEXT.profileSetup.jobPreferenceGovt,
    APP_TEXT.profileSetup.jobPreferencePrivate,
    APP_TEXT.profileSetup.jobPreferenceBoth,
  ];

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <Header
        title={APP_TEXT.profileSetup.headerTitle}
        onBackPress={() => navigation.goBack()}
        rightIcon={Images.userImage}
        rightIconStyle={styles.headerProfileImage}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{APP_TEXT.profileSetup.title}</Text>
          <Text style={styles.subtitle}>{APP_TEXT.profileSetup.subtitle}</Text>

          <View style={styles.section}>
            <Text style={styles.label}>{APP_TEXT.profileSetup.fullNameLabel}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={APP_TEXT.profileSetup.fullNamePlaceholder}
                placeholderTextColor={Colors.mutedSlate}
                value={fullName}
                onChangeText={setFullName}
              />
              <Image source={Images.ProfileIcon} style={styles.inputIcon} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{APP_TEXT.profileSetup.jobPreferenceLabel}</Text>
            <View style={styles.segmentedControl}>
              {preferences.map((pref) => (
                <TouchableOpacity
                  key={pref}
                  style={[
                    styles.segment,
                    jobPreference === pref && styles.activeSegment,
                  ]}
                  onPress={() => setJobPreference(pref)}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      jobPreference === pref && styles.activeSegmentText,
                    ]}
                  >
                    {pref}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.hintContainer}>
              <Text style={styles.infoIcon}>ⓘ</Text>
              <Text style={styles.hintText}>{APP_TEXT.profileSetup.jobPreferenceHint}</Text>
            </View>
          </View>

          <View style={styles.insightsCard}>
            <View style={styles.insightsTextContainer}>
              <Text style={styles.insightsTitle}>{APP_TEXT.profileSetup.careerInsightsTitle}</Text>
              <Text style={styles.insightsDesc}>{APP_TEXT.profileSetup.careerInsightsDesc}</Text>
            </View>
            <View style={styles.chartIconContainer}>
              <View style={styles.chartIcon}>
                <View style={[styles.bar, { height: '40%' }]} />
                <View style={[styles.bar, { height: '80%' }]} />
                <View style={[styles.bar, { height: '60%' }]} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={APP_TEXT.profileSetup.continueButton}
          onPress={() => { navigation.navigate("BottomTabs") }}
          rightArrow={true}
          containerStyle={styles.continueButton}
        />
      </View>
    </SafeAreaView>
  );
};



export default ProfileSetup;
