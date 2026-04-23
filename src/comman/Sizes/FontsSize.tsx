import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {  Dimensions, PixelRatio, Platform } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const scale = SCREEN_WIDTH / 320

export function normalize(size: number) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

const FontsSize = {
    size10: 10,
    size12: 12,
    size14: 14,
    size16: 16,
    size18: 18,
    size20: 20,
    size22: 22,
    size24: 24,
    size26: 26,
    size28: hp(3.6),
    size30: hp(3.85),
    size34: hp(4.38),
    size42: hp(5.38),

    normalize12: normalize(11.5),
    normalize14: normalize(13),
    normalize16: normalize(14.5),
    normalize18: normalize(16.5),
    normalize20: normalize(17.5),
    normalize22: normalize(19.5),
    normalize24: normalize(21)
}


export default FontsSize
