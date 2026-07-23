import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { adminApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useElection } from '../hooks/useElections';

export const ElectionStatusHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};
  const { user } = useAuth();
  
  const { election, loading: electionLoading } = useElection(electionId);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !electionId) return;
    const fetchLogs = async () => {
      try {
        const res = await adminApi.getAuditLogs(user, { limit: 100 });
        // Client-side filter for now for prototype. 
        // In real app, the API should accept entityId parameter.
        const filtered = res.logs.filter((log: any) => 
          log.entityId === electionId || 
          (log.details && log.details.electionId === electionId)
        );
        setLogs(filtered);
      } catch (error) {
        console.error('Failed to fetch election history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [user, electionId]);

  const getStatusColor = (action: string) => {
    if (action.includes('CLOSED')) return '#d92d20';
    if (action.includes('PAUSED')) return '#fdb022';
    if (action.includes('ACTIVE') || action.includes('LIVE')) return '#12b76a';
    if (action.includes('SCHEDULED')) return '#aec6ff';
    return '#8e918f';
  };

  const getStatusIcon = (action: string) => {
    if (action.includes('CLOSED')) return 'stop-circle';
    if (action.includes('PAUSED')) return 'pause-circle';
    if (action.includes('ACTIVE') || action.includes('LIVE')) return 'radio';
    if (action.includes('SCHEDULED')) return 'calendar';
    if (action.includes('CREATED')) return 'add-circle';
    return 'document-text';
  };

  if (electionLoading || loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#115cb9" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Lifecycle History</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-8">
          <Text className="font-headline-lg text-2xl font-bold text-primary mb-1">Status Timeline</Text>
          <Text className="text-on-surface-variant text-sm">
            Cryptographic audit of state transitions for {election?.title || 'Election'}
          </Text>
        </View>

        <View className="ml-4 border-l-2 border-outline-variant pl-6 pb-10">
          
          {/* Current Status Header */}
          <View className="relative mb-10">
            <View className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-surface items-center justify-center border-2 border-secondary">
              <View className="w-2 h-2 rounded-full bg-secondary" />
            </View>
            <View className="bg-surface-container border border-outline-variant rounded-xl p-4 shadow-sm">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="font-bold text-lg text-secondary">Current Status: {election?.status}</Text>
                <Text className="text-xs text-on-surface-variant uppercase font-mono">Present</Text>
              </View>
              <Text className="text-sm text-on-surface-variant">The current active state of the election.</Text>
            </View>
          </View>

          {logs.map((log: any, index: number) => {
            const color = getStatusColor(log.action);
            const icon = getStatusIcon(log.action);
            return (
              <View key={log.id} className="relative mb-10">
                <View 
                  className="absolute -left-9 top-1 w-6 h-6 rounded-full items-center justify-center border-2 bg-surface"
                  style={{ borderColor: color }}
                >
                  <Ionicons name={icon as any} size={12} color={color} />
                </View>
                <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
                  <View className="flex-row justify-between items-start mb-2">
                    <Text className="font-bold text-lg" style={{ color }}>{log.action}</Text>
                    <Text className="text-xs text-on-surface-variant uppercase font-mono">
                      {new Date(log.createdAt).toLocaleString()}
                    </Text>
                  </View>
                  <Text className="text-sm text-on-surface mb-3">
                    {log.details ? JSON.stringify(log.details) : 'State transition recorded.'}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="person" size={14} color="#8e918f" className="mr-1" />
                    <Text className="text-xs text-on-surface-variant">Admin: {log.user?.email || 'System'}</Text>
                  </View>
                </View>
              </View>
            );
          })}

          {logs.length === 0 && (
            <View className="relative">
              <View className="absolute -left-9 top-1 w-6 h-6 rounded-full items-center justify-center border-2 border-outline-variant bg-surface">
                <Ionicons name="add" size={12} color="#8e918f" />
              </View>
              <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="font-bold text-lg text-on-surface">Created</Text>
                  <Text className="text-xs text-on-surface-variant uppercase font-mono">
                    {election?.createdAt ? new Date(election.createdAt).toLocaleString() : 'N/A'}
                  </Text>
                </View>
                <Text className="text-sm text-on-surface">Initial election setup complete.</Text>
              </View>
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
