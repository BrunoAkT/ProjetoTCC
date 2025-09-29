import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import { Colors, Fonts_Size, Fonts_Styles } from "../constants/theme"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from "react";

function Category(params) {

    function toKebabCase(iconName) {
        // Remove o prefixo "Fa" (ou outro prefixo que tiver)
        let name = iconName.replace(/^Fa/, "");

        return name
            .replace(/([a-z])([A-Z])/g, "$1-$2")  // insere hífen antes de maiúsculas
            .toLowerCase();
    }

    const iconName = params.icon ? toKebabCase(params.icon) : "question"

    return (
        <View style={styles.MainContainer}>
            <TouchableOpacity style={[styles.container, params.filterOn && { backgroundColor: Colors.green }]} onPress={params.onPressCategory}>
                <Icon name={iconName} size={45} color={Colors.dark_gray} />
            </TouchableOpacity>
            <Text style={styles.text}>{params.nome}</Text>
        </View >
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        marginRight: 10,
        gap: 5,
    },
    container: {
        width: 70,
        height: 70,
        backgroundColor:  Colors.gray,
        elevation: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.sm,
        width: 90,
        textAlign: 'center'
    }
})

export default Category
