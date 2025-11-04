import { useEffect } from "react";
import { Colors, Fonts_Size, Fonts_Styles } from "../../constants/theme"

export const styles = {
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.gray,
        padding: 40,
        paddingVertical: 100,
    },
    Container: {
        flex: 1,
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
        color: Colors.dark_gray,
        marginVertical: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerFinish: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    headerBar: {
        flex: 1,
    },
    progressBar: {
        width: '100%',
        height: 12,
        borderWidth: 0,
        borderRadius: 10,
    },
    progressColor: Colors.green,
    progressbackgroundColor: Colors.dark_gray,
    textheader: {
        textAlign: 'right',
        marginVertical: 0,
    },
    question: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.xl,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 10,
    },
    optionsContainer: {
        marginTop: 50,
    },
    optionButton: {
        borderWidth: 2,
        borderRadius: 30,
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    optionText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,

    },
    resultContainer: {
        marginTop: 20,
        padding: 5,
        borderRadius: 10,
        backgroundColor: Colors.green,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.xl,
        color: Colors.dark_gray,
        marginVertical: 10,
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    footerText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.lg,
        color: Colors.dark_gray,
        textAlign: 'center',
    },
    footerContainer: {
        flex: 1,
        backgroundColor: Colors.gray,
        padding: 20,
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 25,
        width: '90%',
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: {
        fontFamily: Fonts_Styles.PoppinsBold,
        fontSize: Fonts_Size.lg,
        color: Colors.black,
        marginBottom: 15,
    },
    modalText: {
        fontFamily: Fonts_Styles.PoppinsRegular,
        fontSize: Fonts_Size.md,
        color: Colors.text,
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22,
    },
    modalButton: {
        backgroundColor: Colors.green,
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    modalButtonText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
        color: Colors.dark_gray,
    },
};

