import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config/api';

export const VoterActivityLogsScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = await user?.getIdToken();
      const res = await fetch(${API_URL}/users/activity, {
        headers: { Authorization: Bearer  }
      });
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Activity History</Text>
      </View>

      <View className="flex-1 px-4 py-4">
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="shield-checkmark" size={16} color="#00639b" className="mr-2" />
            <Text className="text-primary font-bold text-sm">Security Log</Text>
          </View>
          <Text className="text-on-surface-variant text-xs leading-relaxed">
            Review your recent account activity. If you notice any unauthorized actions, contact support immediately.
          </Text>
        </View>

        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="flex-row items-start py-4 border-b border-outline-variant">
              <View className="w-10 h-10 rounded-full bg-surface-container items-center justify-center mr-4 mt-1">
                <Ionicons 
                  name={item.action === 'VOTE_CAST' ? 'checkmark-circle' : item.action === 'LOGIN' ? 'log-in' : 'document-text'} 
                  size={20} 
                  color="#44474e" 
                />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="font-bold text-on-surface text-[15px]">{item.action.replace('_', ' ')}</Text>
                  <Text className="text-xs text-on-surface-variant">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </Text>
                </View>
                <Text className="text-on-surface-variant text-sm leading-relaxed mb-1">{item.details}</Text>
                {item.electionTitle && (
                  <Text className="text-xs text-primary font-medium">{item.electionTitle}</Text>
                )}
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View className="py-10 items-center">
              <Text className="text-on-surface-variant">No recent activity.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};