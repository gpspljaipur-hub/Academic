import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import Images from '../../../../comman/Images'
import { useNavigation } from '@react-navigation/native'
import styles from './Style'
import MarginHW from '../../../../comman/Sizes/MarginHW'
import AppHeader from '../../../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { APP_TEXT } from '../../../../comman/String'
import Colors from '../../../../comman/Colors'
import Button from '../../../../components/Button'

const Apply = () => {
    const navigation = useNavigation<any>();
    const [fullName, setFullName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isEditable, setIsEditable] = useState (false);

    const handleSubmit = () => {
            navigation.goBack();
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
                        <Image source={Images.stripe} style={styles.jobIcon} />
                    </View>
                    <View>
                        <Text style={styles.applyingForText}>{APP_TEXT.applyScreen.applyingFor}</Text>
                        <Text style={styles.jobTitleText}>{APP_TEXT.homeJobs[0].title}</Text>
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
                        editable={isEditable ? true : false}
                        onChangeText={setFullName}
                        placeholder={APP_TEXT.applyScreen.fullNamePlaceholder}
                        placeholderTextColor={Colors.mutedSlate}
                    />
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>{APP_TEXT.applyScreen.contactNumber}</Text>
                    <TextInput
                        style={styles.infoInput}
                        value={contactNumber}
                        onChangeText={setContactNumber}
                        keyboardType="phone-pad"
                        editable={isEditable ? true : false}
                        placeholder={APP_TEXT.applyScreen.contactNumberPlaceholder}
                        placeholderTextColor={Colors.mutedSlate}
                    />
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>{APP_TEXT.applyScreen.emailAddress}</Text>
                    <TextInput
                        style={styles.infoInput}
                        value={emailAddress}
                        editable={isEditable ? true : false}
                        onChangeText={setEmailAddress}
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
                        <Text style={styles.resumeName} numberOfLines={1}>Rahul_Resume_2024.pdf</Text>
                        <Text style={styles.resumeMeta}>Modified 2 days ago • 1.2 MB</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={Images.search} style={styles.eyeIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.changeButton}>
                        <Text style={styles.changeButtonText}>{APP_TEXT.applyScreen.change}</Text>
                    </TouchableOpacity>
                </View>

                {/* Cover Letter */}
                <View style={styles.sectionHeader}>
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
                </View>

                <View style={{ height: MarginHW.MarginH100 + MarginHW.MarginH20 }} />
            </ScrollView>
            {/* Bottom Fixed Container */}
            <View style={styles.bottomContainer}>
                {isSubmitted && (
                    <View style={styles.toastContainer}>
                        <Image source={Images.application} style={styles.toastIcon} />
                        <Text style={styles.toastText}>{APP_TEXT.applyScreen.successToast}</Text>
                    </View>
                )}

                <Button label={APP_TEXT.applyScreen.submit} onPress={handleSubmit} />
                
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

