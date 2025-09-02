
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
    confirmButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    modalContainer: {
        backgroundColor: Colors.gray,
        flex: 1
    },
    popUp: {
        backgroundColor: Colors.gray,
        width: 200,
        height: 50,
        position: 'absolute',
        borderWidth: 2,
        zIndex: 1,
        right: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    textInput: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        fontFamily: Fonts_Styles.PoppinsRegular,
        fontSize: Fonts_Size.md,
        borderColor: Colors.green,
        padding: 15,
    },
    editContainer: {
        marginBottom: 20,
    },
    headerModal: {
        alignItems: 'center',
        marginBottom: 20,
    },
    iconedit: {
        position: 'absolute',
        right: -5,
        top: -5,
        zIndex: 1,
    },
    avatarplace: {
        width: 130,
        height: 130,
        borderRadius: 100,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 5,
    },
    checklabel: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
    },
    checkboxDescription: {
        height: 100,
        borderRadius: 15,
        borderWidth: 2,
        marginTop: 20,
    },
    checkInput: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: Colors.gray,
        padding: 20,
        borderRadius: 12,
        width: '90%',
        height: '90%',
    },
    close: {
        alignItems: 'flex-end',
    },
    editContainerCheckBox:{
        height:400
    }
}