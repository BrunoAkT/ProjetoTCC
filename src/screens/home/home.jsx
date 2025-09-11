import { ActivityIndicator, Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import Topcurve from '../../components/Topmidcurve';
import { styles } from './home.styles'
import icon from '../../constants/icon';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BaiSmoll from '../BAI/baiSmoll';
import { AuthContext } from '../../contexts/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../constants/api';

function Home() {
    const navigation = useNavigation();

    const getAsyncData = async () => {
        try {
            const value = await AsyncStorage.getItem(`selectedEmoji${user.id}`);
            if (value !== null) {
                setSelectedEmoji(parseInt(value));
            }
        } catch (e) {
            console.log('Erro na captura de dados da ultima seleção:', e)
        }
    };

    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const handlePressEmoji = async (index) => {
        setSelectedEmoji(index);
        await AsyncStorage.setItem(`selectedEmoji${user.id}`, index.toString());
    };

    const { user } = useContext(AuthContext)
    const [saveComplete, setSaveComplete] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [resetCounter, setResetCounter] = useState(0);

    useEffect(() => {
        if (saveComplete) {
            const timer = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }).start(() => setShowPopUp(false));
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [saveComplete]);

    const Nome = user.nome;

    const resetAll = async () => {
        await AsyncStorage.multiRemove([
            `textData${user.id}`,
            `historicData${user.id}`,
            `total${user.id}`,
            `selectedEmoji${user.id}`,
            `answers${user.id}`
        ]);
        setSelectedEmoji(null);
        setSaveComplete(false);
        // avisa os filhos que o reset aconteceu
        setResetCounter(prev => prev + 1);
    };

    const dataAtual = new Date().toLocaleDateString('pt-BR');
    async function setResults() {
        try {
            setShowPopUp(true);
            console.log(dataAtual)
            console.log("Data:", await AsyncStorage.getItem(`dayData${user.id}`));
            console.log('User ID:', user.id);
            console.log("Anotações:", await AsyncStorage.getItem(`textData${user.id}`));
            console.log("BPM`s:", await AsyncStorage.getItem(`historicData${user.id}`));
            console.log("BAI:", await AsyncStorage.getItem(`total${user.id}`));
            console.log("Emoji:", await AsyncStorage.getItem(`selectedEmoji${user.id}`));
            console.log('--------------------');
            const dayData = await AsyncStorage.getItem(`dayData${user.id}`);
            const textData = await AsyncStorage.getItem(`textData${user.id}`);
            const historicData = await AsyncStorage.getItem(`historicData${user.id}`);
            const total = await AsyncStorage.getItem(`total${user.id}`);
            const selectedEmoji = await AsyncStorage.getItem(`selectedEmoji${user.id}`);

            if (dayData !== dataAtual) {
                const response = await api.post(`/history/${user.id}`, {
                    date: dayData,
                    anotation: textData,
                    Bpm: historicData,
                    Bai: total,
                    emoji: selectedEmoji
                },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    })
                if (response.data) {
                    await resetAll();
                    await AsyncStorage.setItem(`dayData${user.id}`, dataAtual); // define nova data
                    setSaveComplete(true);
                }
            } else {
                setShowPopUp(false);
            }
        } catch (error) {
            console.log('Erro ao salvar dados:', error);
        }
    }



    useEffect(() => {
        (async () => {
            await getAsyncData();
            await setResults();
        })();
    }, []);
    return (
        <View style={styles.mainContainer}>
            <Topcurve />
            <View style={styles.header}>
                <Text style={styles.title}>Ola, {Nome}</Text>
                <Text style={styles.subtitle}>
                    como voce se sente agora?
                </Text>
                <View style={styles.emojis}>
                    <TouchableOpacity
                        style={[selectedEmoji === 0 && styles.emojitouched]}
                        onPress={() => handlePressEmoji(0)}
                    >
                        <Image source={icon.Sad} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[selectedEmoji === 1 && styles.emojitouched]}
                        onPress={() => handlePressEmoji(1)}
                    >
                        <Image source={icon.Pokerface} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[selectedEmoji === 2 && styles.emojitouched]}
                        onPress={() => handlePressEmoji(2)}
                    >
                        <Image source={icon.Smile} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.frase}>
                    Respire, Reconheça, Regule
                </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.BAIcontainer}>
                    <BaiSmoll resetTrigger={saveComplete} resetCounter={resetCounter} />
                </View>
                <TouchableOpacity style={styles.exercises} onPress={() => navigation.navigate('Exercises')}>
                    <Text style={styles.text}>
                        Iniciar Exercícios
                    </Text>
                    <Image source={icon.thinking}>
                    </Image>
                </TouchableOpacity>
            </View>

            {showPopUp && (
                <Animated.View style={[styles.popUp, { opacity: fadeAnim }]}>
                    {saveComplete ? (
                        <Text style={styles.popUpText}>Dados salvos com sucesso!</Text>
                    ) : (
                        <ActivityIndicator size="large" color="#0000ff" />
                    )}
                </Animated.View>
            )}

        </View>
    );

}

export default Home;