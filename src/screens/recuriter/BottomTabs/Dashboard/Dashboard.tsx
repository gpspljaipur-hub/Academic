import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Styles'
import Colors from '../../../../comman/Colors'
import { APP_TEXT } from '../../../../comman/String'
import Images from '../../../../comman/Images'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../../../../components/HomeHeader'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Post_Api } from '../../../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../../../Lib/ApiService/ApiUrl'

const Dashboard = () => {
    const strings = APP_TEXT.dashboard;
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const { user } = useSelector((state: any) => state.user);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isFocused) {
            fetchDashboardData();
        }
    }, [isFocused]);

    const fetchDashboardData = async () => {
        const recruiterId = user?.id || user?._id;
        if (!recruiterId) return;

        try {
            setLoading(true);
            const res: any = await Post_Api(ApiUrl.dashboardStats, { recruiterId })();
            console.log('fetchDashboardData res', res);

            if (res?.data?.status) {
                setDashboardData(res.data);
            }
        } catch (error) {
            console.log('fetchDashboardData error', error);
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

    const StatCard = ({ title, value, trend, icon, color }: any) => (
        <View style={styles.statsCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Image source={icon} style={[styles.statsIcon, { tintColor: Colors.brandBlue }]} resizeMode="contain" />
                    <Text style={styles.statsLabel}>{title}</Text>
                    <Text style={styles.statsValue}>{value}</Text>
                    <Text style={[styles.statsTrend, color && { color }]}>{trend}</Text>
                </View>
            </View>
        </View>
    );

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
            {/* <Text style={{ color: Colors.bodyGray }}>→</Text> */}
        </TouchableOpacity>
    );

    const chartData = [
        { day: 'MON', height: 60, color: Colors.periwinkle },
        { day: 'TUE', height: 90, color: Colors.periwinkle },
        { day: 'WED', height: 70, color: Colors.periwinkle },
        { day: 'THU', height: 130, color: Colors.brandBlue },
        { day: 'FRI', height: 100, color: Colors.periwinkle },
        { day: 'SAT', height: 80, color: Colors.periwinkle },
        { day: 'SUN', height: 110, color: Colors.periwinkle },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <HomeHeader title={APP_TEXT.appName} IconImg={Images.userImage} bellIcon={Images.bellIcon} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.recruiterTitle}>{strings.recruiterTitle}</Text>
                    <Text style={styles.welcomeText}>
                        {strings.welcomeBack} <Text style={styles.welcomeSubText}>{user?.name || strings.userName}</Text>
                    </Text>
                </View>

                <View style={styles.actionButtonsRow}>

                    <TouchableOpacity style={styles.secondaryButton}>
                        <Image source={Images.ProfileIcon} style={{ width: 16, height: 16, tintColor: Colors.brandBlue }} />
                        <Text style={styles.buttonTextSecondary} numberOfLines={1}>{strings.viewAllApplicants}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.primaryButton}>
                        <Text style={{ color: Colors.white, fontSize: 18 }}>+</Text>
                        <Text style={styles.buttonTextPrimary} numberOfLines={1}>{strings.postAJob}</Text>
                    </TouchableOpacity>
                </View>

                {loading && !dashboardData ? (
                    <View style={{ paddingVertical: 20 }}>
                        <ActivityIndicator size="large" color={Colors.brandBlue} />
                    </View>
                ) : (
                    <>
                        <StatCard
                            title={strings.totalJobsPosted}
                            value={dashboardData?.stats?.totalJobs || '0'}
                            trend={`↗ +${dashboardData?.stats?.jobsThisMonth || 0} this month`}
                            icon={Images.application}
                        />
                        <StatCard
                            title={strings.totalApplicants}
                            value={dashboardData?.stats?.totalApplicants || '0'}
                            trend="↗ vs last week"
                            icon={Images.employee}
                        />
                        <StatCard
                            title={strings.shortlisted}
                            value={dashboardData?.stats?.shortlistedCount || '0'}
                            trend={`⏱ ${dashboardData?.stats?.pendingReviewCount || 0} pending review`}
                            color={Colors.bodyGray}
                            icon={Images.bookmark}
                        />

                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{strings.recentJobPostings}</Text>
                            <TouchableOpacity onPress={() => { }}>
                                <Text style={styles.seeAllText}>{strings.seeAll}</Text>
                            </TouchableOpacity>
                        </View>

                        {dashboardData?.recentJobs?.length > 0 ? (
                            dashboardData.recentJobs.map((job: any) => (
                                <JobItem
                                    key={job._id}
                                    title={job.title}
                                    status={job.status?.toUpperCase() || 'OPEN'}
                                    time={new Date(job.createdAt).toLocaleDateString()}
                                    shortCode={getShortCode(job.title)}
                                />
                            ))
                        ) : (
                            <View style={{ padding: 20, alignItems: 'center' }}>
                                <Text style={{ color: Colors.bodyGray }}>No recent job postings</Text>
                            </View>
                        )}
                    </>
                )}

                <View style={styles.sectionHeader1}>
                    <Text style={styles.sectionTitle}>{strings.applicationTrends}</Text>
                </View>

                <View style={styles.chartCard}>
                    <View style={styles.barChartContainer}>
                        {chartData.map((item, index) => (
                            <View key={index} style={styles.barWrapper}>
                                <View style={[styles.bar, { height: item.height, backgroundColor: item.color }]} />
                                <Text style={styles.dayText}>{item.day}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.legendContainer}>
                        <View style={styles.legendItem}>
                            <View style={styles.legendLabelRow}>
                                <View style={[styles.legendDot, { backgroundColor: Colors.brandBlue }]} />
                                <Text style={styles.legendLabel}>{strings.newApplications}</Text>
                            </View>
                            <Text style={styles.legendValue}>428</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={styles.legendLabelRow}>
                                <View style={[styles.legendDot, { backgroundColor: Colors.periwinkle }]} />
                                <Text style={styles.legendLabel}>{strings.interviewInvites}</Text>
                            </View>
                            <Text style={styles.legendValue}>32</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.reportButton}>
                        <Text style={styles.reportButtonText}>{strings.downloadFullReport}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.promoBanner}>
                    <Text style={styles.promoTitle}>{strings.elevateHiringTitle}</Text>
                    <Text style={styles.promoDesc}>{strings.elevateHiringDesc}</Text>
                    <TouchableOpacity style={styles.promoAction}>
                        <Text style={styles.promoActionText}>{strings.upgradeToPro}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Dashboard