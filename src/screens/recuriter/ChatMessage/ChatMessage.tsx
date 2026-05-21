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
    const name = chats?.user?.name || 'Applicant';
    const ReceiverId = chats?._id;

    console.log("chats", chats);
    console.log("currentUserId", currentUserId);
    console.log("ReceiverId", ReceiverId);

    useEffect(() => {
        if (!currentUserId) return;
        // fetchChatHistory();
        const handleNewMessage = (newMsg: any) => {
            console.log('Real-time message received:', newMsg);
            if (currentUserId == newMsg.receiverId) {
                const incomingMsg = {
                    userId: newMsg.senderId,
                    message: newMsg.message,
                    senderId: newMsg.senderId,
                    date: newMsg.date || new Date().toISOString(),

                };
                setMessages(prev => [...prev, incomingMsg])
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
    }, [currentUserId,]);


    const sendMessage = () => {
        if (message.trim().length === 0) return;

        const messagePayload = {
            jobseekerId: ReceiverId,
            recruiterId: currentUserId,
            senderId: currentUserId,
            receiverId: ReceiverId,
            message: message.trim(),
            date: new Date().toISOString(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        // Emit through WebSocket Gateway (persistence and broadcast handled by backend)
        SocketEvents.sendMessage(messagePayload);
        setMessages((prev) => [...prev, messagePayload]);
        setMessage('');
    };

    const renderMessageItem = ({ item }: { item: any }) => {
        const isMe = item.senderId === currentUserId;
        return (
            <View style={[styles.messageWrapper, isMe ? styles.myMessageWrapper : styles.theirMessageWrapper]}>
                <View style={[styles.messageBubble, isMe ? styles.myMessageBubble : styles.theirMessageBubble]}>
                    <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.theirMessageText]}>
                        {item.message}
                    </Text>

                </View>
                <Text style={[styles.messageTime]}>
                    {item.time}
                </Text>
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
