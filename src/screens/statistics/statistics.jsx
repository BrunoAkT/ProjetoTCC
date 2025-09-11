import { Image, Modal, SafeAreaView, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { styles } from "./statistics.styles";
import icon from "../../constants/icon";
import HistoryGraph from "../../components/HistoryGraph";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';


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

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{formatado}</Text>
                <HistoryGraph id={route.params.id} />
            </View>
            <View style={styles.container}>
                <View style={styles.midContainer}>
                    <View style={styles.frequencyFormat}>
                        <Text style={styles.text}>Maxima</Text>
                        <View style={styles.FrequencyNumberFormat}>
                            <Text style={styles.averageText}>@</Text>
                            <Text style={styles.BPMText}>BPM</Text>
                        </View>
                        <Text style={styles.text}>Valor de TESte</Text>
                    </View>
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
                    <Text style={styles.infTitle}>Anotações nesta Data</Text>
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
                                <View>
                                    {/* <Text style={styles.modalText}>Máxima: {route.params.hight_frequency} BPM</Text>
                                    <Text style={styles.modalText}>Média: {route.params.avg_frequency} BPM</Text>
                                    <Text style={styles.modalText}>Hora Máxima: {route.params.hight_frequency_time}</Text> */}
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            </Modal>
        </View>
    )
}

export default Statistics;