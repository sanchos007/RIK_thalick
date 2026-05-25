import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoodEntry } from '../types';

const STORAGE_KEY = '@mood_entries';

export const saveMood = async (entry: MoodEntry) => {
  try {
    const existing = await getMoods();
    const updated = [entry, ...existing];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving mood:', error);
  }
};

export const getMoods = async (): Promise<MoodEntry[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting moods:', error);
    return [];
  }
};

export const deleteMood = async (id: string) => {
  try {
    const existing = await getMoods();
    const updated = existing.filter(entry => entry.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error deleting mood:', error);
  }
};

export const clearAllMoods = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing moods:', error);
  }
};