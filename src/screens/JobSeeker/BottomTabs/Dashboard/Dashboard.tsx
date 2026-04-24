import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity,  StatusBar } from 'react-native'
import React from 'react'
import styles from './Styles'
import Colors from '../../../../comman/Colors'
import { APP_TEXT } from '../../../../comman/String'
import Images from '../../../../comman/Images'
import { SafeAreaView } from 'react-native-safe-area-context'
const Dashboard = () => {
    const strings = APP_TEXT.dashboard;

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
            <Text style={{ color: Colors.bodyGray }}>→</Text>
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
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                    <Image source={Images.userImage} style={styles.userAvatar} />
                    <Text style={styles.appName}>{APP_TEXT.appName}</Text>
                </View>
                <TouchableOpacity>
                    <Image source={Images.bellIcon} style={styles.notificationIcon} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.recruiterTitle}>{strings.recruiterTitle}</Text>
                    <Text style={styles.welcomeText}>
                        {strings.welcomeBack} <Text style={{ color: Colors.brandBlue }}>{strings.userName}</Text>
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

                <JobItem title="Senior Software Engineer" status="ACTIVE" time="3 days ago" shortCode="SE" />
                <JobItem title="Senior Product Designer" status="ACTIVE" time="1 week ago" shortCode="UX" />
                <JobItem title="Product Manager" status="CLOSED" time="2 days ago" shortCode="PM" />

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