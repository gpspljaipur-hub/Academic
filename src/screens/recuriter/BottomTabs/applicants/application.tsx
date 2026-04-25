import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Styles';
import HomeHeader from '../../../../components/HomeHeader';
import Images from '../../../../comman/Images';
import Colors from '../../../../comman/Colors';
import { APP_TEXT } from '../../../../comman/String';

interface Application {
  id: string;
  companyLogo: any;
  jobTitle: string;
  company: string;
  location: string;
  status: 'SHORTLISTED' | 'APPLIED' | 'REJECTED' | 'INTERVIEW_SET';
  appliedDate: string;
  stages: Stage[];
  interviewInfo?: {
    type: string;
    date: string;
    time: string;
  };
  canWithdraw?: boolean;
}

interface Stage {
  name: string;
  completed: boolean;
}


const APPLICATIONS: Application[] = [
  {
    id: '1',
    companyLogo: Images.indesign,
    jobTitle: 'Senior UI Designer',
    company: 'Google',
    location: 'Mountain View, CA',
    status: 'SHORTLISTED',
    appliedDate: '4 days ago',
    stages: [
      { name: 'APPLIED', completed: true },
      { name: 'REVIEW', completed: true },
      { name: 'SHORTLIST', completed: true },
      { name: 'INTERVIEW', completed: false },
      { name: 'FINAL', completed: false },
    ],
    canWithdraw: false,
  },
  {
    id: '2',
    companyLogo: Images.aftereffects,
    jobTitle: 'Creative Director',
    company: 'Airbnb',
    location: 'Remote',
    status: 'APPLIED',
    appliedDate: '2 days ago',
    stages: [
      { name: 'APPLIED', completed: true },
      { name: 'REVIEW', completed: false },
      { name: 'SHORTLIST', completed: false },
      { name: 'INTERVIEW', completed: false },
      { name: 'FINAL', completed: false },
    ],
    canWithdraw: true,
  },
  {
    id: '3',
    companyLogo: Images.tiktok,
    jobTitle: 'UX Lead',
    company: 'Meta',
    location: 'Seattle, WA',
    status: 'REJECTED',
    appliedDate: '2 weeks ago',
    stages: [
      { name: 'APPLIED', completed: true },
      { name: 'REVIEW', completed: true },
      { name: 'SHORTLIST', completed: false },
      { name: 'INTERVIEW', completed: false },
      { name: 'FINAL', completed: false },
    ],
    canWithdraw: false,
  },
  {
    id: '4',
    companyLogo: Images.microsoft,
    jobTitle: 'Product Designer',
    company: 'Figma',
    location: 'New York, NY',
    status: 'INTERVIEW_SET',
    appliedDate: 'Applied recently',
    stages: [
      { name: 'APPLIED', completed: true },
      { name: 'REVIEW', completed: true },
      { name: 'SHORTLIST', completed: true },
      { name: 'INTERVIEW', completed: false },
      { name: 'FINAL', completed: false },
    ],
    interviewInfo: {
      type: 'Technical Interview',
      date: 'Tomorrow',
      time: '1:00 AM',
    },
    canWithdraw: true,
  },
];

type TabType = 'All' | 'Active' | 'Interviews' | 'Closed';

