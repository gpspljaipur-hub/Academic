import { StyleSheet } from "react-native";
import Colors from "../../../../comman/Colors";
import HWSize from "../../../../comman/Sizes/HWSize";
import FontsSize from "../../../../comman/Sizes/FontsSize";
import fonts from "../../../../comman/fonts";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MarginHW from "../../../../comman/Sizes/MarginHW";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal:MarginHW.PaddingW16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: hp(1),
        paddingHorizontal: wp(5),
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderGray,
    },
    headerTitle: {
        fontSize: FontsSize.size18,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
        marginLeft: wp(4),
    },
    scrollContent: {
        paddingBottom: hp(5),
    },
    titleSection: {
        paddingHorizontal: wp(5),
        paddingBottom: hp(3),
        paddingTop: hp(1),
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: FontsSize.size22,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: FontsSize.size10,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.mutedSlate,
        textAlign: 'center',
        marginTop: 2,
        lineHeight: hp(1.8),
    },
    card: {
        backgroundColor: Colors.white,
        marginHorizontal: 1,
        marginBottom: hp(2.5),
        borderRadius: wp(4),
        padding: wp(5),
        elevation: 2,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2.5),
    },
    cardIcon: {
        width:20,
        height: 20,
        marginRight: wp(3),
    },
    cardTitle: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
    },
    inputGroup: {
        marginBottom: hp(2),
    },
    label: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_SemiBold,
        color: Colors.titleInk,
        marginBottom: hp(1),
    },
    inputContainer: {
        backgroundColor: Colors.cardGray,
        borderRadius: 10,
        paddingHorizontal: wp(4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputText: {
        height:45,
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.mutedSlate,
        flex: 1,
    },
    textAreaContainer: {
        backgroundColor: Colors.cardGray,
        borderRadius: wp(3),
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        minHeight: hp(15),
    },
    textArea: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.mutedSlate,
        textAlignVertical: 'top',
    },
    hint: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.mutedSlate,
        marginTop: hp(0.8),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
    },
    infoBox: {
        backgroundColor: Colors.aliceBlue,
        borderRadius: wp(3),
        padding: wp(4),
        flexDirection: 'row',
        marginTop: hp(1),
    },
    infoText: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.mutedSlate,
        marginLeft: wp(2),
        flex: 1,
        lineHeight: hp(1.8),
    },
    footerNotice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(3),
    },
    noticeText: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.mutedSlate,
        marginLeft: wp(2),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        marginBottom: hp(7),
    },
    draftButton: {
        width: '45%',
        backgroundColor: Colors.primaryBlue,
        borderRadius: wp(3),
        paddingVertical: hp(1.8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    draftText: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.white,
    },
    postButton: {
        width: '50%',
        backgroundColor: Colors.primaryBlue,
        borderRadius: wp(3),
        paddingVertical: hp(1.8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    postText: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.white,
    },
    dropdownIcon: {
        width: wp(4),
        height: wp(4),
        tintColor: Colors.mutedSlate,
    }
});

export default styles;
