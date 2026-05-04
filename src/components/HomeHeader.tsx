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
  backArrow?: boolean;
};

const HomeHeader = ({ backArrow, title, IconImg = Images.userImage, bellIcon, onNotificationPress }: HomeHeaderProps) => {
  const navigation = useNavigation();

  const isLeftUserImage = IconImg === Images.userImage;
  const isRightUserImage = bellIcon === Images.userImage;

  return (
    <View style={styles.topBar}>
      <View style={styles.userImageWrap}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => { backArrow ? navigation.goBack() : navigation.navigate('ProfileSetup') }} hitSlop={8}>
          <Image source={IconImg} resizeMode="contain" style={backArrow ? styles.BackImage : styles.userImage} />
        </TouchableOpacity>

        <Text style={styles.brand}>{title}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onNotificationPress ? onNotificationPress : () => navigation.navigate(isRightUserImage ? 'ProfileSetup' : 'Notification')}
        hitSlop={8}
      >
        <Image source={bellIcon} resizeMode="contain" style={styles.bellImage} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
const styles = StyleSheet.create({
  topBar: { height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', },
  userImageWrap: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: MarginHW.MarginW10 },
  brand: { top: -1, color: Colors.primaryBlue, fontFamily: fonts.LexendBold, fontSize: FontsSize.size16 },
  bellImage: { width: 20, height: 20, tintColor: Colors.bodyGray },
  userImage: { width: 30, height: 30, },
  BackImage: { width: 25, height: 25, tintColor: Colors.primaryBlue, },
  ManuIcon: { width: 18, height: 18, }
});
