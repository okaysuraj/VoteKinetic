import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuditLogs } from '../hooks/useAdmin';

export const ObserverAuditViewScreen = () => {
  const navigation = useNavigation<any>();
  const { logs, loading, error, refresh } = useAuditLogs({ limit: 50 });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">System Audit Log</Text>
      </View>

      <View className="flex-1 px-4 py-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs">Recent Immutable Events</Text>
          <TouchableOpacity onPress={refresh}>
            <Ionicons name="refresh" size={20} color="#aec6ff" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View className="py-12 items-center">
            <ActivityIndicator size="large" color="#115cb9" />
          </View>
        ) : error ? (
          <View className="bg-error-container p-6 rounded-xl">
            <Text className="text-on-error-container font-bold mb-2">Error loading logs</Text>
            <Text className="text-on-error-container">{error}</Text>
          </View>
        ) : logs.length === 0 ? (
          <View className="py-16 items-center">
            <Ionicons name="document-text-outline" size={64} color="#939aa1" className="mb-4" />
            <Text className="text-xl font-bold text-on-surface mb-2">No Audit Logs</Text>
            <Text className="text-on-surface-variant text-center">System logs are empty.</Text>
          </View>
        ) : (
          <FlatList
            data={logs}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-3">
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-row items-center gap-2">
                    <Ionicons 
                      name={item.action.includes('VOTE') ? 'finger-print' : 'settings-outline'} 
                      size={16} 
                      color={item.action.includes('VOTE') ? '#c2e7ff' : '#939aa1'} 
                    />
                    <Text className="text-on-surface font-bold text-sm uppercase">{item.action}</Text>
                  </View>
                  <Text className="text-on-surface-variant text-xs font-mono">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
                
                <Text className="text-on-surface-variant text-sm mb-2">{item.details}</Text>
                
                <View className="bg-surface-container-highest p-2 rounded flex-row items-center justify-between">
                  <Text className="text-on-surface-variant text-xs font-mono">Entity: {item.entityType}</Text>
                  <Text className="text-on-surface-variant text-xs font-mono">ID: {item.entityId?.substring(0, 8)}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
