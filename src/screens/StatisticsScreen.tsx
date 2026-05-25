import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { getMoods } from '../storage/moodStorage';

const screenWidth = Dimensions.get('window').width;

export default function StatisticsScreen() {
  const [chartData, setChartData] = useState<any[]>([]);

  const loadStats = async () => {
    const data = await getMoods();
    const counts: Record<string, number> = {};
    
    data.forEach(entry => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    });

    const colors = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#795548'];
    const formattedData = Object.keys(counts).map((key, index) => ({
      name: key,
      population: counts[key],
      color: colors[index % colors.length],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));

    setChartData(formattedData);
  };

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Статистика настроїв</Text>
      {chartData.length > 0 ? (
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      ) : (
        <Text style={styles.empty}>Немає даних для статистики</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fb', padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  empty: { fontSize: 16, color: '#888' }
});