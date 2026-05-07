import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Styles';
import { APP_TEXT } from '../../../../comman/String';
import Images from '../../../../comman/Images';
import HomeHeader from '../../../../components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { Get_Api, Post_Api } from '../../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../../Lib/ApiService/ApiUrl';
import Colors from '../../../../comman/Colors';
import Config from '../../../../Lib/ApiService/Config';
import { handleNavigation } from '../../../../navigation/RootNavigator';
import { useSelector } from 'react-redux';

const FILTERS = APP_TEXT.filterData;

type FilterItem = (typeof FILTERS)[number];

type FilterOption = { name: string };

const JobsScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>(FILTERS[0]?.label || '');
  const [selectedFilterValue, setSelectedFilterValue] = useState<string>('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const filtersListRef = useRef<FlatList<FilterItem>>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const user = useSelector((state: any) => state.user.user);

  console.log('User in FILTERS====:', FILTERS);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const userId = user?._id || user?.id;

      const response: any = await Post_Api(ApiUrl.PostAllJobs, { userId })();
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
    if (selectedFilterCategory !== item.label) {
      setSelectedFilterValue('');
    }
    setSelectedFilterCategory(item.label);
    filtersListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const handleFilterOptionSelect = (category: string, option: string) => {
    setSelectedFilterCategory(category);
    setSelectedFilterValue(option);
    setIsFilterModalVisible(false);
  };

  const isJobMatchingFilter = (job: any) => {
    if (!selectedFilterValue) return true;

    const filterValue = selectedFilterValue.toLowerCase();
    const tags = Array.isArray(job.tags) ? job.tags.map((tag: any) => String(tag).toLowerCase()) : [];

    switch (selectedFilterCategory) {
      case 'Location':
        return [job.location, ...tags].some((value: any) => String(value || '').toLowerCase().includes(filterValue));
      case 'Experience':
        return [job.experience, job.experienceLevel, job.experienceRequired, job.exp, ...tags]
          .some((value: any) => String(value || '').toLowerCase().includes(filterValue));
      case 'Job Type':
        return [job.jobType, job.type, job.employmentType, ...tags]
          .some((value: any) => String(value || '').toLowerCase().includes(filterValue));
      case 'Salary':
        return String(job.salary || '').toLowerCase().includes(filterValue);
      default:
        return [job.location, job.salary, ...tags].some((value: any) => String(value || '').toLowerCase().includes(filterValue));
    }
  };

  const renderJobItem = ({ item: job }: { item: any }) => {
    const title = job.title || job.jobTitle || 'Untitled Job';
    const company = job.company || 'Unknown Company';
    const location = job.location || 'Remote';
    const salary = job.salary || 'Competitive';
    const aiMatch = job.matchPercentage || '10%';
    const image = job.companyLogo ? Config.imageurl + job.companyLogo : '';
    return (
      <TouchableOpacity style={styles.jobCard} onPress={() => { handleNavigation({ type: 'push', navigation, page: 'CareerArchitect', passProps: { jobs: job } }) }}>
        <View style={styles.jobTopRow}>
          {job?.companyLogo ? (
            <View style={styles.logoWrap}>
              <Image
                source={{ uri: Config.imageurl + job.companyLogo }}
                resizeMode="cover"
                style={{ width: 48, height: 48, borderRadius: 8 }}
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



  const filteredJobs = jobs.filter(job => {
    const matchesSearch = (job.title || '').toLowerCase().includes(searchText.toLowerCase());
    return matchesSearch && isJobMatchingFilter(job);
  });

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
        <Pressable style={styles.filterActionBox} onPress={() => setIsFilterModalVisible(true)}>
          <Image source={Images.filter} resizeMode="contain" style={styles.filterActionIcon} />
        </Pressable>
      </View>


      {selectedFilterValue ? (
        <View style={styles.activeFilterRow}>
          <Text style={styles.activeFilterLabel}>{`${selectedFilterCategory}: ${selectedFilterValue}`}</Text>
          <TouchableOpacity onPress={() => setSelectedFilterValue('')}>
            <Text style={styles.clearFilterText}>Clear</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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


      <Modal
        visible={isFilterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter jobs</Text>
            <View style={styles.modalBody}>
              {FILTERS.map(filter => (
                <View key={filter.label} style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>{filter.label}</Text>
                  <View style={styles.modalOptionsRow}>
                    {filter.data.map((option: FilterOption) => {
                      const isActive = selectedFilterCategory === filter.label && selectedFilterValue === option.name;
                      return (
                        <TouchableOpacity
                          key={option.name}
                          onPress={() => handleFilterOptionSelect(filter.label, option.name)}
                          style={[styles.modalOption, isActive && styles.modalOptionSelected]}
                        >
                          <Text style={[styles.modalOptionText, isActive && styles.modalOptionTextSelected]}>
                            {option.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsFilterModalVisible(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default JobsScreen;
