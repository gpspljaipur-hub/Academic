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
      fetchJobs();
    }
  }, [isFocused]);

  const fetchJobs = async () => {
    const recruiterId = user?.id || user?._id;
    if (!recruiterId) return;

    try {
      setLoading(true);
      const res: any = await Post_Api(`${ApiUrl.myJobs}/${recruiterId}`, {})();
      console.log('fetchJobs in Application.tsx res', res.data.data);

      if (res?.data?.status) {
        setJobs(res.data.data || []);
      }
    } catch (error) {
      console.log('fetchJobs error', error);
    } finally {
      setLoading(false);
    }
  };

  const getTabCounts = () => ({
    All: jobs.length,
    Active: jobs.filter(a => a.status === 'OPEN' || a.status === 'open').length,
    Interviews: 0, // Placeholder as we don't have this data yet
    Closed: jobs.filter(a => a.status === 'CLOSED' || a.status === 'closed').length,
  });

  const filteredApplications = () => {
    switch (selectedTab) {
      case 'Active':
        return jobs.filter(a => a.status === 'OPEN' || a.status === 'open');
      case 'Closed':
        return jobs.filter(a => a.status === 'CLOSED' || a.status === 'closed');
      default:
        return jobs;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    const s = status?.toUpperCase();
    switch (s) {
      case 'OPEN':
        return Colors.iceBlue;
      case 'CLOSED':
        return '#FFE6E6';
      default:
        return Colors.iceBlue;
    }
  };

  const getStatusBadgeTextColor = (status: string) => {
    const s = status?.toUpperCase();
    switch (s) {
      case 'OPEN':
        return Colors.primaryBlue;
      case 'CLOSED':
        return '#C41E3A';
      default:
        return Colors.primaryBlue;
    }
  };

  const getStatusText = (status: string) => {
    return status?.toUpperCase() || 'OPEN';
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
        {/* <View style={styles.tabsContainer} >
          <FlatList
            ref={filtersListRef}
            horizontal
            data={FILTERS.filter(f => f !== 'Interviews')}
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
                <View style={styles.cardHeader}>
                  <View style={styles.logoWrapper}>
                    {item?.companyLogo ?
                      <Image
                        source={item?.companyLogo && { uri: Config.imageurl + item.companyLogo } || Images.indesign} // Placeholder or from API if available
                        resizeMode="contain"
                        style={styles.companyLogo}
                      />
                      :
                      <Text style={styles.companyLogoText}>{item?.company?.substring(0, 2)?.toUpperCase()}</Text>
                    }

                  </View>
                  <View style={[
                    styles.statusBadge, { backgroundColor: getStatusBadgeColor(item.status) }]}>
                    <Text style={[
                      styles.statusBadgeText,
                      { color: getStatusBadgeTextColor(item.status) }
                    ]}>
                      {getStatusText(item.status)}
                    </Text>
                  </View>
                </View>

                <Text style={styles.jobTitle}>{item.title}</Text>

                <Text style={styles.companyLocation}>
                  {item.company} • {item.location}
                </Text>

                <View style={{ marginTop: 1 }}>
                  <Text style={styles.appliedDate}>Posted {new Date(item.createdAt).toLocaleDateString()}</Text>
                </View>

                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity
                    style={styles.viewDetailsButton}
                    onPress={() => navigation.navigate('RecuiterRecentJobs')} // Navigate to see details
                  >
                    <Text style={styles.viewDetailsButtonText}>Manage Applicants</Text>
                  </TouchableOpacity>
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
