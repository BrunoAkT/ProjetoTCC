import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { styles } from './history.styles'
import Topcurve from "../../components/Topmidcurve"
import HistoryValues from "../../components/HistoryValues"
import { TextInputMask } from "react-native-masked-text"
import { useContext, useEffect, useState } from "react"
import api from "../../constants/api"
import { AuthContext } from "../../contexts/auth"
import Ionicons from 'react-native-vector-icons/Ionicons';


function History() {
    const [classification, setClassification] = useState([]);
    const [classificationfilter, setClassificationfilter] = useState([]);
    const { user } = useContext(AuthContext);


    const [savedHistory, setSavedHistory] = useState();
    async function LoadHistoric() {
        try {
            const response = await api.get(`/history/${user.id}`, {
                params: {
                    start: classification || undefined,
                    limit: classificationfilter || undefined
                },
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.data) {
                setSavedHistory(Array.isArray(response.data) ? response.data : []);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        LoadHistoric();
    }, [])

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
                    placeholderTextColor={"black"}
                    style={styles.inputsm}
                    keyboardType="numeric"
                    value={classification}
                    onChangeText={setClassification}
                />
                <Text style={styles.inputText}> até </Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                        format: 'DD/MM/YYYY'
                    }}
                    placeholder="00/00/0000"
                    placeholderTextColor={"black"}
                    style={styles.inputsm}
                    keyboardType="numeric"
                    value={classificationfilter}
                    onChangeText={setClassificationfilter}
                />
                <TouchableOpacity style={styles.buttonFilter} onPress={LoadHistoric}>
                    <Ionicons name="repeat-outline" size={30} color="#404040" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={savedHistory ?? []}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <HistoryValues
                            date={item.data}
                            emoji={item.Valor}
                            anotation={item.anotacao}
                            id={item.id}
                            points={item.pontuacao}
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