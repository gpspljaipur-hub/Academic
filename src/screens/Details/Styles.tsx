import { StyleSheet, Dimensions, Platform } from 'react-native';
import Colors from '../../comman/Colors';
import FontsSize from '../../comman/Sizes/FontsSize';
import fonts from '../../comman/fonts';
import MarginHW from '../../comman/Sizes/MarginHW';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: MarginHW.MarginW16
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: Colors.white,
    },
    headerIcon: {
        width: 24,
        height: 24,
        tintColor: Colors.inkDark,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.inkDark,
    },
    scrollContent: {
        paddingBottom: 160,
    },
    heroSection: {
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: Colors.aliceBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors.softBlue,
    },
    logoText: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.brandBlue,
    },
    title: {
        fontSize: FontsSize.size18,
        fontFamily: fonts.LexendBold,
        color: Colors.titleInk,
        textAlign: 'center',
        lineHeight: 32,
    },
    department: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.mutedSlate,
        marginTop: 8,
        textTransform: 'uppercase',
    },
    highlightsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 24,
        gap: 12,
    },
    highlightPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.offWhite,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.borderGray,
    },
    highlightIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    highlightText: {
        fontSize: FontsSize.size12,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
    },
    section: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: FontsSize.size18,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.titleInk,

        marginBottom: 16,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: Colors.borderGray,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2,
    },
    descriptionText: {
        fontSize: FontsSize.size14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.bodyGray,
        lineHeight: 26,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.borderGray,
    },
    applyButton: {
        height: 60,
        backgroundColor: Colors.brandBlue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.brandBlue,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 8,
    },
    applyButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '800',
    },
    sourceText: {
        fontSize: 14,
        color: Colors.mutedSlate,
        textAlign: 'center',
        marginTop: 12,
        fontWeight: '500',
    },
});
