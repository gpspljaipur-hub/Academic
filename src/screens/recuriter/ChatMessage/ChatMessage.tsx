import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { styles } from './Styles';
import HomeHeader from '../../../components/HomeHeader';
import Images from '../../../comman/Images';
import Colors from '../../../comman/Colors';
import fonts from '../../../comman/fonts';

import { useSelector } from 'react-redux';
import socketService from '../../../Lib/SocketService';
import SocketEvents from '../../../Lib/SocketEvents';
import Config from '../../../Lib/ApiService/Config';

const ChatMessage = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { chats } = route.params || {};
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);

    const { user } = useSelector((state: any) => state?.user || {});
    const currentUserId = user?.id || user?._id;

    // Calculate roles and room context dynamically
    const isApplicantCurrentUser = chats?.user?._id === currentUserId || chats?.user?.id === currentUserId;
    const receiverId = isApplicantCurrentUser 
        ? (chats?.job?.postedBy || chats?.postedBy) 
        : (chats?.user?._id || chats?.user?.id);
    const studentId = isApplicantCurrentUser 
        ? currentUserId 
        : (chats?.user?._id || chats?.user?.id);
    const parentId = chats?._id;

    const name = chats?.user?.name || 'Applicant';
    const initials = name.split(' ').length > 1
        ? name.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase()
        : name.substring(0, 2).toUpperCase();

    // Map database model fields to UI representation format
    const mapDbMessageToUi = (msg: any) => {
        const isMe = msg.senderId === currentUserId || msg.senderId?._id === currentUserId;
        return {
            id: msg._id || Date.now().toString(),
            text: msg.message,
            sender: isMe ? 'me' : 'them',
            time: new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
    };

    // Load initial history and hook up websocket listeners
    useEffect(() => {
        if (!currentUserId || !parentId) return;

        // Ensure socket connection is alive for user
        socketService.initializeSocket(currentUserId);

        // Join room and retrieve chat archives
        SocketEvents.joinRoom(parentId);
        fetchChatHistory();

        // Mark any existing incoming messages in this room as seen
        SocketEvents.seenMessage(parentId, receiverId);

        // Listen for new messages
        const handleNewMessage = (newMsg: any) => {
            console.log('Real-time message received:', newMsg);
            if (newMsg.parentId === parentId) {
                const uiMsg = mapDbMessageToUi(newMsg);
                setMessages(prev => {
                    if (prev.some(m => m.id === uiMsg.id)) return prev;
                    return [...prev, uiMsg];
                });

                if (newMsg.senderId !== currentUserId) {
                    SocketEvents.seenMessage(parentId, receiverId);
                }
            }
        };

        // Listen for read receipt broadcasts
        const handleMessagesSeen = (seenData: any) => {
            console.log('Messages read receipt broadcast:', seenData);
        };

        SocketEvents.onNewMessage(handleNewMessage);
        socketService.on('messagesSeen', handleMessagesSeen);

        return () => {
            SocketEvents.offNewMessage(handleNewMessage);
            socketService.off('messagesSeen', handleMessagesSeen);
        };
    }, [currentUserId, parentId]);

    const fetchChatHistory = async () => {
        if (!parentId) return;
        try {
            const response = await fetch(`${Config.socketurl}/chat/history/${parentId}`);
            const json = await response.json();
            if (json.status && json.data) {
                const mapped = json.data.map(mapDbMessageToUi);
                setMessages(mapped);
            }
        } catch (error) {
            console.log('Error loading chat history:', error);
        }
    };

    const sendMessage = () => {
        if (message.trim().length === 0 || !parentId || !currentUserId || !receiverId) return;

        const messagePayload = {
            parentId,
            senderId: currentUserId,
            receiverId,
            studentId,
            message: message.trim(),
        };

        // Emit through WebSocket Gateway (persistence and broadcast handled by backend)
        SocketEvents.sendMessage(messagePayload);
        setMessage('');
    };

    const renderMessageItem = ({ item }: { item: any }) => {
        const isMe = item.sender === 'me';
        return (
            <View style={[styles.messageWrapper, isMe ? styles.myMessageWrapper : styles.theirMessageWrapper]}>
                <View style={[styles.messageBubble, isMe ? styles.myMessageBubble : styles.theirMessageBubble]}>
                    <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.theirMessageText]}>
                        {item.text}
                    </Text>
                    <Text style={[styles.messageTime, isMe ? styles.myMessageTime : styles.theirMessageTime]}>
                        {item.time}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader
                title={name}
                IconImg={Images.backArrow}
                backArrow
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessageItem}
                    contentContainerStyle={styles.messageList}
                    showsVerticalScrollIndicator={false}
                />

                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.attachButton}>
                        <Image resizeMode='contain' source={Images.plus} style={styles.attachIcon} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor={Colors.bodyGray}
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, { opacity: message.trim().length > 0 ? 1 : 0.6 }]}
                        onPress={sendMessage}
                        disabled={message.trim().length === 0}
                    >
                        <Image resizeMode='contain' source={Images.send} style={styles.sendIcon} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatMessage;
