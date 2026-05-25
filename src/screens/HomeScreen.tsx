import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { saveMood } from '../storage/moodStorage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const MOODS = ['😀', '😍', '😐', '😢', '😡', '😴'];

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const handleSave = async () => {
    if (!selectedMood) {
      Alert.alert('Помилка', 'Будь ласка, оберіть настрій');
      return;
    }

    const newEntry = {
      id: uuidv4(),
      mood: selectedMood,
      note,
      date: new Date().toISOString(),
      timestamp: Date.now(),
    };

    await saveMood(newEntry);
    setSelectedMood(null);
    setNote('');
    Alert.alert('Успіх', 'Ваш настрій збережено!');
  };

  return (
    // Додаємо обгортку, яка ловить натискання
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#f6f8fb', '#e5ebf4']} style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
          
          <Text style={styles.title}>Як ви себе почуваєте сьогодні?</Text>
          
          <View style={styles.moodContainer}>
            {MOODS.map((mood) => (
              <TouchableOpacity 
                key={mood} 
                style={[styles.moodBtn, selectedMood === mood && styles.selectedMood]}
                onPress={() => setSelectedMood(mood)}>
                <Text style={styles.moodText}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Додайте нотатку..."
            placeholderTextColor="#888"
            value={note}
            onChangeText={setNote}
            multiline
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Зберегти запис</Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  moodBtn: { padding: 10, borderRadius: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  selectedMood: { backgroundColor: '#cce5ff', borderWidth: 1, borderColor: '#007bff' },
  moodText: { fontSize: 30 },
  input: { backgroundColor: '#fff', borderRadius: 15, padding: 15, height: 120, textAlignVertical: 'top', fontSize: 16, marginBottom: 30, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  saveBtn: { backgroundColor: '#007bff', borderRadius: 15, padding: 15, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});