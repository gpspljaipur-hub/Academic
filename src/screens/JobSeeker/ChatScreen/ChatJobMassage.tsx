import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './Styles';
import Images from '../../../comman/Images';
import Colors from '../../../comman/Colors';
import fonts from '../../../comman/fonts';
import { Get_Api, Post_Api } from '../../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../../Lib/ApiService/ApiUrl';
import socketService from '../../../Lib/SocketService';
import SocketEvents from '../../../Lib/SocketEvents';
import HomeHeader from '../../../components/HomeHeader';
import Header from '../../../components/Header';

const ChatJobMassage = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { selectedApp } = route.params || {};
    const { user } = useSelector((state: any) => state?.user || {});
    console.log('user', user);

    const currentUserId = user?.id || user?._id;
    console.log('currentUserId', currentUserId);

    const [messages, setMessages] = useState<any[]>([]);
    const [loadingChat, setLoadingChat] = useState(false);
    const [messageText, setMessageText] = useState('');

    const flatListRef = useRef<FlatList>(null);
    useEffect(() => {
        if (!selectedApp || !currentUserId) return;
        const recruiterId = selectedApp.job?.recruiterId?._id || selectedApp.job?.recruiterId;
        const jobseekerId = currentUserId; // Use actual Jobseeker User ID instead of selectedApp._id
        if (!recruiterId || !jobseekerId) return;

        fetchChatHistory(jobseekerId, recruiterId);
        markMessagesAsSeen(jobseekerId, recruiterId);

        const handleNewMessage = (newMsg: any) => {
            console.log('JobSeeker real-time message received:', newMsg);
            if (newMsg.jobseekerId === jobseekerId && newMsg.recruiterId === recruiterId) {
                setMessages((prev) => [...prev, newMsg]);
                setTimeout(() => {
                    flatListRef.current?.scrollToEnd({ animated: true });
                }, 100);
            }
        };

        const handleMessagesSeen = (seenData: any) => {
            console.log('JobSeeker message seen broadcast:', seenData);
        };

        SocketEvents.onNewMessage(handleNewMessage);
        socketService.on('messagesSeen', handleMessagesSeen);

        return () => {
            SocketEvents.offNewMessage(handleNewMessage);
            socketService.off('messagesSeen', handleMessagesSeen);
        };
    }, [selectedApp, currentUserId]);

    const fetchChatHistory = async (jobseekerId: string, recruiterId: string) => {
        try {
            setLoadingChat(true);
            const res = await Get_Api(`chat/history/${jobseekerId}/${recruiterId}`, {})();
            if (res?.data?.status) {
                setMessages(res.data.data || []);
                setTimeout(() => {
                    flatListRef.current?.scrollToEnd({ animated: false });
                }, 100);
            }
        } catch (error) {
            console.log('Error fetching chat history:', error);
        } finally {
            setLoadingChat(false);
        }
    };

    const markMessagesAsSeen = async (jobseekerId: string, recruiterId: string) => {
        try {
            await Post_Api('chat/mark-seen', {
                jobseekerId,
                recruiterId,
                userId: currentUserId,
            })();
            SocketEvents.seenMessage(jobseekerId, recruiterId, currentUserId);
        } catch (error) {
            console.log('Error marking messages as seen:', error);
        }
    };

    const sendMessage = () => {
        if (messageText.trim().length === 0 || !selectedApp) return;

        const recruiterId = selectedApp.job?.recruiterId?._id || selectedApp.job?.recruiterId;
        const jobseekerId = currentUserId; // Use actual Jobseeker User ID instead of selectedApp._id

        const messagePayload = {
            jobseekerId: jobseekerId,
            recruiterId: recruiterId,
            senderId: currentUserId,
            receiverId: recruiterId,
            message: messageText.trim(),
            date: new Date().toISOString(),
        };

        // Emit through websocket
        SocketEvents.sendMessage(messagePayload);

        // Optimistically add to messages list
        const localMessage = {
            ...messagePayload,
            createdAt: new Date().toISOString(),
            _id: Date.now().toString(),
        };
        setMessages((prev) => [...prev, localMessage]);
        setMessageText('');

        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const renderMessageItem = ({ item }: { item: any }) => {
        const isMe = item.senderId === currentUserId;
        const time = item.createdAt || item.date
            ? new Date(item.createdAt || item.date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            })
            : '';

        return (
            <View
                style={[
                    styles.messageWrapper,
                    isMe ? styles.myMessageWrapper : styles.theirMessageWrapper,
                ]}
            >
                <View
                    style={[
                        styles.messageBubble,
                        isMe ? styles.myMessageBubble : styles.theirMessageBubble,
                    ]}
                >
                    <Text
                        style={[
                            styles.messageText,
                            isMe ? styles.myMessageText : styles.theirMessageText,
                        ]}
                    >
                        {item.message}
                    </Text>
                </View>
                <Text
                    style={[
                        styles.messageTime,
                        isMe ? styles.myMessageTime : styles.theirMessageTime,
                    ]}
                >
                    {time}
                </Text>
            </View>
        );
    };

    if (!selectedApp) return null;

    const companyName = selectedApp.job?.company || 'Recruiter';
    const jobTitle = selectedApp.job?.title || selectedApp.job?.jobTitle || 'Applied Role';
    const initials = companyName
        .split(' ')
        .map((w: string) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    return (
        <View style={styles.container}>
            <Header title={initials} onBackPress={() => navigation.goBack()} />


            {loadingChat ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.brandBlue} />
                </View>
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item._id || item.id}
                    renderItem={renderMessageItem}
                    contentContainerStyle={styles.messageList}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() =>
                        flatListRef.current?.scrollToEnd({ animated: false })
                    }
                />
            )}

            {/* Input Tool area */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor={Colors.bodyGray}
                    value={messageText}
                    onChangeText={setMessageText}
                    multiline
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        { opacity: messageText.trim().length > 0 ? 1 : 0.6 },
                    ]}
                    onPress={sendMessage}
                    disabled={messageText.trim().length === 0}
                >
                    <Image
                        resizeMode="contain"
                        source={Images.send}
                        style={styles.sendIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatJobMassage;
