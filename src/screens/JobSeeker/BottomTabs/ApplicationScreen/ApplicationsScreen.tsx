import React, { useRef, useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { styles } from './Styles';
import HomeHeader from '../../../../components/HomeHeader';
import Images from '../../../../comman/Images';
import Colors from '../../../../comman/Colors';
import { APP_TEXT } from '../../../../comman/String';
import { Auth_Api, Post_Api } from '../../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../../Lib/ApiService/ApiUrl';
import Config from '../../../../Lib/ApiService/Config';
import Helper from '../../../../Lib/HelperFiles/Helper';
import { handleNavigation } from '../../../../navigation/RootNavigator';
import { useNavigation } from '@react-navigation/native';

interface Application {
  _id: string;
  id: string;
  description: string;
  responsibilities: string;

  companyLogo: any;
  title: string;
  company: string;
  location: string;
  status: 'SHORTLISTED' | 'APPLIED' | 'REJECTED' | 'INTERVIEW';
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

type TabType = 'All' | 'Active' | 'Interview' | 'Closed';

const FILTERS = [
  'All',
  'Active',
  'Interviews',
  'Closed'
];
const ApplicationsScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedTab, setSelectedTab] = useState<TabType>(FILTERS[0] as TabType);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const filtersListRef = useRef<FlatList<any>>(null);
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const userId = user?._id || user?.id;
    if (!userId) return;

    try {
      setLoading(true);
      const res: any = await Post_Api(ApiUrl.myAppliedJobs, {
        user_id: userId,
      })();
      console.log("response", res);
      const appsData = res?.data?.data || res?.data || [];
      if (Array.isArray(appsData)) {
        const mappedApps: Application[] = appsData.map((app: any) => ({
          _id: app?.job?._id,
          id: app.id,
          description: app.job?.description,
          responsibilities: app.job?.responsibilities,
          skills: app.job?.skills,
          qualifications: app.job?.qualifications,
          location: app.job?.location,
          companyLogo: app.job?.companyLogo ? app.job.companyLogo : '',
          title: app.job?.title || app.job?.jobTitle || 'Unknown Role',
          company: app.job?.company || 'Unknown Company',
          status: app.status?.toUpperCase() || 'APPLIED',
          appliedDate: new Date(app.appliedDate || app.createdAt).toLocaleDateString(),
          stages: [
            { name: 'APPLIED', completed: true },
            { name: 'REVIEW', completed: ['REVIEW', 'SHORTLISTED', 'INTERVIEW', 'HIRED', 'REJECTED'].includes(app.status?.toUpperCase()) },
            { name: 'SHORTLIST', completed: ['SHORTLISTED', 'INTERVIEW', 'HIRED', 'REJECTED'].includes(app.status?.toUpperCase()) },
            { name: 'INTERVIEW', completed: ['INTERVIEW', 'HIRED', 'REJECTED'].includes(app.status?.toUpperCase()) },
            { name: 'FINAL', completed: ['HIRED', 'REJECTED'].includes(app.status?.toUpperCase()) },
          ],
          canWithdraw: true,
        }));
        setApplications(mappedApps);
      }
    } catch (error) {
      console.log('Error fetching applied jobs', error);
      // Helper.showToast('Failed to fetch applied jobs');
    } finally {
      setLoading(false);
    }
  };

  const getTabCounts = () => ({
    All: applications.length,
    Active: applications.filter(a => a.status === 'APPLIED' || a.status === 'SHORTLISTED').length,
    Interviews: applications.filter(a => a.status === 'INTERVIEW').length,
    Closed: applications.filter(a => a.status === 'REJECTED').length,
  });

  const filteredApplications = () => {
    switch (selectedTab) {
      case 'Active':
        return applications.filter(a => a.status === 'APPLIED' || a.status === 'SHORTLISTED');
      case 'Interview':
        return applications.filter(a => a.status === 'INTERVIEW');
      case 'Closed':
        return applications.filter(a => a.status === 'REJECTED');
      default:
        return applications;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    const s = status?.toUpperCase();
    switch (s) {
      case 'SHORTLISTED':
        return Colors.periwinkle;
      case 'APPLIED':
        return Colors.iceBlue;
      case 'INTERVIEW':
        return Colors.badgeBlueTint;
      case 'REJECTED':
        return '#FFE6E6';
      case 'REVIEW':
        return Colors.iceBlue;
      case 'HIRED':
        return '#E6FFF0';
      default:
        return Colors.iceBlue;
    }
  };

  const getStatusBadgeTextColor = (status: string) => {
    const s = status?.toUpperCase();
    switch (s) {
      case 'SHORTLISTED':
        return Colors.phaseBlue;
      case 'APPLIED':
        return Colors.primaryBlue;
      case 'INTERVIEW':
        return Colors.phaseBlue;
      case 'REJECTED':
        return '#C41E3A';
      case 'REVIEW':
        return Colors.primaryBlue;
      case 'HIRED':
        return '#00873D';
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
      case 'INTERVIEW':
        return 'INTERVIEW';
      case 'REJECTED':
        return 'REJECTED';
      case 'REVIEW':
        return 'UNDER REVIEW';
      case 'HIRED':
        return 'HIRED';
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

  const handleJobsDetails = (job: any) => {
    handleNavigation({ type: 'push', navigation, page: 'CareerArchitect', passProps: { jobs: job } })
  }


  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader title={APP_TEXT.applicationsHeaderTitle} IconImg={Images.userImage} bellIcon={Images.settings} onNotificationPress={() => navigation.navigate('Setting')} />

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

        </View> */}

        {/* Applications List */}
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primaryBlue} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={filteredApplications()}
            keyExtractor={item => item._id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.applicationCard}>
                {/* Header Row with Logo and Status */}
                <View style={styles.cardHeader}>
                  <View style={styles.logoWrapper}>
                    {item.companyLogo ? (
                      <Image
                        source={{ uri: Config.imageurl + item.companyLogo }}
                        resizeMode="cover"
                        style={styles.companyLogo}
                      />
                    ) : (
                      <Text style={styles.avatarText}>
                        {item.company
                          ? item.company.split(' ').length > 1
                            ? item.company.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()
                            : item.company.substring(0, 2).toUpperCase()
                          : 'AP'}
                      </Text>
                    )}
                  </View>
                  <View style={[
                    styles.statusBadge, { backgroundColor: getStatusBadgeColor(item.status) }]}>
                    <Text style={[
                      styles.statusBadgeText,
                      { color: getStatusBadgeTextColor(item.status) }
                    ]}>
                      {getStatusText(item.status.toUpperCase())}
                    </Text>
                  </View>
                </View>

                {/* Job Title */}
                <Text style={styles.jobTitle}>{item.title}</Text>

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
                      <TouchableOpacity onPress={() => { item && handleJobsDetails(item) }} style={styles.viewDetailsButton}>
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
                    <TouchableOpacity onPress={() => { item && handleJobsDetails(item) }} style={styles.viewDetailsButton}>
                      <Text style={styles.viewDetailsButtonText}>View Details</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationsScreen;
