import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors, Fonts_Size, Fonts_Styles } from "../constants/theme"
import Ionicons from 'react-native-vector-icons/Ionicons';

function Exercise() {
    return (
        <TouchableOpacity style={styles.container}>
            <View>
                <Text style={styles.text}>Respiracão {'\n'}Guiada</Text>
                <View style={styles.buttonplay}>
                    <Ionicons name="caret-forward-sharp" size={30} />
                    <Text style={styles.textbutton}>2-5 min</Text>
                </View>
            </View>
            <View style={styles.image}>

            </View>
            <TouchableOpacity style={styles.information}>
                <Ionicons name="information-circle" size={40} />
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
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.xl,
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
        right:15,
    },
    information:{
        position: 'absolute',
        right:5,
        top:5,
    }
})

export default Exercise