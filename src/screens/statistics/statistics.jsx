import { Image, Modal, SafeAreaView, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { styles } from "./statistics.styles";
import icon from "../../constants/icon";
import HistoryGraph from "../../components/HistoryGraph";
import { useContext, useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../../contexts/auth";
import api from "../../constants/api";

function getMedian(values) {
    if (!values || values.length === 0 || values === null) {
        return 0;
    }
    // Ordena os valores
    const sorted = [...values].sort((a, b) => a - b);
    const middleIndex = Math.floor(sorted.length / 2);

    // Verifica se a quantidade de itens é par ou ímpar
    if (sorted.length % 2 === 0) {
        // Se for par, retorna a média dos dois valores centrais
        return (sorted[middleIndex - 1] + sorted[middleIndex]) / 2;
    } else {
        // Se for ímpar, retorna o valor central
        return sorted[middleIndex];
    }
}

const SUA_CHAVE_GEMINI = 'AIzaSyDLF2dqusYqGGxF77HsMzgxaWjOjid4sC4'



function Statistics(params) {
    const { route } = params;
    const parts = route.params.date.split("/");
    const jsDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const formatado = jsDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(false);
    }
    const onOpen = () => {
        setVisible(true);
    }

    const [insight, setInsight] = useState('Insight sobre a atividade.');
    const [data, setData] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [labels, setLabels] = useState([]);
    const [max, setMax] = useState();
    const [timeMax, setTimeMax] = useState();
    const [avg, setAvg] = useState();
    const { user } = useContext(AuthContext);
    const id = route.params.id;


    const [dailyRmssd, setDailyRmssd] = useState(null);

    async function gerarExplicacaoIA() {
        setInsight('');
        setCarregando(true);
        try {
            const humor = route.params.emoji === 0 ? 'Triste' : route.params.emoji === 1 ? 'Neutro' : 'Feliz';
            const points = route.params.points;
            const nivelAnsiedade = (points === null || points === undefined) ? 'Não Registrado' : points < 10 ? 'Baixa' : points < 19 ? 'Moderada' : 'Alta';

            const prompt = `
                # Persona e Objetivo

        Você é um assistente de bem-estar chamado Aura. Sua missão é analisar os dados diários de um usuário e oferecer um insight curto (2-3 frases), em português, com uma linguagem empática, validando os sentimentos do usuário e encorajando a autorreflexão. O objetivo não é diagnosticar, mas sim ajudar o usuário a se sentir visto e compreendido em sua jornada de bem-estar.

        # Instruções

        1.  **Analise a Combinação:** Baseie seu insight na combinação de todos os dados: humor, ansiedade, anotação e o dado fisiológico (RMSSD). A anotação do usuário é a informação mais importante, pois contém o contexto pessoal. Use se for preciso a comparação do BAI realizado naquele dia com o BAI do perfil do usuário (realizado em um momento anterior) para enriquecer a análise.
        2.  **Tom de Voz:** Seja sempre acolhedor, gentil e nunca julgador. Use frases como "Percebo que...", "É compreensível que...", "Obrigado por compartilhar...".
        3.  **Restrição Crítica:** NUNCA forneça conselhos médicos, diagnósticos ou sugira tratamentos. Em vez disso, incentive a autocompaixão e o autoconhecimento.
        4.  **Lidando com o RMSSD:** Trate o RMSSD como um indicador secundário. Lembre-se de que seus valores são individuais e a medição por PPG pode ser imprecisa. Não tire conclusões fortes baseadas apenas nele. Se os dados parecerem conflitantes (ex: humor "Feliz" com RMSSD baixo), reconheça a complexidade do dia.

        # Exemplos de Respostas Ideais

        **Exemplo 1 (Dia positivo):**
        * **Dados:**
            * Humor: "Feliz"
            * Nível de Ansiedade (BAI): "Mínimo" (Pontuação: 5)
            * RMSSD: 88.30 ms
            * Anotação: "Tive uma ótima reunião de trabalho e consegui treinar."
        * **Insight Ideal:** "Que ótimo ver que seu dia foi preenchido com conquistas e bem-estar! É muito bom quando nossos esforços, como o treino e o trabalho, se refletem em como nos sentimos."

        **Exemplo 2 (Dia difícil):**
        * **Dados:**
            * Humor: "Triste"
            * Nível de Ansiedade (BAI): "Grave" (Pontuação: 35)
            * RMSSD: 55.10 ms
            * Anotação: "Muita pressão no trabalho, não consegui lidar bem."
        * **Insight Ideal:** "Obrigado por compartilhar. Parece que hoje foi um dia realmente desafiador, e seus sentimentos sobre a pressão são totalmente válidos. Lembre-se de ser gentil consigo mesmo, especialmente em dias difíceis."

        **Exemplo 3 (Dados conflitantes):**
        * **Dados:**
            * Humor: "Ok"
            * Nível de Ansiedade (BAI): "Moderado" (Pontuação: 20)
            * RMSSD: 48.50 ms
            * Anotação: "O dia foi produtivo, mas me senti sobrecarregado o tempo todo."
        * **Insight Ideal:** "Percebo que, mesmo com a produtividade, o sentimento de sobrecarga esteve presente hoje. É corajoso da sua parte reconhecer essa dualidade; validar o que sentimos é um passo importante para o equilíbrio."

        **Exemplo 4 (Sem dados fisiológicos):**
        * **Dados:**
            * Humor: "Ansioso"
            * Nível de Ansiedade (BAI): "Moderado" (Pontuação: 18)
            * RMSSD: "Não medido"
            * Anotação: "Pensando muito sobre a apresentação de amanhã."
        * **Insight Ideal:** "É totalmente compreensível sentir essa ansiedade com um evento importante se aproximando. Reconhecer a fonte dessa expectativa já é um grande passo para lidar com ela."

        # Tarefa

        Agora, analise os seguintes dados do usuário para o dia de hoje e gere o insight, seguindo todas as regras e exemplos acima.

        **Dados do dia:**
        -   Humor auto-reportado: ${humor}
        -   Nível de Ansiedade (BAI): ${nivelAnsiedade} (Pontuação: ${route.params.points})
        -   Nível de Ansiedade Marcada No Perfil: ${user.ansiedade_points}
        -   RMSSD (indicador de estresse fisiológico): ${dailyRmssd ? dailyRmssd.toFixed(2) + ' ms' : 'Não medido'}
        -   Anotação do usuário: "${route.params.anotation || 'Nenhuma anotação'}"
        Baseado nesses dados, gere o insight.`;
            const respostaAPI = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${SUA_CHAVE_GEMINI}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                    }),
                }
            );

            const data = await respostaAPI.json();
            if (data.error) {
                throw new Error(data.error.message);
            }

            const textoGerado = data.candidates?.[0]?.content?.parts?.[0]?.text;
            setInsight(textoGerado || 'Não foi possível gerar um insight. Tente novamente.');

        } catch (err) {
            console.error('Erro ao gerar insight:', err);
            setInsight('Ocorreu um erro ao contatar a IA. Verifique sua conexão ou chave de API.');
        }
        setCarregando(false);
    }

    async function fetchData() {
        try {
            if (!user?.token || !id) return;
            const response = await api.get(`/bpm/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.data) {
                const numbers = response.data.map(it => Number(it.bpm) || 0);
                const horarios = response.data.map(it => it.horario || '');

                //console.log('Dados recebidos:', response.data);
                console.log(route.params.points)

                const allRmssdValues = response.data.flatMap(it => {
                    try {
                        // Verifica se o campo RMSSD existe e é uma string antes de fazer o parse
                        if (it.RMSSD && typeof it.RMSSD === 'string') {
                            return JSON.parse(it.RMSSD);
                        }
                        return []; // Retorna array vazio se não houver dados
                    } catch (e) {
                        console.error("Erro ao fazer parse do RMSSD:", e);
                        return []; // Retorna array vazio em caso de erro no parse
                    }
                });

                const medianRmssd = getMedian(allRmssdValues);

                const maxValue = Math.max(...numbers);
                const maxIndex = numbers.indexOf(maxValue);
                const maxTime = horarios[maxIndex];
                const avgValue = numbers.reduce((a, b) => a + b, 0) / numbers.length;

                setData(numbers);
                setLabels(horarios);
                setMax(maxValue);
                setTimeMax(maxTime);
                setAvg(avgValue);

                setDailyRmssd(medianRmssd); // Salva o valor da mediana no estado
            } else {
                setData([]);
                setLabels([]);
                setDailyRmssd(null); // Limpa em caso de não haver dados

            }
        } catch (e) {
            console.log('Erro ao buscar dados:', e);
            setData([]);
            setLabels([]);
            setDailyRmssd(null); // Limpa em caso de não haver dados

        }
    }

    useEffect(() => {
        fetchData();
    }, [id, user?.token]);


    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{formatado}</Text>
                <HistoryGraph data={data} labels={labels} />
            </View>
            <View style={styles.container}>
                <View style={styles.midContainer}>

                    {max && timeMax ? (

                        <View style={styles.frequencyFormat}>
                            <Text style={styles.text}>Maxima</Text>
                            <View style={styles.FrequencyNumberFormat}>
                                <Text style={styles.averageText}>{max}</Text>
                                <Text style={styles.BPMText}>BPM</Text>
                            </View>
                            <Text style={styles.text}>Valor de {timeMax}</Text>
                        </View>
                    ) : (
                        <Text style={styles.text}>Nenhum dado{"\n"} disponível</Text>
                    )
                    }
                    <TouchableOpacity style={styles.summaryContainer} onPress={onOpen}>
                        <View style={styles.sumarryResult}>
                            <Text style={styles.resultText}>Resumo Diário</Text>
                            {
                                route.params.emoji === 0 ? (
                                    <Image source={icon.Sad}></Image>
                                ) : route.params.emoji === 1 ? (
                                    <Image source={icon.Pokerface}></Image>
                                ) : route.params.emoji === 2 ? (
                                    <Image source={icon.Smile}></Image>
                                ) : (
                                    <Image source={icon.thinking}></Image>
                                )
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.infContainer}>
                    <Text style={styles.infTitle}>Anotações</Text>
                    <ScrollView>
                        <View style={styles.infContent}>
                            <Text style={styles.infText}>{route.params.anotation}</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <Modal
                transparent={true}
                animationType="fade"
                onRequestClose={onClose}
                visible={visible}
            >
                <View style={styles.overlay}>
                    <SafeAreaView style={styles.content}>
                        <ScrollView>
                            <TouchableOpacity style={styles.close} onPress={onClose}>
                                <Ionicons name="close" size={24} />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.modalTitle}>Resumo do Dia</Text>
                                <View>
                                    <Text style={styles.modalSubTitle}>Estado Emocional Selecionado</Text>
                                    <View style={styles.emojiSection}>
                                        <Image source={route.params.emoji === 0 ? icon.Sad : route.params.emoji === 1 ? icon.Pokerface : route.params.emoji === 2 ? icon.Smile : icon.thinking} />
                                        <Text style={styles.modalText}>
                                            {
                                                route.params.emoji === 0 ? 'Triste' :
                                                    route.params.emoji === 1 ? 'Neutro' :
                                                        route.params.emoji === 2 ? 'Feliz' : 'Indefinido'
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.modalSubTitle}>Resultado BAI</Text>

                                    {route.params.points === null || route.params.points === undefined ? <Text style={styles.modalText}>Não Registrado</Text> :
                                        <View>
                                            <Text style={styles.modalText}>Pontuação: {route.params.points}</Text>
                                            <Text style={styles.modalText}>Nivel: {

                                                route.params.points < 10 ? 'Baixa' :
                                                    route.params.points < 19 ? 'Moderada' :
                                                        route.params.points < 29 ? 'Alta' : 'Muito Alta'
                                            }</Text>
                                        </View>
                                    }
                                </View>
                                <View>
                                    <Text style={styles.modalSubTitle}>Frequência Cardíaca</Text>
                                    {max && timeMax && avg ? (
                                        <View>
                                            <Text style={styles.modalText}>Máxima: {max} BPM</Text>
                                            <Text style={styles.modalText}>Hora da Máxima: {timeMax}</Text>
                                            <Text style={styles.modalText}>Média Diária: {avg.toFixed(1)} BPM</Text>
                                            {dailyRmssd > 0 && (
                                                <Text style={styles.modalText}>RMSSD Diário: {dailyRmssd.toFixed(2)} ms</Text>
                                            )}
                                            <View style={styles.card}>
                                                <Text style={styles.modalSubTitle}>Insight</Text>
                                                <Text style={styles.modalText}>{insight}</Text>
                                            </View>
                                            <TouchableOpacity style={styles.insightButton} onPress={gerarExplicacaoIA} disabled={carregando}>
                                                <Text style={styles.insightButtonText}>{carregando ? 'Gerando...' : 'Gerar Insight com IA'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <Text style={styles.modalText}>Dados não disponíveis</Text>
                                    )}
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </Modal>
        </View>
    )
}

export default Statistics;