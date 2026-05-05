import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../../../comman/Images';
import { styles } from './Styles';
import { APP_TEXT } from '../../../../comman/String';
import HomeHeader from '../../../../components/HomeHeader';
import { Post_Api } from '../../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../../Lib/ApiService/ApiUrl';
import { useNavigation } from '@react-navigation/native';
import { handleNavigation } from '../../../../navigation/RootNavigator';
import Colors from '../../../../comman/Colors';

const EXAM_FILTERS = APP_TEXT.examFilters;

const ListHeader = ({ selectedFilter, setSelectedFilter, searchQuery, setSearchQuery }: any) => (
  <>
    <View style={styles.filterContainer}>
      <FlatList
        data={EXAM_FILTERS}
        numColumns={4}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedFilter(item)}
            style={[styles.filterChip, selectedFilter === item && styles.filterChipActive]}>
            <Text style={[styles.filterChipText, selectedFilter === item && styles.filterChipTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>

    <View style={styles.searchBox}>
      <Image source={Images.search} resizeMode="contain" style={styles.searchIcon} />
      <TextInput
        placeholder={APP_TEXT.examSearchPlaceholder}
        placeholderTextColor="#9CA3AF"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>

    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionLabel}>{APP_TEXT.examLatestAnnouncements}</Text>
        <Text style={styles.sectionTitle}>{APP_TEXT.examRecentNotifications}</Text>
      </View>
      {/* <Text style={styles.sectionAction}>{APP_TEXT.examViewHistory}</Text> */}
    </View>
  </>
);

const ListFooter = () => (
  <>
    <View style={styles.blueCard}>
      <Text style={styles.blueTitle}>{APP_TEXT.examSyllabusUpdate}</Text>
      <Text style={styles.blueText}>{APP_TEXT.examSyllabusText}</Text>
      <Pressable style={styles.downloadBtn}>
        <Text style={styles.downloadBtnText}>{APP_TEXT.examDownloadPdf}</Text>
      </Pressable>
    </View>

    <View style={styles.prepCard}>
      <Image source={Images.tech} resizeMode="cover" style={styles.prepImage} />
      <Text style={styles.prepTitle}>{APP_TEXT.prepTitle}</Text>
      <Text style={styles.prepText}>{APP_TEXT.prepText}</Text>
      <TouchableOpacity style={styles.mockBtn}>
        <Text style={styles.mockBtnText}>{APP_TEXT.examTakeMockTest}</Text>
      </TouchableOpacity>
      <Text style={styles.resourcesText}>{APP_TEXT.examExploreResources}</Text>
    </View>
  </>
);

const ExamsScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedFilter, setSelectedFilter] = useState<string>(EXAM_FILTERS[0]);
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [admitCards, setAdmitCards] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchExams(),
        fetchResults()
      ]);
      setLoading(false);
    };
    loadAllData();
  }, []);

  const fetchResults = async () => {
    try {
      const response: any = await Post_Api(ApiUrl.examsResults, {})();
      console.log('Latest Results Response:', response);
      if (response?.data?.success) {
        setResults(response?.data?.data || []);
      }
    } catch (error) {
      console.log('Error fetching results:', error);
    }
  };

  const fetchAdmitCards = async () => {
    setAdmitCards([]);
  };

  const fetchExams = async () => {
    try {
      const response: any = await Post_Api(ApiUrl.LATEST_EXAMS, {})();
      console.log('Latest Exams Response:', response);
      if (response?.data?.success) {
        setExams(response?.data?.data || []);
      }
    } catch (error) {
      console.log('Error fetching exams:', error);
    }
  };

  const filteredExams = (() => {
    let dataToFilter = [];
    if (selectedFilter === EXAM_FILTERS[0]) dataToFilter = exams;
    else if (selectedFilter === EXAM_FILTERS[1]) dataToFilter = results;
    else if (selectedFilter === EXAM_FILTERS[2]) dataToFilter = admitCards;
    else dataToFilter = exams;

    return dataToFilter.filter(item => {
      const title = item.title?.toLowerCase() || '';
      const description = item.description?.toLowerCase() || '';
      const query = searchQuery.toLowerCase();
      return title.includes(query) || description.includes(query);
    });
  })();
  const renderNotification = ({ item }: any) => (
    <View key={item._id || item.id} style={styles.notificationCard}>
      <View style={styles.cardTop}>
        <View style={styles.leftWrap}>
          <View style={styles.iconWrap}>
            <Image source={Images.bank} resizeMode="contain" style={styles.cardIcon} />
          </View>
        </View>
        {/* <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status || 'NEW'}</Text>
        </View> */}
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubTitle}>{item.description} • </Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.footerText}>{item.source}</Text>
        <TouchableOpacity onPress={() => handleNavigation({ type: 'push', navigation, page: 'Detail', passProps: { job: item } })}>
          <Text style={styles.footerAction}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader title={APP_TEXT.examHeaderTitle} IconImg={Images.userImage} bellIcon={Images.menu} />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.brandBlue} />
        </View>
      ) : (
        <FlatList
          data={filteredExams}
          keyExtractor={item => item._id || item.id}
          renderItem={renderNotification}
          ListHeaderComponent={
            <ListHeader
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          }
          ListFooterComponent={<ListFooter />}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: Colors.mutedSlate }}>
                No {selectedFilter.toLowerCase()} found.
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ExamsScreen;

