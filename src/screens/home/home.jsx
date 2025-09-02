import { Image, Text, TouchableOpacity, View } from 'react-native';
import Topcurve from '../../components/Topmidcurve';
import { styles } from './home.styles'
import icon from '../../constants/icon';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BaiSmoll from '../BAI/baiSmoll';
import { AuthContext } from '../../contexts/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';



function Home() {

    const getAsyncData = async () => {
        try {
            const value = await AsyncStorage.getItem(`selectedEmoji${user.id}`);
            if (value !== null) {
                console.log(value)
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
        console.log(selectedEmoji);
    };

    const { user } = useContext(AuthContext)
    const Nome = user.nome;

    const navigation = useNavigation();

    useEffect(() => {
        getAsyncData();
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
        </View>
    );

}

export default Home;