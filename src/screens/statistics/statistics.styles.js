
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
    frequencyFormat: {
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
    infContent: {
        padding: 10,
    },
    infTitle: {
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
        padding: 20,
    },
    close: {
        alignItems: 'flex-end',
    },
    modalTitle: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.xl,
        color: Colors.dark_gray,
        textAlign: 'center',
    },
    modalSubTitle: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.lg,
        color: Colors.dark_gray,
        textAlign: 'center',
    },
    emojiSection: {
        alignItems: 'center',
    },
    modalText: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
        color: Colors.dark_gray,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
    },
    insightButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 15,
    },
    insightButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Modifique o content para ter um padding melhor
    content: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20, // Aumenta o espaçamento interno
        width: '90%',
        maxHeight: '80%',
    },
}