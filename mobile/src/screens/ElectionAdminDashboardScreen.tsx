import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAdminDashboard } from '../hooks/useAdmin';

export const ElectionAdminDashboardScreen = () => {
  const navigation = useNavigation<any>();
  const { metrics, loading, refresh } = useAdminDashboard();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#115cb9" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <View className="flex-row items-center gap-2">
          <Ionicons name="settings" size={24} color="#00639b" />
          <Text className="font-bold text-xl text-primary">Admin Control</Text>
        </View>
        <TouchableOpacity onPress={refresh} className="p-2">
          <Ionicons name="refresh" size={24} color="#aec6ff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Quick Actions</Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          <TouchableOpacity 
            className="w-[48%] bg-primary py-4 rounded-xl items-center justify-center mb-4 shadow-sm"
            onPress={() => navigation.navigate('CreateElectionBasicInfo')}
          >
            <Ionicons name="add-circle" size={28} color="#ffffff" className="mb-2" />
            <Text className="text-white font-bold text-center">New Election</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="w-[48%] bg-secondary-container py-4 rounded-xl items-center justify-center mb-4 shadow-sm"
            onPress={() => navigation.navigate('CandidateList')}
          >
            <Ionicons name="people" size={28} color="#003354" className="mb-2" />
            <Text className="text-on-secondary-container font-bold text-center">Candidates</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Election Management</Text>
        <View className="space-y-4 mb-6">
          <TouchableOpacity 
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex-row items-center"
            onPress={() => navigation.navigate('ElectionsList')}
          >
            <View className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mr-4">
              <Ionicons name="archive-outline" size={24} color="#003258" />
            </View>
            <View className="flex-1">
              <Text className="text-on-surface font-bold text-lg">Manage Elections</Text>
              <Text className="text-on-surface-variant text-sm">View, edit, and monitor all active elections</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#aec6ff" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex-row items-center"
            onPress={() => navigation.navigate('ObserverAuditView')}
          >
            <View className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mr-4">
              <Ionicons name="bar-chart-outline" size={24} color="#003258" />
            </View>
            <View className="flex-1">
              <Text className="text-on-surface font-bold text-lg">Turnout Analytics</Text>
              <Text className="text-on-surface-variant text-sm">Real-time demographic and geographic turnout</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#aec6ff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
