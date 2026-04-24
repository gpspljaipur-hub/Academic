import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, type ImageSourcePropType } from 'react-native';
import fonts from '../comman/fonts';
import Colors from '../comman/Colors';
import FontsSize from '../comman/Sizes/FontsSize';
import Images from '../comman/Images';
import MarginHW from '../comman/Sizes/MarginHW';
import { useNavigation } from '@react-navigation/native';
type HomeHeaderProps = {
  title: string;
  IconImg?: ImageSourcePropType;
  bellIcon?: ImageSourcePropType;
  onNotificationPress?: () => void;
};

const HomeHeader = ({ title, IconImg = Images.userImage,bellIcon, onNotificationPress }: HomeHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topBar}>
      <View style={styles.userImageWrap}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.getParent()?.navigate('ProfileSetup')} hitSlop={8}>
          <Image source={IconImg} resizeMode="contain" style={title == 'Exams' || title == 'Applications' ? styles.ManuIcon : styles.userImage} />
        </TouchableOpacity>

        <Text style={styles.brand}>{title}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.getParent()?.navigate('Premium')} hitSlop={8}>
        <Image source={bellIcon} resizeMode="contain" style={title == 'Exams' || title == 'Applications' ? styles.userImage : styles.bellImage} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
const styles = StyleSheet.create({
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: MarginHW.MarginH10 },
  userImageWrap: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: MarginHW.MarginW10 },
  brand: { top: -1, color: Colors.primaryBlue, fontFamily: fonts.LexendBold, fontSize: FontsSize.size16 },
  bellImage: { width: 16, height: 16, tintColor: Colors.bodyGray },
  userImage: { width: 30, height: 30, },
  ManuIcon: { width: 18, height: 18, }
});
