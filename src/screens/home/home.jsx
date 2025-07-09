import { Image, Text, TouchableOpacity, View } from 'react-native';
import Topcurve from '../../components/Topmidcurve';
import { styles } from './home.styles'
import icon from '../../constants/icon';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

function Home() {
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const handlePressEmoji = (index) => {
        setSelectedEmoji(index);
        console.log("Emoji pressionado!", index);
    };
    const Nome = "Bruno";

    const navigation = useNavigation();
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

                </View>
                <TouchableOpacity style={styles.exercises} onPress={() => navigation.navigate('Frequency')}>
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