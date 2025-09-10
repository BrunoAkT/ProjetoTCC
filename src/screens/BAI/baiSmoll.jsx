import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';
import { questions } from '../../constants/data';
import icon from "../../constants/icon";
import { styles } from "./baiSmoll.styles";
import { useContext, useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../../contexts/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width } = Dimensions.get('window');

function BaiSmoll({ resetTrigger, resetCounter }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [Answers, setAnswers] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (resetCounter && resetCounter > 0) {
      setCurrentIndex(0);
      setAnswers({});
      AsyncStorage.removeItem(`answers${user.id}`).catch(() => {});
      AsyncStorage.removeItem(`total${user.id}`).catch(() => {});
    }
  }, [resetCounter]);

  const returnToPrevious = () => setCurrentIndex(currentIndex - 1);

  const handleAnswer = (value) => {
    const currentQuestion = questions[currentIndex];
    setAnswers({ ...Answers, [currentQuestion.id]: value })

    if (currentIndex + 1 <= questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  useEffect(() => {
    if (resetTrigger) {
      setCurrentIndex(0);
      setAnswers({});
    }
  }, [resetTrigger]);

  useEffect(() => {
    LoadAsyncData();
  }, []);

  async function LoadAsyncData() {
    try {
      const data = await AsyncStorage.getItem(`answers${user.id}`);
      if (data) {
        setAnswers(JSON.parse(data));
        setCurrentIndex(questions.length);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  async function saveAsyncData(total) {
    try {
      await AsyncStorage.setItem(`answers${user.id}`, JSON.stringify(Answers));
      await AsyncStorage.setItem(`total${user.id}`, JSON.stringify(total));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  const resetAnswers = () => {
    setCurrentIndex(0);
    setAnswers({});
  }

  if (currentIndex >= questions.length) {
    const total = Object.values(Answers).reduce((sum, val) => sum + val, 0);
    let interpretation = "";

    if (total < 10) interpretation = "Ansiedade mínima";
    else if (total < 19) interpretation = "Ansiedade leve";
    else if (total < 29) interpretation = "Ansiedade moderada";
    else interpretation = "Ansiedade Alta";

    saveAsyncData(total);

    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.reloadButton} onPress={resetAnswers}>
          <Ionicons name="sync-circle-outline" size={40} color="#000" />
        </TouchableOpacity>
        <View style={styles.resultContainer}>
          <Text style={styles.optionText}>Resultado</Text>
          <Text style={styles.text}>Pontuação: {total}</Text>
          <Text style={styles.text}>{interpretation}</Text>
          <View style={styles.resultBox}>
            {Object.entries(Answers).map(([questionId, value]) => (
              <View key={questionId}  >
                <Text style={styles.textResult}>
                  Q{questionId} = {value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    )
  }

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex + 1) / questions.length;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={returnToPrevious} disabled={currentIndex === 0}>
          <Image source={icon.next} style={styles.iconbutton} />
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
          <Text style={styles.text}>Quanto isso te incomoda?</Text>
        </View>
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option.value)}
            >
              <View style={styles.optionContainer}>
                <View style={styles.circleoption}></View>
                <Text style={styles.optionText}>{option.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View >
  );
}

export default BaiSmoll;