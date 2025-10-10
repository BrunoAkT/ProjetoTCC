import React, { useState, useEffect, useContext } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors, Fonts_Styles, Fonts_Size } from '../constants/theme'


function HistoryGraph({ data, labels }) {



    // só renderiza o gráfico quando houver dados
    if (!data || data.length === 0) {
        return null;
    }

    const labelDisplayInterval = Math.max(1, Math.ceil(labels.length / 6));

    const formattedLabels = labels.map((time, index) => {
        // Mostra o label apenas em intervalos calculados
        if (index % labelDisplayInterval === 0) {
            return time.substring(0, 5); // Formato HH:MM
        }
        return ''; // Retorna vazio para os outros pontos
    });


    const chartData = {
        labels: formattedLabels,
        datasets: [
            { data }
        ]
    };

    return (
        <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }}>
            <LineChart
                data={chartData}
                width={Math.min(Dimensions.get('window').width, 420)} // ajustar conforme layout
                height={220}
                yAxisSuffix="bpm"
                chartConfig={{
                    backgroundColor: Colors.gray,
                    backgroundGradientFrom: Colors.gray,
                    backgroundGradientTo: Colors.gray,
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: { r: '4', strokeWidth: '2', stroke: Colors.green },
                }}
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
        </View>
    )
}
export default HistoryGraph;