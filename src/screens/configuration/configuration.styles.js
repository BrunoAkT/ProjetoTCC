
import { Colors, Fonts_Size, Fonts_Styles } from "../../constants/theme"
export const styles = {
    mainContainer: {
        flex: 1,
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
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 40,
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.lg,
        color: Colors.gray
    },
    avatarcontainer: {
        borderWidth: 0,
        width: 130,
        height: 130,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        backgroundColor: Colors.gray,
        marginRight: 10
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: Colors.green,
        width: 250,
        height: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
    buttontext: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,

    },
    iconcase: {
        position: 'absolute',
        right: -15,
        backgroundColor: Colors.dark_gray,
        borderRadius: 30
    },
    icon: {
        transform: [{ scaleX: -1 }],
        width: 30,
        height: 30,
        tintColor: Colors.green
    }

}