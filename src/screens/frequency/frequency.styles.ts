import { StyleSheet } from "react-native"
import { Colors, Fonts_Size, Fonts_Styles } from "../../constants/theme"

export const styles =  StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: 'relative' as const,
        backgroundColor: Colors.gray
    },
    header: {
        paddingTop: 30,
        paddingHorizontal: 20,
        alignItems: 'center' as const,
    },
    headerText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md
    },
    container: {
        flex: 1,
        backgroundColor: Colors.dark_gray,
        padding: 20,
    },
    averageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:10,
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
    },
    FrequencyNumberFormat: {
        flexDirection: 'row',
    },
    frequencyFormat: {
        margin: 10
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.lg,
        color: Colors.gray,
        marginLeft: 10,
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
        marginHorizontal: 20,
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
    },
    camera: {
        backgroundColor: Colors.red,
        width: 80,
        height: 100,
        borderRadius: 20,
    },
    cameraVision:{
        flex:1,
        borderRadius:20,
    }
})