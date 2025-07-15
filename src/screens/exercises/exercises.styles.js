
import { Colors, Fonts_Size, Fonts_Styles } from "../../constants/theme"

export const styles = {
    mainContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: Colors.gray
    },
    headerContainer: {
        paddingTop: 30,
        paddingLeft: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.title
    },
    headersubText: {
        fontFamily: Fonts_Styles.PoppinsItalic,
        fontSize: Fonts_Size.md,
        lineHeight: Fonts_Size.md
    },
    logo:{
        margin: 'auto'
    },
    categoryItens:{
        flexDirection: 'row',
        gap: 10,
    },
    scrollCategory:{
        padding:20
    },
    scrollExercicies:{
        padding:20,
        height: 500,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.dark_gray,
        padding: 20,
    },
    averageContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    averageText: {
        fontSize: 80,
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        color: Colors.gray,
        lineHeight: 80,
    },
    BPMText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        color: Colors.gray,
        fontSize: Fonts_Size.xl,
    },
    FrequencyNumberFormat: {
        flexDirection: 'row',
    },
    frequencyFormat: {
        margin: 10
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.xl,
        marginLeft: 30,
    },
    functionContainers: {
        marginTop: 20,
    },
    recomendationContainer: {
        marginLeft: 50,
        marginTop: 20,
    },
    recomendationText: {
        fontSize: Fonts_Size.title,
        color: Colors.gray,
        fontFamily: Fonts_Styles.PoppinsRegular,
    },
    exerciciesContainer: {
        width: 100,
        height: 100,
        backgroundColor: Colors.gray,
        position: 'absolute',
        right: 30,
        top: -70,
        borderRadius: 10,
        elevation: 10,
        zIndex: 1,
    },
    stressContainer: {
        width: '100%',
        backgroundColor: Colors.green,
        height: 100,
        borderRadius: 10,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    stressText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md
    },
    infContainer: {
        backgroundColor: Colors.gray,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '100%',
        width: '90%',
        padding: 30,
        marginHorizontal:20,
    },

    infInput: {
        fontFamily: Fonts_Styles.PoppinsRegular,
        fontSize: Fonts_Size.lg
    },
    animatedContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 600,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        zIndex: 10,
       
    }
}