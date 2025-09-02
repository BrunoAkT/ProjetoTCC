import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";
import { Fonts_Size, Fonts_Styles } from "../constants/theme";

function CheckBox({ label, value, onValueChange }) {
    return (
        <View style={styles.checkboxContainer}>
            <Checkbox value={value} onValueChange={onValueChange} />
            <Text style={styles.checklabel}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 5,
    },
    checklabel: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.md,
    },
})

export default CheckBox;
