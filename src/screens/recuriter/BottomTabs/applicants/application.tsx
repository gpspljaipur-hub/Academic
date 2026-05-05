import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
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

import { useSelector } from 'react-redux';
import { Post_Api } from '../../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../../Lib/ApiService/ApiUrl';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Config from '../../../../Lib/ApiService/Config';
import { handleNavigation } from '../../../../navigation/RootNavigator';

type TabType = 'All' | 'Active' | 'Interviews' | 'Closed';

const FILTERS = [
  'All',
  'Active',
  'Interviews',
  'Closed'
];

const ApplicationsScreen = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>(FILTERS[0] as TabType);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const filtersListRef = useRef<FlatList<any>>(null);
  const { user } = useSelector((state: any) => state.user);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  React.useEffect(() => {
    if (isFocused) {
      fetchApplicants();
    }
  }, [isFocused]);

  const fetchApplicants = async () => {
    const recruiterId = user?.id || user?._id;
    if (!recruiterId) return;

    try {
      setLoading(true);
      const res: any = await Post_Api(ApiUrl.recruiterApplicants, { recruiterId })();
      console.log('fetchApplicants in Application.tsx res', res.data.data);

      if (res?.data?.status) {
        setJobs(res.data.data || []); // Keeping state name 'jobs' for minimal changes, but it's applicants now
      }
    } catch (error) {
      console.log('fetchApplicants error', error);
    } finally {
      setLoading(false);
    }
  };

  const getTabCounts = () => ({
    All: jobs.length,
    Active: jobs.filter(a => a.status === 'Applied' || a.status === 'Shortlisted').length,
    Interviews: jobs.filter(a => a.status === 'Interview').length,
    Closed: jobs.filter(a => a.status === 'Rejected').length,
  });

  const filteredApplications = () => {
    switch (selectedTab) {
      case 'Active':
        return jobs.filter(a => a.status === 'Applied' || a.status === 'Shortlisted');
      case 'Interviews':
        return jobs.filter(a => a.status === 'Interview');
      case 'Closed':
        return jobs.filter(a => a.status === 'Rejected');
      default:
        return jobs;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    const s = status?.toUpperCase();
    switch (s) {
      case 'SHORTLISTED':
        return Colors.iceBlue;
      case 'APPLIED':
        return Colors.iceBlue;
      case 'REJECTED':
        return '#FFE6E6';
      default:
        return Colors.iceBlue;
    }
  };

  const getStatusBadgeTextColor = (status: string) => {
    const s = status?.toUpperCase();
    switch (s) {
      case 'SHORTLISTED':
        return Colors.primaryBlue;
      case 'APPLIED':
        return Colors.primaryBlue;
      case 'REJECTED':
        return '#C41E3A';
      default:
        return Colors.primaryBlue;
    }
  };

  const getStatusText = (status: string) => {
    return status?.toUpperCase() || 'APPLIED';
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
      <HomeHeader title={APP_TEXT.AppsHeaderTitle} IconImg={Images.userImage} bellIcon={Images.settings} onNotificationPress={() => navigation.navigate('Setting')} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>{APP_TEXT.applicationsProgressLabel}</Text>
          <Text style={styles.applicationPipelineTitle}>{APP_TEXT.applicationsPipelineTitle}</Text>
        </View>

        {/* Tab Filters */}
        {/* <View style={styles.tabsContainer} >
          <FlatList
            ref={filtersListRef}
            horizontal
            data={FILTERS}
            keyExtractor={item => item}
            showsHorizontalScrollIndicator={false}
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
                  {item} ({counts[item as TabType] || 0})
                </Text>
              </TouchableOpacity>
            )}
          />
        </View> */}

        {loading && jobs.length === 0 ? (
          <ActivityIndicator size="large" color={Colors.brandBlue} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={filteredApplications()}
            keyExtractor={item => item._id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.applicationCard}>
                {/* <View style={[
                  styles.statusBadge, { backgroundColor: Colors.iceBlue }]}>
                  <Text style={[
                    styles.statusBadgeText,
                    { color: Colors.primaryBlue }
                  ]}>
                    {getStatusText(item.job?.status)}
                  </Text>
                </View> */}
                <View style={styles.cardHeader}>
                  <View style={styles.logoWrapper}>
                    {item?.job?.companyLogo ?
                      <Image
                        source={{ uri: Config.imageurl + item.job.companyLogo }}
                        resizeMode="contain"
                        style={styles.companyLogo}
                      />
                      :
                      <Text style={styles.companyLogoText}>{item.job?.company?.substring(0, 2)?.toUpperCase()}</Text>
                    }


                  </View>
                  <View>
                    <Text style={styles.jobTitle}>{item?.job?.title || ''}</Text>
                    <Text style={styles.companyLocation}>Company: {item.job?.company || 'Applicant'}</Text>

                  </View>

                </View>



                <Text style={styles.companyLocation}>
                  Location: {item.job?.location || 'Applicant'}
                </Text>

                <Text style={styles.companyLocation}>
                  Job Type: {item.job?.jobType || 'N/A'}
                </Text>

                <Text style={styles.companyLocation}>
                  Salary: {item.job?.salary || 'N/A'}
                </Text>

                <View style={{ marginTop: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.appliedDate}>Posted on {new Date(item?.job?.createdAt).toLocaleDateString()}</Text>
                  <Text style={[styles.appliedDate,]}>
                    Status : <Text style={[styles.statusBadgeText, { color: Colors.primaryBlue }]}>
                      {getStatusText(item.job?.status)}
                    </Text>
                  </Text>
                </View>

                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity
                    style={styles.viewDetailsButton}
                    onPress={() => { handleNavigation({ type: 'push', page: 'ApplicantJobDetails', navigation: navigation, passProps: { job: item.job, applications: item.applications } }) }} // Navigate to see details
                  >
                    <Text style={styles.viewDetailsButtonText}>View Profile</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={[styles.viewDetailsButton, { backgroundColor: Colors.brandBlue }]}
                    onPress={() => {  }}
                  >
                    <Text style={[styles.viewDetailsButtonText, { color: Colors.white }]}>Shortlist</Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Text style={{ color: Colors.bodyGray }}>No jobs found</Text>
              </View>
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );

};

export default ApplicationsScreen;