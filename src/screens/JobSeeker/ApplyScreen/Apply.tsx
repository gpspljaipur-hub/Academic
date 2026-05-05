import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Images from '../../../comman/Images'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './Style'
import MarginHW from '../../../comman/Sizes/MarginHW'
import AppHeader from '../../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { APP_TEXT } from '../../../comman/String'
import Colors from '../../../comman/Colors'
import Button from '../../../components/Button'
import { useSelector } from 'react-redux'
import { Post_ApiWithToken } from '../../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../../Lib/ApiService/ApiUrl'
import Helper from '../../../Lib/HelperFiles/Helper'
import { pick, types } from '@react-native-documents/picker'
import Config from '../../../Lib/ApiService/Config'
import { handleNavigation } from '../../../navigation/RootNavigator'

const Apply = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const job = route?.params?.jobs || {};
    console.log('route.params', job);

    const user = useSelector((state: any) => state.user.user);
    const [fullName, setFullName] = useState(user?.name || '');
    const [contactNumber, setContactNumber] = useState(user?.number || '');
    const [emailAddress, setEmailAddress] = useState(user?.email || '');
    const [coverLetter, setCoverLetter] = useState('');
    const [jobApply, setJobDetails] = useState<any>(route?.params?.jobs);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resume, setResume] = useState<{ name: string; uri: string; size?: number } | null>(null);

    const [alreadyApplied, setAlreadyApplied] = useState(false);

    useEffect(() => {
        checkIfApplied();
    }, [jobApply?._id]);

    const checkIfApplied = async () => {
        const userId = user?._id || user?.id;
        if (!jobApply?._id || !userId) return;
        try {
            const res: any = await Post_ApiWithToken(ApiUrl.appliedByUser, {
                job_id: jobApply._id,
                user_id: userId
            })();
            if (res?.data?.data?.status === "Applied") {
                setAlreadyApplied(true);
            } else {
                setAlreadyApplied(false);
            }
        } catch (error) {
            console.log('checkIfApplied error', error);
        }
    };


    const pickResume = async () => {
        try {
            const [file] = await pick({
                allowMultiSelection: false,
                type: [types.pdf, types.doc, types.docx],
            });
            setResume({ name: file.name ?? 'resume', uri: file.uri, size: file.size ?? undefined });
        } catch (err) {
            // user cancelled
        }
    };

    const formatFileSize = (bytes?: number) => {
        if (!bytes) return '';
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const handleSubmit = async () => {
        const userId = user?._id || user?.id;
        if (!jobApply?._id || !userId) {
            Helper.showToast('Unable to process application. Please login again.');
            return;
        }
        if (!fullName.trim() || !contactNumber.trim() || !emailAddress.trim()) {
            Helper.showToast('Please fill in all required fields.');
            return;
        }
        if (!resume) {
            Helper.showToast('Please upload your resume.');
            return;
        }
        try {
            setLoading(true);
            const res: any = await Post_ApiWithToken(ApiUrl.ApplyJob, {
                job_id: jobApply._id,
                user_id: userId,
                name: fullName,
                email: emailAddress,
                number: contactNumber,
            })();
            console.log('Apply error', res);
            if (res?.data?.status) {
                setIsSubmitted(true);
                Helper.showToast('Application submitted successfully!');
                handleNavigation({ type: 'setRoot', page: 'BottomTabs', navigation });
            } else {
                Helper.showToast(res?.data?.message || 'Already applied for this job.');
            }
        } catch (error) {
            console.log('Apply error', error);
            Helper.showToast('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                onBackPress={() => navigation.goBack()}
                title={APP_TEXT.applyScreen.title}
                rightIcon={Images.dots}
            />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Job Details */}
                <View style={styles.jobBox}>
                    <View style={styles.jobIconBox}>
                        <Image source={jobApply?.companyLogo ? { uri: Config.imageurl + jobApply.companyLogo } : Images.stripe} style={styles.jobIcon} />
                    </View>
                    <View>
                        <Text style={styles.applyingForText}>{APP_TEXT.applyScreen.applyingFor}</Text>
                        <Text style={styles.jobTitleText}>{jobApply?.title || jobApply?.jobTitle || APP_TEXT.homeJobs[0].title}</Text>
                    </View>
                </View>

                {/* Personal Information */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{APP_TEXT.applyScreen.personalInfo}</Text>
                    <TouchableOpacity onPress={() => setIsEditable(!isEditable)}>
                        <Text style={styles.editInfoText}>{APP_TEXT.applyScreen.editInfo}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>{APP_TEXT.applyScreen.fullName}</Text>
                    <TextInput
                        style={styles.infoInput}
                        value={fullName}
                        // editable={isEditable ? true : false}
                        onChangeText={setFullName}
                        maxLength={50}
                        placeholder={APP_TEXT.applyScreen.fullNamePlaceholder}
                        placeholderTextColor={Colors.mutedSlate}
                    />
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>{APP_TEXT.applyScreen.contactNumber}</Text>
                    <TextInput
                        style={styles.infoInput}
                        value={contactNumber}
                        onChangeText={(text) => setContactNumber(text.replace(/[^0-9]/g, ''))}
                        keyboardType='number-pad'
                        maxLength={10}
                        // editable={isEditable ? true : false}
                        placeholder={APP_TEXT.applyScreen.contactNumberPlaceholder}
                        placeholderTextColor={Colors.mutedSlate}
                    />
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>{APP_TEXT.applyScreen.emailAddress}</Text>
                    <TextInput
                        style={styles.infoInput}
                        value={emailAddress}
                        // editable={isEditable ? true : false}
                        onChangeText={setEmailAddress}
                        maxLength={25}
                        keyboardType="email-address"
                        placeholder={APP_TEXT.applyScreen.emailAddressPlaceholder}
                        placeholderTextColor={Colors.mutedSlate}
                        autoCapitalize="none"
                    />
                </View>

                {/* Selected Resume */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{APP_TEXT.applyScreen.selectedResume}</Text>
                </View>

                <View style={styles.resumeCard}>
                    <View style={styles.resumeIconBox}>
                        <Image source={Images.application} style={styles.resumeIcon} />
                    </View>
                    <View style={styles.resumeDetails}>
                        <Text style={styles.resumeName} numberOfLines={1}>
                            {resume ? resume.name : 'No resume selected'}
                        </Text>
                        <Text style={styles.resumeMeta}>
                            {resume ? formatFileSize(resume.size) : 'Tap Change to upload'}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.changeButton} onPress={pickResume}>
                        <Text style={styles.changeButtonText}>{resume ? APP_TEXT.applyScreen.change : 'Upload'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Cover Letter */}
                {/* <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{APP_TEXT.applyScreen.coverLetterOptional}</Text>
                    <Text style={styles.charCountText}>{APP_TEXT.applyScreen.maxChars}</Text>
                </View>

                <View style={styles.coverLetterInputContainer}>
                    <TextInput
                        style={styles.coverLetterInput}
                        placeholder={APP_TEXT.applyScreen.placeholder}
                        placeholderTextColor={Colors.mutedSlate}
                        multiline
                        maxLength={2000}
                        value={coverLetter}
                        onChangeText={setCoverLetter}
                    />
                    <View style={styles.charCountFooter}>
                        <Text style={styles.footerText}>{coverLetter.length} / 2000</Text>
                    </View>
                </View> */}

                <View style={{ height: MarginHW.MarginH100 + MarginHW.MarginH20 }} />
            </ScrollView>
            {/* Bottom Fixed Container */}
            <View style={styles.bottomContainer}>
                {isSubmitted && !alreadyApplied && (
                    <View style={styles.toastContainer}>
                        <Image source={Images.application} style={styles.toastIcon} />
                        <Text style={styles.toastText}>{APP_TEXT.applyScreen.successToast}</Text>
                    </View>
                )}
                {alreadyApplied && (
                    <View style={styles.toastContainer}>
                        <Image source={Images.application} style={styles.toastIcon} />
                        <Text style={styles.toastText}>{'You have already applied for this job!'}</Text>
                    </View>
                )}

                <Button label={alreadyApplied ? 'Already Applied' : loading ? 'Submitting...' : APP_TEXT.applyScreen.submit} onPress={alreadyApplied ? () => { } : handleSubmit} loading={loading} />

                {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>{APP_TEXT.applyScreen.submit}</Text>
                    <Image source={Images.application} style={styles.submitIcon} />
                </TouchableOpacity> */}

                <Text style={styles.termsText}>
                    {APP_TEXT.applyScreen.termsPrefix}
                    <Text style={styles.termsLink}>{APP_TEXT.applyScreen.termsLink}</Text>{APP_TEXT.applyScreen.and}
                    <Text style={styles.termsLink}>{APP_TEXT.applyScreen.privacyPolicy}</Text>.
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Apply

