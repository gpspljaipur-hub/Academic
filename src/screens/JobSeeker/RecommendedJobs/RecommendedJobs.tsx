import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { styles } from './Styles';
import { APP_TEXT } from '../../../comman/String';
import Images from '../../../comman/Images';
import Header from '../../../components/Header';
import { Get_Api } from '../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../Lib/ApiService/ApiUrl';
import Config from '../../../Lib/ApiService/Config';
import Colors from '../../../comman/Colors';


const RecommendedJobs = () => {
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState<any[]>([]);

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

    const renderItem = ({ item: job }: { item: any }) => {
        const title = job.title || job.jobTitle || 'Untitled Job';
        const company = job.company || 'Unknown Company';
        const location = job.location || 'Remote';
        const aiMatch = job.aiMatch || '90%';
        const salary = job.salary || 'Competitive';
        const image = job.companyLogo ? Config.imageurl + job.companyLogo : '';

        return (
            <TouchableOpacity style={styles.jobCard} onPress={() => { navigation.navigate('CareerArchitect', { job }); }}>
                <View style={styles.jobTopRow}>
                    <View style={styles.logoWrap}>
                        <Image source={image ? { uri: image } : Images.amazonpay} resizeMode='cover' style={styles.jobCompanyLogo} />
                    </View>
                    <View style={styles.jobTopCenter}>
                        <View style={styles.matchBadge}>
                            <Text style={styles.matchText}>{aiMatch} {APP_TEXT.aiMatch}</Text>
                        </View>
                        <Text style={styles.jobTitle}>{title}</Text>
                        <Text style={styles.companyName}>{company}</Text>
                    </View>
                    <Image source={Images.bookmark} resizeMode="contain" style={styles.bookmarkIcon} />
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

                <TouchableOpacity onPress={() => { navigation.navigate('Apply'); }} style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>{APP_TEXT.homeQuickApply}</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title={APP_TEXT.jobsRecommended} />

            <FlatList
                data={jobs}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    loading
                        ? <ActivityIndicator size="small" color={Colors.brandBlue} style={{ marginVertical: 20 }} />
                        : null
                }
            />
        </SafeAreaView>
    );
};

export default RecommendedJobs;
