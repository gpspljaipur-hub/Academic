import { StyleSheet } from 'react-native';
import Colors from '../../comman/Colors';
import FontsSize from '../../comman/Sizes/FontsSize';
import MarginHW from '../../comman/Sizes/MarginHW';
import Fonts from '../../comman/fonts';


export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.splashBlue, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: MarginHW.MarginW1, paddingBottom: MarginHW.MarginH28 },
  topSpacer: {flex: 0.18,},
  contentWrapper: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', },
  iconCard: { width: 92, height: 92, borderRadius: 15, backgroundColor: Colors.white18, alignItems: 'center', justifyContent: 'center', marginBottom: MarginHW.MarginH24 },
  iconText: { fontSize: FontsSize.size20, color: Colors.white },
  appTitle: { fontSize: FontsSize.size24, fontFamily: Fonts.LexendBold, color: Colors.white, letterSpacing: 2, textAlign: 'center' },
  subtitle: { fontSize: FontsSize.size12, fontFamily: Fonts.Lexend_Medium, color: Colors.white85, textAlign: 'center', marginTop: MarginHW.MarginH14 },
  footer: { width: '92%',   marginBottom: MarginHW.MarginH10,justifyContent: 'center',  alignItems: 'center',},
  progressTrack: { width: '92%', height: 6, borderRadius: 999, backgroundColor: Colors.progressTrackBlue, overflow: 'hidden' },
  progressFill: { width: '36%', height: '100%', borderRadius: 999, backgroundColor: Colors.periwinkle },
  authPill: {
    marginTop: MarginHW.MarginH16,
    paddingHorizontal: MarginHW.MarginW14,
    paddingVertical: MarginHW.PaddingH5,
    borderRadius: 999,
    backgroundColor: Colors.white10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: MarginHW.MarginW8,
  },
  authDot: { width: MarginHW.MarginW8, height: MarginHW.MarginH8, borderRadius: 4, backgroundColor: Colors.periwinkle },
  authText: { color: Colors.iceBlue, fontSize: FontsSize.size10, fontFamily: Fonts.Lexend_Medium, letterSpacing: 1.4 },
  versionText: { marginTop: MarginHW.MarginH12, color: Colors.versionMutedBlue, fontSize: FontsSize.size12, fontFamily: Fonts.Lexend_Light, textAlign: 'center' },
});
