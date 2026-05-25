export interface MoodEntry {
  id: string;
  mood: string;
  note: string;
  date: string;
  timestamp: number;
}

export type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};