import { StyleSheet } from 'react-native';
import Colors from '../../../comman/Colors';
import FontsSize from '../../../comman/Sizes/FontsSize';
import HWSize from '../../../comman/Sizes/HWSize';
import MarginHW from '../../../comman/Sizes/MarginHW';
import fonts from '../../../comman/fonts';

export const styles = StyleSheet.create({
  container: { backgroundColor: Colors.screenGray, flex: 1, paddingHorizontal: MarginHW.PaddingW16,  },
  headerRow: { alignItems: 'center', flexDirection: 'row', gap: MarginHW.MarginW14 },
  
  centerArea: { alignItems: 'center', flex: 1, marginTop: MarginHW.MarginH20 },
  iconWrap: { alignItems: 'center', backgroundColor: Colors.badgeBlueTint, borderRadius: 26, height: 92, justifyContent: 'center', width: 92 },
  iconText: { fontSize: FontsSize.size30 },
  title: { color: Colors.titleInk, fontFamily: fonts.LexendBold, fontSize: FontsSize.size24, marginTop: MarginHW.MarginH20, textAlign: 'center' },
  subtitle: { color: Colors.textCharcoal, fontFamily: fonts.Lexend_Regular, fontSize: FontsSize.size16, lineHeight: 30, marginTop: MarginHW.MarginH12, textAlign: 'center' },
  subtitleHighlight: { color: Colors.brandBlue, fontFamily: fonts.LexendBold },
  card: { backgroundColor: Colors.white, borderRadius: 16, marginTop: MarginHW.MarginH30, paddingHorizontal: MarginHW.PaddingW18, paddingVertical: MarginHW.PaddingH20, width: '100%' },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: MarginHW.MarginH10 },
  otpInput: { alignItems: 'center', backgroundColor: Colors.screenGray, borderRadius: 10, color: '#6C7482', fontFamily: fonts.LexendBold, fontSize: FontsSize.size20, height: HWSize.H_Height45, justifyContent: 'center', width: '14.8%' },
  verifyButton: { marginTop: MarginHW.MarginH20 },
  timerText: { color: '#767E8C', fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size14, marginTop: MarginHW.MarginH20, textAlign: 'center' },
  timerValue: { color: '#6C8FB7', fontFamily: fonts.LexendBold },
  changeText: { color: Colors.brandBlue, fontFamily: fonts.LexendBold, fontSize: FontsSize.size16, marginTop: MarginHW.MarginH10, textAlign: 'center' },
  footerText: { color: '#4E5868', fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size14, letterSpacing: 2, marginBottom: MarginHW.MarginH14, marginTop: MarginHW.MarginH30, textAlign: 'center' },
  errorText: { color: 'red', fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size12, marginTop: MarginHW.MarginH5 || 4, textAlign: 'center' },
});
