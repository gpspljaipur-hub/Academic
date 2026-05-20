import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { styles } from './Styles';
import Images from '../../../comman/Images';
import Header from '../../../components/Header';
import Config from '../../../Lib/ApiService/Config';
import Colors from '../../../comman/Colors';
import { useSelector } from 'react-redux';
import { handleNavigation } from '../../../navigation/RootNavigator';
import { Post_Api } from '../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../Lib/ApiService/ApiUrl';
import Helper from '../../../Lib/HelperFiles/Helper';
import fonts from '../../../comman/fonts';

const SavedJobs = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    if (isFocused) {
      loadSavedJobs();
    }
  }, [isFocused]);

  const loadSavedJobs = async () => {
    const userId = user?._id || user?.id;
    if (!userId) return;
    setLoading(true);
    try {
      const res: any = await Post_Api(ApiUrl.getSavedJobs, { userId })();
      if (res?.data?.status) {
        setSavedJobs(res.data.data || []);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (job: any) => {
    const userId = user?._id || user?.id;
    if (!userId || !job._id) return;
    try {
      const res: any = await Post_Api(ApiUrl.saveJob, { userId, jobId: job._id })();
      if (res?.data?.status) {
        Helper.showToast(res.data.message);
        loadSavedJobs();
      }
    } catch (error) {
    }
  };

  const renderItem = ({ item: job }: { item: any }) => {
    const title = job.title || job.jobTitle || 'Untitled Job';
    const company = job.company || 'Unknown Company';
    const location = job.location || 'Remote';
    const salary = job.salary || 'Competitive';
    const image = job.companyLogo ? Config.imageurl + job.companyLogo : '';

    return (
      <TouchableOpacity style={styles.jobCard} onPress={() => handleNavigation({ type: 'push', navigation, page: 'CareerArchitect', passProps: { jobs: job } })}>
        <View style={styles.jobTopRow}>
          {image ? (
            <View style={styles.logoWrap}>
              <Image source={{ uri: image }} resizeMode='cover' style={styles.jobCompanyLogo} />
            </View>
          ) : (
            <View style={styles.avatarWrapper}>
              <Text style={styles.avatarText}>
                {company ? company.substring(0, 2).toUpperCase() : 'JB'}
              </Text>
            </View>
          )}
          <View style={styles.jobTopCenter}>
            <Text style={styles.jobTitle}>{title}</Text>
            <Text style={styles.companyName}>{company}</Text>
          </View>
          <TouchableOpacity onPress={() => handleRemove(job)} hitSlop={10}>
            <Image source={Images.bookmark} resizeMode="contain" style={[styles.bookmarkIcon, { tintColor: Colors.primaryBlue }]} />
          </TouchableOpacity>
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

        <TouchableOpacity onPress={() => handleNavigation({ type: 'push', navigation, page: 'Apply', passProps: { jobs: job } })} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Quick Apply</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} title="Saved Jobs" />

      <FlatList
        data={savedJobs}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="small" color={Colors.brandBlue} style={{ marginVertical: 20 }} />
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
              <Image source={Images.bookmark} resizeMode="contain" style={{ width: 50, height: 50, tintColor: Colors.mutedSlate, marginBottom: 16 }} />
              <Text style={{ fontSize: 16, color: '#6B7280', fontFamily: fonts.Lexend_Medium }}>No saved jobs yet</Text>
              <Text style={{ fontSize: 13, color: '#9CA3AF', fontFamily: fonts.Lexend_Regular, marginTop: 4 }}>Bookmark jobs to see them here</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default SavedJobs;
