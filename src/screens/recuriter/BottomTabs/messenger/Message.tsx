import React, { useState } from 'react';
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

interface ChatItem {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    avatar: any;
    isOnline: boolean;
}

const MOCK_CHATS: ChatItem[] = [
    {
        id: '1',
        name: 'John Doe',
        lastMessage: 'Hi, I saw your job posting for Senior UI...',
        time: '10:30 AM',
        unreadCount: 2,
        avatar: Images.userImage,
        isOnline: true,
    },
    {
        id: '2',
        name: 'Sarah Smith',
        lastMessage: 'Thank you for the opportunity!',
        time: 'Yesterday',
        unreadCount: 0,
        avatar: Images.userImage,
        isOnline: false,
    },
    {
        id: '3',
        name: 'Alex Johnson',
        lastMessage: 'When is the interview scheduled?',
        time: '2 days ago',
        unreadCount: 0,
        avatar: Images.userImage,
        isOnline: true,
    },
    {
        id: '4',
        name: 'Emily Davis',
        lastMessage: 'I have updated my portfolio link.',
        time: '1 week ago',
        unreadCount: 5,
        avatar: Images.userImage,
        isOnline: false,
    },
    {
        id: '5',
        name: 'Michael Brown',
        lastMessage: 'Looking forward to hearing from you.',
        time: 'Mar 20',
        unreadCount: 0,
        avatar: Images.userImage,
        isOnline: false,
    },
    {
        id: '6',
        name: 'Jessica Wilson',
        lastMessage: 'Can we reschedule the call?',
        time: 'Mar 18',
        unreadCount: 1,
        avatar: Images.userImage,
        isOnline: true,
    }
];

const Message = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState(MOCK_CHATS);

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderChatItem = ({ item }: { item: ChatItem }) => (
        <TouchableOpacity style={styles.chatItem} activeOpacity={0.7}>
            <View style={styles.avatarContainer}>
                <Image source={item.avatar} style={styles.avatar} />
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
        </SafeAreaView>
    );
};

export default Message;