const FILTERS = [
  'All',
  'Active',
  'Interviews',
  'Closed'
];
const ApplicationsScreen = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>(FILTERS[0] as TabType);
  const filtersListRef = useRef<FlatList<any>>(null);

  const getTabCounts = () => ({
    All: APPLICATIONS.length,
    Active: APPLICATIONS.filter(a => a.status === 'APPLIED' || a.status === 'SHORTLISTED').length,
    Interviews: APPLICATIONS.filter(a => a.status === 'INTERVIEW_SET').length,
    Closed: APPLICATIONS.filter(a => a.status === 'REJECTED').length,
  });

  const filteredApplications = () => {
    switch (selectedTab) {
      case 'Active':
        return APPLICATIONS.filter(a => a.status === 'APPLIED' || a.status === 'SHORTLISTED');
      case 'Interviews':
        return APPLICATIONS.filter(a => a.status === 'INTERVIEW_SET');
      case 'Closed':
        return APPLICATIONS.filter(a => a.status === 'REJECTED');
      default:
        return APPLICATIONS;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'SHORTLISTED':
        return Colors.periwinkle;
      case 'APPLIED':
        return Colors.iceBlue;
      case 'INTERVIEW_SET':
        return Colors.badgeBlueTint;
      case 'REJECTED':
        return '#FFE6E6';
      default:
        return Colors.iceBlue;
    }
  };

  const getStatusBadgeTextColor = (status: string) => {
    switch (status) {
      case 'SHORTLISTED':
        return Colors.phaseBlue;
      case 'APPLIED':
        return Colors.primaryBlue;
      case 'INTERVIEW_SET':
        return Colors.phaseBlue;
      case 'REJECTED':
        return '#C41E3A';
      default:
        return Colors.primaryBlue;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'SHORTLISTED':
        return 'SHORTLISTED';
      case 'APPLIED':
        return 'APPLIED';
      case 'INTERVIEW_SET':
        return 'INTERVIEW SET';
      case 'REJECTED':
        return 'REJECTED';
      default:
        return 'APPLIED';
    }
  };

  const counts = getTabCounts();

  const onFilterPress = (item: any, index: number) => {
    setSelectedTab(item);
    filtersListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader title={APP_TEXT.AppsHeaderTitle} IconImg={Images.userImage} bellIcon={Images.menu} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>{APP_TEXT.applicationsProgressLabel}</Text>
          <Text style={styles.applicationPipelineTitle}>{APP_TEXT.applicationsPipelineTitle}</Text>
        </View>

        {/* Tab Filters */}
        <View style={styles.tabsContainer} >
          <FlatList
            ref={filtersListRef}
            horizontal
            data={FILTERS}
            keyExtractor={item => item}
            showsHorizontalScrollIndicator={false}
            onScrollToIndexFailed={() => { }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={item}
                onPress={() => onFilterPress(item, index)}
                style={[
                  styles.tabButton,
                  selectedTab === item && styles.tabButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === item && styles.tabTextActive,
                  ]}
                >
                  {item} ({counts[item as TabType]})
                </Text>
              </TouchableOpacity>
            )}
          />
       
        </View>

        {/* Applications List */}
        <FlatList
          data={filteredApplications()}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.applicationCard}>
              {/* Header Row with Logo and Status */}
              <View style={styles.cardHeader}>
                <View style={styles.logoWrapper}>
                  <Image
                    source={item.companyLogo}
                    resizeMode="contain"
                    style={styles.companyLogo}
                  />
                </View>
                <View style={[
                  styles.statusBadge,  { backgroundColor: getStatusBadgeColor(item.status) }]}>
                  <Text style={[
                    styles.statusBadgeText,
                    { color: getStatusBadgeTextColor(item.status) }
                  ]}>
                    {getStatusText(item.status)}
                  </Text>
                </View>
              </View>

              {/* Job Title */}
              <Text style={styles.jobTitle}>{item.jobTitle}</Text>

              {/* Company and Location */}
              <Text style={styles.companyLocation}>
                {item.company} • {item.location}
              </Text>

              {/* Timeline */}
              <View style={styles.timelineContainer}>
                {item.stages.map((stage, index) => (
                  <View key={stage.name} style={styles.timelineItem}>
                    {/* Dot */}
                    <View style={[
                      styles.timelineDot,
                      stage.completed && styles.timelineDotCompleted,
                      !stage.completed && styles.timelineDotIncomplete,
                    ]} />

                    {/* Line */}
                    {index < item.stages.length - 1 && (
                      <View style={[
                        styles.timelineLine,
                        stage.completed && styles.timelineLineCompleted,
                        !stage.completed && styles.timelineLineIncomplete,
                      ]} />
                    )}
                  </View>
                ))}
              </View>

              {/* Stage Labels */}
              <View style={styles.stageLabelsContainer}>
                {item.stages.map(stage => (
                  <Text key={stage.name} style={styles.stageLabel}> {stage.name}   </Text>
                ))}
              </View>

              {/* Applied Date */}
              <Text style={styles.appliedDate}>Applied {item.appliedDate}</Text>

              {/* Interview Info (if applicable) */}
              {item.interviewInfo && (
                <View style={styles.interviewInfoCard}>
                  <Text style={styles.interviewInfoIcon}>📅</Text>
                  <View style={styles.interviewInfoContent}>
                    <Text style={styles.interviewInfoTitle}>
                      {item.interviewInfo.type}
                    </Text>
                    <Text style={styles.interviewInfoTime}>
                      {item.interviewInfo.date} • {item.interviewInfo.time}
                    </Text>
                  </View>
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.actionButtonsContainer}>
                {item.status === 'SHORTLISTED' || item.status === 'APPLIED' ? (
                  <>
                    <TouchableOpacity style={styles.viewDetailsButton}>
                      <Text style={styles.viewDetailsButtonText}>View Details</Text>
                    </TouchableOpacity>
                    {item.canWithdraw && (
                      <TouchableOpacity style={styles.withdrawButton}>
                        <Text style={styles.withdrawButtonText}>Withdraw</Text>
                      </TouchableOpacity>
                    )}
                  </>
                ) : item.status === 'REJECTED' ? (
                  <TouchableOpacity style={styles.archivedButton}>
                    <Text style={styles.archivedButtonText}>Archived</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.viewDetailsButton}>
                    <Text style={styles.viewDetailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationsScreen;
