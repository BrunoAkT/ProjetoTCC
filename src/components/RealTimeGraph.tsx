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
    dataPoints: number[];
}

export const RealTimeGraph: React.FC<Props> = ({ dataPoints }) => {
    return (
        <View style={{ right: 20 }}>
            <LineChart
                data={{
                    labels: [],
                    datasets: [{ data: dataPoints.length > 0 ? dataPoints : [0] }],
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
