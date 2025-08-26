import { FlatList, Image, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from './profile.styles'
import Topcurve from "../../components/Topmidcurve"
import icon from '../../constants/icon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import * as ImagePicker from 'expo-image-picker';
import Checkbox from "expo-checkbox";
import api from "../../constants/api";
import CheckBox from "../../components/CheckBox";



function Profile() {
    const Nome = 'Bruno'
    const [birthDate, setBirthDate] = useState('');

    const idade = 20
    const Email = 'teste@gmail.com'
    const atfisica = [
        { label: `Nada`, value: 0 },
        { label: `Leve`, value: 1 },
        { label: `Moderado`, value: 2 },
        { label: `Alta Intensidade`, value: 3 },
    ]
    const [popUpVisible, setPopUpVisible] = useState(false);
    const onPopUp = () => {
        setPopUpVisible(!popUpVisible);
    }
    const [visible, setVisible] = useState(false);

    const [image, setImage] = useState(null)

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


    const [conditions, setConditions] = useState({});
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

    const [clinicalConditions, setClinicalConditions] = useState({
        diabetes: false,
        asma: false,
        outra: false,
    })
    const [otherClinicalCondition, setOtherClinicalCondition] = useState('');
    const [noClinicalCondition, setNoClinicalCondition] = useState(false);
    const toggleClinicalCondition = (condition) => {
        if (noClinicalCondition) setNoClinicalCondition(false);
        setClinicalConditions((prev) => ({ ...prev, [condition]: !prev[condition] }))
    }
    const toggleNoClinicalCondition = () => {
        const newValue = !noClinicalCondition;
        setNoClinicalCondition(newValue);
        if (newValue) {
            setClinicalConditions({
                diabetes: false,
                asma: false,
            });
            setOtherClinicalCondition('');
        }
    }
    const [dataConditions, setDataConditions] = useState([]);

    async function LoadConditions() {
        try {
            const response = await api.get('/conditions');
            if (response.data) {
                setDataConditions(response.data);
            }
        } catch (error) {
            console.error("Erro ao carregar dados do usuário:", error);
        }
    }
    useEffect(() =>{
        LoadConditions();
    }, [])
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
                <TouchableOpacity style={styles.tabIcon} onPress={onPopUp}>
                    <Ionicons name="ellipsis-vertical-sharp" size={30} />
                </TouchableOpacity>
                {popUpVisible && (
                    <View style={styles.popUp}>
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <Text style={styles.textreg}>Editar Informações</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Modal
                    transparent={true}
                    visible={visible}
                    animationType="slide"
                >
                    <SafeAreaView style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
                            <Ionicons name="close" size={30} color="#000" />
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Editar Informações</Text>
                            <View style={styles.headerModal}>
                                <View style={styles.avatarcontainer}>
                                    <TouchableOpacity style={styles.iconedit} onPress={selectImage}>
                                        <Image source={icon.edit}></Image>
                                    </TouchableOpacity>
                                    {image ? (
                                        <Image source={{ uri: image }} style={styles.avatarplace} />)
                                        : (
                                            <Image source={icon.avatarplaceholder}></Image>
                                        )}
                                </View>
                            </View>
                            <View style={styles.editContainer}>
                                <Text style={styles.textreg}>Nome:</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={Nome}
                                ></TextInput>
                            </View>
                            <View v>
                                <Text style={styles.textreg}>Data de Nascimento</Text>
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: 'DD/MM/YYYY'
                                    }}
                                    placeholder="00/00/0000"
                                    style={styles.textInput}
                                    keyboardType="numeric"
                                    value={birthDate}
                                    onChangeText={setBirthDate}
                                />
                            </View>
                                <View>
                                    <Text style={styles.text}>Condições cardíaca</Text>
                                    <FlatList
                                    data={dataConditions}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <CheckBox
                                        label={item.nome}
                                        value={item.id === 1 ? noCondition : !!conditions[item.id]}
                                        onValueChange={() => toggleCondition(item.id)}>
                                        </CheckBox>
                                    )}
                                    />

                                    {conditions.outra && (
                                        <View style={styles.checkboxDescription}>
                                            <TextInput
                                                style={styles.checkInput}
                                                placeholder="Descreva a condição"
                                                value={otherCondition}
                                                onChangeText={setOtherCondition}
                                                multiline
                                            />
                                        </View>
                                    )}

                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={noCondition} onValueChange={toggleNoCondition} />
                                        <Text style={styles.checklabel}>Não possuo nenhuma condição cardíaca</Text>
                                    </View>
                                </View>
                        </View>
                    </SafeAreaView>
                </Modal>
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