import { styles } from './frequency.styles'
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import FrequencyGraph from '../../components/FrequencyGraph';

function Frequency() {
  return (
    <View>
        <FrequencyGraph></FrequencyGraph>
    </View>
  )
}
export default Frequency