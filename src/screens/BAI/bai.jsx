import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';
import { questions } from '../../constants/data';
import icon from "../../constants/icon";
import { styles } from "./bai.styles";
import { useState } from "react";

const { width } = Dimensions.get('window');

function BaiQuestionario() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [Answers, setAnswers] = useState({});
    const progress = (currentIndex + 1) / questions.length;

    const returnToPrevious = () => setCurrentIndex(currentIndex - 1);

    const handleAnswer = (value) => {
        const currentQuestion = questions[currentIndex];
        setAnswers({ ...Answers, [currentQuestion.id]: value })

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        }
    }
    const currentQuestion = questions[currentIndex];


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
                    <Text style={styles.text}>Quanto isso te incomodou nos últimos {"\n"}7 dias?</Text>
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