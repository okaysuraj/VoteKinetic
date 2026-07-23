import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const RankedChoiceOrderingScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { election } = route.params || {};

  // Mock candidates for ranking
  const [availableCandidates, setAvailableCandidates] = useState(election?.candidates || []);
  const [rankedCandidates, setRankedCandidates] = useState<any[]>([]);

  const handleSelect = (candidate: any) => {
    setAvailableCandidates(prev => prev.filter(c => c.id !== candidate.id));
    setRankedCandidates(prev => [...prev, candidate]);
  };

  const handleRemove = (candidate: any) => {
    setRankedCandidates(prev => prev.filter(c => c.id !== candidate.id));
    setAvailableCandidates(prev => [...prev, candidate]);
  };

  const handleContinue = () => {
    if (rankedCandidates.length === 0) {
      Alert.alert('Selection Required', 'Please rank at least one candidate.');
      return;
    }
    // Pass the ranked list as the "candidate" payload to VoteReview
    navigation.navigate('VoteReview', { candidate: { id: 'ranked', rankedList: rankedCandidates }, election });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Rank Candidates</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-on-surface mb-2">Ranked Choice Voting</Text>
          <Text className="text-on-surface-variant leading-relaxed">
            Select candidates in order of preference. Your 1st choice receives your initial vote. If they are eliminated, your vote transfers to your 2nd choice, and so on.
          </Text>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-3">Your Rankings</Text>
        <View className="bg-surface-container border border-outline-variant rounded-xl p-2 mb-6 min-h-[120px]">
          {rankedCandidates.length === 0 ? (
            <View className="items-center justify-center py-8">
              <Text className="text-on-surface-variant italic">Tap a candidate below to rank them.</Text>
            </View>
          ) : (
            rankedCandidates.map((candidate, index) => (
              <View key={candidate.id} className="flex-row items-center bg-surface-container-highest p-3 rounded-lg mb-2">
                <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
                  <Text className="text-white font-bold">{index + 1}</Text>
                </View>
                <Text className="text-on-surface font-bold text-base flex-1">{candidate.name}</Text>
                <TouchableOpacity onPress={() => handleRemove(candidate)}>
                  <Ionicons name="close-circle" size={24} color="#939aa1" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-3">Available Candidates</Text>
        <View className="space-y-2 mb-6">
          {availableCandidates.length === 0 ? (
            <Text className="text-on-surface-variant text-center py-4">All candidates ranked.</Text>
          ) : (
            availableCandidates.map(candidate => (
              <TouchableOpacity 
                key={candidate.id}
                className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex-row justify-between items-center"
                onPress={() => handleSelect(candidate)}
              >
                <Text className="text-on-surface font-bold text-base">{candidate.name}</Text>
                <Ionicons name="add-circle-outline" size={24} color="#00639b" />
              </TouchableOpacity>
            ))
          )}
        </View>

        <View className="h-24" />
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className={`py-4 rounded-xl flex-row items-center justify-center ${rankedCandidates.length === 0 ? 'bg-surface-container-high' : 'bg-primary'}`}
          onPress={handleContinue}
          disabled={rankedCandidates.length === 0}
        >
          <Text className={`font-bold ${rankedCandidates.length === 0 ? 'text-on-surface-variant' : 'text-white'}`}>
            Continue to Review
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
