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

const Apply = () => {
    const navigation = useNavigation<any>();
    const [coverLetter, setCoverLetter] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

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
                        <Image source={Images.indesign} style={styles.jobIcon} />
                    </View>
                    <View>
                        <Text style={styles.applyingForText}>{APP_TEXT.applyScreen.applyingFor}</Text>
                        <Text style={styles.jobTitleText}>{APP_TEXT.homeJobs[0].title}</Text>
                    </View>
                </View>

                {/* Personal Information */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{APP_TEXT.applyScreen.personalInfo}</Text>
                    <TouchableOpacity>
                        <Text style={styles.editInfoText}>{APP_TEXT.applyScreen.editInfo}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>{APP_TEXT.applyScreen.fullName}</Text>
                    <Text style={styles.infoValue}>Rahul Sharma</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>{APP_TEXT.applyScreen.contactNumber}</Text>
                    <Text style={styles.infoValue}>+91 98765 43210</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>{APP_TEXT.applyScreen.emailAddress}</Text>
                    <Text style={styles.infoValue}>rahul.sharma.design@gmail.com</Text>
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
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>{APP_TEXT.applyScreen.submit}</Text>
                    <Image source={Images.application} style={styles.submitIcon} />
                </TouchableOpacity>
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

