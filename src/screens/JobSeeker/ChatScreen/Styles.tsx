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
    // List View Styles
    listContainer: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardGray,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginVertical: 12,
        height: 48,
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: Colors.bodyGray,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontFamily: fonts.Lexend_Regular,
        fontSize: FontsSize.size14,
        color: Colors.titleInk,
        paddingVertical: 0,
    },
    chatListContent: {
        paddingBottom: 24,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderGray,
    },
    avatarContainer: {
        marginRight: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.cardGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.borderGray,
    },
    avatarText: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.primaryBlue,
    },
    chatInfo: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    companyName: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
        flex: 1,
        marginRight: 8,
    },
    timeText: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },
    lastMessageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    jobTitle: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.primaryBlue,
        flex: 1,
    },
    chatActionButton: {
        backgroundColor: Colors.brandBlue,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    chatActionText: {
        fontSize: 12,
        fontFamily: fonts.LexendBold,
        color: Colors.white,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyText: {
        fontSize: FontsSize.size16,
        color: Colors.bodyGray,
        fontFamily: fonts.Lexend_Medium,
        textAlign: 'center',
    },

    // Chat Room View Styles
    chatHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderGray,
        backgroundColor: Colors.white,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    backArrowIcon: {
        width: 24,
        height: 24,
        tintColor: Colors.titleInk,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.cardGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: Colors.borderGray,
    },
    headerAvatarText: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.LexendBold,
        color: Colors.primaryBlue,
    },
    headerTitleContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
    },
    headerSubtitle: {
        fontSize: 12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },
    messageList: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    messageWrapper: {
        marginBottom: 16,
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
        color: Colors.bodyGray,
        marginTop: 4,
    },
    myMessageTime: {
        alignSelf: 'flex-end',
        marginRight: 4,
    },
    theirMessageTime: {
        alignSelf: 'flex-start',
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,

        borderTopWidth: 1,
        borderTopColor: Colors.borderGray,
        backgroundColor: Colors.white,
    },
    input: {
        flex: 1,
        height: 45,
        backgroundColor: Colors.cardGray,
        borderRadius: 22,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 12,
        fontFamily: fonts.Lexend_Regular,
        fontSize: FontsSize.size14,
        color: Colors.titleInk,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: Colors.brandBlue,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIcon: {
        width: 20,
        height: 20,
        tintColor: Colors.white,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
