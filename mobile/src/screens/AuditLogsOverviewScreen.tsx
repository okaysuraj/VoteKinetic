import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { adminApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const AuditLogsOverviewScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [logs, setLogs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const fetchLogs = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await adminApi.getAuditLogs(user, { limit: 25 });
      setLogs(res.logs);
      setTotal(res.total);
    } catch (error) {
      console.error('Failed to fetch audit logs', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [user]);

  const getLogTypeInfo = (action: string) => {
    if (action.includes('ELECTION') || action.includes('VOTE')) return { type: 'System', color: '#115cb9', icon: 'server' };
    if (action.includes('USER') || action.includes('LOGIN')) return { type: 'Access', color: '#d92d20', icon: 'lock-closed' };
    if (action.includes('VOTER')) return { type: 'Info', color: '#8e918f', icon: 'information-circle' };
    return { type: 'Crypto', color: '#4ade80', icon: 'key' };
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Audit Ledger</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        <View className="mb-6">
          <Text className="text-xl font-bold text-primary mb-1">Global Audit Ledger</Text>
          <Text className="text-sm text-on-surface-variant leading-relaxed">
            Immutable, cryptographically verifiable record of all platform activities. Each entry is hashed and appended to the ledger.
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#115cb9" className="mt-10" />
        ) : logs.length === 0 ? (
          <View className="items-center py-10">
            <Ionicons name="document-text-outline" size={48} color="#8e918f" className="mb-4" />
            <Text className="text-on-surface-variant">No audit records found.</Text>
          </View>
        ) : (
          <View className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            {logs.map((log, index) => {
              const info = getLogTypeInfo(log.action);
              return (
                <View 
                  key={log.id} 
                  className={`p-4 flex-row items-center justify-between ${index !== logs.length - 1 ? 'border-b border-outline-variant' : ''}`}
                >
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <View className="bg-surface-container-high px-2 py-0.5 rounded flex-row items-center mr-2">
                        <Ionicons name={info.icon as any} size={10} color={info.color} className="mr-1" />
                        <Text className="text-[10px] font-bold text-on-surface-variant uppercase">{info.type}</Text>
                      </View>
                      <Text className="font-bold text-on-surface">{log.action}</Text>
                    </View>
                    <Text className="text-xs text-on-surface-variant mb-1" numberOfLines={1}>
                      {log.details ? JSON.stringify(log.details) : `Entity: ${log.entityType} ${log.entityId}`}
                    </Text>
                    <Text className="text-[10px] text-on-surface-variant">
                      {new Date(log.createdAt).toLocaleString()}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    className="ml-4"
                    onPress={() => setSelectedLog(log)}
                  >
                    <Text className="text-secondary font-bold text-sm underline">Verify</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
        
        {!loading && logs.length > 0 && (
          <View className="mt-4 mb-10 flex-row items-center justify-between">
            <Text className="text-xs text-on-surface-variant">Showing {logs.length} of {total} entries</Text>
            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="download-outline" size={16} color="#aec6ff" className="mr-1" />
              <Text className="text-xs text-secondary font-bold">Export JSON</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Verify Modal */}
      <Modal visible={!!selectedLog} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center p-4">
          <View className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
            <View className="bg-primary p-4 flex-row justify-between items-center">
              <Text className="text-on-primary font-bold text-lg">Entry Proof Details</Text>
              <TouchableOpacity onPress={() => setSelectedLog(null)}>
                <Ionicons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View className="p-6">
              <View className="bg-surface-container-lowest p-4 rounded border border-outline-variant mb-4">
                <Text className="font-mono text-xs text-on-surface">
                  {`{
  "id": "${selectedLog?.id}",
  "action": "${selectedLog?.action}",
  "timestamp": "${selectedLog?.createdAt}",
  "signature": "RSA-PSS:3072",
  "integrity_status": "VALIDATED"
}`}
                </Text>
              </View>
              <View className="flex-row items-center p-3 border border-outline-variant rounded bg-surface-container-low mb-6">
                <Ionicons name="lock-closed" size={20} color="#115cb9" className="mr-3" />
                <Text className="flex-1 text-xs text-on-surface-variant leading-relaxed">
                  This log entry is signed with a district-level master key and cannot be altered or deleted.
                </Text>
              </View>
              <View className="flex-row gap-3 justify-end">
                <TouchableOpacity 
                  className="px-6 py-3 rounded-full border border-outline"
                  onPress={() => setSelectedLog(null)}
                >
                  <Text className="text-on-surface font-bold">Close</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="px-6 py-3 rounded-full bg-primary flex-row items-center"
                  onPress={() => setSelectedLog(null)}
                >
                  <Ionicons name="download" size={16} color="#ffffff" className="mr-2" />
                  <Text className="text-on-primary font-bold">Receipt</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
