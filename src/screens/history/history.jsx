import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { styles } from './history.styles'
import Topcurve from "../../components/Topmidcurve"
import HistoryValues from "../../components/HistoryValues"
import { TextInputMask } from "react-native-masked-text"
import { useState } from "react"
import { savedHistory } from '../../constants/dataTest'

function History() {
    const [classification, setClassification] = useState();

    return (
        <View style={styles.mainContainer}>
            <Topcurve></Topcurve>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Historico e Estatísticas
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInputMask
                    type={'datetime'}
                    options={{
                        format: 'DD/MM/YYYY'
                    }}
                    placeholder="00/00/0000"
                    style={styles.inputsm}
                    keyboardType="numeric"
                    value={classification}
                    onChangeText={setClassification}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={savedHistory}
                    keyExtractio={(item) => item.id}
                    renderItem={({ item }) => (
                        <HistoryValues
                            date={item.date}
                            emoji={item.emoji}
                        ></HistoryValues>
                    )}
                    style={styles.flatListContainer}
                >
                </FlatList>
            </View>
        </View>
    )
}
export default History