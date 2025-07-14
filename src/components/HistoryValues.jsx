import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors, Fonts_Size, Fonts_Styles } from "../constants/theme"
import icon from "../constants/icon"
import { useNavigation } from "@react-navigation/native"


function HistoryValues(params) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Statistics')}>
            <Image source={icon.logo}></Image>
            <View>
                <Text style={styles.text}>{params.date}</Text>
                {
                    params.emoji === 0 ? (
                        <Image source={icon.Sad}></Image>
                    ) : params.emoji === 1 ? (
                        <Image source={icon.Pokerface}></Image>
                    ) : params.emoji === 2 ? (
                        <Image source={icon.Smile}></Image>
                    ) : (
                        <Image source={icon.thinking}></Image>
                    )
                }
            </View>
            <View style={styles.buttonnext}>
                <Text style={styles.textnext}>Estatísticas</Text>
                <View style={styles.iconcase}>
                    <Image
                        source={icon.next}
                        style={styles.icon}
                    />
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
        alignItems: 'center',
        position: 'relative',
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
        marginRight: 10
    },
    iconcase: {
        backgroundColor: Colors.dark_gray,
        borderRadius: 30,
        elevation: 10,
    },
    icon: {
        transform: [{ scaleX: -1 }],
        width: 30,
        height: 30,
        tintColor: Colors.green
    }

})

export default HistoryValues