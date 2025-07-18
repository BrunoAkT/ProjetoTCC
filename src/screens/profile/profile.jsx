import { Image, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from './profile.styles'
import Topcurve from "../../components/Topmidcurve"
import icon from '../../constants/icon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { use, useState } from "react";
import { TextInputMask } from "react-native-masked-text";


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
                    animationType="fade"
                >
                    <SafeAreaView style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
                            <Ionicons name="close" size={30} color="#000" />
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Editar Informações</Text>
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