import { Image, Modal, Text, TouchableOpacity, View, Platform, AppState } from "react-native";
import { styles } from './configuration.styles'
import Topcurve from "../../components/Topmidcurve";
import icon from "../../constants/icon";
import { useContext, useEffect, useState, useRef } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/auth";
import api from "../../constants/api";
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';


const PLATFORM_PERMISSIONS = {
    camera: Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
    bluetooth: Platform.OS === 'ios' ? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL : PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
};

const PermissionItem = ({ title, status, onPress }) => {
    const getStatusInfo = () => {
        switch (status) {
            case RESULTS.GRANTED:
                return { text: 'Concedida', color: 'green', description: 'A permissão está ativa e funcionando.' };
            case RESULTS.DENIED:
                return { text: 'Negada', color: 'orange', description: 'Toque aqui para solicitar a permissão novamente.' };
            case RESULTS.BLOCKED:
                return { text: 'Bloqueada', color: 'red', description: 'Toque aqui para abrir as configurações do app e permitir manualmente.' };
            default:
                return { text: 'Indisponível', color: 'gray', description: 'Seu dispositivo não suporta esta funcionalidade.' };
        }
    };

    const info = getStatusInfo();

    return (
        <TouchableOpacity style={styles.option} onPress={onPress}>
            <View>
                <Text style={styles.optionTitle}>{title}</Text>
                <Text style={styles.optionDesc}>{info.description}</Text>
            </View>
            <Text style={{ color: info.color, fontWeight: 'bold' }}>{info.text}</Text>
        </TouchableOpacity>
    );
};
function Configuration() {

    const { user, setUser } = useContext(AuthContext)

    const Nome = user.nome;
    const Email = user.email;
    const Img = user.img;

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [popUpMonitoring, setPopUpMonitoring] = useState(false);
    const [popUpPermissions, setPopUpPermissions] = useState(false);

    const [cameraPermission, setCameraPermission] = useState('');
    const [bluetoothPermission, setBluetoothPermission] = useState('');

    const appState = useRef(AppState.currentState);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                console.log('checking permissions.');
                checkPermissions();
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const checkPermissions = async () => {
        const cameraStatus = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
        setCameraPermission(cameraStatus);

        const bluetoothStatus = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL : PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
        setBluetoothPermission(bluetoothStatus);
    };

    const handlePermissionRequest = async (permissionType) => {
        const permission = PLATFORM_PERMISSIONS[permissionType];
        const currentStatus = permissionType === 'camera' ? cameraPermission : bluetoothPermission;

        if (currentStatus === RESULTS.DENIED) {
            const newStatus = await request(permission);
            if (permissionType === 'camera') {
                setCameraPermission(newStatus);
            } else {
                setBluetoothPermission(newStatus);
            }
        } else if (currentStatus === RESULTS.BLOCKED) {
            await openSettings();
        }
    };


    // Configuração de Monitoramento BLE (removida temporariamente)

    const [MonitoringBle, SetMonitoringBle] = useState(user.BLE_cap);
    // async function MonitoringBLEConfiguration() {
    //     console.log(user.BLE_cap)
    //     console.log(MonitoringBle)
    //     try {
    //         const response = await api.put(`/user/BLE/${user.id}`,
    //             {
    //                 BLE_cap: MonitoringBle
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${user.token}`
    //                 }
    //             })
    //         if (response.data) {
    //             console.log('sucesso', response.data)
    //         }
    //     } catch (error) {
    //         console.log('falha', error)
    //     }
    // }

    // const [isFirstRender, setIsFirstRender] = useState(true);
    // useEffect(() => {
    //     if (isFirstRender) {
    //         setIsFirstRender(false);
    //         return;
    //     }
    //     MonitoringBLEConfiguration()
    // }, [MonitoringBle])

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
                            {/* <TouchableOpacity style={[styles.option, MonitoringBle ? styles.active : null]} onPress={() => SetMonitoringBle(1)}>
                                <Text style={styles.optionTitle}>⌚ Smartwatch (BLE)</Text>
                                <Text style={styles.optionDesc}>Conecte um relógio via Bluetooth</Text>
                            </TouchableOpacity> */}
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
                    <TouchableOpacity style={styles.button} onPress={() => { setPopUpPermissions(true); checkPermissions(); }}>
                        <Text style={styles.buttontext}>Permissões</Text>
                        <View style={styles.iconcase}>
                            <Image
                                source={icon.next}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        visible={popUpPermissions}
                        animationType="fade"
                        onRequestClose={() => setPopUpPermissions(false)}>
                        <View style={styles.overlay}>
                            <SafeAreaView style={styles.modalContainer}>
                                <TouchableOpacity style={styles.closeButton} onPress={() => setPopUpPermissions(false)}>
                                    <Ionicons name="close" size={30} color="#000" />
                                </TouchableOpacity>
                                <Text style={styles.optionTitle}>Gerenciar Permissões</Text>

                                <PermissionItem
                                    title="Câmera"
                                    status={cameraPermission}
                                    onPress={() => handlePermissionRequest('camera')}
                                />
                                <PermissionItem
                                    title="Bluetooth"
                                    status={bluetoothPermission}
                                    onPress={() => handlePermissionRequest('bluetooth')}
                                />
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