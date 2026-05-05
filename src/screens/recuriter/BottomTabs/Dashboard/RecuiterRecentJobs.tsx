import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../../comman/Colors'
import { APP_TEXT } from '../../../../comman/String'
import Images from '../../../../comman/Images'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../../../../components/HomeHeader'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Post_Api } from '../../../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../../../Lib/ApiService/ApiUrl'
import styles from './Styles'

const RecuiterRecentJobs = () => {
    const strings = APP_TEXT.dashboard;
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const { user } = useSelector((state: any) => state.user);
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isFocused) {
            fetchJobs();
        }
    }, [isFocused]);

    const fetchJobs = async () => {
        const recruiterId = user?.id || user?._id;
        if (!recruiterId) return;

        try {
            setLoading(true);
            // The user provided curl: POST 'http://localhost:3000/recruiterJob/myJobs/69f03bb0ae0452eae3b98e45'
            const res: any = await Post_Api(`${ApiUrl.myJobs}/${recruiterId}`, {})();
            console.log('fetchJobs res', res);

            if (res?.data?.status) {
                setJobs(res.data.jobs || []);
            }
        } catch (error) {
            console.log('fetchJobs error', error);
        } finally {
            setLoading(false);
        }
    };

    const getShortCode = (title: string) => {
        if (!title) return 'JB';
        const words = title.trim().split(' ');
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return title.substring(0, 2).toUpperCase();
    };

    const JobItem = ({ title, status, time, shortCode }: any) => (
        <TouchableOpacity style={styles.jobCard}>
            <View style={styles.jobIconContainer}>
                <Text style={styles.jobIconText}>{shortCode}</Text>
            </View>
            <View style={styles.jobDetails}>
                <Text style={styles.jobTitle}>{title}</Text>
                <View style={styles.jobStatusContainer}>
                    <View style={[styles.activeBadge, status === 'CLOSED' && { backgroundColor: Colors.cardGray }]}>
                        <Text style={[styles.activeText, status === 'CLOSED' && { color: Colors.bodyGray }]}>{status}</Text>
                    </View>
                    <Text style={styles.jobTime}>Posted {time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <HomeHeader
                title={strings.recruiterRecentJobs}
                IconImg={Images.backArrow}
                backArrow={true}

            />

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.brandBlue} />
                </View>
            ) : (
                <FlatList
                    data={jobs}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <JobItem
                            title={item.title}
                            status={item.status?.toUpperCase() || 'OPEN'}
                            time={new Date(item.createdAt).toLocaleDateString()}
                            shortCode={getShortCode(item.title)}
                        />
                    )}
                    contentContainerStyle={{ paddingVertical: 20 }}
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                            <Text style={{ color: Colors.bodyGray }}>No jobs found</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    )
}

export default RecuiterRecentJobs
