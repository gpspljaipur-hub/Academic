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
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-root-toast';
import Colors from '../../../comman/Colors';
import { APP_TEXT } from '../../../comman/String';
import { SafeAreaView } from 'react-native-safe-area-context';

const Form = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [aboutSelf, setAboutSelf] = useState('');
    const [resume, setResume] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => {
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

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.back}>←</Text>
                </TouchableOpacity>

                <Text style={styles.title}>{APP_TEXT.applyScreen.title}</Text>
                <View style={{ width: 30 }} />

            </View>
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
                            onChangeText={setUserName}
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
                            onChangeText={setContactNo}
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
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{APP_TEXT.applyScreen.selectedResume}</Text>
                        <TouchableOpacity
                            style={styles.uploadButton}
                            activeOpacity={0.7}
                        // onPress={handlePickDocument}
                        >
                            <Text style={styles.uploadText}>{APP_TEXT.applyScreen.uploadResume}</Text>
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
                            onChangeText={setAboutSelf}
                        />
                    </View>

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