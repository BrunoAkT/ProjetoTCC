
import { Line } from "react-native-svg"
import { Colors, Fonts_Size, Fonts_Styles } from "../../constants/theme"
export const styles = {
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.gray
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        color: Colors.gray,
        fontSize: Fonts_Size.lg,
        fontFamily: Fonts_Styles.PoppinsSemiBold
    },
    subtitle: {
        color: Colors.gray,
        fontSize: Fonts_Size.subtitle,
        fontFamily: Fonts_Styles.PoppinsRegular,
    },
    emojis: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 150,
        backgroundColor: Colors.gray,
        borderRadius: 20,
        padding: 10,
        marginTop: 10,
    },
    emojitouched: {
        backgroundColor: Colors.green,
        borderRadius: 20,
        elevation: 10,
    },
    frase: {
        fontFamily: Fonts_Styles.PoppinsItalic,
        color: Colors.gray,
        fontSize: Fonts_Size.xl,
        marginTop: 20,
        borderColor: Colors.dark_gray,
        textShadowColor: Colors.dark_gray,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    container: {
        alignItems: 'center',
        height: '74%',
    },
    flatListContainer: {
        width: '100%',
        padding: 40,
    },
    BAIcontainer: {
        backgroundColor: Colors.green,
        width: 350,
        height: 300,
        borderRadius: 20,
        elevation: 10,
    },
    exercises: {
        backgroundColor: Colors.green,
        height: 100,
        width: 350,
        marginTop: 50,
        elevation: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.lg
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 10,
        gap: 1,
        justifyContent: 'center',

    },
    inputText: {
        fontFamily: Fonts_Styles.PoppinsRegular,
        color: Colors.gray,
        fontSize: Fonts_Size.sm,
        alignSelf: 'center',
        marginLeft: 5,
        lineHeight: Fonts_Size.sm
    },
    inputsm: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        height: 40,
    },
    buttonFilter: {
        backgroundColor: Colors.green,
        borderRadius: 10,
        padding: 5,
    },
    buttonClear: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

}