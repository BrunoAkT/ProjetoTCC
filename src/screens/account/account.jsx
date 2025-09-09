import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    ScrollView,
    FlatList
} from 'react-native';
import { styles } from "./account.styles";
import icon from "../../constants/icon";
import { useEffect, useState } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox2 from '../../components/CheckBox';
import api from '../../constants/api';

function Account({ hideRegister }) {

    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nome, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [image, setImage] = useState(null)


    const [registerStep, setRegisterStep] = useState(1);
    const goToNextStep = () => {
        if (senha != confirmPassword) {
            return alert("As senhas não coincidem!");
        }
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

    const [conditions, setConditions] = useState({});
    const [otherCondition, setOtherCondition] = useState('');
    const [noCondition, setNoCondition] = useState(false);
    function getCondicoesJson() {
        const condicoesMarcadas = data
            .filter(item => conditions[item.id])
            .map(item => {
                if (item.nome === 'Outros' && otherCondition) {
                    return {
                        id: item.id,
                        nome: item.nome,
                        descricao_extra: otherCondition
                    };
                }
                return {
                    id: item.id,
                    nome: item.nome
                };
            });
        return { condicoes: condicoesMarcadas }
    }
    const toggleCondition = (id) => {

        if (id === 1) {
            const newValue = !noCondition;
            setNoCondition(newValue);
            if (newValue) {
                setOtherCondition('');
                setConditions({});
            }
        }
        if (noCondition) setNoCondition(false);
        setConditions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }
    const [data, setData] = useState([]);

    async function LoadData() {
        try {
            const response = await api.get('/conditions');
            if (response.data) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Erro ao carregar dados do usuário:", error);
        }
    }
    useEffect(() => {
        LoadData();
    }, []);

    async function Registration() {
        const condicoesJson = getCondicoesJson()
        console.log(condicoesJson);
        console.log("Nome:", nome);
        console.log("Email:", email);
        console.log("Senha:", senha);
        console.log("Data de Nascimento:", birthDate);
        console.log("Imagem:", image);
        try {
            const response = await api.post('/user/register', {
                email,
                senha,
                nome,
                data_nasc: birthDate,
                img: image,
                ansiedade_points: 0,
                BLE_cap: 0,
                condicoes: condicoesJson.condicoes
            });
            if (response.data) {
                console.log(response.data);
            }
            navigation.navigate('Bai', { id: response.data.id });
        } catch (error) {
            if (error.response?.data.error) {
                Alert.alert("Erro ao fazer login", error.response.data.error);
            } else {
                Alert.alert("Erro ao fazer login", error.message);
            }
        }
    }

    return (
        <View>
            <View style={[styles.maincontainer, { display: registerStep === 1 ? '' : 'none' }]}>
                <View>
                    <TextInput placeholder="E-mail" style={styles.input} placeholderTextColor={"#000000ff"}
                        onChangeText={(t) => setEmail(t)} />
                    <TextInput placeholder="Senha" secureTextEntry style={styles.input} placeholderTextColor={"#000000ff"}
                        onChangeText={(t) => setPassword(t)} />
                    <TextInput placeholder="Confirmar Senha" secureTextEntry style={styles.input} placeholderTextColor={"#000000ff"}
                        onChangeText={(t) => setConfirmPassword(t)} />
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

            <View style={[styles.maincontainer, { display: registerStep === 1 ? 'none' : '' }]}>
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
                        <TextInput placeholder="Nome" style={styles.inputsm} onChangeText={(t) => setName(t)} placeholderTextColor={"#000000ff"} />
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
                            placeholderTextColor={"#000000ff"}
                        />
                    </View>
                </View>
                <View style={styles.register}>
                    <Text style={styles.text}>
                        Informe:
                    </Text>
                    <TouchableOpacity style={styles.buttonregister} onPress={() => {
                        setVisible(true);
                    }}>
                        <Text style={styles.textreg}>Registro cardíaco</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={Registration}>
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
                    onRequestClose={() => {
                        setVisible(false);
                    }}
                >
                    <View style={styles.overlay}>
                        <View style={styles.content}>
                            <TouchableOpacity style={styles.close} onPress={() => {
                                setVisible(false);
                            }}>
                                <Ionicons name="close" size={24} />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.text}>Você tem alguma condição cardíaca diagnosticada?</Text>
                                <FlatList
                                    data={data}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <CheckBox2
                                            label={item.nome}
                                            value={item.id === 1 ? noCondition : !!conditions[item.id]}
                                            onValueChange={() => toggleCondition(item.id)}>
                                        </CheckBox2>
                                    )}>
                                </FlatList>

                                {conditions[99] && (
                                    <View style={styles.checkboxDescription}>
                                        <TextInput
                                            style={styles.checkInput}
                                            placeholder="Descreva a condição"
                                            value={otherCondition}
                                            onChangeText={setOtherCondition}
                                            placeholderTextColor={"#000000ff"}
                                            multiline
                                        />
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        </View >
    );

}

export default Account;