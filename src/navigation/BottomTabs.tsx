import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any = 'home';
          if (route.name === 'Home') iconName = 'add-circle-outline';
          else if (route.name === 'History') iconName = 'list-outline';
          else if (route.name === 'Statistics') iconName = 'pie-chart-outline';
          else if (route.name === 'Settings') iconName = 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Додати' }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Історія' }} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} options={{ title: 'Статистика' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Налаштування' }} />
    </Tab.Navigator>
  );
}