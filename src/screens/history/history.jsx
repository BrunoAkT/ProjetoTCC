import { FlatList, Text, TouchableOpacity, View, Platform } from "react-native"
import { styles } from './history.styles'
import Topcurve from "../../components/Topmidcurve"
import HistoryValues from "../../components/HistoryValues"
import { useContext, useEffect, useState } from "react"
import api from "../../constants/api"
import { AuthContext } from "../../contexts/auth"
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from "../../constants/theme"



function History() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { user } = useContext(AuthContext);

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [activeInput, setActiveInput] = useState(null);

    const [savedHistory, setSavedHistory] = useState();
    async function LoadHistoric() {
        console.log("Loading history with filters:", startDate, endDate);
        try {
            const response = await api.get(`/history/${user.id}`, {
                params: {
                    start: startDate || undefined,
                    limit: endDate || undefined
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


    const onChangeDate = (event, selectedDate) => {
        setShowPicker(false);
        if (event.type === 'set' && selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString('pt-BR');
            if (activeInput === 'start') {
                setStartDate(formattedDate);
            } else {
                setEndDate(formattedDate);
            }
            setDate(selectedDate);
        }
        setActiveInput(null);
    };
    const showDatepicker = (input) => {
        setActiveInput(input);
        setShowPicker(true);
    };

    const clearFilters = () => {
        setStartDate("");
        setEndDate("");
        LoadHistoric("", ""); 
    };
    return (
        <View style={styles.mainContainer}>
            <Topcurve></Topcurve>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Historico e Estatísticas
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => showDatepicker('start')} style={styles.inputsm}>
                    <Ionicons name="calendar-outline" size={20} color={startDate ? Colors.green : "#888"} />
                    <Text style={styles.inputText}>
                        {startDate || "Data Início"}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.inputText}> até </Text>

                <TouchableOpacity onPress={() => showDatepicker('end')} style={styles.inputsm}>
                    <Ionicons name="calendar-outline" size={20} color={endDate ? Colors.green : "#888"} />
                    <Text style={styles.inputText}>
                        {endDate || "Data Fim"}
                    </Text>
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}


                {(startDate || endDate) && (
                    <TouchableOpacity style={styles.buttonClear} onPress={clearFilters}>
                        <Ionicons name="close-circle-outline" size={30} color={Colors.red} />
                    </TouchableOpacity>
                )}

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