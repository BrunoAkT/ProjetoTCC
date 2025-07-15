import { Image, Text, View } from "react-native";
import { styles } from "./statistics.styles";
import icon from "../../constants/icon";
import HistoryGraph from "../../components/HistoryGraph";

function Statistics(params) {
    const { route } = params;
    const dataAtual = new Date(route.params.date);
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'America/Sao_Paulo'
    });

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{dataFormatada}</Text>
                <HistoryGraph data={route.params.frequency}></HistoryGraph>
            </View>
            <View style={styles.container}>
                <View style={styles.midContainer}>
                    <View style={styles.frequencyFormat}>
                        <Text style={styles.text}>Maxima</Text>
                        <View style={styles.FrequencyNumberFormat}>
                            <Text style={styles.averageText}>{route.params.hight_frequency}</Text>
                            <Text style={styles.BPMText}>BPM</Text>
                        </View>
                        <Text style={styles.text}>Valor de {route.params.hight_frequency_time}</Text>
                    </View>
                    <View style={styles.summaryContainer}>
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
                    </View>
                </View>
                <View style={styles.infContainer}>
                    <Text style={styles.infTitle}>Anotações nesta Data</Text>
                    <View style={styles.infContent}>
                        <Text style={styles.infText}>{route.params.anotation}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Statistics;