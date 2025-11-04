import { StyleSheet } from "react-native"
import { Colors, Fonts_Size, Fonts_Styles } from "../../constants/theme"
import { measure } from "react-native-reanimated"

export const styles = StyleSheet.create({
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
        width: '100%',
        backgroundColor: Colors.dark_gray,
        padding: 20,
    },
    averageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
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
    HistoricFormat: {
        flexDirection: 'row',
        backgroundColor: "#222",
        padding: 10,
    },
    historicList: {
        width: '100%',
        height: 120,
    },
    frequencyFormat: {
        margin: 10,
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
        marginLeft: 10,
        marginTop: 10,
    },
    recomendationText: {
        fontSize: Fonts_Size.lg,
        color: Colors.gray,
        fontFamily: Fonts_Styles.PoppinsRegular,
    },
    exerciciesContainer: {
        width: 100,
        height: 100,
        backgroundColor: Colors.gray,
        position: 'absolute',
        right: 10,
        top: -20,
        borderRadius: 10,
        elevation: 10,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        height: '120%',
        width: '90%',
        padding: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: Colors.dark_gray,
    },
    annotationHeader: {
        marginHorizontal: 20,

    },
    infInput: {
        fontFamily: Fonts_Styles.PoppinsRegular,
        fontSize: Fonts_Size.lg,
        color: Colors.dark_gray,
        height: 300,
        padding: 30,
        textAlignVertical: 'top' as const,
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
        position: 'relative',
        overflow: 'hidden',
    },
    cameraVision: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    alert: {
        color: Colors.green,
        marginLeft: 0,
    },
    measurementContainer: {
        padding: 20,
        backgroundColor: "#222",
        borderRadius: 12,
    },
    textOnly: {
        lineHeight: Fonts_Size.lg
    },
    reloadButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    RMSSDContainer: {
        flexDirection: 'row',
    }
})