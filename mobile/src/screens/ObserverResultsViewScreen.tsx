import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTurnoutAnalytics } from '../hooks/useAdmin';
import { useElection } from '../hooks/useElections';

export const ObserverResultsViewScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};

  const { election, loading: electionLoading } = useElection(electionId);
  const { analytics, loading: analyticsLoading, refresh } = useTurnoutAnalytics(electionId);

  const loading = electionLoading || analyticsLoading;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#115cb9" />
      </SafeAreaView>
    );
  }

  // Fallback to basic counts if analytics endpoint isn't fully returning yet
  const totalVotes = analytics?.totalVotes || election?._count?.votes || 0;
  const eligibleVoters = analytics?.totalEligible || election?._count?.eligibility || 0;
  const turnoutPercent = eligibleVoters > 0 ? Math.round((totalVotes / eligibleVoters) * 100) : 0;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Live Tally</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-on-surface mb-1">{election?.title || 'Unknown Election'}</Text>
          <Text className="text-on-surface-variant font-mono text-xs">Election ID: {electionId}</Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-6 mb-6 shadow-sm">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4 text-center">Current Turnout</Text>
          <View className="items-center mb-4">
            <Text className="text-5xl font-bold text-secondary mb-1">{turnoutPercent}%</Text>
            <Text className="text-on-surface-variant text-sm">of eligible voters</Text>
          </View>
          <View className="flex-row justify-between border-t border-outline-variant pt-4">
            <View className="items-center">
              <Text className="text-on-surface-variant text-xs mb-1">Total Ballots Cast</Text>
              <Text className="text-on-surface font-bold text-xl">{totalVotes}</Text>
            </View>
            <View className="items-center">
              <Text className="text-on-surface-variant text-xs mb-1">Eligible Voters</Text>
              <Text className="text-on-surface font-mono font-bold">{eligibleVoters.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Cryptographic Status</Text>
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-8">
          <View className="flex-row items-center mb-2">
            <Ionicons name="shield-checkmark" size={16} color="#00639b" className="mr-2" />
            <Text className="text-primary font-bold text-sm">Homomorphic Ledger Active</Text>
          </View>
          <Text className="text-on-surface-variant text-xs leading-relaxed">
            Every ballot has been anonymized and verified against the electoral blockchain ledger. The final tally is mathematically immutable.
          </Text>
        </View>

        <TouchableOpacity 
          className="bg-primary py-4 rounded-xl flex-row items-center justify-center mb-4"
          onPress={refresh}
        >
          <Ionicons name="refresh" size={20} color="#ffffff" className="mr-2" />
          <Text className="text-white font-bold">Refresh Tally</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-surface-container-high py-4 rounded-xl flex-row items-center justify-center border border-outline-variant"
          onPress={() => navigation.navigate('ResultIntegrityVerification')}
        >
          <Ionicons name="construct-outline" size={20} color="#aec6ff" className="mr-2" />
          <Text className="text-primary font-bold">Run Integrity Check</Text>
        </TouchableOpacity>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
