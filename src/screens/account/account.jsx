import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { styles } from "./account.styles";
import icon from "../../constants/icon";
import { useState } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

function Account({ hideRegister }) {
    const [birthDate, setBirthDate] = useState('');
    const [image, setImage] = useState(null)
    const [registerStep, setRegisterStep] = useState(1);
    const goToNextStep = () => {
        setRegisterStep(2);
    };

    const goToPreviousStep = () => {
        setRegisterStep(1);
    };

    const selectImage = async () => {

        const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissions.granted === false) {
            alert('Você precisa permitir o acesso à galeria para selecionar uma imagem.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        console.log('Resultado da seleção de imagem:', result)

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log('Imagem selecionada:', result.assets[0].uri);
        }
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
                            <TouchableOpacity style={styles.iconedit} onPress={selectImage}>
                                <Image source={icon.edit}></Image>
                            </TouchableOpacity>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.avatarplace} />)
                                : (
                                    <Image source={icon.avatarplaceholder}></Image>
                                )}
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