import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors, Fonts_Size, Fonts_Styles } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundColor: Colors.gray,
    backgroundGradientFrom: Colors.gray,
    backgroundGradientTo: Colors.gray,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 1,
    color: (opacity = 1) => Colors.green,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: '3', strokeWidth: '2', stroke: Colors.green },
    propsForLabels: {
        fontSize: Fonts_Size.md,
        fontFamily: Fonts_Styles.PoppinsRegular,
    },
};

interface Props {
    dataPoint: number | null;
}

export const RealTimeGraph: React.FC<Props> = ({ dataPoint }) => {
    const [dataPoints, setDataPoints] = useState<number[]>([0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        if (
            typeof dataPoint === 'number' &&
            !isNaN(dataPoint) &&
            isFinite(dataPoint)
        ) {
            setDataPoints((prev) => {
                const updated = [...prev, dataPoint];
                if (updated.length > 10) updated.shift(); // mantém últimos 10 pontos
                return updated;
            });
        }
    }, [dataPoint]);

    return (
        <View>
            <LineChart
                data={{
                    labels: [],
                    datasets: [{ data: dataPoints }],
                }}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
        </View>
    );
};
