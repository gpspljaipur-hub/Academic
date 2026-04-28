import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,

  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Images from '../comman/Images';
import MarginHW from '../comman/Sizes/MarginHW';
import FontsSize from '../comman/Sizes/FontsSize';
import Colors from '../comman/Colors';
import ImageSize from '../comman/Sizes/ImageSize';
import fonts from '../comman/fonts';
import HWSize from '../comman/Sizes/HWSize';

export type ButtonProps = {
  label: string;
  loading?: boolean;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  rightArrow?: boolean;
  disabled?: boolean;
};

const Button = ({ disabled = false, loading = false, label, onPress, containerStyle, labelStyle, rightArrow = false }: ButtonProps) => {
  return (
    <TouchableOpacity disabled={disabled || loading} activeOpacity={0.8} style={[styles.container, containerStyle, { backgroundColor: (disabled || loading) ? Colors.mutedSlate : Colors.ctaBlue, }]} onPress={(disabled || loading) ? () => { } : onPress}>
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {rightArrow && <Image source={Images.backArrow} style={styles.rightArrowIcon} />}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', gap: MarginHW.MarginW8, borderRadius: 10, height: HWSize.H_Height40, alignItems: 'center', marginTop: MarginHW.MarginH20, },
  label: { color: Colors.white, fontFamily: fonts.LexendBold, fontSize: FontsSize.size16, letterSpacing: 1.4, },
  rightArrowIcon: { width: ImageSize.ImageW16, height: ImageSize.ImageH16, left: MarginHW.MarginW8, tintColor: Colors.white, transform: [{ rotate: '180deg' }] },
});