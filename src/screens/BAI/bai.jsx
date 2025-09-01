import { ActivityIndicator, Animated, Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';
import { questions } from '../../constants/data';
import icon from "../../constants/icon";
import { styles } from "./bai.styles";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from '../../constants/api';


const { width } = Dimensions.get('window');

function BaiQuestionario() {
    const { id } = useRoute().params;
    const navigation = useNavigation();


    const [currentIndex, setCurrentIndex] = useState(0);
    const [Answers, setAnswers] = useState({});

    const returnToPrevious = () => setCurrentIndex(currentIndex - 1);

    const handleAnswer = (value) => {
        const currentQuestion = questions[currentIndex];
        setAnswers({ ...Answers, [currentQuestion.id]: value })

        if (currentIndex + 1 <= questions.length) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;


    if (currentIndex >= questions.length) {
        const total = Object.values(Answers).reduce((sum, val) => sum + val, 0);
        let interpretation = "";

        if (total < 10) interpretation = "Ansiedade mínima";
        else if (total < 19) interpretation = "Ansiedade leve";
        else if (total < 29) interpretation = "Ansiedade moderada";
        else interpretation = "Ansiedade grave";

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 6000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(async () => {
            try {
                console.log(total)
                console.log('mandando')
                const response = await api.put(`/user/bai/${id}`, {
                    bai: total
                });
                if (response.data) {
                    console.log(response.data);
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.log('erro', error)

                if (error.response?.data.error) {
                    Alert.alert("Erro ao enviar Dados", error.response.data.error);
                } else {
                    Alert.alert("Erro ao enviar Dados", error.message);
                }
            }
        }, 6000);



        return (
            <View style={styles.mainContainer}>
                <Animated.View style={[styles.resultContainer, { transform: [{ scale: scaleAnim }] }]}>
                    <Text style={styles.title}>Resultado</Text>
                    <Text style={styles.text}>Pontuação: {total}</Text>
                    <Text style={styles.text}>{interpretation}</Text>
                </Animated.View>

                <Animated.View style={[styles.footerContainer, { opacity: fadeAnim }]}>
                    <ActivityIndicator size={80} color={styles.progressColor} style={{ marginTop: 20 }} />
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Você pode refazer o questionário novamente em seu Perfil</Text>
                    </View>
                </Animated.View>
            </View >
        );
    }

    const currentQuestion = questions[currentIndex];
    const progress = (currentIndex + 1) / questions.length;


    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconbutton} onPress={returnToPrevious} disabled={currentIndex === 0}>
                    <Image source={icon.next} />
                </TouchableOpacity>
                <View style={styles.headerBar}>
                    <Progress.Bar
                        progress={progress}
                        color={styles.progressColor}
                        unfilledColor={styles.progressbackgroundColor}
                        width={width - 80}
                        height={12}
                        style={styles.progressBar}
                    />
                </View>
            </View>
            <Text style={[styles.text, styles.textheader]}>
                {`${currentIndex} de ${questions.length}`}
            </Text>
            <View>
                <Text style={styles.question}>{currentQuestion.text}</Text>
                <View>
                    <Text style={styles.text}>Quando você se sente ansioso, o quanto esse sintoma te incomoda?</Text>
                </View>
                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionButton}
                            onPress={() => handleAnswer(option.value)}
                        >
                            <Text style={styles.optionText}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View >
    );
}

export default BaiQuestionario;