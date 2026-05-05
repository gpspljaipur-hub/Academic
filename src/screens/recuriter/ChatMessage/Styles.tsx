import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../comman/Colors';
import fonts from '../../../comman/fonts';
import FontsSize from '../../../comman/Sizes/FontsSize';
import MarginHW from '../../../comman/Sizes/MarginHW';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: MarginHW.MarginW16,
    },
    messageList: {
        paddingHorizontal: MarginHW.MarginW16,
        paddingVertical: MarginHW.MarginH20,
        paddingBottom: MarginHW.MarginH20,
    },
    messageWrapper: {
        marginBottom: MarginHW.MarginH16,
        maxWidth: '80%',
    },
    myMessageWrapper: {
        alignSelf: 'flex-end',
    },
    theirMessageWrapper: {
        alignSelf: 'flex-start',
    },
    messageBubble: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    myMessageBubble: {
        backgroundColor: Colors.brandBlue,
        borderBottomRightRadius: 4,
    },
    theirMessageBubble: {
        backgroundColor: Colors.cardGray,
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Regular,
        lineHeight: 20,
    },
    myMessageText: {
        color: Colors.white,
    },
    theirMessageText: {
        color: Colors.titleInk,
    },
    messageTime: {
        fontSize: 10,
        fontFamily: fonts.Lexend_Regular,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    myMessageTime: {
        color: 'rgba(255,255,255,0.7)',
    },
    theirMessageTime: {
        color: Colors.bodyGray,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: MarginHW.MarginH12,
        borderTopWidth: 1,
        borderTopColor: Colors.borderGray,
        backgroundColor: Colors.white,
    },
    attachButton: {
        padding: 8,
    },
    attachIcon: {
        width: 20,
        height: 20,
        tintColor: Colors.bodyGray,
    },
    input: {
        flex: 1,
        height: 45,
        backgroundColor: Colors.cardGray,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 8,
        fontFamily: fonts.Lexend_Regular,
        fontSize: FontsSize.size14,
        color: Colors.titleInk,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: Colors.brandBlue,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIcon: {
        width: 20,
        height: 20,
        tintColor: Colors.white,
    },
});
