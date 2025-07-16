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
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';


function Account({ hideRegister }) {
    const [birthDate, setBirthDate] = useState('');

    const [registerStep, setRegisterStep] = useState(1); 
    const goToNextStep = () => {
        setRegisterStep(2); 
    };

    const goToPreviousStep = () => {
        setRegisterStep(1); 
    };
    const navigation = useNavigation();

    return (
        <View>
            {registerStep === 1 ? (
                <View style={styles.maincontainer}>
                    <View>
                        <TextInput placeholder="E-mail" style={styles.input} />
                        <TextInput placeholder="Senha" style={styles.input} />
                        <TextInput placeholder="Confirmar Senha" secureTextEntry style={styles.input} />
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.button} onPress={goToNextStep}>
                            <Text style={styles.buttonText}>Cadastrar-se</Text>
                        </TouchableOpacity>
                        <View style={styles.containerfooter}>
                            <Text style={styles.containerfootertext}>Já possui conta?</Text>
                            <TouchableOpacity onPress={hideRegister}>
                                <Text style={styles.link}>Faça seu Login!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.maincontainer}>
                    <TouchableOpacity onPress={goToPreviousStep} style={styles.iconbutton}>
                        <Image
                            source={icon.next}
                        />
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <View style={styles.avatar}>
                            <TouchableOpacity style={styles.iconedit}>
                                <Image source={icon.edit}></Image>
                            </TouchableOpacity>
                            <Image source={icon.avatarplaceholder} style={styles.avatarplace}></Image>
                        </View>
                        <View style={styles.avatarinput}>
                            <TextInput placeholder="Nome" style={styles.inputsm} />
                            <Text style={styles.text}>Nascimento</Text>
                            <TextInputMask
                                type={'datetime'}
                                options={{
                                    format: 'DD/MM/YYYY'
                                }}
                                placeholder="00/00/0000"
                                style={styles.inputsm}
                                keyboardType="numeric"
                                value={birthDate}
                                onChangeText={setBirthDate}
                            />
                        </View>
                    </View>
                    <View style={styles.register}>
                        <Text style={styles.text}>
                            Informe:
                        </Text>
                        <TouchableOpacity style={styles.buttonregister}>
                            <Text style={styles.textreg}>Registro cardíaco</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bai')}>
                            <Text style={styles.buttonText}>Finalizar Cadastro</Text>
                        </TouchableOpacity>
                    <View style={styles.containerfooter}>
                        <Text style={styles.containerfootertext}>Já possui conta?</Text>
                        <TouchableOpacity onPress={hideRegister}>
                            <Text style={styles.link}>Faça seu Login!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
    )
}
        </View >
    );

}

export default Account;