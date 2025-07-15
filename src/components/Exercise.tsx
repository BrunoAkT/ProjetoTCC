import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors, Fonts_Size, Fonts_Styles } from "../constants/theme"
import Ionicons from 'react-native-vector-icons/Ionicons';

function Exercise(params) {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.containerText}>
                <Text style={styles.text}>{params.nome}</Text>
                <View style={styles.buttonplay}>
                    <Ionicons name="caret-forward-sharp" size={30} />
                    <Text style={styles.textbutton}>{params.duracao} min</Text>
                </View>
            </View>
            <View style={styles.image}>

            </View>
            <TouchableOpacity style={styles.information}>
                <Ionicons name="help-circle-outline" size={40} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        backgroundColor: Colors.green,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10,
        marginBottom: 30,
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.xl,
        flexWrap: 'wrap',
    },
    buttonplay: {
        backgroundColor: Colors.gray,
        elevation: 10,
        width: 120,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textbutton: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.lg,
        lineHeight: Fonts_Size.lg
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: 1,
        right: 15,
    },
    information: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    containerText: {
        marginRight: 10,
        width: '60%',
    }
})

export default Exercise