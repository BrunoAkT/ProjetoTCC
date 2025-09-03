import { styles } from './frequency.styles'
import React, { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, TextInput, Animated, Keyboard, ActivityIndicator, FlatList, Pressable } from 'react-native';
import icon from '../../constants/icon';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import PermissionsPage from '../../components/Permission';
import NoCameraDeviceError from '../../components/NoCameraDeviceError';
import { Ppgtest } from '../../components/PPGConection';
import { Worklets } from 'react-native-worklets-core';
import { RealTimeGraph } from '../../components/RealTimeGraph';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/auth';


// Entrada Da Data Atual
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
  timeZone: 'America/Sao_Paulo'
});


//Filtro de Retirada de Ruido no Sinal Transmitido, Remove os Valores de Alta frequencia e Baixa frequencia
//O resultado é um sinal mais "limpo", centralizado próximo de zero, e com uma forma de onda mais suave
function bandpassFilter(data: number[], lowCutoff: number, highCutoff: number): number[] {
  // Esta é uma implementação simplificada usando médias móveis
  // Filtro Passa-Baixa (remove altas frequências)
  const lowPassFiltered = movingAverage(data, lowCutoff);

  // Filtro Passa-Alta (remove baixas frequências)
  const highPassFiltered = movingAverage(data, highCutoff);

  // O sinal final é o resultado do passa-baixa menos o passa-alta
  const bandPassFiltered = lowPassFiltered.map((value, index) => {
    return value - highPassFiltered[index];
  });

  return bandPassFiltered;
}
function movingAverage(data: number[], windowSize: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    // Para os primeiros elementos, a janela é menor
    const start = Math.max(0, i - windowSize + 1);
    const window = data.slice(start, i + 1);
    const avg = window.reduce((a, b) => a + b, 0) / window.length;
    result.push(avg);
  }
  return result;
}

// Função para calcular desvio padrão
// Mede o nível de variação do conjunto de números em relação à média.
function getStandardDeviation(array: number[]): number {
  const n = array.length;
  if (n === 0) return 0;
  const mean = array.reduce((a, b) => a + b) / n;
  const variance = array.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
  return Math.sqrt(variance);
}

function detectPeaks(values: number[], minDistance: number, minProminence: number): number[] {
  const peaks: number[] = [];
  if (values.length < 3) return peaks;

  for (let i = 1; i < values.length - 1; i++) {
    const currentValue = values[i];
    const prevValue = values[i - 1];
    const nextValue = values[i + 1];

    // É um pico local?
    if (currentValue > prevValue && currentValue > nextValue) {
      // Verifica a proeminência (quão alto é o pico em relação aos vales próximos)
      let leftValley = currentValue;
      for (let j = i - 1; j >= 0; j--) {
        leftValley = Math.min(leftValley, values[j]);
        if (values[j] > currentValue) break; // Parar se encontrarmos um pico maior
      }

      let rightValley = currentValue;
      for (let j = i + 1; j < values.length; j++) {
        rightValley = Math.min(rightValley, values[j]);
        if (values[j] > currentValue) break;
      }

      const prominence = currentValue - Math.max(leftValley, rightValley);

      if (prominence >= minProminence) {
        // Verifica a distância do último pico encontrado
        if (peaks.length === 0 || i - peaks[peaks.length - 1] >= minDistance) {
          peaks.push(i);
        }
      }
    }
  }
  return peaks;
}
function calculateBPM(timestamps: number[]): number {
  if (timestamps.length < 2) return 0;

  const intervals = [];
  for (let i = 1; i < timestamps.length; i++) {
    const delta = timestamps[i] - timestamps[i - 1]; // em ms
    intervals.push(delta);
  }

  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

  return 60000 / avgInterval; // ms -> bpm
}

