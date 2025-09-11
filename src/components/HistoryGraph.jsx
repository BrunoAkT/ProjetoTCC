import React, { useState, useEffect, use, useContext } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors, Fonts_Styles, Fonts_Size } from '../constants/theme'
import { AuthContext } from '../contexts/auth';
import api from '../constants/api';

function HistoryGraph({ id }) {
    const [data, setData] = useState([]);
    const { user } = useContext(AuthContext);

    async function fetchData() {
        try {
            const response = await api.get(`/bpm/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.data) {
                console.log(response.data)
                const numbers = Array.isArray(response.data)
                    ? response.data.map((it) => Number(it.bpm) || 0)
                    : [];
                setData(numbers);
            }
        } catch (e) {
            console.log('Erro ao buscar dados:', e);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        console.log('data state updated:', data);
    }, [data]);
    return (
        <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }}>
            {/* <LineChart
                data={{
                    datasets: [{ data }],
                }}
                width={Dimensions.get('window').width}
                height={220}
                chartConfig={{
                    backgroundColor: Colors.gray,
                    backgroundGradientFrom: Colors.gray,
                    backgroundGradientTo: Colors.gray,
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 1,
                    color: (opacity = 1) => Colors.green,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: { r: '6', strokeWidth: '2', stroke: Colors.green },
                    propsForLabels: {
                        fontSize: Fonts_Size.md,
                        fontFamily: Fonts_Styles.PoppinsRegular,
                    },
                }}
                style={{ marginVertical: 8, borderRadius: 16 }}

            /> */}
        </View>
    )
}
export default HistoryGraph;