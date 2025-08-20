import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Dimensions,
    Image,
    Alert,
} from 'react-native';
import { styles } from "./login.styles";
import icon from "../../constants/icon";
import Topcurve from "../../components/Topcurve";
import { use, useRef, useState } from 'react';
import Account from '../account/account';
import api from '../../constants/api';
const { height } = Dimensions.get('window');

function Login() {
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current;

    const showRegister = () => {
        setIsRegisterVisible(true);
        Animated.timing(slideAnim, {
            toValue: height - 600, // altura onde vai parar (ajuste como quiser)
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

    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');

    async function executeLogin() {
        try {
            const response = await api.post('/user/login', {
                email,
                senha
            });
            if (response.data) {
                console.log(response.data);
            }
        } catch (error) {
            if (error.response?.data.error) {
                Alert.alert("Erro ao fazer login", error.response.data.error);
            } else {
                Alert.alert("Erro ao fazer login", error.message);
            }
        }

    }
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
                    <TextInput placeholder="E-mail" style={styles.input} onChangeText={(t) => setEmail(t)}></TextInput>
                    <TextInput placeholder="Senha" style={styles.input} secureTextEntry={true} onChangeText={(t) => setPassword(t)}></TextInput>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={executeLogin}>
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
            <View style={styles.footer}></View>
            {isRegisterVisible && (
                <Animated.View style={[styles.animatedContainer, { top: slideAnim }]}>
                    <Account hideRegister={hideRegister}></Account>
                </Animated.View>)}
        </View>
    );
}
export default Login;