import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./login.styles";
import icon from "../../constants/icon";

function Login() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>PROJETONOME</Text>
                <Image
                    source={icon.logo}
                    style={styles.logo}>
                </Image>
            </View>
            <View style={styles.container}>
                <View>
                    <TextInput placeholder="E-mail" style={styles.input}></TextInput>
                    <TextInput placeholder="Senha" style={styles.input}></TextInput>
                </View>
                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    <View style={styles.containerfooter}>
                        <Text style={styles.containerfootertext}>Não possui conta?</Text>
                        <TouchableOpacity>
                            <Text style={styles.link}>Cadastre-se!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>

            </View>
        </View>
    );
}
export default Login;