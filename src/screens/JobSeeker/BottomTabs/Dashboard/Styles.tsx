import { StyleSheet } from 'react-native';
import Colors from '../../../../comman/Colors';
import fonts from '../../../../comman/fonts';
import MarginHW from '../../../../comman/Sizes/MarginHW';
import HWSize from '../../../../comman/Sizes/HWSize';
import FontsSize from '../../../../comman/Sizes/FontsSize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.offWhite,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: MarginHW.PaddingW20,
        paddingTop: MarginHW.PaddingH12,
        paddingBottom: MarginHW.PaddingH8,
        backgroundColor: Colors.white,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userAvatar: {
        width: HWSize.W_Width32,
        height: HWSize.W_Width32,
        borderRadius: HWSize.W_Width32 / 2,
    },
    appName: {
        fontSize: FontsSize.normalize16,
        fontFamily: fonts.LexendBold,
        color: Colors.brandBlue,
        marginLeft: MarginHW.MarginW10,
    },
    notificationIcon: {
        width: HWSize.W_Width24,
        height: HWSize.H_Height24,
        resizeMode: 'contain',
        tintColor: Colors.heroNavy,
    },
    contentContainer: {
        paddingHorizontal: MarginHW.PaddingW20,
        paddingBottom: MarginHW.PaddingH50,
    },
    welcomeSection: {
        marginTop: MarginHW.MarginH12,
    },
    recruiterTitle: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.LexendBold,
        color: Colors.bodyGray,
        letterSpacing: 1,
    },
    welcomeText: {
        fontSize: FontsSize.size26,
        fontFamily: fonts.LexendBold,
        color: Colors.inkDark,
        marginTop: MarginHW.MarginH5,
    },
    actionButtonsRow: {
        flexDirection: 'row',
        marginTop: MarginHW.MarginH8,
    },
    secondaryButton: {
        flex: 1,
        marginRight: MarginHW.MarginW10,
        backgroundColor: Colors.softBlue,
        borderRadius: 12,
        paddingVertical: MarginHW.PaddingH14,
        paddingHorizontal: MarginHW.PaddingW8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    primaryButton: {
        flex: 1,
        backgroundColor: Colors.primaryBlue,
        borderRadius: 12,
        paddingVertical: MarginHW.PaddingH14,
        paddingHorizontal: MarginHW.PaddingW8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonTextSecondary: {
        fontSize: FontsSize.normalize12,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.brandBlue,
        marginLeft: MarginHW.MarginW8,
        textAlign: 'center',
    },
    buttonTextPrimary: {
        fontSize: FontsSize.normalize12,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.white,
        marginLeft: MarginHW.MarginW8,
        textAlign: 'center',
    },
    statsCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        paddingVertical: MarginHW.PaddingH12,
        paddingHorizontal: MarginHW.PaddingW20,
        marginTop: MarginHW.MarginH14,
        elevation: 2,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statsIcon: {
        width: 24,
        height: 24,
        marginBottom: MarginHW.MarginH5,
    },
    statsLabel: {
        fontSize: FontsSize.normalize14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },
    statsValue: {
        fontSize: FontsSize.size26,
        fontFamily: fonts.LexendBold,
        color: Colors.black,
        marginTop: MarginHW.MarginH2,
    },
    statsTrend: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Medium,
        color: '#10B981',
        marginTop: MarginHW.MarginH2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: MarginHW.MarginH10,
        marginBottom: MarginHW.MarginH16,
    },
    sectionHeader1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: MarginHW.MarginH16,
    },
    sectionTitle: {
        fontSize: FontsSize.normalize18,
        fontFamily: fonts.LexendBold,
        color: Colors.inkDark,
    },
    sectionTitle1: {
        fontSize: FontsSize.normalize18,
        fontFamily: fonts.LexendBold,
        color: Colors.inkDark,
    },
    seeAllText: {
        fontSize: FontsSize.normalize14,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.brandBlue,
    },
    jobCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: MarginHW.PaddingW16,
        marginBottom: MarginHW.MarginH12,
    },
    jobIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: Colors.softBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    jobIconText: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.brandBlue,
    },
    jobDetails: {
        flex: 1,
        marginLeft: MarginHW.MarginW12,
    },
    jobTitle: {
        fontSize: FontsSize.normalize16,
        fontFamily: fonts.LexendBold,
        color: Colors.black,
    },
    jobStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: MarginHW.MarginH4,
    },
    activeBadge: {
        backgroundColor: '#D1FAE5',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    activeText: {
        fontSize: 10,
        fontFamily: fonts.LexendBold,
        color: '#059669',
    },
    jobTime: {
        fontSize: 12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
        marginLeft: 8,
    },
    chartCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: MarginHW.PaddingW20,
        elevation: 2,
    },
    barChartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 150,
        marginTop: 20,
    },
    barWrapper: {
        alignItems: 'center',
        width: '12%',
    },
    bar: {
        width: '100%',
        borderRadius: 4,
    },
    dayText: {
        fontSize: 10,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.bodyGray,
        marginTop: 8,
    },
    legendContainer: {
        marginTop: 20,
    },
    legendItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    legendLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    legendLabel: {
        fontSize: 12,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.bodyGray,
    },
    legendValue: {
        fontSize: 14,
        fontFamily: fonts.LexendBold,
        color: Colors.black,
    },
    reportButton: {
        backgroundColor: Colors.offWhite,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    reportButtonText: {
        fontSize: FontsSize.normalize14,
        fontFamily: fonts.LexendBold,
        color: Colors.brandBlue,
    },
    promoBanner: {
        backgroundColor: Colors.brandBlue,
        borderRadius: 16,
        padding: 24,
        marginTop: 30,
        marginBottom: MarginHW.MarginH40,
        overflow: 'hidden',
    },
    promoTitle: {
        fontSize: 20,
        fontFamily: fonts.LexendBold,
        color: Colors.white,
    },
    promoDesc: {
        fontSize: 14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.white85,
        marginTop: 8,
        lineHeight: 20,
    },
    promoAction: {
        marginTop: 16,
    },
    promoActionText: {
        fontSize: 14,
        fontFamily: fonts.LexendBold,
        color: Colors.white,
        textDecorationLine: 'underline',
    },
});

export default styles;
