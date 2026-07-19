import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useElection } from '../hooks/useElections';

export const ElectionDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};
  const { election, loading, error, refresh } = useElection(electionId);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#115cb9" />
      </SafeAreaView>
    );
  }

  if (error || !election) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center p-4">
        <Text className="text-error mb-4">{error || 'Election not found'}</Text>
        <TouchableOpacity className="bg-primary px-6 py-2 rounded-lg" onPress={refresh}>
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const now = new Date();
  const startDate = new Date(election.startDate);
  const endDate = new Date(election.endDate);

  const isUpcoming = now < startDate;
  const isClosed = now > endDate;
  const isActive = now >= startDate && now <= endDate;

  const handleAction = () => {
    if (isUpcoming) {
      navigation.navigate('ElectionCountdown', { electionId: election.id });
    } else if (isClosed) {
      navigation.navigate('ElectionClosed', { electionId: election.id });
    } else {
      navigation.navigate('Ballot', { electionId: election.id });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Election Details</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            {isActive && (
              <View className="bg-secondary-container px-2 py-0.5 rounded mr-2">
                <Text className="text-on-secondary-container text-xs font-bold uppercase tracking-wider">Active</Text>
              </View>
            )}
            {isUpcoming && (
              <View className="bg-surface-container-highest px-2 py-0.5 rounded mr-2">
                <Text className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">Upcoming</Text>
              </View>
            )}
            {isClosed && (
              <View className="bg-error-container px-2 py-0.5 rounded mr-2">
                <Text className="text-on-error-container text-xs font-bold uppercase tracking-wider">Closed</Text>
              </View>
            )}
            <Text className="text-on-surface-variant text-xs">
              {isActive ? `Closes in ${Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 3600 * 24))} days` : ''}
            </Text>
          </View>
          
          <Text className="text-3xl font-bold text-on-surface mb-2">{election.title}</Text>
          <Text className="text-on-surface-variant leading-relaxed mb-6">
            {election.description || 'No description provided for this election.'}
          </Text>

          <View className="bg-surface-container border border-outline-variant rounded-xl p-4 flex-row flex-wrap">
            <View className="w-1/2 mb-4">
              <Text className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">Start Date</Text>
              <Text className="text-on-surface font-bold">{startDate.toLocaleDateString()}</Text>
            </View>
            <View className="w-1/2 mb-4">
              <Text className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">End Date</Text>
              <Text className="text-on-surface font-bold">{endDate.toLocaleDateString()}</Text>
            </View>
            <View className="w-1/2">
              <Text className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">Type</Text>
              <Text className="text-on-surface font-bold capitalize">{election.type || 'Standard'}</Text>
            </View>
            <View className="w-1/2">
              <Text className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">Candidates</Text>
              <Text className="text-on-surface font-bold">{election.candidates?.length || 0}</Text>
            </View>
          </View>
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-6">
          <Text className="text-on-surface font-bold mb-2">Cryptographic Verification</Text>
          <Text className="text-on-surface-variant text-sm leading-relaxed mb-3">
            This election uses homomorphic encryption. Your vote will be encrypted on this device before transmission and can be independently verified on the blockchain.
          </Text>
          <View className="flex-row items-center gap-2">
            <Ionicons name="shield-checkmark" size={16} color="#00639b" />
            <Text className="text-primary font-bold text-xs">AES-256 ENCRYPTION ACTIVE</Text>
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className={`py-4 rounded-xl flex-row items-center justify-center ${isActive ? 'bg-primary' : 'bg-surface-container-high'}`}
          onPress={handleAction}
        >
          {isActive && <Ionicons name="finger-print" size={20} color="#ffffff" className="mr-2" />}
          <Text className={`font-bold ${isActive ? 'text-white' : 'text-on-surface'}`}>
            {isActive ? 'Authenticate & Enter Ballot' : isUpcoming ? 'View Countdown' : 'View Results'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