function Frequency({ route }) {
  const navigation = useNavigation();

  //Componente de Anotação
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

  //Vision Camera Functions
  const device = useCameraDevice('back')
  const { hasPermission } = useCameraPermission()
  const format = useCameraFormat(device, [
    { videoResolution: 'auto' },
    { fps: 30 },
    { autoFocusSystem: 'none' }
  ])
  const [torch, setTorch] = useState<'on' | 'off'>('off');
  const [cameraReady, setCameraReady] = useState<boolean>(false);

  const [data, setData] = useState<{ time: number; value: number }[]>([])
  const [graphData, setGraphData] = useState<number[]>([]);

  const [isFingerDetected, setIsFingerDetected] = useState(false);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [calibrationData, setCalibrationData] = useState<number[]>([]);

  const isFingerDetectedRef = useRef(isFingerDetected);
  const isCalibratedRef = useRef(isCalibrated);

  useEffect(() => {
    isFingerDetectedRef.current = isFingerDetected;
    isCalibratedRef.current = isCalibrated;
  }, [isFingerDetected, isCalibrated]);

  useEffect(() => {
    if (cameraReady) {
      setTorch('on');
    }
  }, [cameraReady]);

  const [showMeasurementView, setShowMeasurementView] = useState(false);
  const [timer, setTimer] = useState(15); // contador de 15s

  const [resultBpm, setResultBpm] = useState<number | null>(null);
  const bpmRef = useRef<number | null>(null);
  // mantém ref atualizada com o último bpm calculado
  const savedResultRef = useRef(false); // flag para garantir execução única

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showMeasurementView) {
      setResultBpm(null); // limpa resultado anterior quando iniciar nova medição
      savedResultRef.current = false;
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (interval) clearInterval(interval);
            setShowMeasurementView(false); // esconde a View após 30s
            setIsCalibrated(false); // reset calibrado
            setResultBpm(bpmRef.current); // salva o resultado final
            setCameraReady(false);
            setTorch('off');
            return 0;
          }
          if (isCalibratedRef.current) {
            return prev - 1;
          }
          return prev;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showMeasurementView]);

  const savePPGValue = useCallback((result: { ac: number, dc: number }) => {
    // 1. Portão de Qualidade: o dedo está na câmera?
    if (result.dc < 180) {
      if (isFingerDetectedRef.current) { // Apenas reseta se estava detectado antes
        setIsFingerDetected(false);
        setIsCalibrated(false);
        setCalibrationData([]);
        setData([]);
      }
      return;
    }

    if (!isFingerDetectedRef.current) {
      setIsFingerDetected(true);
    }

    // 2. Fase de Calibração
    if (isFingerDetectedRef.current && !isCalibratedRef.current) {
      // Usando a forma funcional para garantir que estamos adicionando ao array mais recente
      setCalibrationData(prevCalibrationData => {
        const newCalibrationData = [...prevCalibrationData, result.ac];

        console.log(`Calibrando... ${newCalibrationData.length}/90`);

        // A lógica de finalização de calibração vai aqui dentro
        if (newCalibrationData.length >= 90) {
          console.log("Calibração concluída! Iniciando medição.");
          setIsCalibrated(true);
          setShowMeasurementView(true); // inicia exibição da View
          setTimer(15); // reseta o timer
          // Prepara para a próxima medição limpando os dados de calibração
          return [];
        }

        // Continua a calibração retornando o novo array
        return newCalibrationData;
      });
      return; // Sai da função durante a calibração
    }

    // 3. Fase de Medição
    if (isCalibratedRef.current) {
      const timestamp = Date.now();
      setData((prev) => [...prev.slice(-300), { time: timestamp, value: result.ac }]);
      setGraphData(prev => {
        const updated = [...prev, result.ac]
        if (updated.length > 15) updated.shift();
        return updated;
      });
    }
  }, []);

  const myFunctionJS = Worklets.createRunOnJS(savePPGValue);
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const heart = Ppgtest(frame)
    if (heart && typeof heart.ac === 'number' && typeof heart.dc === 'number') {
      myFunctionJS(heart)
      //console.log(heart)
    }
  }, [])


  const bpm = useMemo(() => {
    // Processar apenas quando tivermos dados suficientes (ex: 5 segundos de dados a 30 FPS)
    const MIN_SAMPLES = 150;
    if (data.length < MIN_SAMPLES) {
      return null; // Sem dados suficientes
    }

    const values = data.map((d) => d.value);
    const times = data.map((d) => d.time);

    //console.log(`valores capturados: ${values}`);

    // 1. Filtragem: Aplica uma média móvel para suavizar o ruído
    const filteredValues = bandpassFilter(values, 2, 10);
    //console.log(`filteredValues: ${filteredValues}`)

    // Calcule o desvio padrão do sinal filtrado
    const signalStdDev = getStandardDeviation(filteredValues);
    //console.log(`Desvio Padrão do Sinal: ${signalStdDev}`);

    // 2. Detecção de Picos
    const fps = 30; // O FPS que você configurou na câmera
    // Distância mínima: 40 bpm -> 1.5s/batida -> 1.5*30 = 45 frames
    const minPeakDistance = fps * (60 / 200); // Distância para 200 bpm (máximo)
    // Use o desvio padrão para definir a proeminência dinamicamente!
    // Multiplicar por um fator (ex: 1.5) se precisar de mais seletividade.
    const minPeakProminence = signalStdDev * 1.2;
    const peakIndices = detectPeaks(filteredValues, minPeakDistance, minPeakProminence);
    //console.log(`Picos detectados: ${peakIndices} com proeminência mínima de ${minPeakProminence}`);

    if (peakIndices.length < 2) {
      console.log('Não há picos suficientes para calcular')
      return null; // Não há picos suficientes para calcular
    }

    const peakTimes = peakIndices.map((index) => times[index]);
    //console.log(`Tempos dos picos: ${peakTimes}`);

    const calculatedBpm = calculateBPM(peakTimes);
    //console.log(`BPM calculado: ${calculatedBpm}`);

    // 3. Validação do BPM
    // Se o BPM estiver fora de uma faixa razoável, ignore-o.
    if (calculatedBpm > 40 && calculatedBpm < 200) {
      return Math.round(calculatedBpm);
    }

    return null
  }, [data]);

  useEffect(() => {
    bpmRef.current = typeof bpm === 'number' ? bpm : null;
  }, [bpm]);

  const [HistoricData, setHistoricData] = useState<{ time: string, bpm: number[] }[]>([])

  const { user } = useContext(AuthContext)

  const saveBpmData = async () => {
    try {
      const newEntry = { time: new Date().toLocaleTimeString(), bpm: resultBpm };

      const stored = await AsyncStorage.getItem(`historicData${user.id}`);
      const parsed = stored ? JSON.parse(stored) : []
      const updated = [...parsed, newEntry]

      await AsyncStorage.setItem(`historicData${user.id}`, JSON.stringify(updated));
      setHistoricData(updated);
    } catch (error) {
      console.error('Erro ao salvar dados históricos:', error);
    }
  }

  const loadBpmData = async () => {
    try {
      const stored = await AsyncStorage.getItem(`historicData${user.id}`)
      if (stored) {
        setHistoricData(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Erro ao carregar dados históricos:', e);
    }
  }
  useEffect(() => {
    if (resultBpm != null && !savedResultRef.current) {
      saveBpmData();
      console.log('Dado salvo:', resultBpm);
      savedResultRef.current = true;
    }
  }, [resultBpm]);

  useEffect(() => {
    loadBpmData();
  }, []);

  const [isLayoutReady, setIsLayoutReady] = useState(false);
  if (!hasPermission) return <PermissionsPage />
  if (device == null) return <NoCameraDeviceError />


  return (

    <Pressable style={styles.mainContainer} onPress={Keyboard.dismiss}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{dataFormatada ?? 'Erro na Data'}</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <RealTimeGraph dataPoints={graphData}></RealTimeGraph>
      </View>
      <View style={styles.container}>
        <View>
          {showMeasurementView ? (
            <View style={styles.measurementContainer}>
              <Text style={[styles.text, styles.alert, styles.textOnly]}>
                Medindo... {timer}s restantes
              </Text>
            </View>
          ) : (
            resultBpm == null ? <Text style={[styles.text, styles.alert]}>Coloque seu dedo na camera do celular</Text> : null
          )}
        </View>
        <View style={styles.averageContainer}>
          {
            data.length > 0 ? data[data.length - 1].value >= 0
              ? <Image source={icon.Heart}></Image> :
              <Image source={icon.HeartEmpty}></Image> : null
          }
          <View style={styles.frequencyFormat}>
            <View style={styles.FrequencyNumberFormat}>
              {resultBpm == null ?
                (isCalibrated ? <Text style={styles.averageText}>{bpm}</Text> : <ActivityIndicator size={'large'} style={{ marginRight: 10 }} />)
                :
                <Text style={styles.averageText}>{resultBpm}</Text>
              }

              <Text style={styles.BPMText}>BPM</Text>
            </View>
            <Text style={styles.text}>valor de {horarioFormatado ?? 'Erro no Horario'}</Text>
          </View>

          <View style={styles.camera} onLayout={() => setTimeout(() => setIsLayoutReady(true), 2000)}>
            {
              resultBpm == null ? (
                device != null && hasPermission && isLayoutReady && (
                  <Camera
                    style={styles.cameraVision}
                    device={device}
                    isActive={true}
                    torch={torch}
                    frameProcessor={frameProcessor}
                    format={format}
                    fps={format?.maxFps}
                    onInitialized={() => setCameraReady(true)}
                  />
                )) : <TouchableOpacity onPress={() => [setResultBpm(null), setTimeout(() => setCameraReady(true), 5000)]} style={styles.reloadButton}>
                <Ionicons name="sync-circle-outline" size={60} color="#000000ff" />
              </TouchableOpacity>
            }
          </View>
        </View>

        <View style={styles.recomendationContainer}>
          <Text style={styles.recomendationText}>Respire</Text>
        </View>

        <View style={styles.functionContainers}>
          <TouchableOpacity style={styles.exerciciesContainer} onPress={() => navigation.navigate('Exercises')}>
            <Image></Image>
          </TouchableOpacity>
        </View>

        <View >
          <FlatList
            style={styles.historicList}
            contentContainerStyle={{ flexGrow: 1 }} // 👈 Adicione esta linha 
            data={HistoricData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.HistoricFormat}>
                <Text style={styles.BPMText}>{item.time} - </Text>
                <Text style={styles.BPMText}>{item.bpm}bpm</Text>
              </View>
            )}
          >
          </FlatList>
        </View>


      </View>

      {/* <Animated.View style={[styles.animatedContainer, { bottom: slideAnim }]}>
          <View style={styles.infContainer}>
            <TextInput
              placeholder='Adicione Notas Sobre:'
              style={styles.infInput}
              onFocus={ShowTab}
              onBlur={HiddeTab}
              multiline={true}
            />
          </View>
        </Animated.View> */}
    </Pressable>
  )
}
export default Frequency