import { FlatList, Image, Text, TouchableOpacity, View, StatusBar, Modal, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Images from '../../../comman/Images';
import Colors from '../../../comman/Colors';
import { APP_TEXT } from '../../../comman/String';
import { styles } from './Styles';
import Config from '../../../Lib/ApiService/Config';
import { handleNavigation } from '../../../navigation/RootNavigator';
import HomeHeader from '../../../components/HomeHeader';
import { Post_Api } from '../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../Lib/ApiService/ApiUrl';
import Helper from '../../../Lib/HelperFiles/Helper';

const ApplicantJobDetails = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { job, applications: initialApplications } = route.params;

    const [applications, setApplications] = useState<any[]>(initialApplications || []);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedApp, setSelectedApp] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const STATUS_OPTIONS = ['Applied', 'Review', 'Shortlisted', 'Interview', 'Rejected', 'Hired',];

    const getStatusBadgeColor = (status: string) => {
        const s = status?.toUpperCase();
        switch (s) {
            case 'SHORTLISTED': return Colors.iceBlue;
            case 'APPLIED': return Colors.iceBlue;
            case 'REJECTED': return '#FFE6E6';
            case 'INTERVIEW': return Colors.badgeBlueTint;
            case 'REVIEW': return Colors.iceBlue;
            case 'HIRED': return '#E6FFF0';
            default: return Colors.iceBlue;
        }
    };

    const getStatusBadgeTextColor = (status: string) => {
        const s = status?.toUpperCase();
        switch (s) {
            case 'SHORTLISTED': return Colors.primaryBlue;
            case 'APPLIED': return Colors.primaryBlue;
            case 'REJECTED': return '#C41E3A';
            case 'INTERVIEW': return Colors.primaryBlue;
            case 'REVIEW': return Colors.primaryBlue;
            case 'HIRED': return '#00873D';
            default: return Colors.primaryBlue;
        }
    };

    const handleUpdateStatus = async (status: string) => {
        console.log('selectedApp', selectedApp)
        if (!selectedApp) return;

        try {
            setLoading(true);
            const res: any = await Post_Api(ApiUrl.updateApplicationStatus, {
                application_id: selectedApp._id,
                status: status
            })();

            if (res?.data?.status) {
                Helper.showToast('Status updated successfully');

                // Update local state to reflect change immediately
                const updatedApps = applications.map(app =>
                    app._id === selectedApp._id ? { ...app, status: status } : app
                );
                setApplications(updatedApps);

                setModalVisible(false);
            } else {
                Helper.showToast(res?.data?.message || 'Failed to update status');
            }
        } catch (error) {
            console.log('updateStatus error', error);
            Helper.showToast('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const renderApplicant = ({ item }: { item: any }) => {
        const user = item.user;
        const skills = typeof user?.skills === 'string'
            ? user.skills.split(',').map((s: string) => s.trim())
            : Array.isArray(user?.skills) ? user.skills : [];
        console.log('Rendering applicant', item);
        return (
            <View style={styles.applicantCard}>
                <View style={styles.applicantHeader}>
                    <View style={styles.avatarWrapper}>
                        <Text style={styles.avatarText}>
                            {user?.name
                                ? user.name.split(' ').length > 1
                                    ? user.name.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase()
                                    : user.name.substring(0, 2).toUpperCase()
                                : 'AP'}
                        </Text>
                    </View>
                    <View style={styles.applicantInfo}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.applicantName}>{user?.name || 'Applicant'}</Text>
                            <View style={{
                                backgroundColor: getStatusBadgeColor(item.status),
                                paddingHorizontal: 8,
                                paddingVertical: 2,
                                borderRadius: 10
                            }}>
                                <Text style={{
                                    fontSize: 10,
                                    color: getStatusBadgeTextColor(item.status),
                                    fontFamily: 'Lexend-SemiBold'
                                }}>{item.status?.toUpperCase()}</Text>
                            </View>
                        </View>
                        <Text style={styles.applicantHeadline}>{user?.headline || 'Candidate'}</Text>
                    </View>
                </View>

                {skills.length > 0 && (
                    <View style={styles.skillsContainer}>
                        {skills.slice(0, 4).map((skill: string, index: number) => (
                            <View key={index} style={styles.skillBadge}>
                                <Text style={styles.skillText}>{skill}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={styles.applicantFooter}>
                    <Text style={styles.appliedDate}>Applied on {new Date(item.createdAt).toLocaleDateString()}</Text>
                    <TouchableOpacity
                        style={styles.viewProfileButton}
                        onPress={() => {
                            setSelectedApp(item);
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.viewProfileText}>Update Status</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <HomeHeader
                title="Job Applicants"
                IconImg={Images.backArrow}
                backArrow
            />

            <View style={styles.headerContainer}>
                <View style={styles.jobInfoSection}>
                    <View style={styles.logoWrapper}>
                        {job?.companyLogo ? (
                            <Image
                                source={{ uri: Config.imageurl + job.companyLogo }}
                                resizeMode="contain"
                                style={styles.companyLogo}
                            />
                        ) : (
                            <Text style={styles.companyLogoText}>
                                {job?.company?.substring(0, 2)?.toUpperCase() || 'JB'}
                            </Text>
                        )}
                    </View>
                    <View>
                        <Text style={styles.jobTitle}>{job?.title}</Text>
                        <Text style={styles.companyName}>{job?.company}</Text>
                    </View>
                </View>

                <View style={styles.jobStatsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Total Applicants:</Text>
                        <Text style={styles.statValue}>{applications?.length || 0}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Status:</Text>
                        <Text style={[styles.statValue, { color: Colors.primaryBlue }]}>
                            {job?.status?.toUpperCase() || 'OPEN'}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.applicantsTitleSection}>
                <Text style={styles.applicantsTitle}>Applications Received</Text>
            </View>

            <FlatList
                data={applications}
                keyExtractor={(item) => item._id}
                renderItem={renderApplicant}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: Colors.bodyGray }}>No applications yet</Text>
                    </View>
                }
            />

            <Modal
                transparent
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Update Status</Text>
                        </View>

                        {loading ? (
                            <ActivityIndicator size="large" color={Colors.primaryBlue} />
                        ) : (
                            STATUS_OPTIONS.map((status) => (
                                <TouchableOpacity
                                    key={status}
                                    style={styles.statusOption}
                                    onPress={() => handleUpdateStatus(status)}
                                >
                                    <Text style={[
                                        styles.statusOptionText,
                                        { color: selectedApp?.status?.toUpperCase() === status.toUpperCase() ? Colors.primaryBlue : Colors.bodyGray }
                                    ]}>{status}</Text>
                                </TouchableOpacity>
                            ))
                        )}

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ApplicantJobDetails;
