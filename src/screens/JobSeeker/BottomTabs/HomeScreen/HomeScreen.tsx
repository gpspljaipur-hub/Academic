import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, View, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Styles';
import HomeHeader from '../../../../components/HomeHeader';
import { APP_TEXT } from '../../../../comman/String';
import Images from '../../../../comman/Images';
import { useNavigation } from '@react-navigation/native';
import { Get_Api, Post_Api } from '../../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../../Lib/ApiService/ApiUrl';
import Colors from '../../../../comman/Colors';
import Config from '../../../../Lib/ApiService/Config';
import { handleNavigation } from '../../../../navigation/RootNavigator';

const QUICK_TILES = [
  {
    id: 'quick-view',
    label: APP_TEXT.homeQuickViewLabel,
    title: APP_TEXT.homeQuickViewTitle,
    icon: APP_TEXT.homeQuickViewIcon,
  },
  {
    id: 'download',
    label: APP_TEXT.homeDownloadLabel,
    title: APP_TEXT.homeDownloadTitle,
    icon: APP_TEXT.homeDownloadIcon,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [jobs, setJobs] = useState<any[]>([]);
  const [latestJobs, setLatestJobs] = useState<any[]>([]);
  const [latestExams, setLatestExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
    fetchLatestJobs();
    fetchLatestExams();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response: any = await Get_Api(ApiUrl.PostAllJobs, {})();
      console.log('Jobs Response:', response);
      if (response?.data.status) {
        let jobsData = response?.data?.data;
        setJobs(Array.isArray(jobsData) ? jobsData : (jobsData || []));
      }
    } catch (error) {
      console.log('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestJobs = async () => {
    try {
      setLoading(true);
      const response: any = await Post_Api(ApiUrl.LATEST_JOBS, {})();
      console.log('Latest Jobs Response:', response);
      if (response?.data?.success) {
        setLatestJobs(response?.data?.data || []);
      }
    } catch (error) {
      console.log('Error fetching latest jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestExams = async () => {
    try {
      setLoading(true);
      const response: any = await Post_Api(ApiUrl.LATEST_EXAMS, {})();
      console.log('Latest Exams Response:', response);
      if (response?.data?.success) {
        setLatestExams(response?.data?.data || []);
      }
    } catch (error) {
      console.log('Error fetching latest exams:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log("latestjobs", latestJobs)
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader title={APP_TEXT.homeHeaderTitle} IconImg={Images.userImage} bellIcon={Images.bellIcon} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <TextInput
              placeholder={APP_TEXT.homeSearchPlaceholder}
              placeholderTextColor="#8B93A1"
              style={styles.searchText}
            />
          </View>
          <View style={styles.findButton}>
            <Text style={styles.findButtonText}>{APP_TEXT.homeFindNow}</Text>
          </View>
        </View>

        <View style={styles.highlightCard}>
          <View style={styles.highlightBadge}>
            <Text style={styles.highlightBadgeText}>{APP_TEXT.homeNewJobsBadge}</Text>
          </View>
          <Text style={styles.highlightTitle}>{APP_TEXT.homeNewJobsTitle}</Text>

          <View style={styles.highlightMatchesBadge}>
            <Text style={styles.highlightMatchesBadgeText}>{APP_TEXT.homeNewJobsMatches}</Text>
          </View>
        </View>

        <FlatList
          data={QUICK_TILES}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.quickTilesWrap}
          renderItem={({ item }) => (
            <View style={styles.quickTile}>
              <View>
                <Text style={styles.quickTileLabel}>{item.label}</Text>
                <Text style={styles.quickTileTitle}>{item.title}</Text>
              </View>
              <View style={styles.quickTileIcon}>
                <Text style={styles.quickTileIconText}>{item.icon}</Text>
              </View>
            </View>
          )}
        />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <Text style={styles.sectionTitle}>{APP_TEXT.homeRecommendedTitle}</Text>
              <Text style={styles.sectionSubTitle}>{APP_TEXT.homeCuratedBy}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('RecommendedJobs')}>
              <Text style={styles.sectionAction}>{APP_TEXT.homeSeeAll}</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="small" color={Colors.brandBlue} style={{ marginVertical: 20 }} />
          ) : jobs.length > 0 ? (
            jobs.slice(0, 5).map((job: any, index: number) => {
              const title = job.title || job.jobTitle || 'Untitled Job';
              const company = job.company || 'Unknown Company';
              const location = job.location || 'Remote';
              const tags = job.jobType || ['Full Time'];
              const aiMatch = job.aiMatch || '90%';
              const salary = job.salary || 'Competitive';
              const image = job.companyLogo ? Config.imageurl + job.companyLogo : '';
              return (
                <Pressable onPress={() => handleNavigation({ type: 'push', navigation, page: 'CareerArchitect', passProps: { jobs: job } })} key={index.toString()} style={styles.jobCard}>
                  <View style={styles.jobTopRow}>
                    {image ?
                      <Image source={image ? { uri: image } : Images.amazonpay} resizeMode='cover' style={styles.jobCompanyLogo} />
                      :
                      <View style={styles.jobCompanyLogoImage}>
                        <Text style={styles.jobIconText}>{title.charAt(0).toUpperCase()}</Text>
                      </View>}
                    <View style={styles.aiBadge}>
                      <Text style={styles.aiBadgeText}>⚡ {aiMatch} {APP_TEXT.aiMatch} </Text>
                    </View>
                  </View>
                  <Text style={styles.jobTitle}>{title}</Text>
                  <Text style={styles.jobMeta}> {company} • {location} </Text>

                  <View style={styles.jobTagsRow}>
                    <View style={styles.jobTag}>
                      <Text style={styles.jobTagText}>{tags}</Text>
                    </View>

                    <View style={styles.jobTag}>
                      <Text style={styles.jobTagText}>{salary}</Text>
                    </View>
                  </View>

                  <TouchableOpacity onPress={() => handleNavigation({ type: 'push', navigation, page: 'Apply', passProps: { jobs: job } })} style={styles.quickApply}>
                    <Text style={styles.quickApplyText}>{APP_TEXT.homeQuickApply}</Text>
                  </TouchableOpacity>
                </Pressable>
              );
            })
          ) : null}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{APP_TEXT.homeLatestGovtJobsTitle}</Text>
            <TouchableOpacity
            // onPress={fetchLatestJobs}
            >
              <Image source={Images.bank} resizeMode='contain' style={styles.bankimage} /></TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.brandBlue} style={{ marginVertical: 20 }} />
          ) : latestJobs.length > 0 ? (
            latestJobs.map((job, index) => (
              <Pressable key={index} onPress={() => handleNavigation({ type: 'push', navigation, page: 'Detail', passProps: { job } })}
                style={({ pressed }) => [styles.govtCard, pressed && { opacity: 0.7 }]}>
                <View style={styles.govtCenter}>
                  <Text numberOfLines={1} style={styles.govtTitle}>{job.title}</Text>
                  <Text style={styles.govtMeta}>{job.description}</Text>
                </View>
                <View>
                  <Text style={styles.deadlineLabel}>{APP_TEXT.homePublish}</Text>
                  <Text style={styles.deadlineDate}>{new Date(job.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</Text>
                </View>
              </Pressable>
            ))
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: Colors.mutedSlate }}>No recent notifications found.</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{APP_TEXT.homePrivateSectorTitle}</Text>
            <Image source={Images.employee} resizeMode='contain' style={styles.bankimage} />
          </View>
          <View style={styles.chipRow}>
            {APP_TEXT.homePrivateCompanies.map(company => (
              <View key={company.name} style={styles.chip}>
                <View >
                  <Image source={company.image} resizeMode="contain" style={styles.chipIcon} />
                </View>
                <Text style={styles.chipText}>{company.name}</Text>
                <Text style={styles.companyRoles}>{company.roles}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{APP_TEXT.homeUpcomingExamTitle}</Text>
            {/* <Text style={styles.sectionAction}>{APP_TEXT.homeFullSchedule}</Text> */}
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={latestExams}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.upcomingList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleNavigation({ type: 'push', navigation, page: 'Detail', passProps: { job: item } })} style={styles.upcomingCard}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.upcomingDate}>{item.startDate}</Text>
                  <Text style={styles.sectionAction}>{APP_TEXT.homeCalendarIcon}</Text>
                </View>
                <Text style={styles.upcomingTitle}>{item.title}</Text>
                <Text style={styles.upcomingDesc}>{item.description}</Text>
                <Text style={styles.sectionAction}>{APP_TEXT.homeDetailsArrow}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              !loading && (
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <Text style={{ color: Colors.mutedSlate }}>No upcoming exams found.</Text>
                </View>
              )
            )}
          />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
