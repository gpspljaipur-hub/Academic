import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Styles'
import Colors from '../../../../comman/Colors'
import { Get_Api } from '../../../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../../../Lib/ApiService/ApiUrl'
import { APP_TEXT } from '../../../../comman/String'
import Images from '../../../../comman/Images'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../../../../components/HomeHeader'
import Config from '../../../../Lib/ApiService/Config'
const Dashboard = () => {
    const strings = APP_TEXT.dashboard;
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response: any = await Get_Api(ApiUrl.PostAllJobs, {})();
            console.log('Jobs Response:', response);
            if (response?.data) {
                setJobs(Array.isArray(response.data) ? response.data : (response.data.jobs || []));
            }
        } catch (error) {
            console.log('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };
    const chartData = [
        { day: 'MON', height: 60, color: Colors.periwinkle },
        { day: 'TUE', height: 90, color: Colors.periwinkle },
        { day: 'WED', height: 70, color: Colors.periwinkle },
        { day: 'THU', height: 130, color: Colors.brandBlue },
        { day: 'FRI', height: 100, color: Colors.periwinkle },
        { day: 'SAT', height: 80, color: Colors.periwinkle },
        { day: 'SUN', height: 110, color: Colors.periwinkle },
    ];

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

    const JobItem = ({ title, status, time, image, formattedSalary, tags }: any) => (
        <TouchableOpacity style={styles.jobCard}>
            <View style={styles.jobIconContainer}>
                {image ? (
                    <Image   source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 10 }} resizeMode="cover" />
                ) : (
                    <Text style={styles.jobIconText}>{title.substring(0, 2).toUpperCase()}</Text>
                )}
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



    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader title={APP_TEXT.appName} IconImg={Images.userImage} bellIcon={Images.bellIcon} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.recruiterTitle}>{strings.recruiterTitle}</Text>
                    <Text style={styles.welcomeText}>
                        {strings.welcomeBack} <Text style={styles.welcomeSubText}>{strings.userName}</Text>
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

                <StatCard
                    title={strings.totalJobsPosted}
                    value="12"
                    trend="↗ +2 this month"
                    icon={Images.application}
                />
                <StatCard
                    title={strings.totalApplicants}
                    value="842"
                    trend="↗ +12% vs last week"
                    icon={Images.employee}
                />
                <StatCard
                    title={strings.shortlisted}
                    value="48"
                    trend="⏱ 8 pending review"
                    color={Colors.bodyGray}
                    icon={Images.bookmark}
                />

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{strings.recentJobPostings}</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>{strings.seeAll}</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="small" color={Colors.brandBlue} style={{ marginVertical: 20 }} />
                ) : jobs.length > 0 ? (
                    jobs.map((job: any, index: number) => {
                        const title = job.title || job.jobTitle || 'Untitled Job';
                        const status = job.status || 'ACTIVE';
                        const time = job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently';
                        const shortCode = job.shortCode || title.substring(0, 2).toUpperCase();
                        const image = job.companyLogo ? Config.imageurl + job.companyLogo : '';
                        const formattedSalary = job.salary || 'Competitive';
                        const tags = job.skills || [];
                        console.log("image", image)
                        return (
                            <JobItem
                                key={index.toString()}
                                title={title}
                                status={status}
                                time={time}
                                shortCode={shortCode}
                                image={image}
                                formattedSalary={formattedSalary}
                                tags={tags}
                            />
                        );
                    })
                ) : null}

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