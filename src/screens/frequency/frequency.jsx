import { styles } from './frequency.styles'
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, TextInput, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FrequencyGraph from '../../components/FrequencyGraph';
import icon from '../../constants/icon';
import { useNavigation } from '@react-navigation/native';


const dataAtual = new Date();
const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Sao_Paulo'
});
const horarioFormatado = dataAtual.toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'America/Sao_Paulo'
});

function Frequency({ route }) {

  const [averageFrequency, setaverageFrequency] = useState();

  const [isVisibleTab, setIsVisibleTab] = useState(false);


  const slideAnim = useRef(new Animated.Value(-500)).current;

  const ShowTab = () => {
    setIsVisibleTab(true)
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 400,
      useNativeDriver: false
    }).start();
  }
  const HiddeTab = () => {
    Animated.timing(slideAnim, {
      toValue: -500,
      duration: 400,
      useNativeDriver: false
    }).start(() => setIsVisibleTab(false));
  }

  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{dataFormatada ?? 'Erro na Data'}</Text>
        </View>
        <FrequencyGraph onAverageChange={setaverageFrequency}></FrequencyGraph>
        <View style={styles.container}>
          <View style={styles.averageContainer}>
            <Image source={icon.HeartEmpty}></Image>
            <View style={styles.frequencyFormat}>
              <View style={styles.FrequencyNumberFormat}>
                <Text style={styles.averageText}>{averageFrequency}</Text>
                <Text style={styles.BPMText}>BPM</Text>
              </View>
              <Text style={styles.text}>valor de {horarioFormatado ?? 'Erro no Horario'}</Text>
            </View>
          </View>

          <View style={styles.recomendationContainer}>
            <Text style={styles.recomendationText}>Respire</Text>
          </View>

          <View style={styles.functionContainers}>
            <TouchableOpacity style={styles.exerciciesContainer} onPress={() => navigation.navigate('Exercises')}>
              <Image></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.stressContainer}>
              <Image source={icon.stress}></Image>
              <Text style={styles.stressText}>Níveis de Estresse</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={[styles.animatedContainer, { bottom: slideAnim }]}>
          <View style={styles.infContainer}>
            <TextInput
              placeholder='Adicione Notas Sobre:'
              style={styles.infInput}
              onFocus={ShowTab}
              onBlur={HiddeTab}
              multiline={true}
            />
          </View>
        </Animated.View>
      </View >
    </TouchableWithoutFeedback>
  )
}
export default Frequency 