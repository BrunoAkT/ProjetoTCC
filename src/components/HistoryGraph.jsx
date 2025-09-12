import React, { useState, useEffect, useContext } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors, Fonts_Styles, Fonts_Size } from '../constants/theme'
import { AuthContext } from '../contexts/auth';
import api from '../constants/api';

function HistoryGraph({ data, labels }) {



    // só renderiza o gráfico quando houver dados
    if (!data || data.length === 0) {
        return null;
    }

    const chartData = {
        labels: labels, 
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