import { StyleSheet } from 'react-native';
import Colors from '../../../comman/Colors';
import FontsSize from '../../../comman/Sizes/FontsSize';
import fonts from '../../../comman/fonts';
import MarginHW from '../../../comman/Sizes/MarginHW';
import HWSize from '../../../comman/Sizes/HWSize';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.screenGray,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: MarginHW.MarginH12,
        backgroundColor: Colors.screenGray,
        justifyContent: 'space-between',
    },
    back: {
        fontSize: FontsSize.size24,
        color: Colors.titleInk,
        marginLeft: MarginHW.MarginW12,
    },
    title: {
        fontSize: FontsSize.size18,
        color: Colors.titleInk,
        fontWeight: 'bold',
        marginLeft: MarginHW.MarginW12,
    },
    content: {
        paddingHorizontal: MarginHW.PaddingW16,
        paddingTop: MarginHW.MarginH20,
        paddingBottom: MarginHW.MarginH60,
    },
    inputContainer: {
        marginBottom: MarginHW.MarginH16,
    },
    label: {
        color: Colors.titleInk,
        fontFamily: fonts.Lexend_Medium,
        fontSize: FontsSize.size14,
        marginBottom: MarginHW.MarginH8,
    },
    input: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingHorizontal: MarginHW.PaddingW12,
        height: HWSize.H_Height50,
        color: Colors.titleInk,
        fontFamily: fonts.Lexend_Regular,
        fontSize: FontsSize.size14,
        borderWidth: 1,
        borderColor: Colors.borderGray,
    },
    textArea: {
        height: HWSize.H_Height120,
        textAlignVertical: 'top',
        paddingTop: MarginHW.PaddingH12,
    },
    uploadButton: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        height: HWSize.H_Height50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: MarginHW.PaddingW12,
        borderWidth: 1,
        borderColor: Colors.borderGray,
        borderStyle: 'dashed',
    },
    uploadText: {
        color: Colors.mutedSlate,
        fontFamily: fonts.Lexend_Medium,
        fontSize: FontsSize.size24,
    },
    fileName: {
        color: Colors.brandBlue,
        fontFamily: fonts.Lexend_Medium,
        fontSize: FontsSize.size14,
    },
    submitButton: {
        marginTop: MarginHW.MarginH30,
    },
});