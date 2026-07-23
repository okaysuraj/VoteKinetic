import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { voteApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import * as Network from 'expo-network';

export const OfflineModeVoteQueueScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [queuedVotes, setQueuedVotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    loadQueuedVotes();
    checkNetwork();
  }, []);

  const checkNetwork = async () => {
    const networkState = await Network.getNetworkStateAsync();
    setIsConnected(!!networkState.isConnected);
  };

  const loadQueuedVotes = async () => {
    try {
      const votes = await AsyncStorage.getItem('offline_votes');
      if (votes) {
        setQueuedVotes(JSON.parse(votes));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (!isConnected) return;
    setSyncing(true);
    const remaining = [];
    try {
      for (const vote of queuedVotes) {
        try {
          const tokenData = await voteApi.requestToken(user!, vote.electionId);
          await voteApi.submit(vote.electionId, tokenData.token, vote.encryptedPayload);
        } catch (err) {
          console.error('Failed to sync vote', vote.id, err);
          remaining.push(vote);
        }
      }
      setQueuedVotes(remaining);
      await AsyncStorage.setItem('offline_votes', JSON.stringify(remaining));
      if (remaining.length === 0) {
        alert('All offline votes have been synchronized.');
      } else {
        alert('Some votes failed to sync. They remain in the queue.');
      }
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      setSyncing(false);
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
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Offline Queue</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className={order rounded-xl p-4 mb-6 flex-row items-center }>
          <Ionicons name={isConnected ? "cloud-done" : "cloud-offline"} size={24} color={isConnected ? "#001b44" : "#ffb4ab"} className="mr-3" />
          <View className="flex-1">
            <Text className={ont-bold mb-1 }>
              {isConnected ? "Connection Restored" : "No Internet Connection"}
            </Text>
            <Text className={isConnected ? "text-on-primary-container text-xs" : "text-on-error-container text-xs"}>
              {isConnected 
                ? "You can now sync your queued votes to the immutable ledger."
                : "Your votes have been cryptographically signed and stored locally. They will automatically sync when connectivity is restored."}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs">Pending Synchronization</Text>
          {isConnected && queuedVotes.length > 0 && (
            <TouchableOpacity onPress={handleSync} disabled={syncing}>
              <Text className="text-primary font-bold">{syncing ? 'Syncing...' : 'Sync Now'}</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {queuedVotes.length === 0 ? (
          <Text className="text-on-surface-variant text-center mt-10">No votes in the offline queue.</Text>
        ) : (
          queuedVotes.map((vote) => (
            <View key={vote.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-3">
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="lock-closed" size={16} color="#44474e" className="mr-2" />
                  <Text className="font-bold text-on-surface">{vote.electionTitle}</Text>
                </View>
                <Text className="text-xs text-on-surface-variant">{new Date(vote.timestamp).toLocaleTimeString()}</Text>
              </View>
              <Text className="text-xs text-on-surface-variant ml-6">
                Payload Size: {vote.encryptedPayload?.length || 0} bytes
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};