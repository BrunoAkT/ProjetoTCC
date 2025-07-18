
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
        fontSize: Fonts_Size.title,
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        marginBottom: 40,
    },
    subtitle: {
        color: Colors.gray,
        fontSize: Fonts_Size.subtitle,
        fontFamily: Fonts_Styles.PoppinsRegular,
    },
    container: {
        alignItems: 'center',
        margin: 40,
        justifyContent: 'space-between',
        height: 350,
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.lg,
        textAlign: 'center'
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
        marginTop: 40,
    },
    textreg: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
    },
    buttonregister: {
        backgroundColor: Colors.green,
        width: 210,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
    tabIcon: {
        position: 'absolute',
        right: 30,
        top: -10
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    modalContainer: {
        backgroundColor: Colors.gray,
        flex: 1,

    },
    popUp: {
        backgroundColor: Colors.gray,
        width: 200,
        height: 50,
        position: 'absolute',
        borderWidth:2,
        zIndex: 1,
        right: 60,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    modalContent:{
        flex: 1,
        padding: 20,
    },
    textInput:{
        backgroundColor: Colors.white,
        borderWidth: 1,
        fontFamily: Fonts_Styles.PoppinsRegular,
        fontSize: Fonts_Size.md,
        borderColor: Colors.green,
        padding: 15,
    },
    editContainer:{
        marginBottom:20,
    }
}