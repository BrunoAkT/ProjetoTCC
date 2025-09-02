import { Colors, Fonts_Size, Fonts_Styles } from "../../constants/theme"

export const styles = {
    mainContainer: {
        flex: 1,
        padding: 20,
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
        color: Colors.dark_gray,
    },
    textResult: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
        color: Colors.dark_gray,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerBar: {
        flex: 1,
        top: -10,
    },
    iconbutton:{
        width:40,
        height:40
    },
    progressBar: {
        width: '100%',
        height: 3,
        borderWidth: 0,
        borderRadius: 10,
    },
    progressColor: Colors.green,
    progressbackgroundColor: Colors.dark_gray,
    textheader: {
        textAlign: 'right',
        fontSize: Fonts_Size.sm,
        lineHeight: Fonts_Size.sm
    },
    question: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
        marginLeft: 10,
    },
    optionsContainer: {
    },
    optionContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:5
    },
    optionButton: {
        height: 30,
        justifyContent: 'center',
    },
    optionText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
        lineHeight: Fonts_Size.md
    },
    circleoption:{
        width:10,
        height:10,
        borderRadius:10,
        backgroundColor: Colors.dark_gray
    },
    resultContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultBox:{
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        width: 300, 
        gap: 10,
        justifyContent: 'center',
    },
    reloadButton:{
        position: 'absolute',
        top: 15,
        left: 15,
    }
}
