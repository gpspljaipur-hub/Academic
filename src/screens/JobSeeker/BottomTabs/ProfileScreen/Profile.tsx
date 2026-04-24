import { Text, View, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';
import styles from './style';
import { APP_TEXT } from '../../../../comman/String';
import Images from '../../../../comman/Images';
import Colors from '../../../../comman/Colors';
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../../../../components/HomeHeader';
const Profile = () => {
    const { profile } = APP_TEXT;

    return (
        <SafeAreaView style={styles.container}>
         <HomeHeader title={profile.headerTitle} IconImg={Images.userImage}  bellIcon={Images.settings} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Profile Info Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image source={Images.userImage} style={styles.avatar} />
                        <TouchableOpacity style={styles.editIconContainer}>
                            <Image source={Images.pencil} style={styles.PencilIcon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{profile.userName}</Text>
                    <Text style={styles.userRole}>{profile.userRole}</Text>
                    <View style={styles.userLocation}>
                        <Image source={Images.locations} style={{ width: 14, height: 14, tintColor: Colors.mutedSlate }} />
                        <Text style={styles.locationText}>{profile.userLocation}</Text>
                    </View>
                    <TouchableOpacity style={styles.editProfileButton}>
                        <Text style={styles.editProfileText}>{profile.editProfile}</Text>
                    </TouchableOpacity>
                </View>

                {/* Profile Strength Card */}
                <View style={styles.strengthCard}>
                    <View style={styles.strengthLeft}>
                        <Text style={styles.strengthTitle}>{profile.strength}</Text>
                        <Text style={styles.strengthDesc}>{profile.strengthDesc}</Text>
                        <TouchableOpacity style={styles.completeNowButton}>
                            <Text style={styles.completeNowText}>{profile.completeNow}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressCircle}>
                            <Text style={styles.progressText}>70%</Text>
                        </View>
                    </View>
                </View>

                {/* AI Smart Tips Section */}
                <View style={styles.sectionTitleContainer}>
                    <Image source={Images.aistar} style={styles.aistarIcon} />
                    <Text style={styles.sectionTitle}>{profile.aiSmartTips}</Text>
                </View>
                <View style={styles.tipsContainer}>
                    <View style={styles.tipCard}>
                        <View style={styles.tipIconContainer}>
                            <Text style={{ fontSize: 16 }}>📄</Text>
                        </View>
                        <View>
                            <Text style={styles.tipText}>{profile.addSummary}</Text>
                            <Text style={styles.tipBadge}>{profile.visibilityBoost}</Text>
                        </View>
                    </View>
                    <View style={[styles.tipCard, { backgroundColor: Colors.cardGray }]}>
                        <View style={styles.tipIconContainer}>
                            <Text style={{ fontSize: 16 }}>🛡️</Text>
                        </View>
                        <View>
                            <Text style={styles.tipText}>{profile.verifyEmail}</Text>
                            <Text style={styles.tipVerifyAction}>{profile.verifyNow}</Text>
                        </View>
                    </View>
                </View>

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>24</Text>
                        <Text style={styles.statLabel}>{profile.savedJobs}</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>{profile.applications}</Text>
                    </View>
                </View>

                {/* Resumes Section */}
                <View style={styles.resumeSectionHeader}>
                    <Text style={styles.resumeTitle}>{profile.myResumes}</Text>
                    <TouchableOpacity>
                        <Text style={styles.uploadNewText}>+ {profile.uploadNew}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.resumeCard}>
                    <View style={styles.pdfIconContainer}>
                        <Text style={{ color: Colors.errorRed, fontWeight: 'bold', fontSize: 10 }}>PDF</Text>
                    </View>
                    <View style={styles.resumeInfo}>
                        <Text style={styles.resumeName}>{profile.resumeName}</Text>
                        <Text style={styles.resumeMeta}>{profile.resumeUploadTime}</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={Images.dots} style={{ width: 16, height: 16, tintColor: Colors.mutedSlate }} />
                    </TouchableOpacity>
                </View>

                {/* Experience Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.resumeTitle}>{profile.experience}</Text>
                    <TouchableOpacity>
                        <Image source={Images.pencil} style={styles.pencilIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.experienceCard}>
                    <View style={styles.experienceIcon}>
                        <Image source={Images.tech} style={{ width: 24, height: 24 }} />
                    </View>
                    <View style={styles.experienceContent}>
                        <Text style={styles.expRole}>Senior Product Designer</Text>
                        <Text style={styles.expCompany}>Global Tech Corp • Full-time</Text>
                        <Text style={styles.expDate}>Jan 2021 — Present • 3 yrs 2 mos</Text>
                    </View>
                </View>
                <View style={styles.experienceCard}>
                    <View style={styles.experienceIcon}>
                        <Image source={Images.HR} style={{ width: 24, height: 24 }} />
                    </View>
                    <View style={styles.experienceContent}>
                        <Text style={styles.expRole}>UI/UX Designer</Text>
                        <Text style={styles.expCompany}>Creative Hub Studio • Contract</Text>
                        <Text style={styles.expDate}>Jun 2018 — Dec 2020 • 2 yrs 7 mos</Text>
                    </View>
                </View>

                {/* Education Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.resumeTitle}>{profile.education}</Text>
                    <TouchableOpacity>
                        <Image source={Images.pencil} style={styles.pencilIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.experienceCard1}>
                    <View style={[styles.experienceIcon, { backgroundColor: Colors.iceBlue }]}>
                        <Text style={{ fontSize: 18 }}>🎓</Text>
                    </View>
                    <View style={styles.experienceContent}>
                        <Text style={styles.expRole}>B.Des in Interaction Design</Text>
                        <Text style={styles.expCompany}>Indian Institute of Technology, Bombay</Text>
                        <Text style={styles.expDate}>Class of 2018</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
