import { styles } from './frequency.styles'
import React, { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Animated, Keyboard, ActivityIndicator, FlatList, Pressable, KeyboardAvoidingView } from 'react-native';
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
import { Colors } from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InstructionModal from '../../components/InstructionModal';



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

  const minPeakWidth = 2;

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
        if (values[j] > currentValue) break;
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

          // --- NOVA VERIFICAÇÃO DE LARGURA ---
          let width = 1;
          // Verifica à esquerda
          for (let j = i - 1; j > 0 && values[j] > values[j - 1] && values[j] > rightValley; j--) {
            width++;
          }
          // Verifica à direita
          for (let j = i + 1; j < values.length - 1 && values[j] > values[j + 1] && values[j] > leftValley; j++) {
            width++;
          }

          if (width >= minPeakWidth) {
            peaks.push(i);
          }
          // ------------------------------------
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

function calculateRMSSD(rrIntervals: number[]): number {
  if (rrIntervals.length < 2) return 0;

  let sumOfSquares = 0;
  for (let i = 1; i < rrIntervals.length; i++) {
    const diff = rrIntervals[i] - rrIntervals[i - 1];
    sumOfSquares += diff * diff;
  }

  const meanSquare = sumOfSquares / (rrIntervals.length - 1);
  return Math.sqrt(meanSquare);
}

