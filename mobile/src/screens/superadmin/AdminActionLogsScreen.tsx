import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { adminApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const AdminActionLogsScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [logs, setLogs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const fetchLogs = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await adminApi.getAuditLogs(user, { limit: 25 });
      setLogs(res.logs);
      setTotal(res.total);
    } catch (error) {
      console.error('Failed to fetch admin logs', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [user]);

  const toggleLog = (id: string) => {
    setExpandedLog(expandedLog === id ? null : id);
  };

  const getIconForAction = (action: string) => {
    switch (action) {
      case 'ELECTION_CREATED':
      case 'ELECTION_PAUSED':
        return 'stats-chart';
      case 'CANDIDATE_ADDED':
      case 'VOTER_ADDED':
        return 'person-add';
      case 'SYSTEM_UPDATED':
        return 'build';
      default:
        return 'shield-checkmark';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Admin Action Logs</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4 bg-surface-container-lowest">
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-xl font-bold text-primary mb-1">System Audit Ledger</Text>
            <Text className="text-sm text-on-surface-variant">Immutable record of all administrative actions</Text>
          </View>
          <TouchableOpacity 
            className="p-3 bg-surface-container rounded-xl border border-outline-variant"
            onPress={fetchLogs}
          >
            <Ionicons name="refresh" size={20} color="#aec6ff" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#115cb9" className="mt-10" />
        ) : logs.length === 0 ? (
          <View className="items-center py-10">
            <Ionicons name="document-text-outline" size={48} color="#8e918f" className="mb-4" />
            <Text className="text-on-surface-variant">No logs found.</Text>
          </View>
        ) : (
          logs.map((log) => {
            const isExpanded = expandedLog === log.id;
            return (
              <View key={log.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mb-4 shadow-sm">
                <TouchableOpacity 
                  className="p-4 flex-row items-center"
                  onPress={() => toggleLog(log.id)}
                >
                  <View className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center mr-4">
                    <Ionicons name={getIconForAction(log.action)} size={20} color="#001a41" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-on-surface mb-1">{log.action}</Text>
                    <Text className="text-xs text-on-surface-variant">{log.user?.email || 'System'}</Text>
                  </View>
                  <View className="items-end ml-4">
                    <Text className="font-bold text-on-surface text-xs mb-1">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </Text>
                    <Text className="text-xs text-on-surface-variant">
                      {new Date(log.createdAt).toLocaleTimeString()}
                    </Text>
                  </View>
                  <Ionicons 
                    name={isExpanded ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color="#8e918f" 
                    className="ml-3"
                  />
                </TouchableOpacity>

                {isExpanded && (
                  <View className="bg-surface-container-low px-4 py-4 border-t border-outline-variant">
                    <View className="flex-row items-center mb-3">
                      <Ionicons name="time-outline" size={16} color="#aec6ff" className="mr-2" />
                      <Text className="font-bold text-primary text-sm">Action Details</Text>
                    </View>
                    <View className="bg-white p-3 rounded border border-outline-variant">
                      <Text className="text-xs font-mono text-on-surface">
                        {log.details ? JSON.stringify(log.details, null, 2) : 'No additional details available.'}
                      </Text>
                    </View>
                    <View className="mt-3 flex-row items-center justify-between">
                      <Text className="text-[10px] text-on-surface-variant font-mono uppercase">Log ID: {log.id}</Text>
                      <Text className="text-[10px] text-on-surface-variant font-mono uppercase">Target: {log.entityType || 'SYSTEM'} {log.entityId || ''}</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })
        )}
        
        {!loading && logs.length > 0 && (
          <View className="mt-4 mb-10 flex-row items-center justify-between border-t border-outline-variant pt-4">
            <Text className="text-xs text-on-surface-variant">Showing {logs.length} of {total} entries</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
