import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors, Fonts_Size, Fonts_Styles } from "../constants/theme"
import icon from "../constants/icon"


function HistoryValues(params) {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={icon.logo}></Image>
            <View>
                <Text style={styles.text}>{params.date}</Text>
                <Image source={icon.Sad}></Image>
            </View>
            <View style={styles.buttonnext}>
                <Text style={styles.textnext}>Estatísticas</Text>
                <View style={styles.iconcase}>
                    <Image
                        source={icon.next}
                        style={styles.icon}
                    />
                    <Text>{params.emoji}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.green,
        width: '100%',
        height: 100,
        borderRadius: 10,
        elevation: 10,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    buttonnext: {
        flexDirection: 'row',
        position: 'absolute',
        right: -15,
        bottom: 10,
        alignItems: 'center'
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.sm
    },
    textnext: {
        fontFamily: Fonts_Styles.PoppinsItalic,
        fontSize: Fonts_Size.sm,
        marginRight:10
    },
    iconcase: {
        backgroundColor: Colors.dark_gray,
        borderRadius: 30,
        elevation:10,
    },
    icon: {
        transform: [{ scaleX: -1 }],
        width: 30,
        height: 30,
        tintColor: Colors.green
    }

})

export default HistoryValues