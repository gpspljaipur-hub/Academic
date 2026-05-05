import React, { useState, useEffect } from 'react';
import {
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Styles';
import HomeHeader from '../../../../components/HomeHeader';
import Images from '../../../../comman/Images';
import Colors from '../../../../comman/Colors';
import { APP_TEXT } from '../../../../comman/String';

import { useSelector } from 'react-redux';
import { Post_Api } from '../../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../../Lib/ApiService/ApiUrl';
import { useIsFocused } from '@react-navigation/native';
import fonts from '../../../../comman/fonts';

interface ChatItem {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    avatar: any;
    isOnline: boolean;
    initials: string;
}

const Message = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState<ChatItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state: any) => state.user);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchApplicants();
        }
    }, [isFocused]);

    const fetchApplicants = async () => {
        const recruiterId = user?.id || user?._id;
        if (!recruiterId) return;

        try {
            setLoading(true);
            const res: any = await Post_Api(ApiUrl.allAppliedApplicants, { recruiterId })();

            if (res?.data?.status) {
                const mappedChats = (res.data.data || []).map((app: any) => {
                    const name = app.user?.name || 'Applicant';
                    return {
                        id: app._id,
                        name: name,
                        lastMessage: `Applied for: ${app.job?.title || 'Unknown Role'}`,
                        time: new Date(app.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' }),
                        unreadCount: 0,
                        avatar: null,
                        isOnline: false,
                        initials: name.split(' ').length > 1
                            ? name.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase()
                            : name.substring(0, 2).toUpperCase()
                    };
                });
                setChats(mappedChats);
            }
        } catch (error) {
            console.log('fetchApplicants error', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderChatItem = ({ item }: { item: ChatItem }) => (
        <TouchableOpacity style={styles.chatItem} activeOpacity={0.7}>
            <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: Colors.cardGray, justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ fontSize: 16, fontFamily: fonts.LexendBold, color: Colors.primaryBlue }}>
                        {item.initials}
                    </Text>
                </View>
                {item.isOnline && <View style={styles.onlineBadge} />}
            </View>

            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <Text style={styles.userName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <View style={styles.lastMessageRow}>
                    <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
                    {item.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{item.unreadCount}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader
                title={APP_TEXT.messenger.headerTitle}
                IconImg={Images.userImage}
            />

            <View style={styles.searchContainer}>
                <Image source={Images.search} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder={APP_TEXT.messenger.searchPlaceholder}
                    placeholderTextColor={Colors.bodyGray}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <View style={{ flex: 1, paddingBottom: 70 }}>
                <FlatList
                    data={filteredChats}
                    keyExtractor={item => item.id}
                    renderItem={renderChatItem}
                    contentContainerStyle={styles.chatListContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>{APP_TEXT.messenger.noMessages}</Text>
                        </View>
                    }
                />
            </View>

        </SafeAreaView>
    );
};

export default Message;