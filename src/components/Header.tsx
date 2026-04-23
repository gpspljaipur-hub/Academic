import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import MarginHW from '../comman/Sizes/MarginHW';
import ImageSize from '../comman/Sizes/ImageSize';
import Colors from '../comman/Colors';
import fonts from '../comman/fonts';
import FontsSize from '../comman/Sizes/FontsSize';
import Images from '../comman/Images';


type HeaderProps = {
  title: string;
  onBackPress?: () => void;
 
};

const Header = ({ title, onBackPress,  }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onBackPress}>
        <Image source={Images.backArrow} style={styles.backArrow} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: MarginHW.MarginW10,
  },
  backArrow: { width: ImageSize.ImageW20, height: ImageSize.ImageH20 ,tintColor: Colors.brandBlue},
  backText: { color: Colors.brandBlue, fontFamily: fonts.Lexend_Medium, fontSize: FontsSize.size22 },
  headerTitle: { color: Colors.brandBlue, fontFamily: fonts.LexendBold, fontSize: FontsSize.size20 },
});