import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native';
import { styles } from "./account.styles";
import icon from "../../constants/icon";
import { useState } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';

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
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const OpenModalRegister = () => {
        setVisible(true);
    }
    const onClose = () => {
        setVisible(false)
    }

    const [conditions, setConditions] = useState({
        hipertensao: false,
        arritmia: false,
        insuficiencia: false,
        marcapasso: false,
        taquicardia: false,
        historicoInfarto: false,
        betabloqueadores: false,
        outra: false,
    });
    const [otherCondition, setOtherCondition] = useState('');
    const [noCondition, setNoCondition] = useState(false);

    const toggleCondition = (condition) => {
        if (noCondition) setNoCondition(false);
        setConditions((prev) => ({ ...prev, [condition]: !prev[condition] }))
    }
    const toggleNoCondition = () => {
        const newValue = !noCondition;
        setNoCondition(newValue);
        if (newValue) {
            setConditions({
                hipertensao: false,
                arritmia: false,
                insuficiencia: false,
                marcapasso: false,
                taquicardia: false,
                historicoInfarto: false,
                betabloqueadores: false,
                outra: false,
            });
            setOtherCondition('');
        }
    }


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
                        <TouchableOpacity style={styles.buttonregister} onPress={OpenModalRegister}>
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
                    <Modal
                        transparent
                        visible={visible}
                        animationType="fade"
                        onRequestClose={onClose}
                    >
                        <View style={styles.overlay}>
                            <View style={styles.content}>
                                <TouchableOpacity style={styles.close} onPress={onClose}>
                                    <Ionicons name="close" size={24} />
                                </TouchableOpacity>
                                <Text style={styles.text}>Você tem alguma condição cardíaca diagnosticada?</Text>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox value={conditions.hipertensao} onValueChange={() => toggleCondition('hipertensao')} />
                                    <Text style={styles.label}>Hipertensão</Text>
                                </View>

                                <View style={styles.checkboxContainer}>
                                    <Checkbox value={conditions.arritmia} onValueChange={() => toggleCondition('arritmia')} />
                                    <Text style={styles.label}>Arritmia</Text>
                                </View>

                                <View style={styles.checkboxContainer}>
                                    <Checkbox value={conditions.insuficiencia} onValueChange={() => toggleCondition('insuficiencia')} />
                                    <Text style={styles.label}>Insuficiência cardíaca</Text>
                                </View>

                                <View style={styles.checkboxContainer}>
                                    <Checkbox value={conditions.marcapasso} onValueChange={() => toggleCondition('marcapasso')} />
                                    <Text style={styles.label}>Marcapasso</Text>
                                </View>

                                <View style={styles.checkboxContainer}>
                                    <Checkbox value={conditions.taquicardia} onValueChange={() => toggleCondition('taquicardia')} />
                                    <Text style={styles.label}>Taquicardia / Bradicardia</Text>
                                </View>

                                <View style={styles.checkboxContainer}>
                                    <Checkbox value={conditions.historicoInfarto} onValueChange={() => toggleCondition('historicoInfarto')} />
                                    <Text style={styles.label}>Histórico de infarto</Text>
                                </View>

                                <View style={styles.checkboxContainer}>
                                    <Checkbox value={conditions.betabloqueadores} onValueChange={() => toggleCondition('betabloqueadores')} />
                                    <Text style={styles.label}>Uso de betabloqueadores</Text>
                                </View>

                                <View style={styles.checkboxContainer}>
                                    <Checkbox value={conditions.outra} onValueChange={() => toggleCondition('outra')} />
                                    <Text style={styles.label}>Outra condição cardíaca</Text>
                                </View>

                                {conditions.outra && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Descreva a condição"
                                        value={otherCondition}
                                        onChangeText={setOtherCondition}
                                    />
                                )}

                                <View style={styles.checkboxContainer}>
                                    <Checkbox value={noCondition} onValueChange={toggleNoCondition} />
                                    <Text style={styles.label}>Não possuo nenhuma condição cardíaca</Text>
                                </View>
                            </View>
                        </View>

                    </Modal>
                </View>

            )
            }
        </View >
    );

}

export default Account;