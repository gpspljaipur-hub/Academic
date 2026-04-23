import React, { useRef, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Styles';
import { APP_TEXT } from '../../../../comman/String';
import Images from '../../../../comman/Images';
import HomeHeader from '../../../../components/HomeHeader';

const FILTERS = [
  APP_TEXT.jobsFilterLocation,
  APP_TEXT.jobsFilterExperience,
  APP_TEXT.jobsFilterType,
  APP_TEXT.jobsFilterSalary,
];
type FilterItem = (typeof FILTERS)[number];

const JobsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const filtersListRef = useRef<FlatList<FilterItem>>(null);

  const onFilterPress = (item: FilterItem, index: number) => {
    setSelectedFilter(item);
    filtersListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader title={APP_TEXT.jobsHeaderTitle} IconImg={Images.userImage}  bellIcon={Images.bellIcon} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
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
          onScrollToIndexFailed={() => {}}
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

        {APP_TEXT.jobsList.map(job => (
          <View key={job.title} style={styles.jobCard}>
            <View style={styles.jobTopRow}>
              <View style={styles.logoWrap}>
                <Image source={job.image} resizeMode="contain" style={styles.logoImage} />
              </View>
              <View style={styles.jobTopCenter}>
                <View style={styles.matchBadge}>
                  <Text style={styles.matchText}>{job.aiMatch}</Text>
                </View>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.companyName}>{job.company}</Text>
              </View>
              <Image source={Images.bookmark} resizeMode="contain" style={styles.bookmarkIcon} />
            </View>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Image source={Images.locations} resizeMode="contain" style={styles.metaIcon} />
                <Text style={styles.metaText}>{job.location}</Text>
              </View>
              <View style={styles.metaItem}>
                <Image source={Images.money} resizeMode="contain" style={styles.metaIcon} />
                <Text style={styles.metaText}>{job.salary}</Text>
              </View>
            </View>

            <View style={styles.applyButton}>
              <Text style={styles.applyButtonText}>{APP_TEXT.homeQuickApply}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobsScreen;
