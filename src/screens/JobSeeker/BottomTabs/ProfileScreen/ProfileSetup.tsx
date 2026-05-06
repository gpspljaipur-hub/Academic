import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Post_Api, Post_ApiWithToken, Get_Api } from '../../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../../Lib/ApiService/ApiUrl';
import Helper from '../../../../Lib/HelperFiles/Helper';
import { loginSuccess } from '../../../../Redux/Reducers/Userslice';
import styles from './Styles';


const ProfileSetup = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [headline, setHeadline] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [jobPreference, setJobPreference] = useState<string>(APP_TEXT.profileSetup.jobPreferenceGovt);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [skillSearchQuery, setSkillSearchQuery] = useState('');

  const preferences = [
    APP_TEXT.profileSetup.jobPreferenceGovt,
    APP_TEXT.profileSetup.jobPreferencePrivate,
    APP_TEXT.profileSetup.jobPreferenceBoth,
  ];

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchAllSkills();
  }, []);

  const fetchAllSkills = async () => {
    try {
      const res: any = await Get_Api(ApiUrl.ALL_SKILLS, null)();
      if (res?.data?.status) {
        setAllSkills(res.data.data);
      }
    } catch (error) {
      console.log('fetchAllSkills error', error);
    }
  };

  const fetchProfile = async () => {
    const userId = user?._id || user?.id;
    if (!userId) return;

    try {
      setLoading(true);
      const res: any = await Post_Api(ApiUrl.authGetProfile, { userId })();
      if (res?.data?.status) {
        const u = res.data.user;
        setFullName(u.name || '');
        setHeadline(u.headline || '');
        setPhoneNumber(u.number || '');
        setExperience(u.experience || '');
        setCompany(u.company || '');
        setEducation(u.education || '');
        setLocation(u.location || '');
        setJobPreference(u.jobPreference || APP_TEXT.profileSetup.jobPreferenceGovt);
        if (u.skills) {
          let skillsArr: string[] = [];
          if (Array.isArray(u.skills)) {
            if (u.skills.length === 1 && typeof u.skills[0] === 'string' && u.skills[0].includes(',')) {
              skillsArr = u.skills[0].split(',').map((s: string) => s.trim());
            } else {
              skillsArr = u.skills;
            }
          } else if (typeof u.skills === 'string') {
            skillsArr = u.skills.split(',').map((s: string) => s.trim());
          }
          setSelectedSkills(skillsArr);
        }
      }
    } catch (error) {
      console.log('fetchProfile error', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleContinue = async () => {
    if (!fullName || !phoneNumber) {
      Helper.showToast('Please fill in required fields');
      return;
    }

    const payload = {
      user_id: user?._id || user?.id,
      name: fullName,
      headline: headline,
      number: phoneNumber,
      experience: experience,
      company: company,
      education: education,
      location: location,
      skills: selectedSkills,
      jobPreference: jobPreference
    };
    console.log("payload", payload);
    try {
      setLoading(true);
      // Convert skills array to comma-separated string for form-urlencoded if necessary
      // Based on curl, it seems to be a single string
      const skillsString = selectedSkills.join(', ');

      const res: any = await Post_Api(ApiUrl.authUpdateProfile, {
        ...payload,
        skills: skillsString
      })();

      if (res?.data?.status) {
        Helper.showToast('Profile updated successfully');
        dispatch(loginSuccess({ ...user, ...res.data.user }));
        navigation.navigate("BottomTabs");
      } else {
        Helper.showToast(res?.data?.message || 'Failed to update profile');
      }
    } catch (error) {
      console.log('UpdateProfile error', error);
      Helper.showToast('Something went wrong');
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <Header
        title={APP_TEXT.profileSetup.headerTitle}
        onBackPress={() => navigation.goBack()}
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
                maxLength={50}
                onChangeText={setFullName}

              />
              <Image source={Images.ProfileIcon} style={styles.inputIcon} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{APP_TEXT.profileSetup.headlineLabel}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={APP_TEXT.profileSetup.headlinePlaceholder}
                placeholderTextColor={Colors.mutedSlate}
                value={headline}
                maxLength={150}
                onChangeText={setHeadline}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{APP_TEXT.profileSetup.numberLabel}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={APP_TEXT.profileSetup.numberPlaceholder}
                placeholderTextColor={Colors.mutedSlate}
                value={phoneNumber}
                maxLength={10}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Resume</Text>

            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadText}>+ Upload Resume</Text>
            </TouchableOpacity>
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

          <View style={styles.section}>
            <Text style={styles.label}>{APP_TEXT.profileSetup.experienceLabel}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={APP_TEXT.profileSetup.experiencePlaceholder}
                placeholderTextColor={Colors.mutedSlate}
                value={experience}
                onChangeText={setExperience}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{APP_TEXT.profileSetup.companyLabel}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={APP_TEXT.profileSetup.companyPlaceholder}
                placeholderTextColor={Colors.mutedSlate}
                value={company}
                onChangeText={setCompany}
                maxLength={50}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{APP_TEXT.profileSetup.educationLabel}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={APP_TEXT.profileSetup.educationPlaceholder}
                placeholderTextColor={Colors.mutedSlate}
                value={education}
                onChangeText={setEducation}
                maxLength={50}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{APP_TEXT.profileSetup.locationLabel}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={APP_TEXT.profileSetup.locationPlaceholder}
                placeholderTextColor={Colors.mutedSlate}
                value={location}
                onChangeText={setLocation}
                maxLength={50}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{APP_TEXT.profileSetup.skillsLabel}</Text>
            
            <View style={[styles.inputContainer, { marginBottom: 12 }]}>
              <TextInput
                style={styles.input}
                placeholder="Search skills..."
                placeholderTextColor={Colors.mutedSlate}
                value={skillSearchQuery}
                onChangeText={setSkillSearchQuery}
              />
            </View>

            <View style={styles.skillsContainer}>
              {allSkills
                .filter(skill => skill.toLowerCase().includes(skillSearchQuery.toLowerCase()))
                .slice(0, showAllSkills || skillSearchQuery.length > 0 ? allSkills.length : 10)
                .map((skill) => (
                <TouchableOpacity
                  key={skill}
                  style={[
                    styles.skillTag,
                    selectedSkills.includes(skill) && styles.selectedSkillTag,
                  ]}
                  onPress={() => toggleSkill(skill)}
                >
                  <Text
                    style={[
                      styles.skillText,
                      selectedSkills.includes(skill) && styles.selectedSkillText,
                    ]}
                  >
                    {skill}
                  </Text>
                </TouchableOpacity>
              ))}
              {!skillSearchQuery && allSkills.length > 10 && (
                <TouchableOpacity
                  style={styles.skillTag}
                  onPress={() => setShowAllSkills(!showAllSkills)}
                >
                  <Text style={[styles.skillText, { color: Colors.primaryBlue, fontWeight: 'bold' }]}>
                    {showAllSkills ? 'Show Less' : `+ ${allSkills.length - 10} more`}
                  </Text>
                </TouchableOpacity>
              )}
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
          onPress={handleContinue}
          loading={loading}
          rightArrow={true}
          containerStyle={styles.continueButton}
        />
      </View>
    </SafeAreaView>
  );
};



export default ProfileSetup;
