import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from './configuration.styles'
import Topcurve from "../../components/Topmidcurve";
import icon from "../../constants/icon";
import { useContext, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/auth";

function Configuration() {

    const { user, setUser } = useContext(AuthContext)

    const Nome = user.nome;
    const Email = user.email;
    const Img = user.img;

    const [MonitoringBle, SetMonitoringBle] = useState(false);

    const [popUpMonitoring, setPopUpMonitoring] = useState(false);

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
                            <TouchableOpacity style={[styles.option, MonitoringBle ? null : styles.active]} onPress={() => SetMonitoringBle(false)}>
                                <Text style={styles.optionTitle}>📷 PPG via Câmera</Text>
                                <Text style={styles.optionDesc}>Usa a câmera e o flash do celular</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.option, MonitoringBle ? styles.active : null]} onPress={() => SetMonitoringBle(true)}>
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
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttontext}>Desativar conta</Text>
                        <View style={styles.iconcase}>
                            <Image
                                source={icon.next}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setUser({})}>
                        <Text style={styles.buttontext}>Sair</Text>
                        <View style={styles.iconcase}>
                            <Image
                                source={icon.next}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default Configuration