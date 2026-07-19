import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { adminApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const BroadcastHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [broadcasts, setBroadcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      adminApi.getBroadcasts(user)
        .then(res => setBroadcasts(res.broadcasts))
        .catch(err => {
          console.error(err);
          Alert.alert('Error', 'Failed to fetch broadcast history.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

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
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Broadcast Logs</Text>
      </View>

      <View className="flex-1 px-4 py-4">
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4">
          <Text className="text-on-surface-variant text-xs leading-relaxed">
            History of all system-wide announcements and push notifications sent to voters.
          </Text>
        </View>

        <FlatList
          data={broadcasts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-3">
              <View className="flex-row items-start justify-between mb-2">
                <Text className="text-on-surface font-bold text-base flex-1 pr-2">{item.subject}</Text>
                <View className={px-2 py-0.5 rounded flex-row items-center }>
                  {item.priority === 'CRITICAL' && <Ionicons name="warning" size={10} color="#fff" className="mr-1" />}
                  <Text className={	ext-[10px] font-bold }>{item.priority}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center justify-between border-t border-outline-variant pt-2 mt-2">
                <View className="flex-row items-center">
                  <Ionicons name="people" size={14} color="#74777f" className="mr-1" />
                  <Text className="text-on-surface-variant text-xs">{item.reach.toLocaleString()} Reached</Text>
                </View>
                <Text className="text-on-surface-variant text-xs">{new Date(item.sentAt).toLocaleDateString()} {new Date(item.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View className="py-10 items-center">
              <Text className="text-on-surface-variant">No broadcasts found.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};