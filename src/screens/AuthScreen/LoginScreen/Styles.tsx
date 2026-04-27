import { StyleSheet } from 'react-native';
import Colors from '../../../comman/Colors';
import FontsSize from '../../../comman/Sizes/FontsSize';
import fonts from '../../../comman/fonts';
import MarginHW from '../../../comman/Sizes/MarginHW';
import HWSize from '../../../comman/Sizes/HWSize';

export const styles = StyleSheet.create({
  container: { backgroundColor: Colors.screenGray, flex: 1, paddingBottom: MarginHW.PaddingH20, paddingHorizontal: MarginHW.PaddingW24, paddingTop: MarginHW.MarginH12 },
  MainContainer: { justifyContent: 'center',marginTop: MarginHW.MarginH30},
  headerRow: { alignItems: 'center', flexDirection: 'row', gap: 14 },
  headerTitle: { color: Colors.brandBlue, fontFamily: fonts.LexendBold, fontSize: FontsSize.size20 },
  title: { color: Colors.brandBlue, fontFamily: fonts.LexendBold, fontSize: FontsSize.size24, marginTop: MarginHW.MarginH20, textAlign: 'center' },
  subtitle: { color: Colors.textCharcoal, fontFamily: fonts.Lexend_Regular, fontSize: FontsSize.size16, marginTop: MarginHW.MarginH10, paddingHorizontal: MarginHW.PaddingW8, textAlign: 'center', },
  card: { backgroundColor: Colors.white, borderRadius: 24, marginTop: MarginHW.MarginH24, paddingHorizontal: MarginHW.PaddingW18, paddingVertical: MarginHW.PaddingH20 },
  sectionLabel: { color: Colors.textCharcoal, fontFamily: fonts.Lexend_SemiBold, fontSize: FontsSize.size12, letterSpacing: 2 },
  mobileRow: { flexDirection: 'row', gap: 10, marginTop: MarginHW.MarginH12 },
  countryCodeBox: { alignItems: 'center', backgroundColor: Colors.screenGray, borderRadius: 14, height: HWSize.H_Height45, justifyContent: 'center', width: '32%' },
  countryCodeText: { color: Colors.titleInk, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size16 },
  mobileInputBox: { backgroundColor: Colors.screenGray, borderRadius: 14, flex: 1, height: HWSize.H_Height45, justifyContent: 'center', paddingHorizontal: MarginHW.PaddingW18 },
  mobileInputText: { color: Colors.black, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size16 },
  errorText: { color: 'red', fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size12, marginTop: MarginHW.MarginH5 || 4, marginLeft: MarginHW.MarginW10 || 4 },
  dividerRow: { alignItems: 'center', flexDirection: 'row', gap: 10, marginTop: MarginHW.MarginH20 },
  dividerLine: { backgroundColor: '#E0E3E8', flex: 1, height: 1 },
  dividerText: { color: '#707784', fontFamily: fonts.Lexend_Light, fontSize: FontsSize.size12, letterSpacing: 2 },
  socialButton: { alignItems: 'center', backgroundColor: Colors.screenGray, borderRadius: 10, flexDirection: 'row', gap: 10, height: HWSize.H_Height40, justifyContent: 'center', marginTop: MarginHW.MarginH20 },
  socialIcon: { fontSize: FontsSize.size16 },
  socialText: { color: Colors.brandBlue, fontFamily: fonts.LexendBold, fontSize: FontsSize.size16 },
  secureButton: { alignItems: 'center', backgroundColor: Colors.screenGray, borderRadius: 10, flexDirection: 'row', gap: 10, height: HWSize.H_Height40, justifyContent: 'center', marginTop: MarginHW.MarginH20 },
  secureText: { color: Colors.brandBlue, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size14, letterSpacing: 2 },
  footerHighlightContainer: {marginTop: MarginHW.MarginH24, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', },

  footerText: { color: Colors.textCharcoal, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size16, textAlign: 'center' },
  footerHighlight: { color: Colors.brandBlue, fontFamily: fonts.LexendBold, fontSize: FontsSize.size16 },
});
