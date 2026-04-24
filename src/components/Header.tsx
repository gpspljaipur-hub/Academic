import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View, type StyleProp, type TextStyle, type ViewStyle, type ImageStyle } from 'react-native';
import MarginHW from '../comman/Sizes/MarginHW';
import ImageSize from '../comman/Sizes/ImageSize';
import Colors from '../comman/Colors';
import fonts from '../comman/fonts';
import FontsSize from '../comman/Sizes/FontsSize';
import Images from '../comman/Images';


type HeaderProps = {
  title: string;
  onBackPress?: () => void;
  rightIcon?: any;
  onRightPress?: () => void;
  rightIconStyle?: StyleProp<ImageStyle>;
};

const Header = ({ title, onBackPress, rightIcon, onRightPress, rightIconStyle }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={onBackPress} style={styles.iconButton}>
          <Image source={Images.backArrow} style={styles.backArrow} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.centerContainer}>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
      </View>

      <View style={styles.rightContainer}>
        {rightIcon ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onRightPress} style={styles.iconButton}>
            <Image source={rightIcon} style={[styles.rightIcon, rightIconStyle]} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: MarginHW.MarginH60,
    backgroundColor: Colors.white,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 4,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconButton: {
    width: MarginHW.MarginW40,
    height: MarginHW.MarginW40,
    justifyContent: 'center',
  },
  backArrow: { 
    width: MarginHW.MarginW22, 
    height: MarginHW.MarginW22, 
    tintColor: Colors.brandBlue,
    resizeMode: 'contain',
  },
  rightIcon: { 
    width: ImageSize.ImageW30, 
    height: ImageSize.ImageW30, 
    resizeMode: 'contain',
  },
  headerTitle: { 
    color: Colors.brandBlue, 
    fontFamily: fonts.LexendBold, 
    fontSize: FontsSize.size18,
    textAlign: 'center',
  },
});