import { styles } from './frequency.styles'
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import FrequencyGraph from '../../components/FrequencyGraph';
import icon from '../../constants/icon';


const { height } = Dimensions.get('window')

function Frequency() {
  const [averageFrequency, setaverageFrequency] = useState();
  const [timenow, setTimenow] = useState("15:40");

  const [isVisibleTab, setIsVisibleTab] = useState(false);

  const slideAnim = useRef(new Animated.Value(height - 100)).current

  const ShowTab = () => {
    setIsVisibleTab(true)
    Animated.timing(slideAnim, {
      toValue: height - 600,
      duration: 400,
      useNativeDriver: false
    }).start();
  }
  const HiddeTab = () => {
    Animated.timing(slideAnim, {
      toValue: 600,
      duration: 400,
      useNativeDriver: false
    }).start(() => setIsVisibleTab(false));
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>14 de Março 2025</Text>
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
            <Text style={styles.text}>valor de {timenow}</Text>
          </View>
        </View>
        <View style={styles.recomendationContainer}>
          <Text style={styles.recomendationText}>Respire</Text>
        </View>
        <View style={styles.functionContainers}>
          <TouchableOpacity style={styles.exerciciesContainer}>
            <Image></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stressContainer} onPress={ShowTab}>
            <Image source={icon.stress}></Image>
            <Text style={styles.stressText}>Níveis de Estresse</Text>
          </TouchableOpacity>

          {isVisibleTab && (
            <Animated.View style={{ top: slideAnim }} >
              <View style={{ height: 10, backgroundColor: '#ccc', borderRadius: 5, marginBottom: 10 }}>
                <TextInput placeholder='Adicione Notas Sobre:' style={styles.infInput} multiline={true}></TextInput>
              </View>
            </Animated.View>)}

        </View>

      </View>

    </View >
  )
}
export default Frequency