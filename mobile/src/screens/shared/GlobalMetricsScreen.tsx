import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const GlobalMetricsScreen = () => {
  const navigation = useNavigation<any>();
  
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Platform Health</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 mb-6">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Live Infrastructure</Text>
          
          <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-outline-variant">
            <Text className="text-on-surface text-base">API Uptime (30d)</Text>
            <Text className="text-on-surface font-bold text-lg text-primary">99.99%</Text>
          </View>
          <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-outline-variant">
            <Text className="text-on-surface text-base">Active Blockchain Nodes</Text>
            <Text className="text-on-surface font-bold text-lg text-primary font-mono">14 / 15</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-on-surface text-base">DB Replication Lag</Text>
            <Text className="text-on-surface font-bold text-lg text-primary font-mono">12ms</Text>
          </View>
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 mb-6">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Current Load</Text>
          
          <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-outline-variant">
            <Text className="text-on-surface text-base">Active Elections</Text>
            <Text className="text-on-surface font-bold text-lg">24</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-on-surface text-base">Votes per Second</Text>
            <Text className="text-on-surface font-bold text-lg">8.4</Text>
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
