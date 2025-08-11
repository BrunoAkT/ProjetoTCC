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
    color: (opacity = 1) => Colors.green,
    style: { borderRadius: 16 },
    propsForBackgroundLines: {
        stroke: 'transparent',
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
                if (updated.length > 15) updated.shift(); // mantém últimos 15 pontos
                return updated;
            });
        }
    }, [dataPoint]);

    return (
        <View style={{ right: 20 }}>
            <LineChart
                data={{
                    labels: [],
                    datasets: [{ data: dataPoints }],
                }}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                withDots={false}
                withHorizontalLabels={false}
                style={{ borderRadius: 16 }}
            />
        </View>
    );
};
