import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../comman/Colors';
import FontsSize from '../../comman/Sizes/FontsSize';
import fonts from '../../comman/fonts';
import MarginHW from '../../comman/Sizes/MarginHW';
import HWSize from '../../comman/Sizes/HWSize';

export const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white, flex: 1, justifyContent: 'space-between', paddingBottom: 24, paddingHorizontal: 22, paddingTop: 10 },
  content: { flex: 1 },
  stepSlider: { flex: 1, flexGrow: 1,},
  slide: {flex: 1, paddingBottom: 8,paddingRight: MarginHW.PaddingW10 },
  headerRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18, marginTop: 10 },
  brandText: { color: Colors.brandBlue, fontFamily: fonts.LexendBold, fontSize: FontsSize.size22, letterSpacing: 2 },
  skipText: { color: Colors.textCharcoal, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size12, letterSpacing: 1.4 },
  heroCard: { alignItems: 'center', backgroundColor: Colors.heroNavy, borderRadius: 28, justifyContent: 'space-between', minHeight: 200, paddingHorizontal: MarginHW.PaddingW20, paddingVertical: MarginHW.PaddingH24 },
  heroImage: { borderRadius: 10 },
  heroPill: {position: 'absolute', bottom: 10, backgroundColor: Colors.screenGray, borderRadius: 10, paddingHorizontal: MarginHW.PaddingW16, paddingVertical: 10, width: '100%' },
  heroLabel: { color: Colors.mutedSlate, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size12, letterSpacing: 1 },
  heroSubLabel: { color: Colors.inkDark, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size14, letterSpacing: 1.4, marginTop: MarginHW.MarginH4 },
  phaseBadge: { alignSelf: 'flex-start', backgroundColor: Colors.badgeBlueTint, borderRadius: 15, marginTop: MarginHW.MarginH20, paddingHorizontal: MarginHW.PaddingW14, paddingVertical: MarginHW.PaddingH8 },
  phaseText: { color: Colors.phaseBlue, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size12, letterSpacing: 1.4 },
  titleText: { color: Colors.titleInk, fontFamily: fonts.LexendBold, fontSize: FontsSize.size22, letterSpacing: 2, marginTop: MarginHW.MarginH18 },
  titleHighlight: { color: Colors.primaryBlue },
  descriptionText: {height: '12%', color: Colors.bodyGray, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size14, letterSpacing: 1.4, marginTop: MarginHW.MarginH14 },
  cardsRow: { flexDirection: 'row', gap: MarginHW.MarginW14, marginTop: MarginHW.MarginH18 },
  infoCard: {elevation: 0.5, shadowColor: Colors.black,shadowOffset: {width: 0, height: 2},shadowOpacity: 0.25,shadowRadius: 3.84, backgroundColor: Colors.cardGray, borderRadius: 10, flex: 1, paddingHorizontal: MarginHW.PaddingW14, paddingVertical: MarginHW.PaddingH14 },
  infoIcon: { color: Colors.primaryBlue, fontSize: FontsSize.size20, marginBottom: MarginHW.MarginH5 },
  infoTitle: { color: Colors.cardTitle, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size12, letterSpacing: 1 },
  
  indicatorRow: { alignItems: 'center', flexDirection: 'row', gap: 8,flex: 0.1 },
  indicatorDot: { backgroundColor: Colors.dotInactive, borderRadius: 5, height: 6, width: 10 },
  indicatorDotActive: { backgroundColor: Colors.primaryBlue, borderRadius: 999, width: 30, height: 6 },

modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
  width: '80%',
  alignItems: 'center',
},
modalTitle: {
  fontSize: FontsSize.size18,
  fontFamily: fonts.LexendBold,
  marginBottom: 20,
},
modalButton: {
  backgroundColor: Colors.primaryBlue,
  padding: 10,
  borderRadius: 5,
  marginVertical: 5,
  width: '100%',
  alignItems: 'center',
},
modalButtonText: {
  fontSize: FontsSize.size16,
  fontFamily: fonts.LexendBold,
  color: 'white',
},
modalCloseButton: {
  marginTop: MarginHW.MarginH10,
},
modalCloseText: {
  color: '#007AFF',
  fontSize: FontsSize.size16,
  fontFamily: fonts.Lexend_Medium,
},
});
