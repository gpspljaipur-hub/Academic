import { Dimensions, Platform, StyleSheet } from 'react-native';
import Colors from '../../../comman/Colors';
import FontsSize from '../../../comman/Sizes/FontsSize';
import fonts from '../../../comman/fonts';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  screen: { backgroundColor: Colors.cardGray, flex: 1 },
  tabBarStyle: {
    width: '100%',
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 1,
    position: 'absolute',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  iconWrap: {top: 10,  width: width / 4, maxWidth: width / 4 , alignItems: 'center', justifyContent: 'center' },
  tabIconImage: { width: 18, height:18, resizeMode: 'contain' },
  tabIcon: { fontSize: FontsSize.size14,fontFamily: fonts.Lexend_Medium, color: Colors.bodyGray, textAlign: 'center'},
});
