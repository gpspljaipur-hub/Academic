import { Dimensions, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../comman/Colors';
import fonts from '../../../comman/fonts';
import FontsSize from '../../../comman/Sizes/FontsSize';
import MarginHW from '../../../comman/Sizes/MarginHW';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F7',
        paddingHorizontal: MarginHW.PaddingW16,
    },
    headerContainer: {
        backgroundColor: Colors.white,
        paddingHorizontal: MarginHW.PaddingW16,
        paddingBottom: MarginHW.PaddingH16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.cardGray,
        borderRadius: MarginHW.MarginH12,
    },
    jobInfoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: MarginHW.MarginH12,
        gap: MarginHW.MarginW12,
    },
    logoWrapper: {
        width: wp(14),
        height: wp(14),
        backgroundColor: Colors.cardGray,
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    companyLogo: {
        width: wp(10),
        height: wp(10),
    },
    companyLogoText: {
        fontSize: FontsSize.size18,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.titleInk,
    },
    jobTitle: {
        fontSize: FontsSize.size18,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
    },
    companyName: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },
    jobStatsRow: {
        flexDirection: 'row',
        marginTop: MarginHW.MarginH12,
        gap: MarginHW.MarginW16,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(1),
    },
    statLabel: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },
    statValue: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.titleInk,
    },
    applicantsTitleSection: {
        paddingHorizontal: MarginHW.PaddingW16,
        paddingVertical: MarginHW.PaddingH16,
    },
    applicantsTitle: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
    },
    listContent: {
        paddingHorizontal: MarginHW.PaddingW5,
        paddingBottom: MarginHW.PaddingH20,
    },
    applicantCard: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: MarginHW.MarginH10,
        marginBottom: MarginHW.MarginH12,
        borderWidth: 1,
        borderColor: Colors.cardGray,
    },
    applicantHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: MarginHW.MarginW12,
    },
    avatarWrapper: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        backgroundColor: Colors.iceBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.primaryBlue,
    },
    applicantInfo: {
        flex: 1,
    },
    applicantName: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.titleInk,
    },
    applicantHeadline: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
        marginTop: 2,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: MarginHW.MarginH12,
        gap: wp(2),
    },
    skillBadge: {
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.5),
        borderRadius: 12,
        backgroundColor: Colors.cardGray,
    },
    skillText: {
        fontSize: 10,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },
    applicantFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: MarginHW.MarginH12,
        paddingTop: MarginHW.MarginH12,
        borderTopWidth: 1,
        borderTopColor: Colors.cardGray,
    },
    appliedDate: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },
    viewProfileButton: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(0.8),
        borderRadius: wp(2),
        backgroundColor: Colors.primaryBlue,
    },
    viewProfileText: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_SemiBold,
        color: Colors.white,
    },
    /* Modal Styles */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: Colors.white,
        width: wp(85),
        borderRadius: wp(4),
        padding: MarginHW.MarginH20,
    },
    modalHeader: {
        marginBottom: MarginHW.MarginH20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: FontsSize.size18,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
    },
    statusOption: {
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: Colors.cardGray,
        alignItems: 'center',
    },
    statusOptionText: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.titleInk,
    },
    closeButton: {
        marginTop: MarginHW.MarginH20,
        paddingVertical: hp(1.2),
        backgroundColor: Colors.cardGray,
        borderRadius: wp(2),
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_SemiBold,
        color: Colors.bodyGray,
    },
});
