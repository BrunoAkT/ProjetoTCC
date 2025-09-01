import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from './configuration.styles'
import Topcurve from "../../components/Topmidcurve";
import icon from "../../constants/icon";
import { useContext, useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/auth";
import api from "../../constants/api";

function Configuration() {

    const { user, setUser } = useContext(AuthContext)

    const Nome = user.nome;
    const Email = user.email;
    const Img = user.img;

    const [showExclusionModal, setShowExclusionModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [popUpMonitoring, setPopUpMonitoring] = useState(false);


    const [MonitoringBle, SetMonitoringBle] = useState(user.BLE_cap);
    async function MonitoringBLEConfiguration() {
        console.log(user.BLE_cap)
        console.log(MonitoringBle)
        try {
            const response = await api.put(`/user/BLE/${user.id}`,
                {
                    BLE_cap: MonitoringBle
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
            if (response.data) {
                console.log('sucesso', response.data)
            }
        } catch (error) {
            console.log('falha', error)
        }
    }

    const [isFirstRender, setIsFirstRender] = useState(true);
    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        MonitoringBLEConfiguration()
    }, [MonitoringBle])

    return (
        <View style={styles.mainContainer}>
            <Topcurve></Topcurve>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Configurações
                </Text>
                <View style={styles.headerContainer}>
                    <View style={styles.avatarcontainer}>
                        {Img ?
                            <Image source={{ uri: Img }} style={styles.avatarplace}></Image>
                            : <Image source={icon.avatarplaceholder}></Image>
                        }
                    </View>
                    <View>
                        <Text style={styles.text}>
                            {Nome}
                        </Text>
                        <Text style={styles.text}>
                            {Email}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>

                <Modal
                    transparent={true}
                    visible={popUpMonitoring}
                    animationType="fade"
                    onRequestClose={() => setPopUpMonitoring(false)}>
                    <View style={styles.overlay}>
                        <SafeAreaView style={styles.modalContainer}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setPopUpMonitoring(false)}>
                                <Ionicons name="close" size={30} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.option, MonitoringBle ? null : styles.active]} onPress={() => SetMonitoringBle(0)}>
                                <Text style={styles.optionTitle}>📷 PPG via Câmera</Text>
                                <Text style={styles.optionDesc}>Usa a câmera e o flash do celular</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.option, MonitoringBle ? styles.active : null]} onPress={() => SetMonitoringBle(1)}>
                                <Text style={styles.optionTitle}>⌚ Smartwatch (BLE)</Text>
                                <Text style={styles.optionDesc}>Conecte um relógio via Bluetooth</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </View>
                </Modal>

                <View>
                    <TouchableOpacity style={styles.button} onPress={() => setPopUpMonitoring(true)}>
                        <Text style={styles.buttontext}>Tipo de monitoramento</Text>
                        <View style={styles.iconcase}>
                            <Image
                                source={icon.next}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttontext}>Permissões</Text>
                        <View style={styles.iconcase}>
                            <Image
                                source={icon.next}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setShowExclusionModal(true)}>
                        <Text style={styles.buttontext}>Desativar conta</Text>
                        <View style={styles.iconcase}>
                            <Image
                                source={icon.next}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        visible={showExclusionModal}
                        animationType="fade"
                        onRequestClose={() => setShowExclusionModal(false)}>
                        <View style={styles.overlay}>
                            <SafeAreaView style={styles.modalContainer}>
                                <Text style={styles.optionTitle}>Essa opção irá excluir sua conta. Tem certeza?</Text>
                                <TouchableOpacity style={styles.option2} onPress={() => console.log('excluir conta')}>
                                    <Text style={styles.optionTitle}>Sim</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.option2} onPress={() => setShowExclusionModal(false)}>
                                    <Text style={styles.optionTitle}>Não</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </View>
                    </Modal>


                    <TouchableOpacity style={styles.button} onPress={() => setShowLogoutModal(true)}>
                        <Text style={styles.buttontext}>Sair</Text>
                        <View style={styles.iconcase}>
                            <Image
                                source={icon.next}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        visible={showLogoutModal}
                        animationType="fade"
                        onRequestClose={() => setShowLogoutModal(false)}>
                        <View style={styles.overlay}>
                            <SafeAreaView style={styles.modalContainer}>
                                <Text style={styles.optionTitle}>Tem certeza que deseja sair?</Text>
                                <TouchableOpacity style={styles.option2} onPress={() => setUser({})}>
                                    <Text style={styles.optionTitle}>Sim</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.option2} onPress={() => setShowLogoutModal(false)}>
                                    <Text style={styles.optionTitle}>Não</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>
    )
}
export default Configuration