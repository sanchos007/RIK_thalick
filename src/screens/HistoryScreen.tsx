import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getMoods, deleteMood } from '../storage/moodStorage';
import { MoodEntry } from '../types';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all');

  const loadMoods = async () => {
    const data = await getMoods();
    setMoods(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMoods();
    }, [])
  );

  const handleDelete = async (id: string) => {
    await deleteMood(id);
    loadMoods();
  };

  const getFilteredMoods = () => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    return moods.filter(m => {
      if (filter === 'week') return (now - m.timestamp) <= 7 * day;
      if (filter === 'month') return (now - m.timestamp) <= 30 * day;
      return true;
    });
  };

  const renderItem = ({ item }: { item: MoodEntry }) => (
    <View style={styles.card}>
      <Text style={styles.emoji}>{item.mood}</Text>
      <View style={styles.info}>
        <Text style={styles.date}>{new Date(item.date).toLocaleString('uk-UA')}</Text>
        {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['all', 'week', 'month'].map((f) => (
          <TouchableOpacity 
            key={f} 
            style={[styles.filterBtn, filter === f && styles.filterActive]}
            onPress={() => setFilter(f as any)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'Всі' : f === 'week' ? 'Тиждень' : 'Місяць'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={getFilteredMoods()}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fb' },
  filterContainer: { flexDirection: 'row', justifyContent: 'center', padding: 15, backgroundColor: '#fff' },
  filterBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginHorizontal: 5, backgroundColor: '#e5ebf4' },
  filterActive: { backgroundColor: '#007bff' },
  filterText: { color: '#333', fontWeight: '500' },
  filterTextActive: { color: '#fff' },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 15, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  emoji: { fontSize: 40, marginRight: 15 },
  info: { flex: 1 },
  date: { fontSize: 12, color: '#888', marginBottom: 5 },
  note: { fontSize: 16, color: '#333' }
});