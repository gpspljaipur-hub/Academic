import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './Styles';
import Images from '../../comman/Images';
import Colors from '../../comman/Colors';
import { APP_TEXT } from '../../comman/String';
import { SafeAreaView } from 'react-native-safe-area-context';
const Detail = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { job } = route.params || {};

    // Data Extraction
    const title = job?.title;
    const source = job?.source;
    const publishedAt = job?.publishedAt ? new Date(job.publishedAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }) : '';
    const summary = job?.summary || '';
    const description = job?.description || '';
    const originalLink = job?.link || '';

    const handleOpenLink = () => {
        if (originalLink) {
            Linking.openURL(originalLink).catch((err) => console.error("Couldn't load page", err));
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.backArrow} style={styles.headerIcon} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Job Details</Text>
                <TouchableOpacity onPress={handleOpenLink}>
                    <Image source={Images.dots} style={styles.headerIcon} resizeMode="contain" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    {/* <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>{orgCode}</Text>
                    </View> */}
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.department}>{source}</Text>

                    <View style={styles.highlightsContainer}>
                        {publishedAt ? (
                            <View style={styles.highlightPill}>
                                <Image source={Images.bellIcon} style={[styles.highlightIcon, { tintColor: Colors.errorRed }]} resizeMode="contain" />
                                <Text style={[styles.highlightText, { color: Colors.errorRed }]}>
                                    {APP_TEXT.homePublish}{publishedAt}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </View>
                {(summary || description) ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{summary ? 'Brief Summary' : 'Description'}</Text>
                        <View style={styles.card}>
                            <Text style={styles.descriptionText}>{summary || description}</Text>
                        </View>
                    </View>
                ) : null}

                {/* Full Description Section */}
                {/* {description && description !== title ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Complete Description</Text>
                        <View style={styles.card}>
                            <Text style={styles.descriptionText}>{description}</Text>
                        </View>
                    </View>
                ) : null} */}

                {/* Source Info Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Source Information</Text>
                    <View style={styles.card}>
                        <Text style={styles.descriptionText}>
                            This update was published by <Text style={{ fontWeight: '800', color: Colors.brandBlue }}>{source}</Text> on {publishedAt}.
                            You can view the original notification for more details.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer Action */}
            {
                originalLink ? (
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={handleOpenLink}
                        >
                            <Text style={styles.applyButtonText}>View Full Details</Text>
                        </TouchableOpacity>
                    </View>
                ) : null
            }
        </SafeAreaView >
    );
};

export default Detail;