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

const ChatMessage = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { chats } = route.params || {};
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);

    const name = chats?.user?.name || 'Applicant';
    const initials = name.split(' ').length > 1
        ? name.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase()
        : name.substring(0, 2).toUpperCase();

    // Mock initial messages
    useEffect(() => {
        setMessages([
            {
                id: '1',
                text: `Hi ${name}, I saw your application for the ${chats?.job?.title || 'position'}.`,
                sender: 'me',
                time: '10:00 AM',
            },
            {
                id: '2',
                text: 'Hello! Thank you for reaching out. I am very interested in this role.',
                sender: 'them',
                time: '10:05 AM',
            }
        ]);
    }, []);

    const sendMessage = () => {
        if (message.trim().length === 0) return;

        const newMessage = {
            id: Date.now().toString(),
            text: message,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, newMessage]);
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
