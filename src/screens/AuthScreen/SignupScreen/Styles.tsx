import { StyleSheet } from 'react-native';
import Colors from '../../../comman/Colors';
import FontsSize from '../../../comman/Sizes/FontsSize';
import HWSize from '../../../comman/Sizes/HWSize';
import MarginHW from '../../../comman/Sizes/MarginHW';
import fonts from '../../../comman/fonts';

export const styles = StyleSheet.create({
  container: { backgroundColor: Colors.screenGray, flex: 1, justifyContent: 'center', paddingHorizontal: MarginHW.PaddingW24 },
  card: { backgroundColor: Colors.white, borderRadius: 28, paddingHorizontal: MarginHW.PaddingW18, paddingVertical: MarginHW.PaddingH20 },
  title: { color: Colors.titleInk, fontFamily: fonts.LexendBold, fontSize: FontsSize.size22 },
  subtitle: { color: Colors.textCharcoal, fontFamily: fonts.Lexend_Regular, fontSize: FontsSize.size16, lineHeight: 32, marginTop: MarginHW.MarginH12 },
  label: { color: Colors.textCharcoal, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size16, marginTop: MarginHW.MarginH8 },
  inputWrap: { alignItems: 'center', backgroundColor: Colors.screenGray, borderRadius: 14, flexDirection: 'row', height: HWSize.H_Height45, justifyContent: 'space-between', marginTop: MarginHW.MarginH8, paddingHorizontal: MarginHW.PaddingW18 },
  inputText: { color: '#1B1F2A', flex: 1, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size14 },
  iconText: { color: '#7B8390', fontSize: FontsSize.size20 },
  joinButton: { marginTop: MarginHW.MarginH24 },
  joinButtonText: { fontFamily: fonts.LexendBold, fontSize: FontsSize.size16, letterSpacing: 1.2 },
  orText: { color: '#707784', fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size16, marginTop: MarginHW.MarginH24, textAlign: 'center' },
  googleButton: { alignItems: 'center', backgroundColor: Colors.screenGray, borderRadius: 12, flexDirection: 'row', gap: MarginHW.MarginW12, height: HWSize.H_Height40, justifyContent: 'center', marginTop: MarginHW.MarginH20 },
  googleIcon: { fontSize: FontsSize.size20 },
  googleText: { color: Colors.titleInk, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size20 },
  footerText: { color: Colors.textCharcoal, fontFamily: fonts.Lexend_Regular, fontSize: FontsSize.size16, textAlign: 'center' },
  footerHighlight: { color: Colors.brandBlue, fontFamily: fonts.LexendBold },
  footerHighlightContainer: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: MarginHW.MarginH24 },
  errorText: { color: 'red', fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size14, marginTop: MarginHW.MarginH5 || 4, marginLeft: MarginHW.MarginW10 || 4 },
});
