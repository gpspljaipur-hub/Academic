import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserType } from '../../Redux/Reducers/Userslice';
import {
  ImageBackground,
  ImageSourcePropType,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../comman/Images';
import { styles } from './Styles';
import { APP_TEXT } from '../../comman/String';
import Button from '../../components/Button';
import { handleNavigation } from '../../navigation/RootNavigator';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../comman/Colors';

type TitlePart = {
  text: string;
  highlight?: boolean;
};

type StepCard = {
  icon: string;
  title: string;
};

type StepItem = {
  phase: string;
  titleParts: TitlePart[];
  description: string;
  heroLabel: string;
  heroSubLabel: string;
  cards: StepCard[];
  heroImage: ImageSourcePropType;
};

const STEP_DATA: StepItem[] = [
  {
    phase: 'STEP 1 OF 3',
    titleParts: [
      { text: 'Discover ' },
      { text: 'Govt Jobs', highlight: true },
      { text: ' & Exams' },
    ],
    description:
      'Stay updated with the latest government job notifications and exam dates across India. Curated opportunities from central and state sectors tailored for your profile.',
    heroLabel: 'REAL-TIME JOB FEED',
    heroSubLabel: 'Track central and state updates instantly',
    cards: [
      { icon: '◉', title: 'REAL-TIME ALERTS' },
      { icon: '✦', title: 'VERIFIED POSTS' },
    ],
    heroImage: Images.tech,
  },
  {
    phase: 'STEP 2 OF 3',
    titleParts: [
      { text: 'Apply to ' },
      { text: 'Private Jobs', highlight: true },
      { text: ' Easily' },
    ],
    description:
      'Connect with top MNCs and startups. Apply to thousands of private sector roles with a single tap.',
    heroLabel: 'APPLICATION STATUS',
    heroSubLabel: 'Successfully applied to MNC',
    cards: [
      { icon: '✓', title: 'ONE TAP APPLY' },
      { icon: '⚑', title: 'FAST RESPONSE' },
    ],
    heroImage: Images.ai,
  },
  {
    phase: 'STEP 3 OF 3',
    titleParts: [{ text: 'Get AI-Powered Job Recommendations' }],
    description:
      'Our smart AI matches your skills with the perfect job opportunities to accelerate your career.',
    heroLabel: 'MATCHING...',
    heroSubLabel: 'Senior Data Architect',
    cards: [
      { icon: '✪', title: 'VERIFIED ROLES' },
      { icon: '⚡', title: 'FAST TRACK' },
    ],
    heroImage: Images.HR,
  },
];

const HORIZONTAL_PADDING = 22;

const Step = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { width: windowWidth } = useWindowDimensions();
  const slideWidth = Math.max(1, windowWidth - HORIZONTAL_PADDING * 2);
  const scrollRef = useRef<ScrollView>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isLastStep = activeStep === STEP_DATA.length - 1;


  const onSelectUserType = (userType: 'Recruiter' | 'JobSeeker') => {
    dispatch(setUserType(userType));
    setIsModalVisible(false);
    handleNavigation({ type: 'push', page: 'Login', navigation });
  };

  const goToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(STEP_DATA.length - 1, index));
    setActiveStep(clamped);
    scrollRef.current?.scrollTo({
      x: clamped * slideWidth,
      animated: true,
    });
  }, [slideWidth]);

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / slideWidth);
      setActiveStep(Math.max(0, Math.min(STEP_DATA.length - 1, index)));
    },
    [slideWidth],
  );

  const onNextPress = () => {
    console.log(isLastStep, "isLastStep")
    if (isLastStep) {
      setIsModalVisible(true);
    }
    goToIndex(activeStep + 1);
  };

  const onSkipPress = () => {
    handleNavigation({ type: 'push', page: 'Login', navigation });

    // goToIndex(STEP_DATA.length - 1);

  };

  const slides = useMemo(
    () =>
      STEP_DATA.map((item, stepIndex) => (
        <View key={item.phase} style={[styles.slide, { width: slideWidth, }]}>
          <ImageBackground
            source={item.heroImage}
            imageStyle={styles.heroImage}
            style={styles.heroCard}
            resizeMode="cover">
            <View style={styles.heroPill}>
              <Text style={styles.heroLabel}>{item.heroLabel}</Text>
              <Text style={styles.heroSubLabel}>{item.heroSubLabel}</Text>
            </View>
          </ImageBackground>

          <View style={styles.phaseBadge}>
            <Text style={styles.phaseText}>{item.phase}</Text>
          </View>

          <Text style={styles.titleText}>
            {item.titleParts.map((part, index) => (
              <Text
                key={`${part.text}-${index}`}
                style={part.highlight ? styles.titleHighlight : undefined}>
                {part.text}
              </Text>
            ))}
          </Text>

          <Text style={styles.descriptionText}>{item.description}</Text>

          <View style={styles.cardsRow}>
            {item.cards.map(card => (
              <View key={card.title} style={styles.infoCard}>
                <Text style={styles.infoIcon}>{card.icon}</Text>
                <Text style={styles.infoTitle}>{card.title}</Text>
              </View>
            ))}
          </View>
        </View>
      )),
    [slideWidth],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.brandText}>AcademicArchitect</Text>
          <Pressable onPress={onSkipPress}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          keyboardShouldPersistTaps="handled"
          onMomentumScrollEnd={onMomentumScrollEnd}
          style={styles.stepSlider}>
          {slides}
        </ScrollView>


        <View style={styles.indicatorRow}>
          {STEP_DATA.map((_, index) => (
            <View
              key={`indicator-${index}`}
              style={[
                styles.indicatorDot,
                index === activeStep && styles.indicatorDotActive,
              ]}
            />
          ))}
        </View>

        <Button
          label={isLastStep ? APP_TEXT.loginButtonGetStarted : APP_TEXT.loginButtonContinue}
          onPress={onNextPress}
        />
      </View>


      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select User Type</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => onSelectUserType('Recruiter')}
            >
              <Text style={styles.modalButtonText}>Recruiter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => onSelectUserType('JobSeeker')}
            >
              <Text style={styles.modalButtonText}>Job Seeker</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Step;
