import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { clearAllMoods } from '../storage/moodStorage';

export default function SettingsScreen() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const handleClear = () => {
    Alert.alert(
      'Очистити історію',
      'Ви впевнені, що хочете видалити всі записи?',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Видалити', style: 'destructive', onPress: clearAllMoods }
      ]
    );
  };

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <View style={styles.settingRow}>
        <Text style={[styles.settingText, isDark && styles.darkText]}>Темна тема (тест)</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      
      <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
        <Text style={styles.clearBtnText}>Очистити всі записи</Text>
      </TouchableOpacity>

      <Text style={styles.info}>Версія додатку: 1.0.0</Text>
      <Text style={styles.info}>Розроблено для залікової роботи</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f6f8fb' },
  darkContainer: { backgroundColor: '#1a1a1a' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  settingText: { fontSize: 18, color: '#333' },
  darkText: { color: '#fff' },
  clearBtn: { marginTop: 30, backgroundColor: '#ff4444', padding: 15, borderRadius: 15, alignItems: 'center' },
  clearBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  info: { textAlign: 'center', marginTop: 20, color: '#888' }
});