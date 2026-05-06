import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Styles';
import { APP_TEXT } from '../../../comman/String';
import Colors from '../../../comman/Colors';
import Images from '../../../comman/Images';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import { Post_ApiWithToken } from '../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../Lib/ApiService/ApiUrl';
import Config from '../../../Lib/ApiService/Config';
import Helper from '../../../Lib/HelperFiles/Helper';
import { handleNavigation } from '../../../navigation/RootNavigator';
import Header from '../../../components/Header';

const SIMILAR_ROLES = [
    {
        id: '1',
        company: 'SKYLINE DEVS',
        title: 'Product Designer',
        location: 'Remote',
        salary: '₹20L - ₹25L',
        tags: ['UX Strategy', 'SaaS'],
        image: Images.microsoft,
    },
    {
        id: '2',
        company: 'TECH FLOW',
        title: 'Visual Designer',
        location: 'Mumbai',
        salary: '₹15L - ₹20L',
        tags: ['Branding', 'UI'],
        image: Images.stripe,
    },
];

const PostDetails = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const user = useSelector((state: any) => state.user.user);
    const [similarJobs, setSimilarJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [jobDetails, setJobDetails] = useState(route?.params?.jobs);
    const [seeAll, setSeeAll] = useState(false);
    const [applyClicked, setApplyClicked] = useState(false);
    const [bookmarkClicked, setBookmarkClicked] = useState(false);
    const { userType } = useSelector((state: any) => state.user);
    console.log("userType====", userType);

    console.log("jobDetails", jobDetails);
    useEffect(() => {
        fetchSimilarJobs();
        checkIfApplied();
    }, [jobDetails?._id]);


    const checkIfApplied = async () => {
        const userId = user?._id || user?.id;
        if (!jobDetails?._id || !userId) return;
        try {
            // Pass both job_id and user_id to check application status
            const res: any = await Post_ApiWithToken(ApiUrl.appliedByUser, {
                job_id: jobDetails._id,
                user_id: userId

            })();
            if (res?.data?.data?.length > 0) {
                setApplyClicked(true);
            } else {
                setApplyClicked(false);
            }

        } catch (error) {
            console.log('checkIfApplied error', error);
        }
    };

    const fetchSimilarJobs = async () => {
        if (!jobDetails?._id) return;
        try {
            const res: any = await Post_ApiWithToken(ApiUrl.similarJobs, { id: jobDetails._id })();
            if (res?.data?.status) {
                setSimilarJobs(res.data.data || []);
            }
        } catch (error) {
            console.log('error', error);
        } finally {
        }
    };

    const handleApply = async () => {
        handleNavigation({ type: 'push', page: 'Apply', passProps: { jobs: jobDetails }, navigation });
    };


    const renderBulletPoint = (text: string) => (
        <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{text}</Text>
        </View>
    );

    const renderSimilarRole = ({ item }: { item: any }) => {
        const logo = item.companyLogo ? { uri: Config.imageurl + item.companyLogo } : Images.indesign;
        const salary = item.salary || 'Competitive';
        const tags = Array.isArray(item.skills) ? item.skills.slice(0, 2) : (item.jobType ? [item.jobType] : []);

        return (
            <TouchableOpacity onPress={() => { setJobDetails(item) }} style={styles.roleCard}>
                <View style={styles.roleCardHeader}>
                    <View style={styles.roleLogo}>
                        <Image source={logo} style={{ width: '70%', height: '70%', borderRadius: 4 }} resizeMode="contain" />
                    </View>
                    <Text style={styles.companyName} numberOfLines={1}>{item.company}</Text>
                </View>
                <Text style={styles.roleTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.roleInfo} numberOfLines={1}>{item.location} • {salary}</Text>
                <View style={styles.roleTags}>
                    {tags.map((tag: any, index: number) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <Header
                title={APP_TEXT.CareerArchitect}
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Job Header */}
                <View style={styles.jobHeader}>
                    <View style={styles.companyLogo}>
                        {jobDetails?.companyLogo ? (
                            <Image
                                source={{ uri: Config.imageurl + jobDetails.companyLogo }}
                                resizeMode="contain"
                                style={{ width: 120, height: 120, borderRadius: 8 }}
                            />
                        ) : (
                            <View style={styles.avatarWrapper}>
                                <Text style={styles.avatarText}>
                                    {jobDetails?.company
                                        ? jobDetails.company.split(' ').length > 1
                                            ? jobDetails.company.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase()
                                            : jobDetails.company.substring(0, 2).toUpperCase()
                                        : 'AP'}
                                </Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.jobTitle}>{jobDetails?.title || 'Senior UI/UX Designer'}</Text>
                    <Text style={styles.companyInfo}>{jobDetails?.company || 'InnovateTech'} · {jobDetails?.location || 'Bengaluru, India'}</Text>
                    <View style={styles.salaryBadge}>
                        <Text style={styles.salaryText}>{jobDetails?.salary || jobDetails?.tags?.[1] || '₹18L - ₹24L PA'}</Text>
                    </View>
                </View>

                {/* AI Match Report */}
                <View style={styles.containercard}>
                    <View style={styles.aiCard}>
                        <View style={styles.aiHeader}>
                            <View style={styles.aiTitleRow}>
                                <Image source={Images.aistar} style={{ width: 20, height: 20, tintColor: Colors.white }} resizeMode="contain" />
                                <Text style={styles.aiTitle}>AI MATCH REPORT</Text>

                            </View>
                            <View>
                                <Text style={styles.matchPercentage}>{jobDetails?.aiMatch?.split(' ')?.[0] || '94%'}</Text>
                            </View>

                        </View>
                        <View style={styles.skillsContainer}>
                            <View style={styles.skillBadge}><Text style={styles.skillText}>PROTOTYPING</Text></View>
                            <View style={styles.skillBadge}><Text style={styles.skillText}>DESIGN SYSTEMS</Text></View>
                            <View style={styles.skillBadge}><Text style={styles.skillText}>USER RESEARCH</Text></View>
                        </View>


                    </View>
                    <Text style={styles.matchDescription}>Your profile is an exceptional match for this role.</Text>

                </View>

                {/* Responsibilities */}

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIndicator} />
                        <Text style={styles.sectionTitle}>Description</Text>
                    </View>
                    {renderBulletPoint(jobDetails?.description)}

                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIndicator} />
                        <Text style={styles.sectionTitle}>Responsibilities</Text>
                    </View>
                    {renderBulletPoint(jobDetails?.responsibilities)}
                </View>


            </ScrollView>

        </SafeAreaView>
    );
};

export default PostDetails;



