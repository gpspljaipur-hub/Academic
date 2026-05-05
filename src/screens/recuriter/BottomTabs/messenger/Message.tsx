import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Styles';
import HomeHeader from '../../../../components/HomeHeader';
import Images from '../../../../comman/Images';
import Colors from '../../../../comman/Colors';
import { APP_TEXT } from '../../../../comman/String';
import fonts from '../../../../comman/fonts';
import { useSelector } from 'react-redux';
import { Post_Api } from '../../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../../Lib/ApiService/ApiUrl';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { handleNavigation } from '../../../../navigation/RootNavigator';

const Message = () => {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState<any[]>([]);
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
                setChats(res.data.data || []);
            }
        } catch (error) {
            console.log('fetchApplicants error', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredChats = chats.filter(chat =>
        (chat.user?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (chat.job?.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const OnHandleMasage = (item: any) => {
        handleNavigation({ type: 'push', navigation, page: 'ChatMessage', passProps: { chats: item } })

    }

    const renderChatItem = ({ item }: { item: any }) => {
        const name = item.user?.name || 'Applicant';
        const jobTitle = item.job?.title || 'Unknown Role';
        const time = new Date(item.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' });
        const initials = name.split(' ').length > 1
            ? name.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase()
            : name.substring(0, 2).toUpperCase();

        return (
            <TouchableOpacity onPress={() => { OnHandleMasage(item) }} style={styles.chatItem} activeOpacity={0.7}>
                <View style={styles.avatarContainer}>
                    <View style={[styles.avatar, { backgroundColor: Colors.cardGray, justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ fontSize: 16, fontFamily: fonts.LexendBold, color: Colors.primaryBlue }}>
                            {initials}
                        </Text>
                    </View>
                </View>

                <View style={styles.chatInfo}>
                    <View style={styles.chatHeader}>
                        <Text style={styles.userName} numberOfLines={1}>{name}</Text>
                        <Text style={styles.timeText}>{time}</Text>
                    </View>
                    <View style={styles.lastMessageRow}>
                        <Text style={styles.lastMessage} numberOfLines={1}>Applied for: {jobTitle}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader
                title={APP_TEXT.messenger.headerTitle}
                IconImg={Images.userImage}
                bellIcon={Images.settings} onNotificationPress={() => navigation.navigate('Setting')}
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
                {loading && chats.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={Colors.brandBlue} />
                    </View>
                ) : (
                    <FlatList
                        data={filteredChats}
                        keyExtractor={item => item._id}
                        renderItem={renderChatItem}
                        contentContainerStyle={styles.chatListContent}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>{APP_TEXT.messenger.noMessages}</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Message;