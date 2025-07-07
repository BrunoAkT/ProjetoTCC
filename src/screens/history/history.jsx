import { Text, View } from "react-native"
import { styles } from './history.styles'
import Topcurve from "../../components/Topmidcurve"

function History() {
    return (
    <View style={styles.mainContainer}>
        <Topcurve></Topcurve>
        <View style={styles.header}>
            <Text style={styles.title}>
                Historico e Estatísticas
            </Text>
        </View>
        <View style={styles.container}>
            <View></View>
        </View>
    </View>
    )
}
export default History