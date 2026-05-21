import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, SafeAreaView, } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { styles } from './Styles';
import Images from '../../../comman/Images';
import Colors from '../../../comman/Colors';
import fonts from '../../../comman/fonts';
import { Post_Api } from '../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../Lib/ApiService/ApiUrl';
import socketService from '../../../Lib/SocketService';
import Header from '../../../components/Header';

const ChatScreen = () => {
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    const { user } = useSelector((state: any) => state?.user || {});
    const currentUserId = user?.id || user?._id;
    const [searchQuery, setSearchQuery] = useState('');
    const [applications, setApplications] = useState<any[]>([]);
    const [loadingList, setLoadingList] = useState(false);

    useEffect(() => {
        if (currentUserId && isFocused) {
            socketService.initializeSocket(currentUserId);
            fetchApplications();
        }
    }, [currentUserId, isFocused]);

    const fetchApplications = async () => {
        if (!currentUserId) return;
        try {
            setLoadingList(true);
            const res: any = await Post_Api(ApiUrl.myAppliedJobs, {
                user_id: currentUserId,
            })();
            const appsData = res?.data?.data || res?.data || [];
            if (Array.isArray(appsData)) {
                setApplications(appsData);
            }
        } catch (error) {
            console.log('Failed to fetch applied jobs for chat:', error);
        } finally {
            setLoadingList(false);
        }
    };

    const filteredApps = applications.filter((app) => {
        const companyName = app.job?.company || 'Recruiter';
        const jobTitle = app.job?.title || app.job?.jobTitle || '';
        return (
            companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const renderChatItem = ({ item }: { item: any }) => {
        const companyName = item.job?.company || 'Recruiter';
        const jobTitle = item.job?.title || item.job?.jobTitle || 'Applied Role';
        const dateString = new Date(item.appliedDate || item.createdAt).toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
        });

        const initials = companyName
            .split(' ')
            .map((w: string) => w[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ChatJobMassage', { selectedApp: item })}
                style={styles.chatItem}
                activeOpacity={0.7}
            >
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{initials}</Text>
                    </View>
                </View>

                <View style={styles.chatInfo}>
                    <View style={styles.chatHeader}>
                        <Text style={styles.companyName} numberOfLines={1}>
                            {companyName}
                        </Text>
                        <Text style={styles.timeText}>{dateString}</Text>
                    </View>
                    <View style={styles.lastMessageRow}>
                        <Text style={styles.jobTitle} numberOfLines={1}>
                            {jobTitle}
                        </Text>
                        <View style={styles.chatActionButton}>
                            <Text style={styles.chatActionText}>Chat</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Header title={'Messages'} onBackPress={() => navigation.goBack()} />
            <View style={styles.listContainer}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Image source={Images.search} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search recruiters or jobs..."
                        placeholderTextColor={Colors.bodyGray}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* List of Recruiters/Applied Jobs */}
                {loadingList && applications.length === 0 ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={Colors.brandBlue} />
                    </View>
                ) : (
                    <FlatList
                        data={filteredApps}
                        keyExtractor={(item) => item._id}
                        renderItem={renderChatItem}
                        contentContainerStyle={styles.chatListContent}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No recruiter chats found.</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </View>
    );
};

export default ChatScreen;
