import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Colors from '../comman/Colors';
import fonts from '../comman/fonts';
import FontsSize from '../comman/Sizes/FontsSize';
import MarginHW from '../comman/Sizes/MarginHW';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notification = () => {
    const navigation = useNavigation();

    const notifications = [
        {
            id: '1',
            title: 'Welcome to Academic',
            description: 'You have successfully joined the Academic platform. Explore your dashboard to get started.',
            isRead: false,
            time: '2 hours ago'
        },
        {
            id: '2',
            title: 'Profile Update',
            description: 'Your profile has been updated successfully with the latest information.',
            isRead: true,
            time: 'Yesterday'
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Notifications"
                onBackPress={() => navigation.goBack()}
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {notifications.map((item) => (
                    <View
                        key={item.id}
                        style={[
                            styles.notificationCard,
                            { backgroundColor: item.isRead ? Colors.white : Colors.cardGray }
                        ]}
                    >
                        <View style={styles.textContainer}>
                            <View style={styles.headerRow}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};
export default Notification;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: MarginHW.MarginW16,
    },
    scrollContent: {
        paddingTop: MarginHW.MarginH10,
    },
    notificationCard: {
        padding: MarginHW.MarginH10,
        marginHorizontal: MarginHW.MarginW10,
        marginVertical: MarginHW.MarginH5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.borderGray,
        elevation: 2,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    textContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: MarginHW.MarginH8,
    },
    title: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
    },
    time: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },
    description: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
        lineHeight: 20,
    },
});
