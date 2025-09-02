import { FlatList, Image, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from './profile.styles'
import Topcurve from "../../components/Topmidcurve"
import icon from '../../constants/icon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext, useEffect, useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import * as ImagePicker from 'expo-image-picker';
import api from "../../constants/api";
import CheckBox2 from "../../components/CheckBox";
import { AuthContext } from "../../contexts/auth";
import Icon from "../../constants/icon";



function Profile() {
    const { user, setUser } = useContext(AuthContext)

    const Email = user.email;
    const [Nome, setNome] = useState(user.nome)
    const [image, setImage] = useState(user.img);
    const [birthDate, setBirthDate] = useState(user.data_nasc);

    function calcularIdade(dataNascStr) {
        const [dia, mes, ano] = dataNascStr.split("/").map(Number);
        const hoje = new Date();
        const nascimento = new Date(ano, mes - 1, dia);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();
        if (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)) {
            idade--;
        }
        return idade;
    }

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
    const [visibleConditions, setVisibleConditions] = useState(false);


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

    const toggleCondition = (id) => {
        console.log(conditions)
        if (id === 1) {
            const newValue = !noCondition;
            setNoCondition(newValue);
            if (newValue) {
                setOtherCondition('');
                setConditions({});
            }
        }
        if (noCondition) setNoCondition(false);
        setConditions((prev) => ({
            ...prev, [id]: !prev[id]
        }))
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

    const [userConditions, setUserConditions] = useState([]);
    const userConditionsIds = new Set(userConditions.map(cond => cond.id));
    const userConditionDescExtra = userConditions.find(cond => cond.id === 99)?.descricao_extra;

    async function LoadUserConditions() {
        try {
            const response = await api.get(`/conditions/${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );
            if (response.data) {
                setUserConditions(response.data);
                const activeConditions = {};
                response.data.forEach(cond => {
                    activeConditions[cond.id] = true;
                });
                setConditions(activeConditions);

                const outros = response.data.find(cond => cond.id === 99);
                if (outros && outros.descricao_extra) {
                    setOtherCondition(outros.descricao_extra);
                }
            }
        } catch (error) {
            console.error("Erro ao carregar condições do usuário:", error);
        }
    }
    useEffect(() => {
        LoadConditions();
        LoadUserConditions();
    }, [])

    function getCondicoesJson() {
        const condicoesMarcadas = dataConditions
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

    async function salveData() {
        const condicoesJson = getCondicoesJson()
        // console.log(user.id);
        // console.log(Nome);
        // console.log(birthDate);
        // console.log(condicoesJson);
        // console.log(image);
        try {
            console.log('mandando')
            const response = await api.put(`/user/${user.id}`, {
                nome: Nome,
                data_nasc: birthDate,
                img: image,
                condicoes: condicoesJson,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            )
            if (response.data) {
                console.log(response.data);
                setUser(response.data);
                setVisible(false);
            }
        } catch (error) {
            console.log('erro', error)
            if (error.response?.data.error) {
                Alert.alert("Erro ao Atualizar as Informações", error.response.data.error);
            } else {
                Alert.alert("Erro ao Atualizar as Informações", error.message);
            }
        }

    }

    return (
        <View style={styles.mainContainer}>
            <Topcurve></Topcurve>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Ola, {user.nome}
                </Text>
                <View style={styles.avatarcontainer}>
                    {image ?
                        <Image source={{ uri: image }} style={styles.avatarplace}></Image>
                        : <Image source={icon.avatarplaceholder}></Image>
                    }
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
                        <TouchableOpacity style={styles.confirmButton} onPress={salveData}>
                            <Ionicons name="checkmark-circle-outline" size={65} color="#81C784" />
                        </TouchableOpacity>
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
                                    onChangeText={setNome}
                                ></TextInput>
                            </View>
                            <View v>
                                <Text style={styles.textreg}>Data de Nascimento</Text>
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: 'DD/MM/YYYY'
                                    }}
                                    placeholder={birthDate}
                                    style={styles.textInput}
                                    keyboardType="numeric"
                                    onChangeText={setBirthDate}
                                />
                            </View>
                            <View style={styles.editContainerCheckBox}>
                                <Text style={styles.text}>Condições cardíaca</Text>
                                <FlatList
                                    data={dataConditions}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <CheckBox2
                                            label={item.nome}
                                            value={item.id === 1 ? noCondition : !!conditions[item.id]}
                                            onValueChange={() => toggleCondition(item.id)}>
                                        </CheckBox2>
                                    )}
                                />
                                {conditions[99] && (
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
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>
                <View>
                    <Text style={styles.text}>
                        {Email}
                    </Text>
                    <Text style={styles.text}>
                        Idade: {calcularIdade(user.data_nasc)}
                    </Text>
                </View>
                <View>
                    <Text style={styles.text}>
                        Nivel de atividade física:{"\n"}
                        {atfisica[2].label}
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonregister} onPress={() => setVisibleConditions(true)}>
                    <Text style={styles.textreg}>Registro cardíaco</Text>
                </TouchableOpacity>
            </View>
            <Modal
                transparent
                visible={visibleConditions}
                animationType="fade"
                onRequestClose={() => {
                    setVisibleConditions(false);
                }}
            >
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        <TouchableOpacity style={styles.close} onPress={() => {
                            setVisibleConditions(false);
                        }}>
                            <Ionicons name="close" size={24} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.text}>
                                Condições marcadas</Text>
                            <FlatList
                                data={dataConditions}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <CheckBox2
                                        label={item.nome}
                                        value={userConditionsIds.has(item.id)}
                                        onValueChange={null}>
                                    </CheckBox2>
                                )}>
                            </FlatList>

                            {userConditionsIds.has(99) && (
                                <View style={styles.checkboxDescription}>
                                    <Text
                                        style={styles.checkInput}
                                    >
                                        {userConditionDescExtra ? userConditionDescExtra : ''}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

            </Modal>
        </View>
    )
}
export default Profile