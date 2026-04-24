import { StyleSheet } from "react-native";
import Colors from "../../../comman/Colors";
import fonts from "../../../comman/fonts";
import HWSize from "../../../comman/Sizes/HWSize";
import MarginHW from "../../../comman/Sizes/MarginHW";
import FontsSize from "../../../comman/Sizes/FontsSize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.offWhite,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: MarginHW.PaddingW20,
        paddingVertical: MarginHW.PaddingH16,
        backgroundColor: Colors.offWhite,
    },
    headerTitle: {
        fontSize: FontsSize.size18,
        fontFamily: fonts.LexendBold,
        color: Colors.inkDark,
    },
    scrollContent: {
    },
    jobHeader: {
        alignItems: 'center',
        paddingVertical: MarginHW.PaddingH24,
    },
    companyLogo: {
        width: HWSize.W_Width60,
        height: HWSize.W_Width60,
        borderRadius: MarginHW.MarginW12,
        backgroundColor: Colors.heroNavy,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: MarginHW.MarginH16,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    jobTitle: {
        fontSize: FontsSize.size22,
        fontFamily: fonts.LexendBold,
        color: Colors.inkDark,
        textAlign: 'center',
        paddingHorizontal: MarginHW.PaddingW40,
    },
    companyInfo: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.mutedSlate,
        marginTop: MarginHW.MarginH8,
    },
    salaryBadge: {
        backgroundColor: Colors.badgeBlueTint,
        paddingHorizontal: MarginHW.PaddingW16,
        paddingVertical: MarginHW.PaddingH8,
        borderRadius: MarginHW.MarginW30,
        marginTop: MarginHW.MarginH8,
    },
    salaryText: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_SemiBold,
        color: Colors.brandBlue,
    },
    containercard: {
        marginHorizontal: MarginHW.MarginW20,
        paddingHorizontal: MarginHW.PaddingW10,
        paddingVertical: MarginHW.PaddingH14,
        borderRadius:15,
        backgroundColor: Colors.ctaBlue,
        shadowColor: Colors.ctaBlue,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },

    aiCard: {
        flexDirection: 'row',

    },
    aiHeader: {
        flex: 1,
      
    },
    aiTitleRow: {
        flexDirection: 'row',
    },
    aiTitle: {
        color: Colors.white,
        fontSize: FontsSize.size10,
        fontFamily: fonts.Lexend_ExtraBold,
        letterSpacing: 1,
        marginLeft: MarginHW.MarginW8,
    },
    skillsContainer: {
        flex: 0.5,
      
    },
    skillBadge: {
        backgroundColor: Colors.white18,
        paddingHorizontal: MarginHW.PaddingW10,
        paddingVertical: MarginHW.PaddingH5,
        borderRadius: MarginHW.MarginW16,
        marginLeft: MarginHW.MarginW8,
        marginBottom: MarginHW.MarginH8,
    },
    skillText: {
        color: Colors.white,
        fontSize: FontsSize.size10,
        fontFamily: fonts.LexendBold,
        textAlign: 'center',
    },
    matchPercentage: {
        color: Colors.white,
        fontSize: FontsSize.size28,
        fontFamily: fonts.Lexend_ExtraBold,
        marginTop: MarginHW.MarginH8,
    },
    matchDescription: {
        color: Colors.white85,
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Medium,
        lineHeight: FontsSize.size20,
        marginTop: MarginHW.MarginH8,
    },
    section: {
        paddingHorizontal: MarginHW.PaddingW20,
        marginTop: MarginHW.MarginH20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: MarginHW.MarginH10,
    },
    sectionIndicator: {
        width: HWSize.W_Width40 * 0.1, // Approximate indicator width
        height: HWSize.H_Height40 * 0.6,
        backgroundColor: Colors.ctaBlue,
        borderRadius: 2,
        marginRight: MarginHW.MarginW12,
    },
    sectionTitle: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: MarginHW.MarginH5,
        paddingLeft: MarginHW.PaddingW8,
    },
    bullet: {
        fontSize: FontsSize.size16,
        color: Colors.mutedSlate,
        marginRight: MarginHW.MarginW8,
    },
    bulletText: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
        lineHeight: FontsSize.size22,
        flex: 1,
    },
    similarRolesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: MarginHW.PaddingW20,
        marginTop: MarginHW.MarginH30,
        marginBottom: MarginHW.MarginH16,
    },
    similarRolesTitle: {
        fontSize: FontsSize.size18,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
    },
    viewAllText: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_SemiBold,
        color: Colors.ctaBlue,
    },
    roleCard: {
        backgroundColor: Colors.white,
        width: HWSize.W_Width220,
        padding: MarginHW.PaddingW16,
        borderRadius: 10,
        marginLeft: MarginHW.MarginW20,
        marginBottom: MarginHW.MarginH16,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    roleCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: MarginHW.MarginH12,
    },
    roleLogo: {
        width: HWSize.W_Width40,
        height: HWSize.W_Width40,
        borderRadius: MarginHW.MarginW8,
        backgroundColor: Colors.cardGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: MarginHW.MarginW12,
    },
    companyName: {
        fontSize: FontsSize.size10,
        fontFamily: fonts.Lexend_ExtraBold,
        color: Colors.mutedSlate,
        letterSpacing: 0.5,
    },
    roleTitle: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
    },
    roleInfo: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.mutedSlate,
        marginTop: MarginHW.MarginH4,
    },
    roleTags: {
        flexDirection: 'row',
        marginTop: MarginHW.MarginH12,
    },
    tag: {
        backgroundColor: Colors.cardGray,
        paddingHorizontal: MarginHW.PaddingW10,
        paddingVertical: MarginHW.PaddingH5,
        borderRadius: MarginHW.MarginW8,
        marginRight: MarginHW.MarginW8,
    },
    tagText: {
        fontSize: FontsSize.size10,
        fontFamily: fonts.Lexend_SemiBold,
        color: Colors.mutedSlate,
    },
    bottomBar: {
     marginBottom: MarginHW.MarginH20,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     paddingHorizontal: MarginHW.PaddingW16,
     
    },
    bookmarkButton: {
        width: HWSize.W_Width40,
        height: HWSize.W_Width40,
        borderRadius: MarginHW.MarginW12,
        backgroundColor: Colors.cardGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: MarginHW.MarginW16,
    },
    applyButton: {
        flex: 1,
        bottom: 12,
    },
    applyButtonText: {
        color: Colors.white,
        fontSize: FontsSize.size16,
        fontFamily: fonts.LexendBold,
    }
});

export default styles;