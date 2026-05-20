import { StyleSheet } from 'react-native';
import MarginHW from '../../../comman/Sizes/MarginHW';
import FontsSize from '../../../comman/Sizes/FontsSize';
import fonts from '../../../comman/fonts';
import Colors from '../../../comman/Colors';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F5F7', paddingHorizontal: MarginHW.PaddingW16 },
    listContent: { paddingBottom: MarginHW.MarginH10 },
    jobCard: { marginTop: MarginHW.MarginH12, backgroundColor: Colors.white, borderRadius: 18, padding: MarginHW.PaddingW14 },
    jobTopRow: { flexDirection: 'row', alignItems: 'flex-start' },
    logoWrap: { height: 44, width: 44, borderRadius: 10, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: MarginHW.MarginW10 },
    jobCompanyLogo: { backgroundColor: Colors.white, borderWidth: 1, borderColor: '#E4E7EB', borderRadius: 2, height: 50, width: 50 },
    avatarWrapper: { height: 44, width: 44, borderRadius: 10, backgroundColor: '#E1EBFF', justifyContent: 'center', alignItems: 'center', marginRight: MarginHW.MarginW10 },
    avatarText: { color: '#154A9D', fontFamily: fonts.LexendBold, fontSize: FontsSize.size14 },
    jobTopCenter: { flex: 1 },
    matchBadge: { alignSelf: 'flex-start', backgroundColor: '#E1EBFF', borderRadius: 6, paddingHorizontal: MarginHW.PaddingW8, paddingVertical: MarginHW.PaddingH3, marginBottom: MarginHW.MarginH5 },
    matchText: { color: '#154A9D', fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size10 },
    jobTitle: { color: '#101828', fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size16 },
    companyName: { marginTop: MarginHW.MarginH2, color: '#4B5563', fontFamily: fonts.Lexend_Regular, fontSize: FontsSize.size12 },
    bookmarkIcon: { height: 16, width: 18, tintColor: '#111827', marginTop: MarginHW.MarginH4 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: MarginHW.MarginW10, marginTop: MarginHW.MarginH14 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: MarginHW.MarginW5 },
    metaIcon: { height: 14, width: 14, tintColor: '#374151' },
    metaText: { color: '#374151', fontFamily: fonts.Lexend_Regular, fontSize: FontsSize.size12 },
    applyButton: { marginTop: MarginHW.MarginH14, backgroundColor: '#0A56B2', borderRadius: 10, alignItems: 'center', paddingVertical: MarginHW.PaddingH8 },
    applyButtonText: { color: Colors.white, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size14 },
});
