import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Styles';
import { APP_TEXT } from '../../../../comman/String';
import Colors from '../../../../comman/Colors';
import Images from '../../../../comman/Images';
import { useNavigation, useRoute } from '@react-navigation/native';

const SIMILAR_ROLES = [
  {
    id: '1',
    company: 'SKYLINE DEVS',
    title: 'Product Designer',
    location: 'Remote',
    salary: '₹20L - ₹25L',
    tags: ['UX Strategy', 'SaaS'],
    image: Images.microsoft,
  },
  {
    id: '2',
    company: 'TECH FLOW',
    title: 'Visual Designer',
    location: 'Mumbai',
    salary: '₹15L - ₹20L',
    tags: ['Branding', 'UI'],
    image: Images.stripe,
  },
];

const Career = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { job } = route.params || {};

  const renderBulletPoint = (text: string) => (
    <View style={styles.bulletPoint}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );

  const renderSimilarRole = ({ item }: { item: typeof SIMILAR_ROLES[0] }) => (
    <View style={styles.roleCard}>
      <View style={styles.roleCardHeader}>
        <View style={styles.roleLogo}>
          <Image source={item.image} style={{ width: '60%', height: '60%' }} resizeMode="contain" />
        </View>
        <Text style={styles.companyName}>{item.company}</Text>
      </View>
      <Text style={styles.roleTitle}>{item.title}</Text>
      <Text style={styles.roleInfo}>{item.location} • {item.salary}</Text>
      <View style={styles.roleTags}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.offWhite} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.backArrow} style={{ width: 20, height: 20, tintColor: Colors.inkDark }} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{APP_TEXT.CareerArchitect}</Text>
        <TouchableOpacity>
          <Image source={Images.dots} style={{ width: 20, height: 20, tintColor: Colors.inkDark }} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Job Header */}
        <View style={styles.jobHeader}>
          <View style={styles.companyLogo}>
             <Image 
                source={job?.image || Images.indesign} 
                style={{ width: '70%', height: '70%' }} 
                resizeMode="contain"
             />
          </View>
          <Text style={styles.jobTitle}>{job?.title || 'Senior UI/UX Designer'}</Text>
          <Text style={styles.companyInfo}>{job?.company || 'InnovateTech'} · {job?.location || 'Bengaluru, India'}</Text>
          <View style={styles.salaryBadge}>
            <Text style={styles.salaryText}>{job?.salary || job?.tags?.[1] || '₹18L - ₹24L PA'}</Text>
          </View>
        </View>

        {/* AI Match Report */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <View style={styles.aiTitleRow}>
              <Image source={Images.ai} style={{ width: 20, height: 20, tintColor: Colors.white }} resizeMode="contain" />
              <Text style={styles.aiTitle}>AI MATCH REPORT</Text>
            </View>
            <View style={styles.skillsContainer}>
              <View style={styles.skillBadge}><Text style={styles.skillText}>PROTOTYPING</Text></View>
              <View style={styles.skillBadge}><Text style={styles.skillText}>DESIGN SYSTEMS</Text></View>
              <View style={styles.skillBadge}><Text style={styles.skillText}>USER RESEARCH</Text></View>
            </View>
          </View>
          <Text style={styles.matchPercentage}>{job?.aiMatch?.split(' ')?.[0] || '94%'}</Text>
          <Text style={styles.matchDescription}>
            Your profile is an exceptional match for this role.
          </Text>
        </View>

        {/* Responsibilities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Text style={styles.sectionTitle}>Responsibilities</Text>
          </View>
          {renderBulletPoint('Lead the end-to-end design process for our core enterprise platform, from conceptualization to high-fidelity handoff.')}
          {renderBulletPoint('Architect and maintain our comprehensive multi-platform design system to ensure visual consistency across all touchpoints.')}
          {renderBulletPoint('Conduct deep-dive user research and usability testing to validate design decisions and iterate on feedback.')}
          {renderBulletPoint('Mentor junior designers and collaborate closely with engineering teams to bridge the gap between design and production.')}
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Text style={styles.sectionTitle}>Requirements</Text>
          </View>
          {renderBulletPoint('5+ years of professional experience in product design with a portfolio showcasing complex SaaS workflows.')}
          {renderBulletPoint('Mastery of Figma, including advanced prototyping, auto-layout, and component-based workflows.')}
          {renderBulletPoint('Strong understanding of information architecture and user psychology.')}
          {renderBulletPoint('Excellent communication skills to articulate design strategy to stakeholders.')}
        </View>

        {/* Similar Roles */}
        <View style={styles.similarRolesHeader}>
          <Text style={styles.similarRolesTitle}>Similar Roles</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={SIMILAR_ROLES}
          renderItem={renderSimilarRole}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Image source={Images.bookmark} style={{ width: 24, height: 24, tintColor: Colors.inkDark }} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Career;



