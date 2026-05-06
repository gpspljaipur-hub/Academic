import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Styles';
import { APP_TEXT } from '../../../../comman/String';
import Images from '../../../../comman/Images';
import HomeHeader from '../../../../components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { Get_Api } from '../../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../../Lib/ApiService/ApiUrl';
import Colors from '../../../../comman/Colors';
import Config from '../../../../Lib/ApiService/Config';
import { handleNavigation } from '../../../../navigation/RootNavigator';

const FILTERS = [
  APP_TEXT.jobsFilterLocation,
  APP_TEXT.jobsFilterExperience,
  APP_TEXT.jobsFilterType,
  APP_TEXT.jobsFilterSalary,
];
type FilterItem = (typeof FILTERS)[number];

const JobsScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const filtersListRef = useRef<FlatList<FilterItem>>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchJobs();
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

  const onFilterPress = (item: FilterItem, index: number) => {
    setSelectedFilter(item);
    filtersListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const renderJobItem = ({ item: job }: { item: any }) => {
    const title = job.title || job.jobTitle || 'Untitled Job';
    const company = job.company || 'Unknown Company';
    const location = job.location || 'Remote';
    const salary = job.salary || 'Competitive';
    const aiMatch = job.aiMatch || '10%';
    const image = job.companyLogo ? Config.imageurl + job.companyLogo : '';
    return (
      <TouchableOpacity style={styles.jobCard} onPress={() => { handleNavigation({ type: 'push', navigation, page: 'CareerArchitect', passProps: { jobs: job } }) }}>
        <View style={styles.jobTopRow}>
          {job?.companyLogo ? (
            <View style={styles.logoWrap}>
              <Image
                source={{ uri: Config.imageurl + job.companyLogo }}
                resizeMode="contain"
                style={{ width: 50, height: 50, }}
              />
            </View>
          ) : (

            <View style={styles.avatarWrapper}>
              <Text style={styles.avatarText}>
                {job?.company
                  ? job.company.split(' ').length > 1
                    ? job.company.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase()
                    : job.company.substring(0, 2).toUpperCase()
                  : 'AP'}
              </Text>
            </View>
          )}

          <View style={styles.jobTopCenter}>

            <Text style={styles.jobTitle}>{title}</Text>
            <Text style={styles.companyName}>{company}</Text>
          </View>
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>⚡ {aiMatch}</Text>
          </View>
          {/* <Image source={Images.bookmark} resizeMode="contain" style={styles.bookmarkIcon} /> */}
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Image source={Images.locations} resizeMode="contain" style={styles.metaIcon} />
            <Text style={styles.metaText}>{location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Image source={Images.money} resizeMode="contain" style={styles.metaIcon} />
            <Text style={styles.metaText}>{salary}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => { handleNavigation({ type: 'push', navigation, page: 'Apply', passProps: { jobs: job } }) }} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>{APP_TEXT.homeQuickApply}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const ListHeader = () => (
    <>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Image source={Images.search} resizeMode="contain" style={styles.searchIconInInput} />
          <TextInput
            placeholder={APP_TEXT.jobsSearchPlaceholder}
            placeholderTextColor="#6B7280"
            style={styles.searchInput}
          />
        </View>
        <View style={styles.filterActionBox}>
          <Image source={Images.filter} resizeMode="contain" style={styles.filterActionIcon} />
        </View>
      </View>

      <FlatList
        ref={filtersListRef}
        horizontal
        data={FILTERS}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersList}
        onScrollToIndexFailed={() => { }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => onFilterPress(item, index)}
            style={[styles.filterChip, selectedFilter === item && styles.filterChipActive]}>
            <Text style={[styles.filterChipText, selectedFilter === item && styles.filterChipTextActive]}>
              {item}
            </Text>
          </Pressable>
        )}
      />

      <Text style={styles.sectionTitle}>{APP_TEXT.jobsRecommendedTitle}</Text>

      {loading && (
        <ActivityIndicator size="small" color={Colors.brandBlue} style={{ marginVertical: 20 }} />
      )}
    </>
  );

  const filteredJobs = jobs.filter(job =>
    (job.title || '').toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader title={APP_TEXT.jobsHeaderTitle} IconImg={Images.userImage} bellIcon={Images.settings} onNotificationPress={() => navigation.navigate('Setting')} />

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Image source={Images.search} resizeMode="contain" style={styles.searchIconInInput} />
          <TextInput
            placeholder={APP_TEXT.jobsSearchPlaceholder}
            placeholderTextColor="#6B7280"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={styles.filterActionBox}>
          <Image source={Images.filter} resizeMode="contain" style={styles.filterActionIcon} />
        </View>
      </View>

      <View>
        <FlatList
          ref={filtersListRef}
          horizontal
          data={FILTERS}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
          onScrollToIndexFailed={() => { }}
          renderItem={({ item, index }) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => onFilterPress(item, index)}
                style={[styles.filterChip, selectedFilter === item && styles.filterChipActive]}>
                <Text style={[styles.filterChipText, selectedFilter === item && styles.filterChipTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>

          )}
        />
      </View>
      <Text style={styles.sectionTitle}>{APP_TEXT.jobsRecommendedTitle}</Text>
      {loading && (
        <ActivityIndicator size="small" color={Colors.brandBlue} style={{ marginVertical: 20 }} />
      )}

      <FlatList
        data={loading ? [] : filteredJobs}
        ListEmptyComponent={!loading ? (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 16, color: '#6B7280' }}>
              {searchText !== '' ? `Not Found: "${searchText}"` : 'No jobs available'}
            </Text>
          </View>
        ) : null}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderJobItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default JobsScreen;
