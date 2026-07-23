import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useElection } from '../hooks/useElections';

export const BallotScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};
  const { election, loading, error, refresh } = useElection(electionId);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

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

  const candidates = election.candidates || [];

  const handleReview = () => {
    if (!selectedCandidate) {
      Alert.alert('No Selection', 'Please select a candidate before proceeding.');
      return;
    }

    navigation.navigate('VoteReview', {
      electionId: election.id,
      title: election.title,
      publicKey: election.publicKey,
      candidate: selectedCandidate
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="close" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Official Ballot</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-on-surface mb-2">{election.title}</Text>
          <Text className="text-on-surface-variant leading-relaxed">
            Please carefully review the candidates below. You can only select one candidate for this election. Tap a candidate to make your selection.
          </Text>
        </View>

        {candidates.length === 0 ? (
          <View className="bg-surface-container border border-outline-variant rounded-xl p-8 items-center">
            <Ionicons name="person-outline" size={48} color="#939aa1" className="mb-4" />
            <Text className="text-on-surface font-bold text-lg mb-2">No Candidates</Text>
            <Text className="text-on-surface-variant text-center">There are currently no candidates registered for this election.</Text>
          </View>
        ) : (
          <View className="space-y-4">
            {candidates.map((candidate: any) => {
              const isSelected = selectedCandidate?.id === candidate.id;
              
              return (
                <TouchableOpacity 
                  key={candidate.id}
                  className={`bg-surface-container border ${isSelected ? 'border-secondary' : 'border-outline-variant'} rounded-xl p-4 flex-row items-center`}
                  onPress={() => setSelectedCandidate(candidate)}
                  activeOpacity={0.7}
                >
                  <View className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mr-4 overflow-hidden">
                    {candidate.imageUrl ? (
                      <Image source={{ uri: candidate.imageUrl }} className="w-full h-full" />
                    ) : (
                      <Text className="text-on-primary-container font-bold text-lg">
                        {candidate.name.charAt(0)}
                      </Text>
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="text-on-surface font-bold text-lg">{candidate.name}</Text>
                    {candidate.party && <Text className="text-on-surface-variant text-sm mt-1">{candidate.party}</Text>}
                  </View>
                  <View className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-secondary bg-secondary' : 'border-outline-variant'}`}>
                    {isSelected && <Ionicons name="checkmark" size={16} color="#ffffff" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View className="h-24" />
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className={`py-4 rounded-xl items-center ${selectedCandidate ? 'bg-primary' : 'bg-surface-container-high'}`}
          disabled={!selectedCandidate}
          onPress={handleReview}
        >
          <Text className={`font-bold ${selectedCandidate ? 'text-white' : 'text-on-surface-variant'}`}>
            Review Selection
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
