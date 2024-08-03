import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { RecordingContext, RecordingProvider } from '@/components/RecordingContext';

const AudioLevelScreen = () => {
  const { status } = useContext(RecordingContext)!;
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [minLevel, setMinLevel] = useState<number>(Infinity);
  const [maxLevel, setMaxLevel] = useState<number>(-Infinity);
  const [averageLevel, setAverageLevel] = useState<number>(0);
  const [levels, setLevels] = useState<number[]>([0]);


  useEffect(() => {
    if (status?.metering) {
      const currentLevel = (status.metering + 160) * 5 / 8; 
      setAudioLevel(currentLevel);
      setLevels((prevLevels) => {
        const newLevels = [...prevLevels, currentLevel];
        if (newLevels.length > 30) {
          newLevels.shift();
        }
        return newLevels;
      });
    }
  }, [status]);

  useEffect(() => {
    if (levels.length > 0) {
      const min = Math.min(...levels);
      const max = Math.max(...levels);
      const avg = levels.reduce((sum, level) => sum + level, 0) / levels.length;

      setMinLevel(min);
      setMaxLevel(max);
      setAverageLevel(avg);
    }
  }, [levels]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sound Meter</Text>
      <View style={styles.gaugeContainer}>
        <Text style={styles.dBValue}>{audioLevel.toFixed(2)} dB</Text>
        <View style={styles.gauge}>
          <LineChart
            data={{
              datasets: [
                {
                  data: levels,
                },
              ],
              labels: levels.map(() => ''),
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{minLevel.toFixed(2)} dB</Text>
          <Text style={styles.statLabel}>MIN</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{averageLevel.toFixed(2)} dB</Text>
          <Text style={styles.statLabel}>AVG</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{maxLevel.toFixed(2)} dB</Text>
          <Text style={styles.statLabel}>MAX</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text>Live Noise Level Chart</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0a7ea4',
  },
  gaugeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dBValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0a7ea4',
    marginBottom: 10,
  },
  gauge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  statLabel: {
    fontSize: 16,
    color: '#0a7ea4',
  },
  chartContainer: {
    width: '90%',
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AudioLevelScreen
