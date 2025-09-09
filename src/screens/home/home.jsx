import { ActivityIndicator, Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import Topcurve from '../../components/Topmidcurve';
import { styles } from './home.styles'
import icon from '../../constants/icon';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BaiSmoll from '../BAI/baiSmoll';
import { AuthContext } from '../../contexts/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home() {
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
    const [showPopUp, setShowPopUp] = useState(true);
    const fadeAnim = useRef(new Animated.Value(1)).current;

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
    const navigation = useNavigation();

    async function setResults() {
        console.log('User ID:', user.id);
        console.log(new Date().toLocaleDateString('pt-BR'));
        console.log("Anotações:", await AsyncStorage.getItem(`textData${user.id}`));
        console.log("BPM`s:", await AsyncStorage.getItem(`historicData${user.id}`));
        console.log("BAI:", await AsyncStorage.getItem(`total${user.id}`));
        console.log("Emoji:", await AsyncStorage.getItem(`selectedEmoji${user.id}`));
    }

    useEffect(() => {
        getAsyncData();
        setResults();
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
                    <BaiSmoll></BaiSmoll>
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