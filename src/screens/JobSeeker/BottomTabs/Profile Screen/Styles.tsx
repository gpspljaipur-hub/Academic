import { StyleSheet } from 'react-native';
import Colors from '../../../../comman/Colors';
import FontsSize from '../../../../comman/Sizes/FontsSize';
import MarginHW from '../../../../comman/Sizes/MarginHW';
import fonts from '../../../../comman/fonts';
import HWSize from '../../../../comman/Sizes/HWSize';
import ImageSize from '../../../../comman/Sizes/ImageSize';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    headerProfileImage: {
        width: ImageSize.ImageW30,
        height: ImageSize.ImageW30,
        borderRadius: ImageSize.ImageW30 / 2,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: MarginHW.MarginH20,
    },
    container: {
        paddingHorizontal: MarginHW.MarginW20,
        paddingTop: MarginHW.MarginH30,
    },
    title: {
        fontSize: FontsSize.size28,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
        marginBottom: MarginHW.MarginH8,
    },
    subtitle: {
        fontSize: FontsSize.size16,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.mutedSlate,
        lineHeight: FontsSize.size22,
        marginBottom: MarginHW.MarginH40,
    },
    section: {
        marginBottom: MarginHW.MarginH28,
    },
    label: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.LexendBold,
        color: Colors.mutedSlate,
        marginBottom: MarginHW.MarginH10,
        letterSpacing: 0.5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardGray,
        borderRadius: 12,
        paddingHorizontal: MarginHW.MarginW16,
        height: HWSize.H_Height55,
    },
    input: {
        flex: 1,
        fontSize: FontsSize.size16,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.titleInk,
        paddingVertical: 0,
    },
    inputIcon: {
        width: ImageSize.ImageW20,
        height: ImageSize.ImageW20,
        tintColor: Colors.mutedSlate,
        resizeMode: 'contain',
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: Colors.cardGray,
        borderRadius: 12,
        padding: 4,
        height: HWSize.H_Height55,
    },
    segment: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    activeSegment: {
        backgroundColor: Colors.white,
        elevation: 2,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    segmentText: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.mutedSlate,
    },
    activeSegmentText: {
        color: Colors.brandBlue,
        fontFamily: fonts.LexendBold,
    },
    hintContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: MarginHW.MarginH10,
    },
    infoIcon: {
        fontSize: FontsSize.size14,
        color: Colors.mutedSlate,
        marginRight: 6,
    },
    hintText: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.mutedSlate,
    },
    insightsCard: {
        flexDirection: 'row',
        backgroundColor: Colors.aliceBlue,
        borderRadius: 16,
        padding: MarginHW.MarginW20,
        marginTop: MarginHW.MarginH10,
        alignItems: 'center',
    },
    insightsTextContainer: {
        flex: 1,
    },
    insightsTitle: {
        fontSize: FontsSize.size18,
        fontFamily: fonts.LexendBold,
        color: Colors.brandBlue,
        marginBottom: MarginHW.MarginH4,
    },
    insightsDesc: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.mutedSlate,
        lineHeight: FontsSize.size20,
    },
    chartIconContainer: {
        width: HWSize.W_Width50,
        height: HWSize.W_Width50,
        backgroundColor: 'rgba(11, 86, 176, 0.1)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: MarginHW.MarginW10,
    },
    chartIcon: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '50%',
        height: '40%',
    },
    bar: {
        width: '25%',
        backgroundColor: 'rgba(11, 86, 176, 0.3)',
        borderRadius: 1,
    },
    footer: {
        paddingHorizontal: MarginHW.MarginW20,
        paddingBottom: MarginHW.MarginH24,
    },
    continueButton: {
        height: HWSize.H_Height60,
        borderRadius: 12,
        marginTop: 0,
    },
});

export default styles;