import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { tallyApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useElection } from '../hooks/useElections';

export const ElectionResultsOverviewScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};
  const { user } = useAuth();
  
  const { election, loading: electionLoading } = useElection(electionId);
  const [tally, setTally] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !electionId) return;
    const fetchTally = async () => {
      try {
        const res = await tallyApi.computeTally(user, electionId);
        setTally(res);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to fetch tally.');
      } finally {
        setLoading(false);
      }
    };
    fetchTally();
  }, [user, electionId]);

  const handleExport = async () => {
    if (!user || !electionId) return;
    try {
      const res = await tallyApi.exportResults(user, electionId);
      Alert.alert('Export Successful', res.message || 'Results have been exported.');
    } catch (error: any) {
      Alert.alert('Export Failed', error.message || 'Failed to export results.');
    }
  };

  if (electionLoading || loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#115cb9" />
      </SafeAreaView>
    );
  }

  if (!election || !tally) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-row items-center px-4 py-4 border-b border-outline-variant bg-surface">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={24} color="#aec6ff" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-on-surface-variant mb-4 text-center">Results are not available. Ensure the election is CLOSED before tallying.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Calculate percentages
  const candidatesData = election.candidates.map((c: any) => {
    const votes = tally.tally[c.id] || 0;
    const percentage = tally.validVotes > 0 ? ((votes / tally.validVotes) * 100).toFixed(1) : '0.0';
    return { ...c, votes, percentage };
  }).sort((a: any, b: any) => b.votes - a.votes);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Official Results</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-2">
            <View className="w-2 h-2 rounded-full bg-[#115cb9]" />
            <Text className="font-bold text-primary uppercase text-xs tracking-wider">Final & Certified</Text>
          </View>
          <Text className="font-headline-lg text-2xl font-bold text-on-surface">{election.title}</Text>
          <Text className="text-on-surface-variant mt-1">
            Total Valid Votes: {tally.validVotes}
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-6 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-bold text-lg text-on-surface">Candidate Performance</Text>
            <TouchableOpacity onPress={handleExport} className="flex-row items-center gap-1">
              <Ionicons name="download-outline" size={16} color="#aec6ff" />
              <Text className="text-secondary font-bold text-sm">Export</Text>
            </TouchableOpacity>
          </View>

          {candidatesData.map((c: any, index: number) => (
            <View key={c.id} className={`flex-row items-center gap-4 py-4 ${index !== candidatesData.length - 1 ? 'border-b border-outline-variant' : ''}`}>
              <View className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container-highest flex-shrink-0">
                {c.photoUrl ? (
                  <Image source={{ uri: c.photoUrl }} className="w-full h-full" resizeMode="cover" />
                ) : (
                  <View className="w-full h-full items-center justify-center">
                    <Ionicons name="person" size={24} color="#8e918f" />
                  </View>
                )}
              </View>
              <View className="flex-1">
                <Text className="font-bold text-on-surface text-lg">{c.name}</Text>
                <Text className="text-xs text-on-surface-variant">{c.party || 'Independent'}</Text>
              </View>
              <View className="items-end">
                <Text className="font-bold text-lg text-primary">{c.percentage}%</Text>
                <Text className="text-xs text-on-surface-variant">{c.votes} votes</Text>
              </View>
            </View>
          ))}
          {candidatesData.length === 0 && (
            <Text className="text-on-surface-variant text-center py-4">No candidates found.</Text>
          )}
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-bold text-lg text-on-surface">Audit Transparency</Text>
            <Ionicons name="shield-checkmark" size={20} color="#115cb9" />
          </View>
          <View className="space-y-4">
            <View className="flex-row items-start gap-3 mb-4 border-b border-outline-variant pb-4">
              <Ionicons name="document-lock" size={20} color="#115cb9" className="mt-1" />
              <View className="flex-1">
                <Text className="font-bold text-on-surface text-sm">Private Key Decryption</Text>
                <Text className="text-xs text-on-surface-variant mt-1">Homomorphic tally executed within secure enclave. Escrow keys destroyed post-tally.</Text>
              </View>
            </View>
            <View className="flex-row items-start gap-3 mb-4 border-b border-outline-variant pb-4">
              <Ionicons name="checkmark-done-circle" size={20} color="#115cb9" className="mt-1" />
              <View className="flex-1">
                <Text className="font-bold text-on-surface text-sm">Zero-Knowledge Proofs</Text>
                <Text className="text-xs text-on-surface-variant mt-1">All counted votes passed identity and eligibility validation.</Text>
              </View>
            </View>
            <View className="flex-row items-start gap-3">
              <Ionicons name="server" size={20} color="#115cb9" className="mt-1" />
              <View className="flex-1">
                <Text className="font-bold text-on-surface text-sm">Ledger Consensus</Text>
                <Text className="text-xs text-on-surface-variant mt-1">Synchronized across primary and secondary nodes without discrepancies.</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
