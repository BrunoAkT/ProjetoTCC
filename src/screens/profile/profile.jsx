import { Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from './profile.styles'
import Topcurve from "../../components/Topmidcurve"
import icon from '../../constants/icon'
import Ionicons from 'react-native-vector-icons/Ionicons';


function Profile() {
    const Nome = 'Bruno'
    const idade = 20
    const Email = 'teste@gmail.com'
    const atfisica = [
        { label: `Nada`, value: 0 },
        { label: `Leve`, value: 1 },
        { label: `Moderado`, value: 2 },
        { label: `Alta Intensidade`, value: 3 },
    ]
    return (
        <View style={styles.mainContainer}>
            <Topcurve></Topcurve>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Ola, {Nome}
                </Text>
                <View style={styles.avatarcontainer}>
                    <Image source={icon.avatarplaceholder}></Image>
                </View>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.tabIcon}>
                    <Ionicons name="ellipsis-vertical-sharp" size={30} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.text}>
                        {Email}
                    </Text>
                    <Text style={styles.text}>
                        Idade: {idade}
                    </Text>
                </View>
                <View>
                    <Text style={styles.text}>
                        Nivel de atividade física:{"\n"}
                        {atfisica[2].label}
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonregister}>
                    <Text style={styles.textreg}>Registro cardíaco</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Profile