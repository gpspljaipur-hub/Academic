import { StyleSheet } from 'react-native';
import Colors from '../../../../comman/Colors';
import FontsSize from '../../../../comman/Sizes/FontsSize';
import MarginHW from '../../../../comman/Sizes/MarginHW';
import fonts from '../../../../comman/fonts';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F5F7', paddingHorizontal: MarginHW.PaddingW16 },
  content: { paddingBottom: MarginHW.MarginH70 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: MarginHW.MarginW10 },
  searchBox: { flex: 1, backgroundColor: '#E5E7EB', borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: MarginHW.PaddingW12 },
  searchIconInInput: { tintColor: '#4B5563', height: 18, width: 18, marginRight: MarginHW.MarginW8 },
  searchInput: { flex: 1, height: 45, color: '#1F2937', fontSize: FontsSize.size16, fontFamily: fonts.Lexend_Regular },
  filterActionBox: { height: 45, width: 45, borderRadius: 10, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },
  filterActionIcon: { tintColor: '#1E3A8A', height: 20, width: 20 },
  filtersList: { marginTop: MarginHW.MarginH14, paddingRight: MarginHW.PaddingW8, gap: MarginHW.MarginW10 },
  filterChip: { backgroundColor: '#E5E7EB', borderRadius: 20, paddingHorizontal: MarginHW.PaddingW16, paddingVertical: MarginHW.PaddingH8 },
  filterChipActive: { backgroundColor: '#C7DAFF' },
  filterChipText: { color: '#374151', fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size14 },
  filterChipTextActive: { color: '#1E3A8A', fontFamily: fonts.Lexend_Medium },
  sectionTitle: { marginTop: MarginHW.MarginH16, color: '#111827', letterSpacing: 1.2, fontFamily: fonts.LexendBold, fontSize: FontsSize.size16 },
  jobCard: { marginTop: MarginHW.MarginH12, backgroundColor: Colors.white, borderRadius: 18, padding: MarginHW.PaddingW14 },
  jobTopRow: { flexDirection: 'row', alignItems: 'flex-start' },
  logoWrap: { height: 44, width: 44, borderRadius: 10, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: MarginHW.MarginW10 },
  logoImage: { height: 35, width: 35 },
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
