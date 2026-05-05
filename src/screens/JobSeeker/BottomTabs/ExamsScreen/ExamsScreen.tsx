import React, { useState } from 'react';
import { FlatList, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../../../comman/Images';
import { styles } from './Styles';
import { APP_TEXT } from '../../../../comman/String';
import HomeHeader from '../../../../components/HomeHeader';
import { useNavigation } from '@react-navigation/native';

const EXAM_FILTERS = APP_TEXT.examFilters;
const EXAM_NOTIFICATIONS = APP_TEXT.examNotifications;

const ExamsScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedFilter, setSelectedFilter] = useState<string>(EXAM_FILTERS[0]);

  const renderNotification = ({ item }: any) => (
    <View key={item.id} style={styles.notificationCard}>
      <View style={styles.cardTop}>
        <View style={styles.leftWrap}>
          <View style={styles.iconWrap}>
            <Image source={item.icon} resizeMode="contain" style={styles.cardIcon} />
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubTitle}>{item.org} • {item.date}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.footerText}>{item.stats}</Text>
        <Text style={styles.footerAction}>View Details</Text>
      </View>
    </View>
  );

  const ListHeader = () => (
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
        />
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionLabel}>{APP_TEXT.examLatestAnnouncements}</Text>
          <Text style={styles.sectionTitle}>{APP_TEXT.examRecentNotifications}</Text>
        </View>
        <Text style={styles.sectionAction}>{APP_TEXT.examViewHistory}</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader title={APP_TEXT.examHeaderTitle} IconImg={Images.userImage} bellIcon={Images.settings} onNotificationPress={() => navigation.navigate('Setting')} />

      <FlatList
        data={EXAM_NOTIFICATIONS}
        keyExtractor={item => item.id}
        renderItem={renderNotification}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ExamsScreen;
