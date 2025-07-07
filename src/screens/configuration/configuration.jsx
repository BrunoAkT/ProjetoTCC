import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from './configuration.styles'
import Topcurve from "../../components/Topmidcurve";
import icon from "../../constants/icon";

function Configuration() {

    const Nome = 'Bruno'
    const idade = 20
    const Email = 'teste@gmail.com'

    return (
        <View style={styles.mainContainer}>
            <Topcurve></Topcurve>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Configurações
                </Text>
                <View style={styles.headerContainer}>
                    <View style={styles.avatarcontainer}>
                        <Image source={icon.avatarplaceholder}></Image>
                    </View>
                    <View>
                        <Text style={styles.text}>
                            {Nome}
                        </Text>
                        <Text style={styles.text}>
                            {Email}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttontext}>Registro cardíaco</Text>
                    <View style={styles.iconcase}>
                        <Image
                            source={icon.next}
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Configuration