import { Dimensions, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../../comman/Colors';
import fonts from '../../../../comman/fonts';
import FontsSize from '../../../../comman/Sizes/FontsSize';
import MarginHW from '../../../../comman/Sizes/MarginHW';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: MarginHW.PaddingW16,
    },
    headerTitle: {
        fontSize: FontsSize.size20,
        fontFamily: fonts.LexendBold,
        color: Colors.primaryBlue,
        marginBottom: MarginHW.MarginH10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardGray,
        borderRadius: wp(3),
        paddingHorizontal: wp(3),
        height: hp(6),
        marginVertical: MarginHW.MarginH16,
    },
    searchIcon: {
        width: wp(5),
        height: wp(5),
        tintColor: Colors.bodyGray,
        marginRight: wp(2),
    },
    searchInput: {
        flex: 1,
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.titleInk,
    },
    chatListContent: {
        paddingBottom: MarginHW.MarginH20,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: Colors.cardGray,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: wp(3.5),
    },
    avatar: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(7),
        backgroundColor: Colors.iceBlue,
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: wp(3.5),
        height: wp(3.5),
        borderRadius: wp(1.75),
        backgroundColor: Colors.online,
        borderWidth: 2,
        borderColor: Colors.white,
    },
    chatInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(0.5),
    },
    userName: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.Lexend_SemiBold,
        color: Colors.titleInk,
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
    lastMessage: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
        flex: 1,
        marginRight: wp(2),
    },
    unreadBadge: {
        backgroundColor: Colors.primaryBlue,
        minWidth: wp(5),
        height: wp(5),
        borderRadius: wp(2.5),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(1),
    },
    unreadText: {
        fontSize: FontsSize.size10,
        fontFamily: fonts.LexendBold,
        color: Colors.white,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(20),
    },
    emptyText: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.bodyGray,
    },
});