// Coloque esta função junto com as outras funções auxiliares no topo do arquivo
function getMedian(values: number[]): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const middleIndex = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    // Se for par, média dos dois do meio
    return (sorted[middleIndex - 1] + sorted[middleIndex]) / 2;
  } else {
    // Se for ímpar, o valor do meio
    return sorted[middleIndex];
  }
}
function Frequency({ route }) {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext)
  const [isInstructionVisible, setIsInstructionVisible] = useState(true);


  //Componente de Anotação
  const [isVisibleTab, setIsVisibleTab] = useState(false);
  const slideAnim = useRef(new Animated.Value(-500)).current;
  const ShowTab = () => {
    setIsVisibleTab(true)
    Animated.timing(slideAnim, {
      toValue: 100,
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

  const calibrationDataRef = useRef<number[]>([]);
  // Crie um estado para armazenar o limiar de proeminência

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


  const [resultRmssd, setResultRmssd] = useState<number | null>(null); // NOVO ESTADO
  const measurementResultsRef = useRef<{ bpm: number | null; rrIntervals: number[] } | null>(null);
  const allRmssdValuesRef = useRef<number[]>([]); // NOVO REF



  const savePPGValue = useCallback((result: { ac: number, dc: number }) => {
    // 1. Portão de Qualidade: o dedo está na câmera?
    if (result.dc < 180) {
      if (isFingerDetectedRef.current) { // Apenas reseta se estava detectado antes
        setIsFingerDetected(false);
        setIsCalibrated(false);
        setCalibrationData([]);
        setData([]);
        calibrationDataRef.current = [];

      }
      return;
    }

    if (!isFingerDetectedRef.current) {
      setIsFingerDetected(true);
    }

    // 2. Fase de Calibração
    if (isFingerDetectedRef.current && !isCalibratedRef.current) {
      // // Usando a forma funcional para garantir que estamos adicionando ao array mais recente

      // OLD
      // setCalibrationData(prevCalibrationData => {
      //   const newCalibrationData = [...prevCalibrationData, result.ac];

      //   console.log(`Calibrando... ${newCalibrationData.length}/90`);

      //   // A lógica de finalização de calibração vai aqui dentro
      //   if (newCalibrationData.length >= 90) {
      //     console.log("Calibração concluída! Iniciando medição.");
      //     setIsCalibrated(true);
      //     setShowMeasurementView(true); // inicia exibição da View
      //     setTimer(15); // reseta o timer
      //     // Prepara para a próxima medição limpando os dados de calibração
      //     return [];
      //   }

      //   // Continua a calibração retornando o novo array
      //   return newCalibrationData;
      // });
      // return; // Sai da função durante a calibração


      calibrationDataRef.current.push(result.ac); // Adiciona ao ref, sem re-renderizar

      console.log(`Calibrando... ${calibrationDataRef.current.length}/150`);

      // Processa a cada 30 frames (1 segundo)
      if (calibrationDataRef.current.length >= 150) {
        const lastSecondData = calibrationDataRef.current.slice(-150);
        const stdDev = getStandardDeviation(lastSecondData);
        console.log(`[CALIBRAÇÃO] Desvio Padrão do sinal: ${stdDev}`);

        // Se o desvio padrão for baixo, o sinal está estável.
        // O valor 0.005 é empírico e pode ser ajustado.
        if (stdDev < 0.005) {
          console.log("[CALIBRAÇÃO] Sinal estabilizado. Iniciando medição.");
          calibrationDataRef.current = []; // Limpa para a próxima
          setIsCalibrated(true);
          setShowMeasurementView(true);
          setTimer(15);
        } else {
          // Se o sinal não estiver estável, remove dados antigos para continuar calibrando
          if (calibrationDataRef.current.length > 150) {
            calibrationDataRef.current.splice(0, 30);
          }
        }
      }
      return;
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


  function calculateAge(dataNascStr) {
    const [dia, mes, ano] = dataNascStr.split("/").map(Number);
    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    if (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)) {
      idade--;
    }
    return idade;
  }

  const measurementResults = useMemo(() => {
    // Processar apenas quando tivermos dados suficientes (ex: 5 segundos de dados a 30 FPS)
    const MIN_SAMPLES = 150;
    if (data.length < MIN_SAMPLES) {
      return { bpm: null, rrIntervals: [] }; // Sem dados suficientes
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
    const minPeakDistance = fps * (60 / (220 - calculateAge(user.data_nasc))); // A FC máxima é determinada pela idade 
    // Use o desvio padrão para definir a proeminência dinamicamente!
    // Multiplicar por um fator (ex: 1.5) se precisar de mais seletividade.

    const minPeakProminence = signalStdDev * 1.2;

    //console.log(`Proeminência Mínima Usada: ${minPeakProminence}`);

    const peakIndices = detectPeaks(filteredValues, minPeakDistance, minPeakProminence);
    //console.log(`Picos detectados: ${peakIndices} com proeminência mínima de ${minPeakProminence}`);
    //console.log(`Número de picos detectados: ${peakIndices}`);

    if (peakIndices.length < 2) {
      //console.log('Não há picos suficientes para calcular')
      return null; // Não há picos suficientes para calcular
    }

    const peakTimes = peakIndices.map((index) => times[index]);
    //console.log(`Tempos dos picos: ${peakTimes}`);

    const rrIntervals = [];
    for (let i = 1; i < peakTimes.length; i++) {
      const interval = peakTimes[i] - peakTimes[i - 1];
      rrIntervals.push(interval);
    }
    //console.log(`Intervalo RR: ${rrIntervals} ms`);

    const rrIntervalsClean = rrIntervals.filter((interval, index, arr) => {
      if (index === 0) return true; // Mantém o primeiro intervalo
      const prevInterval = arr[index - 1];
      const diffPercent = Math.abs(interval - prevInterval) / prevInterval;

      // Remove o intervalo se ele for mais de 30% diferente do anterior.
      // Este é um filtro simples, mas eficaz para remover grandes erros.
      return diffPercent <= 0.30;
    });

    //console.log(`Intervalo RR: ${rrIntervalsClean} ms`);


    const calculatedBpm = calculateBPM(peakTimes);
    //console.log(`BPM calculado: ${calculatedBpm}`);

    // 3. Validação do BPM
    // Se o BPM estiver fora de uma faixa razoável, ignore-o.
    if (calculatedBpm > 40 && calculatedBpm < 220) {
      return {
        bpm: Math.round(calculatedBpm),
        rrIntervals: rrIntervalsClean // Retorna os intervalos limpos
      };
    }


    return { bpm: null, rrIntervals: [] }
  }, [data]);

  useEffect(() => {
    measurementResultsRef.current = measurementResults;
    if (measurementResults?.rrIntervals && measurementResults.rrIntervals.length > 1) {
      const instantRmssd = calculateRMSSD(measurementResults.rrIntervals);
      if (instantRmssd > 0) { // Adiciona apenas valores válidos
        allRmssdValuesRef.current.push(instantRmssd);
      }
    }
  }, [measurementResults]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showMeasurementView) {
      setResultBpm(null); // limpa resultado anterior quando iniciar nova medição
      setResultRmssd(null); // Limpa o resultado anterior
      savedResultRef.current = false;
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (interval) clearInterval(interval);
            setShowMeasurementView(false); // esconde a View após 30s
            setIsCalibrated(false); // reset calibrado


            const finalBpm = measurementResultsRef.current?.bpm ?? null;
            const medianRmssd = getMedian(allRmssdValuesRef.current);



            setResultBpm(finalBpm);
            setResultRmssd(medianRmssd);
            allRmssdValuesRef.current = [];

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


  useEffect(() => {
    bpmRef.current = measurementResults?.bpm ?? null;
  }, [measurementResults]);

  const [HistoricData, setHistoricData] = useState<{ time: string, bpm: number[] }[]>([])
  const [TextData, setTextData] = useState<string>("")



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

  const saveTextData = async () => {
    try {
      await AsyncStorage.setItem(`textData${user.id}`, TextData);
    } catch (error) {
      console.error('Erro ao salvar dados de texto:', error);
    }
  }


  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem(`historicData${user.id}`)
      if (stored) {
        setHistoricData(JSON.parse(stored))
      }
      const storedText = await AsyncStorage.getItem(`textData${user.id}`);
      if (storedText) {
        setTextData(storedText)
        console.log('Texto carregado com sucesso!', storedText);
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

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const handleChangeText = (text: string) => {
    setTextData(text);
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      saveTextData();
    }, 1000);
  }

  useEffect(() => {
    loadData();
  }, []);

  function getExerciseRecommendation(bpm: number | null) {
    if (bpm == null) return null;
    if (bpm > 120) {
      return {
        title: "Relaxe Imediatamente",
        description: "Sua frequência está muito alta. Sente-se, respire fundo e experimente um exercício de respiração guiada.",
        type: "respiracao",
        iconName: "heartbeat"
      };
    }
    if (bpm > 110) {
      return {
        title: "Pausa para Relaxamento",
        description: "Sua frequência está alta. Experimente uma meditação curta ou alongamento leve.",
        type: "meditacao",
        iconName: "hands"
      };
    }
    if (bpm > 90) {
      return {
        title: "Alongamento Sugerido",
        description: "Sua frequência está levemente elevada. Que tal um alongamento ou caminhada leve?",
        type: "alongamento",
        iconName: "running"
      };
    }
    return {
      title: "Continue Assim!",
      description: "Sua frequência está dentro do normal. Continue com seus hábitos saudáveis!",
      type: "normal"
    };
  }
  const recommendation = getExerciseRecommendation(resultBpm);


  const [isLayoutReady, setIsLayoutReady] = useState(false);
  if (!hasPermission) return <PermissionsPage />
  if (device == null) return <NoCameraDeviceError />


  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <InstructionModal
        visible={isInstructionVisible}
        onClose={() => setIsInstructionVisible(false)}
      />
      <Pressable onPress={Keyboard.dismiss}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{dataFormatada ?? 'Erro na Data'}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <RealTimeGraph dataPoints={graphData}></RealTimeGraph>
        </View>
      </Pressable>

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
                (isCalibrated ? <Text style={styles.averageText}>{measurementResults?.bpm}</Text> : <ActivityIndicator size={'large'} style={{ marginRight: 10 }} />)
                :
                <Text style={styles.averageText}>{resultBpm}</Text>
              }
              <Text style={styles.BPMText}>BPM</Text>
            </View>

            <View>
              {resultRmssd != null && (
                <View style={styles.RMSSDContainer}>
                  <Text style={styles.text}>{resultRmssd.toFixed(0)}</Text>
                  <Text style={styles.text}>ms (RMSSD)</Text>
                </View>
              )}
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
          <Text style={styles.recomendationText}>
            {recommendation ? recommendation.title : "Recomendação"}
          </Text>
          <Text style={styles.recomendationText}>
            {recommendation ? recommendation.description : ""}
          </Text>

        </View>

        <View style={styles.functionContainers}>
          {recommendation && recommendation.type !== "normal" && (
            <TouchableOpacity
              style={styles.exerciciesContainer}
              onPress={() => navigation.navigate('Exercises')}
            >
              <Icon name={recommendation.iconName} size={75} color={Colors.dark_gray} />
            </TouchableOpacity>
          )}
        </View>

        <View>
          <FlatList
            style={styles.historicList}
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

      <Animated.View style={[styles.animatedContainer, { bottom: slideAnim }]}>
        <View style={styles.annotationHeader}>
          <Text style={styles.BPMText}>Anotações •</Text>
        </View>
        <View style={styles.infContainer}>
          <TextInput
            value={TextData}
            placeholder='Adicione Notas Sobre:'
            placeholderTextColor={"#000000ff"}
            style={styles.infInput}
            onFocus={ShowTab}
            onBlur={HiddeTab}
            multiline={true}
            onChangeText={handleChangeText}
          />
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  )
}
export default Frequency