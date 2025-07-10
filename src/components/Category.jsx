import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import { Colors } from "../constants/theme"

function Category() {
    return (
        <TouchableOpacity style={styles.container}>
            <Text>Teste</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        backgroundColor: Colors.gray,
        elevation: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Category
