import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Dimensions,
    Image,
} from 'react-native';
import { styles } from "./login.styles";
import icon from "../../constants/icon";
import Topcurve from "../../components/Topcurve";
import { useRef, useState } from 'react';
import Account from '../account/account';
const { height } = Dimensions.get('window');

function Login() {
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current; // começa fora da tela

    const showRegister = () => {
        setIsRegisterVisible(true);
        Animated.timing(slideAnim, {
            toValue: height - 650, // altura onde vai parar (ajuste como quiser)
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const hideRegister = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 500,
            useNativeDriver: false,
        }).start(() => setIsRegisterVisible(false));
    };
    return (
        <View style={styles.mainContainer}>
            <Topcurve></Topcurve>
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
                        <TouchableOpacity onPress={showRegister}>
                            <Text style={styles.link}>Cadastre-se!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {isRegisterVisible && (
                <Animated.View style={[styles.animatedContainer, { top: slideAnim }]}>
                    <Account></Account>
                </Animated.View>)}
        </View>
    );
}
export default Login;