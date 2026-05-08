import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { styles } from './Styles';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { pick } from '@react-native-documents/picker';
import Toast from 'react-native-root-toast';
import Colors from '../../../comman/Colors';
import { APP_TEXT } from '../../../comman/String';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';

const Form = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [aboutSelf, setAboutSelf] = useState('');
    const [resume, setResume] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePickDocument = async () => {
        try {
           const res = await pick({
                  type: ['application/pdf'],
            });
            setResume(res[0]);
            setErrorMessage('');
        } catch (err) {
           
        }
    };

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = () => {
        setErrorMessage('');
        if (!userName.trim()) {
            setErrorMessage('Please enter your full name');
            return;
        }
        if (!contactNo.trim() || !/^\d{10}$/.test(contactNo)) {
            setErrorMessage('Please enter a valid 10-digit contact number');
            return;
        }
        if (!email.trim() || !validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }
        if (!resume) {
            setErrorMessage('Please upload your resume');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Toast.show('Success! We will get back to you soon.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                backgroundColor: Colors.online,
                textColor: Colors.white,
            });
            setTimeout(() => {
                navigation.goBack();
            }, 1000);
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title={APP_TEXT.applyScreen.title} onBackPress={() => navigation.goBack()} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{APP_TEXT.applyScreen.fullName}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={APP_TEXT.applyScreen.fullNamePlaceholder}
                            placeholderTextColor={Colors.mutedSlate}
                            value={userName}
                            onChangeText={(text) => {
                                setUserName(text);
                                setErrorMessage('');
                            }}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{APP_TEXT.applyScreen.contactNumber}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={APP_TEXT.applyScreen.contactNumberPlaceholder}
                            placeholderTextColor={Colors.mutedSlate}
                            keyboardType="phone-pad"
                            value={contactNo}
                            maxLength={10}
                            onChangeText={(text) => {

                                const numericValue = text.replace(/[^0-9]/g, '');
                                setContactNo(numericValue);
                                setErrorMessage('');
                            }}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{APP_TEXT.applyScreen.emailAddress}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={APP_TEXT.applyScreen.emailAddressPlaceholder}
                            placeholderTextColor={Colors.mutedSlate}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setErrorMessage('');
                            }}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{APP_TEXT.applyScreen.selectedResume}</Text>
                        <TouchableOpacity
                            style={styles.uploadButton}
                            activeOpacity={0.7}
                            onPress={handlePickDocument}
                        >
                            <Text style={styles.uploadText}>{resume ? resume.name : APP_TEXT.applyScreen.uploadResume}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{APP_TEXT.applyScreen.coverLetterOptional}</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder={APP_TEXT.applyScreen.placeholder}
                            placeholderTextColor={Colors.mutedSlate}
                            multiline
                            numberOfLines={4}
                            value={aboutSelf}
                            onChangeText={(text) => {
                                setAboutSelf(text);
                                setErrorMessage('');
                            }}
                        />
                    </View>

                    {errorMessage ? (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ) : null}
                    <Button
                        label={APP_TEXT.applyScreen.submit}
                        loading={loading}
                        onPress={handleSubmit}
                        containerStyle={styles.submitButton}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Form;