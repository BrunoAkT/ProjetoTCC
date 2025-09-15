import { Image, Modal, SafeAreaView, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { styles } from "./statistics.styles";
import icon from "../../constants/icon";
import HistoryGraph from "../../components/HistoryGraph";
import { useContext, useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../../contexts/auth";
import api from "../../constants/api";


function Statistics(params) {
    const { route } = params;
    const parts = route.params.date.split("/");
    const jsDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    const formatado = jsDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(false);
    }
    const onOpen = () => {
        setVisible(true);
    }

    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [max, setMax] = useState();
    const [timeMax, setTimeMax] = useState();
    const [avg, setAvg] = useState();
    const { user } = useContext(AuthContext);
    const id = route.params.id;

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
                setData(numbers);
                setLabels(horarios);
                setMax(Math.max(...numbers));
                setTimeMax(horarios[numbers.indexOf(max)]);
                setAvg(numbers.reduce((a, b) => a + b, 0) / numbers.length);
            } else {
                setData([]);
                setLabels([]);
            }
        } catch (e) {
            console.log('Erro ao buscar dados:', e);
            setData([]);
            setLabels([]);
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
                                <Text style={styles.modalText}>Pontuação: {route.params.points}</Text>
                                <Text style={styles.modalText}>Nivel: {
                                    route.params.points < 10 ? 'Baixa' :
                                        route.params.points < 19 ? 'Moderada' :
                                            route.params.points < 29 ? 'Alta' : 'Muito Alta'
                                }</Text>
                            </View>
                            <View>
                                <Text style={styles.modalSubTitle}>Frequência Cardíaca</Text>
                                {max && timeMax && avg ? (
                                    <View>
                                        <Text style={styles.modalText}>Máxima: {max} BPM</Text>
                                        <Text style={styles.modalText}>Hora da Máxima: {timeMax}</Text>
                                        <Text style={styles.modalText}>Média Diária: {avg.toFixed(1)} BPM</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.modalText}>Dados não disponíveis</Text>
                                )}
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            </Modal>
        </View>
    )
}

export default Statistics;