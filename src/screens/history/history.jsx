import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { styles } from './history.styles'
import Topcurve from "../../components/Topmidcurve"
import HistoryValues from "../../components/HistoryValues"
import { TextInputMask } from "react-native-masked-text"
import { useContext, useEffect, useState } from "react"
import api from "../../constants/api"
import { AuthContext } from "../../contexts/auth"

function History() {
    const [classification, setClassification] = useState();
    const { user } = useContext(AuthContext);


    const [savedHistory, setSavedHistory] = useState();
    async function LoadHistoric() {
        try {
            const response = await api.get(`/history/${user.id}`,{
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            });
            console.log(response.data);
            setSavedHistory(response.data);
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
                    style={styles.inputsm}
                    keyboardType="numeric"
                    value={classification}
                    onChangeText={setClassification}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={savedHistory}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <HistoryValues
                            date={item.data}
                            emoji={item.Valor}
                            anotation={item.anotation}
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