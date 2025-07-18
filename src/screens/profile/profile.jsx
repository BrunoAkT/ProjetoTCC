import { Image, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from './profile.styles'
import Topcurve from "../../components/Topmidcurve"
import icon from '../../constants/icon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import * as ImagePicker from 'expo-image-picker';
import Checkbox from "expo-checkbox";



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
                            <ScrollView style={{ marginTop: 20 }}>
                                <View>
                                    <Text style={styles.text}>Condições cardíaca</Text>
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={conditions.hipertensao} onValueChange={() => toggleCondition('hipertensao')} />
                                        <Text style={styles.checklabel}>Hipertensão</Text>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={conditions.arritmia} onValueChange={() => toggleCondition('arritmia')} />
                                        <Text style={styles.checklabel}>Arritmia</Text>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={conditions.insuficiencia} onValueChange={() => toggleCondition('insuficiencia')} />
                                        <Text style={styles.checklabel}>Insuficiência cardíaca</Text>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={conditions.marcapasso} onValueChange={() => toggleCondition('marcapasso')} />
                                        <Text style={styles.checklabel}>Marcapasso</Text>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={conditions.taquicardia} onValueChange={() => toggleCondition('taquicardia')} />
                                        <Text style={styles.checklabel}>Taquicardia / Bradicardia</Text>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={conditions.historicoInfarto} onValueChange={() => toggleCondition('historicoInfarto')} />
                                        <Text style={styles.checklabel}>Histórico de infarto</Text>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={conditions.betabloqueadores} onValueChange={() => toggleCondition('betabloqueadores')} />
                                        <Text style={styles.checklabel}>Uso de betabloqueadores</Text>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={conditions.outra} onValueChange={() => toggleCondition('outra')} />
                                        <Text style={styles.checklabel}>Outra condição cardíaca</Text>
                                    </View>

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
                                <View>
                                    <Text style={styles.text}>Condição clinica</Text>
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={clinicalConditions.diabetes} onValueChange={() => toggleClinicalCondition('diabetes')} />
                                        <Text style={styles.checklabel}>Diabetes</Text>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={clinicalConditions.asma} onValueChange={() => toggleClinicalCondition('asma')} />
                                        <Text style={styles.checklabel}>Asma</Text>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={clinicalConditions.outra} onValueChange={() => toggleClinicalCondition('outra')} />
                                        <Text style={styles.checklabel}>Outra condição cardíaca</Text>
                                    </View>

                                    {clinicalConditions.outra && (
                                        <View style={styles.checkboxDescription}>
                                            <TextInput
                                                style={styles.checkInput}
                                                placeholder="Descreva a condição"
                                                value={otherClinicalCondition}
                                                onChangeText={setOtherClinicalCondition}
                                                multiline
                                            />
                                        </View>
                                    )}

                                    <View style={styles.checkboxContainer}>
                                        <Checkbox value={noClinicalCondition} onValueChange={toggleNoClinicalCondition} />
                                        <Text style={styles.checklabel}>Não possuo nenhuma condição {'\n'}clinica</Text>
                                    </View>
                                </View>
                            </ScrollView>

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