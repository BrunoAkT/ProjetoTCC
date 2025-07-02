import { Colors, Fonts_Size, Fonts_Styles } from '../../constants/theme';

export const styles = {
    maincontainer: {
        width: '100%',
        height: 600,
        alignItems: 'center',
        marginTop: 150,
    },
    footer:{
        marginTop: 80,
    },
    input: {
        width: 300,
        height: 40,
        borderRadius: 30,
        paddingLeft: 30,
        paddingBottom: 0,
        paddingTop: 0,
        marginTop: 20,
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
        borderWidth: 2,
    },
    button: {
        backgroundColor: Colors.green,
        width: 300,
        height: 40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
    },
    containerfooter: {
        marginTop: 15,
        flexDirection: 'row',
        gap: 5,
        width: 300,
        justifyContent: 'center',
    },
    containerfootertext: {
        fontSize: Fonts_Size.md,
        fontFamily: Fonts_Styles.PoppinsSemiBold,

    },
    link: {
        color: Colors.green,
        fontSize: Fonts_Size.md,
        fontFamily: Fonts_Styles.PoppinsSemiBold,
    },
    iconbutton: {
        position: 'absolute',
        zIndex: 1,
        top: -50,
        left: -10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        borderWidth: 0,
        width: 130,
        height: 130,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        backgroundColor: Colors.gray,
    },
    avatarinput: {
        marginLeft: 20,
    },
    iconedit:{
        position: 'absolute', 
        right:-5,
        top:-5,
    },
    inputsm: {
        width: 180,
        height: 40,
        borderRadius: 30,
        paddingLeft: 20,
        paddingBottom: 0,
        paddingTop: 0,
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
        borderWidth: 2,
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
        marginTop: 10,
        marginLeft: 20,
    },
    register:{
        margin:20,
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
    },
}