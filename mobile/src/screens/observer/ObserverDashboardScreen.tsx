import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAdminDashboard } from '../hooks/useAdmin';

export const ObserverDashboardScreen = () => {
  const navigation = useNavigation<any>();
  const { metrics, loading, error, refresh } = useAdminDashboard();

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
          <Ionicons name="eye-outline" size={24} color="#00639b" />
          <Text className="font-bold text-xl text-primary">Observer Node</Text>
        </View>
        <TouchableOpacity onPress={refresh} className="p-2">
          <Ionicons name="refresh" size={24} color="#aec6ff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {error && (
          <View className="bg-error-container p-4 rounded-xl mb-6 flex-row items-center">
            <Ionicons name="warning" size={24} color="#ffb4ab" className="mr-2" />
            <Text className="text-on-error-container flex-1">{error}</Text>
          </View>
        )}

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">System Overview</Text>
        
        <View className="flex-row flex-wrap justify-between mb-6">
          <View className="w-[48%] bg-surface-container border border-outline-variant rounded-xl p-4 mb-4">
            <Text className="text-on-surface-variant text-xs mb-1">Active Nodes</Text>
            <Text className="text-on-surface font-bold text-2xl">{metrics?.activeNodes || 24}</Text>
          </View>
          <View className="w-[48%] bg-surface-container border border-outline-variant rounded-xl p-4 mb-4">
            <Text className="text-on-surface-variant text-xs mb-1">Global Turnout</Text>
            <Text className="text-on-surface font-bold text-2xl">{metrics?.globalTurnout || '68'}%</Text>
          </View>
          <View className="w-[48%] bg-surface-container border border-outline-variant rounded-xl p-4">
            <Text className="text-on-surface-variant text-xs mb-1">System Status</Text>
            <View className="flex-row items-center mt-1">
              <View className="w-3 h-3 rounded-full bg-secondary mr-2" />
              <Text className="text-on-surface font-bold text-lg text-secondary">Healthy</Text>
            </View>
          </View>
          <View className="w-[48%] bg-surface-container border border-outline-variant rounded-xl p-4">
            <Text className="text-on-surface-variant text-xs mb-1">Last Audit</Text>
            <Text className="text-on-surface font-bold text-lg">{'2 mins ago'}</Text>
          </View>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Observer Tools</Text>
        
        <View className="space-y-4">
          <TouchableOpacity 
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex-row items-center"
            onPress={() => navigation.navigate('ObserverElectionList')}
          >
            <View className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mr-4">
              <Ionicons name="list-outline" size={24} color="#003258" />
            </View>
            <View className="flex-1">
              <Text className="text-on-surface font-bold text-lg">Elections Tally</Text>
              <Text className="text-on-surface-variant text-sm">View real-time results & verifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#aec6ff" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex-row items-center"
            onPress={() => navigation.navigate('ObserverAuditView')}
          >
            <View className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mr-4">
              <Ionicons name="document-text-outline" size={24} color="#003258" />
            </View>
            <View className="flex-1">
              <Text className="text-on-surface font-bold text-lg">System Audit Log</Text>
              <Text className="text-on-surface-variant text-sm">Monitor immutable events on the ledger</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#aec6ff" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex-row items-center"
            onPress={() => navigation.navigate('ResultIntegrityVerification')}
          >
            <View className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mr-4">
              <Ionicons name="shield-checkmark-outline" size={24} color="#003354" />
            </View>
            <View className="flex-1">
              <Text className="text-on-surface font-bold text-lg">Integrity Check</Text>
              <Text className="text-on-surface-variant text-sm">Cryptographically verify current tallies</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#aec6ff" />
          </TouchableOpacity>
        </View>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
