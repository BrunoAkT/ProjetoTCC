import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Dimensions,
    Image,
} from 'react-native';
import { styles } from "./account.styles";
import icon from "../../constants/icon";
import { useRef, useState } from 'react';


function Account() {
    const [registerStep, setRegisterStep] = useState(1); // etapa do cadastro
    const goToNextStep = () => {
        setRegisterStep(2); // muda para próxima etapa
    };

    const goToPreviousStep = () => {
        setRegisterStep(1); // volta para etapa anterior
    };
    return (
        <View>
            {registerStep === 1 ? (
                <View>
                    <TextInput placeholder="Nome" style={styles.input} />
                    <TextInput placeholder="E-mail" style={styles.input} />
                    <TextInput placeholder="Senha" secureTextEntry style={styles.input} />
                    <TouchableOpacity style={styles.button} onPress={goToNextStep}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                    <View style={styles.containerfooter}>
                        <Text style={styles.containerfootertext}>Já possui conta?</Text>
                        <TouchableOpacity onPress={showRegister}>
                            <Text style={styles.link}>Faça seu Login!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View>
                    <TouchableOpacity onPress={goToPreviousStep}>
                        <Image
                            source={icon.next}
                        />
                    </TouchableOpacity>
                    <TextInput placeholder="Data de Nascimento" style={styles.input} />
                    <TextInput placeholder="URL da Imagem" style={styles.input} />
                    <TouchableOpacity style={styles.button} onPress={hideRegister}>
                        <Text style={styles.buttonText}>Finalizar Cadastro</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

}

export default Account;