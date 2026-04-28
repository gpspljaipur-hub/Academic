import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Auth_ApiRequest } from '../../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../../Lib/ApiService/ApiUrl';
import styles from './Styles';
import { APP_TEXT } from '../../../../comman/String';
import Images from '../../../../comman/Images';
import Colors from '../../../../comman/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';

import { useNavigation } from '@react-navigation/native';
import HomeHeader from '../../../../components/HomeHeader';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsAndroid } from 'react-native';

const Job = () => {
    const navigation = useNavigation();
    const { user } = useSelector((state: any) => state.user);
    const { jobPost } = APP_TEXT;
    const locations = ['Remote', 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad'];
    const experiences = ['0-1 yrs', '1-3 yrs', '3-5 yrs', '5+ yrs'];
    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
    const statuses = [jobPost.statusOpen, jobPost.statusClose];

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [skills, setSkills] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [locationValue, setLocationValue] = useState<string | null>(null);
    const [experienceValue, setExperienceValue] = useState<string | null>(null);
    const [jobTypeValue, setJobTypeValue] = useState<string | null>(null);
    const [statusValue, setStatusValue] = useState<string | null>(null);
    const [logo, setLogo] = useState<any>(null);

    const locationOptions = useMemo(() => locations.map(l => ({ label: l, value: l })), [locations]);
    const experienceOptions = useMemo(() => experiences.map(e => ({ label: e, value: e })), [experiences]);
    const jobTypeOptions = useMemo(() => jobTypes.map(j => ({ label: j, value: j })), [jobTypes]);
    const statusOptions = useMemo(() => statuses.map(s => ({ label: s, value: s })), [statuses]);
    const requestPermissions = async () => {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        return (
            granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
        );
    };
    const pickImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            setLogo(image);
        }).catch(err => {
            console.log('Picker Error:', err);
        });
    };

    const takePhoto = async () => {
        const hasPermission = await requestPermissions();

        if (!hasPermission) {
            console.log("Permission denied");
            return;
        }

        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.4,
            includeBase64: false,
        })
            .then(image => {
                setLogo(image);
            })
            .catch(err => {
                console.log("Camera Error:", err);
            });
    };
    const createpost = async () => {
        try {
            const body = {
                recruiterId: user?._id,
                title: title,
                description: description,
                company: company,
                skills: skills.split(',').map(s => s.trim()).filter(s => s !== ''),
                location: locationValue,
                experience: experienceValue,
                salary: `${minSalary}-${maxSalary} LPA`,
                jobType: jobTypeValue,
                postedDate: new Date().toISOString().split('T')[0],
                status: statusValue,
                Responsibility: responsibility,
                logo: logo ? `data:${logo.mime};base64,${logo.data}` : null,
            };
            console.log('bodyyyyyyyyyy', body)

            const res = await Auth_ApiRequest(ApiUrl.createJob, body);

            if (res.status) {
                console.log('Successsssssssss:', res.data);
                clearFields();
            } else {
                Alert.alert('Error', res.message || 'Something went wrong');
            }

        } catch (error) {
            console.log('Error:', error);
            Alert.alert('Error', 'Failed to connect to server');
        }
    };

    const clearFields = () => {
        setTitle('');
        setDescription('');
        setCompany('');
        setSkills('');
        setMinSalary('');
        setMaxSalary('');
        setLocationValue(null);
        setExperienceValue(null);
        setJobTypeValue(null);
        setStatusValue(null);
        setResponsibility('');
        setLogo(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader title={jobPost.headerTitle} bellIcon={Images.settings} onNotificationPress={() => navigation.navigate('Setting')} />

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
                                value={title}
                                onChangeText={setTitle}
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
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.companyName}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder={jobPost.companyPlaceholder}
                                placeholderTextColor={Colors.mutedSlate}
                                style={styles.inputText}
                                value={company}
                                onChangeText={setCompany}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.skillsRequired}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder={jobPost.skillsPlaceholder}
                                placeholderTextColor={Colors.mutedSlate}
                                style={styles.inputText}
                                value={skills}
                                onChangeText={setSkills}
                            />
                        </View>
                        <Text style={styles.hint}>Separate skills with commas</Text>
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
                        <Dropdown
                            style={[styles.inputContainer]}
                            data={locationOptions}
                            labelField="label"
                            valueField="value"
                            placeholder={jobPost.locationPlaceholder}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                            containerStyle={styles.dropdownStyle}
                            value={locationValue}
                            onChange={item => setLocationValue(item.value)}
                            renderItem={(item) => (
                                <View style={styles.dropdownItemContainer}>
                                    <Text style={styles.dropdownItemText}>{item.label}</Text>
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.experienceRequired}</Text>
                        <Dropdown
                            style={[styles.inputContainer]}
                            data={experienceOptions}
                            labelField="label"
                            valueField="value"
                            placeholder={jobPost.experiencePlaceholder}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                            containerStyle={styles.dropdownStyle}
                            value={experienceValue}
                            onChange={item => setExperienceValue(item.value)}
                            renderItem={(item) => (
                                <View style={styles.dropdownItemContainer}>
                                    <Text style={styles.dropdownItemText}>{item.label}</Text>
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.jobType}</Text>
                        <Dropdown
                            style={[styles.inputContainer]}
                            data={jobTypeOptions}
                            labelField="label"
                            valueField="value"
                            placeholder={jobPost.jobTypePlaceholder}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                            containerStyle={styles.dropdownStyle}
                            value={jobTypeValue}
                            onChange={item => setJobTypeValue(item.value)}
                            renderItem={(item) => (
                                <View style={styles.dropdownItemContainer}>
                                    <Text style={styles.dropdownItemText}>{item.label}</Text>
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.status}</Text>
                        <Dropdown
                            style={[styles.inputContainer]}
                            data={statusOptions}
                            labelField="label"
                            valueField="value"
                            placeholder={jobPost.statusPlaceholder}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                            containerStyle={styles.dropdownStyle}
                            value={statusValue}
                            onChange={item => setStatusValue(item.value)}
                            renderItem={(item) => (
                                <View style={styles.dropdownItemContainer}>
                                    <Text style={styles.dropdownItemText}>{item.label}</Text>
                                </View>
                            )}
                        />
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
                                    value={minSalary}
                                    onChangeText={setMinSalary}
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
                                    value={maxSalary}
                                    onChangeText={setMaxSalary}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>{jobPost.salaryInfo}</Text>
                    </View>
                </View>

                {/*Responsibilities Section */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Image source={Images.aiIntelligence} style={[styles.cardIcon, { tintColor: Colors.primaryBlue }]} />
                        <Text style={styles.cardTitle}>Role Details</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.responsibility}</Text>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                placeholder={jobPost.responsibilityPlaceholder}
                                placeholderTextColor={Colors.mutedSlate}
                                multiline
                                style={styles.textArea}
                                value={responsibility}
                                onChangeText={setResponsibility}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.companyLogo}</Text>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoPreview}>
                                {logo ? (
                                    <Image source={{ uri: logo.path }} style={styles.logoImage} />
                                ) : (
                                    <Image source={Images.userImage} style={[styles.logoImage, { opacity: 0.3 }]} />
                                )}
                            </View>
                            <View style={styles.uploadButtons}>
                                <TouchableOpacity
                                    style={styles.uploadBtn}
                                    onPress={() => {
                                        console.log("BUTTON CLICKED");
                                        takePhoto();
                                    }}
                                >
                                    <Text style={styles.uploadBtnText}>{jobPost.takePhoto}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                                    <Text style={styles.uploadBtnText}>{jobPost.chooseGallery}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
                    <TouchableOpacity style={styles.postButton} onPress={() => { createpost() }}>
                        <Text style={styles.postText}>{jobPost.postJob}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Job;