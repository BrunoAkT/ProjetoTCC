
import { Colors, Fonts_Size, Fonts_Styles } from "../../constants/theme"

export const styles = {
    mainContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: Colors.gray

    },
    header: {
        paddingTop: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    headerText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md
    },
    container: {
        flex: 1,
        backgroundColor: Colors.dark_gray,
        padding: 20,
        paddingTop: 40,
    },
    midContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    frequencyFormat:{
        alignItems: 'center',
    },
    averageText: {
        fontSize: 60,
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        color: Colors.gray,
        lineHeight: 60,
    },
    BPMText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        color: Colors.gray,
        fontSize: Fonts_Size.xl,
        lineHeight: Fonts_Size.xl
    },
    FrequencyNumberFormat: {
        flexDirection: 'row',
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.lg,
        color: Colors.gray,
        marginLeft: 10,
        textAlign: 'center',
    },
    functionContainers: {
        marginTop: 20,
    },
    infContainer: {
        backgroundColor: Colors.gray,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        marginTop: 20,
        width: '100%',
        height: '100%'
    },
    infContent:{
        padding: 10,
    },
    infTitle:{
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.lg,
    },
    infText: {
        fontFamily: Fonts_Styles.PoppinsRegular,
        fontSize: Fonts_Size.lg
    },
    summaryContainer: {
        backgroundColor: Colors.gray,
        alingItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
    },
    sumarryResult: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    resultText: {
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
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        width: '90%',
    },
    close:{
        alignItems: 'flex-end',
    },
    modalTitle:{
         fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.xl,
        color: Colors.dark_gray,
        textAlign: 'center',
    },
    modalSubTitle:{
         fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.lg,
        color: Colors.dark_gray,
        textAlign: 'center',
    },
    emojiSection:{
        alignItems:'center',
    },
    modalText:{
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
        color: Colors.dark_gray,
        textAlign: 'center',
    },
}