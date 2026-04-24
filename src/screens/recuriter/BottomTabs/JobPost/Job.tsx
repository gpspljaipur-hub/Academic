import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import React from 'react';
import styles from './Styles';
import { APP_TEXT } from '../../../../comman/String';
import Images from '../../../../comman/Images';
import Colors from '../../../../comman/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

const Job = () => {
    const navigation = useNavigation();
    const { jobPost } = APP_TEXT;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.backArrow}
                        style={{ width: 20, height: 20, tintColor: Colors.heroNavy }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{jobPost.headerTitle}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.mainTitle}>{jobPost.title}</Text>
                    <Text style={styles.subtitle}>{jobPost.subtitle}</Text>
                </View>

                {/* Basic Information Section */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Image source={Images.aiIntelligence} style={[styles.cardIcon, { tintColor: Colors.primaryBlue }]} />
                        <Text style={styles.cardTitle}>{jobPost.basicInfo}</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.jobTitle}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder={jobPost.jobTitlePlaceholder}
                                placeholderTextColor={Colors.mutedSlate}
                                style={styles.inputText}
                            />
                        </View>
                        <Text style={styles.hint}>{jobPost.jobTitleHint}</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.jobDescription}</Text>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                placeholder={jobPost.jobDescriptionPlaceholder}
                                placeholderTextColor={Colors.mutedSlate}
                                multiline
                                style={styles.textArea}
                            />
                        </View>
                    </View>
                </View>

                {/* Logistics Section */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Image source={Images.locations} style={[styles.cardIcon, { tintColor: Colors.primaryBlue }]} />
                        <Text style={styles.cardTitle}>{jobPost.logistics}</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.location}</Text>
                        <TouchableOpacity style={styles.inputContainer}>
                            <Text style={styles.inputText}>{jobPost.locationPlaceholder}</Text>
                            <Image source={Images.dots} style={styles.dropdownIcon} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.experienceRequired}</Text>
                        <TouchableOpacity style={styles.inputContainer}>
                            <Text style={styles.inputText}>{jobPost.experiencePlaceholder}</Text>
                            <Image source={Images.dots} style={styles.dropdownIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Compensation Section */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Image source={Images.money} style={[styles.cardIcon, { tintColor: Colors.primaryBlue }]} />
                        <Text style={styles.cardTitle}>{jobPost.compensation}</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, styles.halfWidth]}>
                            <Text style={styles.label}>{jobPost.minSalary}</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder={jobPost.salaryPlaceholder}
                                    placeholderTextColor={Colors.mutedSlate}
                                    style={styles.inputText}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={[styles.inputGroup, styles.halfWidth]}>
                            <Text style={styles.label}>{jobPost.maxSalary}</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder={jobPost.salaryMaxPlaceholder}
                                    placeholderTextColor={Colors.mutedSlate}
                                    style={styles.inputText}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={{ fontSize: 16 }}>ℹ️</Text>
                        <Text style={styles.infoText}>{jobPost.salaryInfo}</Text>
                    </View>
                </View>

                {/* Public Notice */}
                <View style={styles.footerNotice}>
                    <Image source={Images.eye} style={{ width: 16, height: 16, tintColor: Colors.mutedSlate }} />
                    <Text style={styles.noticeText}>{jobPost.publicNotice}</Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.draftButton}>
                        <Text style={styles.draftText}>{jobPost.saveDraft}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postButton}>
                        <Text style={styles.postText}>{jobPost.postJob}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Job;