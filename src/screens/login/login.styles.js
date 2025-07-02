import { Colors, Fonts_Size, Fonts_Styles } from '../../constants/theme';

export const styles = {
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.dark_gray,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        paddingTop: 80,
    },
    title: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.title,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 300,
        height: 40,
        borderRadius: 30,
        backgroundColor: Colors.gray,
        paddingLeft: 30,
        paddingBottom: 0,
        paddingTop: 0,
        marginTop: 20,
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md
    },
    button: {
        backgroundColor: Colors.green,
        width: 300,
        height: 40,
        borderRadius: 30,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
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
        color: Colors.gray,
        fontSize: Fonts_Size.md,
        fontFamily: Fonts_Styles.PoppinsSemiBold,

    },
    link: {
        color: Colors.green,
        fontSize: Fonts_Size.md,
        fontFamily: Fonts_Styles.PoppinsSemiBold,
    },
    footer: {
        backgroundColor: Colors.gray,
        height: 100,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    animatedContainer: {
        width: '100%',
        height: 600,
        position: 'absolute',
        backgroundColor: Colors.gray,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
}