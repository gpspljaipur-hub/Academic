import { Dimensions, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../../comman/Colors';
import fonts from '../../../../comman/fonts';
import FontsSize from '../../../../comman/Sizes/FontsSize';
import MarginHW from '../../../../comman/Sizes/MarginHW';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F5F7', paddingHorizontal: MarginHW.PaddingW16 },

    scrollContent: {

        paddingBottom: MarginHW.MarginH30,
    },
    progressSection: {
    },
    progressLabel: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
        letterSpacing: 0.5,
    },
    applicationPipelineTitle: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,

    },

    /* Tab Filters */
    tabsContainer: {
        marginVertical: MarginHW.MarginH14,
    },
    tabsContent: {
        gap: wp(2),
    },
    tabButton: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: 20,
        backgroundColor: Colors.cardGray,
        marginRight: wp(2),
    },
    tabButtonActive: {
        backgroundColor: Colors.primaryBlue,
    },
    tabText: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },
    tabTextActive: {
        color: Colors.white,
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Medium,
    },

    /* Applications List */
    listContent: {
        paddingBottom: MarginHW.MarginH20,
    },

    /* Application Card */
    applicationCard: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.cardGray,
        borderRadius: wp(4),
        padding: MarginHW.MarginH16,
        marginBottom: MarginHW.MarginH16,
    },

    /* Card Header */
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: MarginHW.MarginH12,
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
    statusBadge: {
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.6),
        borderRadius: wp(3),
    },
    statusBadgeText: {
        fontSize: FontsSize.size10,
        fontFamily: fonts.Lexend_SemiBold,
        letterSpacing: 0.3,
    },

    /* Job Title and Company Info */
    jobTitle: {
        fontSize: FontsSize.size18,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.titleInk,
        marginBottom: MarginHW.MarginH4,
    },
    companyLocation: {
        fontSize: FontsSize.size10,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
        marginBottom: MarginHW.MarginH12,
    },

    /* Timeline */
    timelineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: MarginHW.MarginH8,
        height: hp(3),

    },
    timelineItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timelineDot: {
        width: wp(2.5),
        height: wp(2.5),
        borderRadius: wp(1.25),

        backgroundColor: Colors.dotInactive,
        zIndex: 2,
    },
    timelineDotCompleted: {
        backgroundColor: Colors.primaryBlue,
    },
    timelineDotIncomplete: {
        backgroundColor: Colors.dotInactive,
    },
    timelineLine: {
        flex: 1,
        height: 2,
        marginHorizontal: wp(1),
    },
    timelineLineCompleted: {
        backgroundColor: Colors.primaryBlue,
    },
    timelineLineIncomplete: {
        backgroundColor: Colors.dotInactive,
    },

    /* Stage Labels */
    stageLabelsContainer: {
        flexDirection: 'row',

        marginBottom: MarginHW.MarginH8,
    },
    stageLabel: {
        fontSize: FontsSize.size10,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },

    /* Applied Date */
    appliedDate: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
        marginBottom: MarginHW.MarginH12,
    },

    /* Interview Info Card */
    interviewInfoCard: {
        flexDirection: 'row',
        backgroundColor: Colors.badgeBlueTint,
        borderRadius: wp(3),
        padding: MarginHW.MarginH12,
        marginBottom: MarginHW.MarginH12,
        alignItems: 'center',
    },
    interviewInfoIcon: {
        fontSize: FontsSize.size20,
        marginRight: MarginHW.MarginW12,
    },
    interviewInfoContent: {
        flex: 1,
    },
    interviewInfoTitle: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_SemiBold,
        color: Colors.titleInk,
        marginBottom: MarginHW.MarginH2,
    },
    interviewInfoTime: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },

    /* Action Buttons */
    actionButtonsContainer: {
        flexDirection: 'row',
        gap: MarginHW.MarginW12,
        marginTop: MarginHW.MarginH12,
    },
    viewDetailsButton: {
        flex: 1,
        paddingVertical: hp(1.2),
        borderRadius: wp(2),
        backgroundColor: Colors.ctaBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewDetailsButtonText: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_SemiBold,
        color: Colors.white,
    },
    withdrawButton: {
        flex: 1,
        paddingVertical: hp(1.2),
        borderRadius: wp(2),
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.ctaBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    withdrawButtonText: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_SemiBold,
        color: Colors.ctaBlue,
    },
    archivedButton: {
        flex: 1,
        paddingVertical: hp(1.2),
        borderRadius: wp(2),
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.bodyGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    archivedButtonText: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_SemiBold,
        color: Colors.bodyGray,
    },
});
