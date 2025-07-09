import { styles } from './frequency.styles'
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

function Frequency() {
    const [data, setData] = useState([80, 82, 85, 81, 84]);
    const [average, setAverage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const newValue = Math.floor(75 + Math.random() * 20);
            const newData = [...data, newValue].slice(-20);
            setData(newData);

            const avg = newData.reduce((sum, val) => sum + val, 0) / newData.length;
            setAverage(avg.toFixed(1));
        }, 1000);

        return () => clearInterval(interval);
    }, [data]);
    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Frequência Cardíaca</Text>
            <LineChart
                data={{
                    datasets: [{ data }],
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                yAxisSuffix=" bpm"
                chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 77, 77, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: { r: '6', strokeWidth: '2', stroke: '#ff4d4d' },
                }}
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
            <Text style={{ fontSize: 16 }}>Média: {average} bpm</Text>
        </View>
    )
}
export default Frequency