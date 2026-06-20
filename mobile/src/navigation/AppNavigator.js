import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { theme } from '../theme';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ElectionsScreen from '../screens/ElectionsScreen';
import ElectionDetailScreen from '../screens/ElectionDetailScreen';
import VoteScreen from '../screens/VoteScreen';
import BulletinBoardScreen from '../screens/BulletinBoardScreen';
import AdminLogsScreen from '../screens/AdminLogsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ElectionsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }}>
      <Stack.Screen name="ElectionsList" component={ElectionsScreen} />
      <Stack.Screen name="ElectionDetail" component={ElectionDetailScreen} />
      <Stack.Screen name="Vote" component={VoteScreen} />
      <Stack.Screen name="BulletinBoard" component={BulletinBoardScreen} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  const { user } = useAuth();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.cyanAccent,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'person-outline';
          else if (route.name === 'Elections') iconName = 'list-outline';
          else if (route.name === 'Admin') iconName = 'shield-checkmark-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Elections" component={ElectionsStack} />
      {user?.role === 'admin' && (
        <Tab.Screen name="Admin" component={AdminLogsScreen} />
      )}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.cyanAccent} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }}>
        {user ? (
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
