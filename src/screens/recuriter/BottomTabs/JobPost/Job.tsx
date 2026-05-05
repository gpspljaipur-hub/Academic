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
import Helper from '../../../../Lib/HelperFiles/Helper';
import Button from '../../../../components/Button';

const Job = () => {
    const navigation = useNavigation();
    const { user } = useSelector((state: any) => state.user);
    console.log("user", user.id)
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
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});
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
        const newErrors: any = {};
        if (!title) newErrors.title = 'Job title is required';
        if (!description) newErrors.description = 'Description is required';
        if (!company) newErrors.company = 'Company name is required';
        if (!locationValue) newErrors.location = 'Location is required';
        if (!experienceValue) newErrors.experience = 'Experience is required';
        if (!minSalary) newErrors.minSalary = 'Min salary is required';
        if (!maxSalary) newErrors.maxSalary = 'Max salary is required';
        if (!jobTypeValue) newErrors.jobType = 'Job type is required';
        if (!skills) newErrors.skills = 'Skills are required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            Helper.showToast('Please fill all required fields');
            return;
        }

        setErrors({});
        try {
            const body = {
                recruiterId: user?.id,
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
                responsibilities: responsibility,
                logo: logo ? `data:${logo.mime};base64,${logo.data}` : null,
            };
            console.log('bodyyyyyyyyyy', body)
            setLoading(true)
            const res = await Auth_ApiRequest(ApiUrl.createJob, body);

            if (res.status) {
                console.log('Successsssssssss:', res.data);
                setLoading(false)
                clearFields();
            } else {
                Helper.showToast(res.message);
            }

        } catch (error: any) {
            Helper.showToast(error.message);
        } finally {
            setLoading(false)
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
                        <Text style={styles.label}>{jobPost.jobTitle} <Text style={styles.requiredMarker}>*</Text></Text>
                        <View style={[styles.inputContainer, errors.title && { borderColor: Colors.errorRed, borderWidth: 1 }]}>
                            <TextInput
                                placeholder={jobPost.jobTitlePlaceholder}
                                placeholderTextColor={Colors.mutedSlate}
                                style={styles.inputText}
                                value={title}
                                onChangeText={(text) => {
                                    setTitle(text);
                                    if (errors.title) setErrors({ ...errors, title: null });
                                }}
                            />
                        </View>
                        {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
                        <Text style={styles.hint}>{jobPost.jobTitleHint}</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.jobDescription} <Text style={styles.requiredMarker}>*</Text></Text>
                        <View style={[styles.textAreaContainer, errors.description && { borderColor: Colors.errorRed, borderWidth: 1 }]}>
                            <TextInput
                                placeholder={jobPost.jobDescriptionPlaceholder}
                                placeholderTextColor={Colors.mutedSlate}
                                multiline
                                style={styles.textArea}
                                value={description}
                                onChangeText={(text) => {
                                    setDescription(text);
                                    if (errors.description) setErrors({ ...errors, description: null });
                                }}
                            />
                        </View>
                        {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.companyName} <Text style={styles.requiredMarker}>*</Text></Text>
                        <View style={[styles.inputContainer, errors.company && { borderColor: Colors.errorRed, borderWidth: 1 }]}>
                            <TextInput
                                placeholder={jobPost.companyPlaceholder}
                                placeholderTextColor={Colors.mutedSlate}
                                style={styles.inputText}
                                value={company}
                                onChangeText={(text) => {
                                    setCompany(text);
                                    if (errors.company) setErrors({ ...errors, company: null });
                                }}
                            />
                        </View>
                        {errors.company ? <Text style={styles.errorText}>{errors.company}</Text> : null}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.skillsRequired} <Text style={styles.requiredMarker}>*</Text></Text>
                        <View style={[styles.inputContainer, errors.skills && { borderColor: Colors.errorRed, borderWidth: 1 }]}>
                            <TextInput
                                placeholder={jobPost.skillsPlaceholder}
                                placeholderTextColor={Colors.mutedSlate}
                                style={styles.inputText}
                                value={skills}
                                onChangeText={(text) => {
                                    setSkills(text);
                                    if (errors.skills) setErrors({ ...errors, skills: null });
                                }}
                            />
                        </View>
                        {errors.skills ? <Text style={styles.errorText}>{errors.skills}</Text> : null}
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
                        <Text style={styles.label}>{jobPost.location} <Text style={styles.requiredMarker}>*</Text></Text>
                        <Dropdown
                            style={[styles.inputContainer, errors.location && { borderColor: Colors.errorRed, borderWidth: 1 }]}
                            data={locationOptions}
                            labelField="label"
                            valueField="value"
                            placeholder={jobPost.locationPlaceholder}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                            containerStyle={styles.dropdownStyle}
                            value={locationValue}
                            onChange={item => {
                                setLocationValue(item.value);
                                if (errors.location) setErrors({ ...errors, location: null });
                            }}
                            renderItem={(item) => (
                                <View style={styles.dropdownItemContainer}>
                                    <Text style={styles.dropdownItemText}>{item.label}</Text>
                                </View>
                            )}
                        />
                        {errors.location ? <Text style={styles.errorText}>{errors.location}</Text> : null}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.experienceRequired} <Text style={styles.requiredMarker}>*</Text></Text>
                        <Dropdown
                            style={[styles.inputContainer, errors.experience && { borderColor: Colors.errorRed, borderWidth: 1 }]}
                            data={experienceOptions}
                            labelField="label"
                            valueField="value"
                            placeholder={jobPost.experiencePlaceholder}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                            containerStyle={styles.dropdownStyle}
                            value={experienceValue}
                            onChange={item => {
                                setExperienceValue(item.value);
                                if (errors.experience) setErrors({ ...errors, experience: null });
                            }}
                            renderItem={(item) => (
                                <View style={styles.dropdownItemContainer}>
                                    <Text style={styles.dropdownItemText}>{item.label}</Text>
                                </View>
                            )}
                        />
                        {errors.experience ? <Text style={styles.errorText}>{errors.experience}</Text> : null}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{jobPost.jobType} <Text style={styles.requiredMarker}>*</Text></Text>
                        <Dropdown
                            style={[styles.inputContainer, errors.jobType && { borderColor: Colors.errorRed, borderWidth: 1 }]}
                            data={jobTypeOptions}
                            labelField="label"
                            valueField="value"
                            placeholder={jobPost.jobTypePlaceholder}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                            containerStyle={styles.dropdownStyle}
                            value={jobTypeValue}
                            onChange={item => {
                                setJobTypeValue(item.value);
                                if (errors.jobType) setErrors({ ...errors, jobType: null });
                            }}
                            renderItem={(item) => (
                                <View style={styles.dropdownItemContainer}>
                                    <Text style={styles.dropdownItemText}>{item.label}</Text>
                                </View>
                            )}
                        />
                        {errors.jobType ? <Text style={styles.errorText}>{errors.jobType}</Text> : null}
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
                            <Text style={styles.label}>{jobPost.minSalary} <Text style={styles.requiredMarker}>*</Text></Text>
                            <View style={[styles.inputContainer, errors.minSalary && { borderColor: Colors.errorRed, borderWidth: 1 }]}>
                                <TextInput
                                    placeholder={jobPost.salaryPlaceholder}
                                    placeholderTextColor={Colors.mutedSlate}
                                    style={styles.inputText}
                                    keyboardType="numeric"
                                    maxLength={7}
                                    value={minSalary}
                                    onChangeText={(text) => {
                                        setMinSalary(text);
                                        if (errors.minSalary) setErrors({ ...errors, minSalary: null });
                                    }}
                                />
                            </View>
                            {errors.minSalary ? <Text style={styles.errorText}>{errors.minSalary}</Text> : null}
                        </View>

                        <View style={[styles.inputGroup, styles.halfWidth]}>
                            <Text style={styles.label}>{jobPost.maxSalary} <Text style={styles.requiredMarker}>*</Text></Text>
                            <View style={[styles.inputContainer, errors.maxSalary && { borderColor: Colors.errorRed, borderWidth: 1 }]}>
                                <TextInput
                                    placeholder={jobPost.salaryMaxPlaceholder}
                                    placeholderTextColor={Colors.mutedSlate}
                                    style={styles.inputText}
                                    keyboardType="numeric"
                                    value={maxSalary}
                                    maxLength={7}
                                    onChangeText={(text) => {
                                        setMaxSalary(text);
                                        if (errors.maxSalary) setErrors({ ...errors, maxSalary: null });
                                    }}
                                />
                            </View>
                            {errors.maxSalary ? <Text style={styles.errorText}>{errors.maxSalary}</Text> : null}
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
                    <Button
                        label={jobPost.postJob}
                        onPress={() => createpost()}
                        loading={loading}
                        containerStyle={[styles.postButton, { marginTop: 0 }]}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Job;