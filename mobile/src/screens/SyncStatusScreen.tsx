import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { adminApi } from '../api/client';

export const SyncStatusScreen = () => {
  const navigation = useNavigation<any>();
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    // Simulate API POST /api/system/blockchain/sync
    setTimeout(() => {
      setSyncing(false);
      Alert.alert('Ledger Synced', 'Successfully verified and committed local database blocks to the decentralized ledger network.');
    }, 2500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={syncing}>
          <Ionicons name="arrow-back" size={24} color={syncing ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Blockchain Sync</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="items-center mb-8 mt-4">
          <View className="w-24 h-24 rounded-full bg-secondary-container items-center justify-center mb-4">
            <Ionicons name="cube" size={48} color="#003354" />
          </View>
          <Text className="text-2xl font-bold text-on-surface mb-2">Ledger Synchronization</Text>
          <Text className="text-on-surface-variant text-center px-4 leading-relaxed">
            VoteKinetic periodically anchors encrypted tallies to a public decentralized ledger for independent, third-party auditability.
          </Text>
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 mb-8 shadow-sm">
          <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-outline-variant">
            <Text className="text-on-surface font-bold text-base">Network Status</Text>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-secondary mr-2" />
              <Text className="text-on-surface font-mono">CONNECTED (24 Nodes)</Text>
            </View>
          </View>
          
          <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-outline-variant">
            <Text className="text-on-surface font-bold text-base">Last Sync</Text>
            <Text className="text-on-surface font-mono">{new Date(Date.now() - 3600000).toLocaleString()}</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-on-surface font-bold text-base">Pending Blocks</Text>
            <Text className="text-primary font-bold text-lg">14</Text>
          </View>
        </View>
        
        <View className="space-y-4">
          <TouchableOpacity 
            className={`py-4 rounded-xl flex-row items-center justify-center shadow-sm ${syncing ? 'bg-surface-container-high' : 'bg-primary'}`}
            onPress={handleSync}
            disabled={syncing}
          >
            {syncing ? (
              <ActivityIndicator size="small" color="#aec6ff" className="mr-2" />
            ) : (
              <Ionicons name="sync" size={20} color="#ffffff" className="mr-2" />
            )}
            <Text className={`font-bold ${syncing ? 'text-on-surface-variant' : 'text-white'} text-lg`}>
              {syncing ? 'Syncing with Ledger...' : 'Force Manual Sync'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
