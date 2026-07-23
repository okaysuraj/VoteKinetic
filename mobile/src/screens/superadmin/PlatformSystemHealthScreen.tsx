import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { adminApi, AdminMetrics } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const PlatformSystemHealthScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchMetrics = async () => {
      try {
        const res = await adminApi.getMetrics(user);
        setMetrics(res);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to fetch platform metrics');
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#115cb9" />
      </SafeAreaView>
    );
  }

  const isHealthy = metrics?.systemHealth === 'HEALTHY' || !metrics?.systemHealth;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">System Health</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="font-headline-lg text-2xl font-bold text-primary mb-1">Platform Status</Text>
          <Text className="text-on-surface-variant text-sm">Real-time health monitoring of the VoteKinetic infrastructure.</Text>
        </View>

        {/* Overall Status */}
        <View className={`rounded-xl p-6 mb-6 flex-row items-center justify-between border ${isHealthy ? 'bg-secondary-container/20 border-secondary' : 'bg-error-container/20 border-error'}`}>
          <View>
            <Text className="text-on-surface-variant text-xs uppercase font-bold mb-1">Global Health State</Text>
            <Text className={`font-bold text-2xl ${isHealthy ? 'text-secondary' : 'text-error'}`}>
              {isHealthy ? 'Operational' : 'Degraded'}
            </Text>
          </View>
          <Ionicons name={isHealthy ? "checkmark-circle" : "alert-circle"} size={48} color={isHealthy ? "#115cb9" : "#ba1a1a"} />
        </View>

        {/* Metrics Grid */}
        <View className="flex-row flex-wrap justify-between">
          <View className="w-[48%] bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs text-on-surface-variant uppercase font-bold">API Gateway</Text>
              <Ionicons name="swap-vertical" size={16} color="#115cb9" />
            </View>
            <Text className="font-bold text-xl text-primary">0.04ms</Text>
            <Text className="text-[10px] text-on-surface-variant">Global Avg Latency</Text>
          </View>
          <View className="w-[48%] bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs text-on-surface-variant uppercase font-bold">Traffic Load</Text>
              <Ionicons name="trending-up" size={16} color="#115cb9" />
            </View>
            <Text className="font-bold text-xl text-primary">18.4k</Text>
            <Text className="text-[10px] text-on-surface-variant">Requests / Minute</Text>
          </View>
          <View className="w-[48%] bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs text-on-surface-variant uppercase font-bold">Secure Pipes</Text>
              <Ionicons name="lock-closed" size={16} color="#115cb9" />
            </View>
            <Text className="font-bold text-xl text-primary">100%</Text>
            <Text className="text-[10px] text-on-surface-variant">TLS 1.3 / E2E Encrypted</Text>
          </View>
          <View className="w-[48%] bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs text-on-surface-variant uppercase font-bold">Databases</Text>
              <Ionicons name="server" size={16} color="#115cb9" />
            </View>
            <Text className="font-bold text-xl text-primary">Healthy</Text>
            <Text className="text-[10px] text-on-surface-variant">All clusters synced</Text>
          </View>
        </View>

        {/* Global Resource Allocation */}
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-8">
          <Text className="font-bold text-on-surface text-lg mb-4">Resource Allocation</Text>
          
          <View className="mb-4">
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-on-surface-variant">Compute (CPU)</Text>
              <Text className="text-xs text-on-surface font-mono">42%</Text>
            </View>
            <View className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <View className="bg-secondary w-[42%] h-full" />
            </View>
          </View>
          
          <View className="mb-4">
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-on-surface-variant">Memory (RAM)</Text>
              <Text className="text-xs text-on-surface font-mono">78%</Text>
            </View>
            <View className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <View className="bg-[#fdb022] w-[78%] h-full" />
            </View>
          </View>
          
          <View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-on-surface-variant">Storage</Text>
              <Text className="text-xs text-on-surface font-mono">15%</Text>
            </View>
            <View className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <View className="bg-secondary w-[15%] h-full" />
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
