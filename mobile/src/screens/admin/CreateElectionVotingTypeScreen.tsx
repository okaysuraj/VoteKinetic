import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const CreateElectionVotingTypeScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionData } = route.params || {};

  const [type, setType] = useState('STANDARD');

  const handleNext = () => {
    navigation.navigate('CreateElectionEligibilityRules', {
      electionData: {
        ...electionData,
        type
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Step 3 of 6</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <Text className="font-headline-lg text-primary text-2xl font-bold mb-2">Voting System</Text>
        <Text className="text-on-surface-variant mb-6">Select the mathematical model for determining the winner.</Text>

        <TouchableOpacity 
          className={`p-4 rounded-xl border-2 mb-4 ${type === 'STANDARD' ? 'border-secondary bg-surface-container-high' : 'border-outline-variant bg-surface'}`}
          onPress={() => setType('STANDARD')}
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="checkmark-circle" size={24} color={type === 'STANDARD' ? '#aec6ff' : '#8e918f'} className="mr-3" />
            <Text className={`font-bold text-lg ${type === 'STANDARD' ? 'text-primary' : 'text-on-surface'}`}>Standard Plurality</Text>
          </View>
          <Text className="text-on-surface-variant ml-9">
            First-past-the-post. Voters select a single candidate, and the candidate with the most votes wins.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className={`p-4 rounded-xl border-2 mb-4 ${type === 'RANKED_CHOICE' ? 'border-secondary bg-surface-container-high' : 'border-outline-variant bg-surface'}`}
          onPress={() => setType('RANKED_CHOICE')}
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="list" size={24} color={type === 'RANKED_CHOICE' ? '#aec6ff' : '#8e918f'} className="mr-3" />
            <Text className={`font-bold text-lg ${type === 'RANKED_CHOICE' ? 'text-primary' : 'text-on-surface'}`}>Ranked Choice (IRV)</Text>
          </View>
          <Text className="text-on-surface-variant ml-9">
            Instant-runoff voting. Voters rank candidates by preference. Requires >50% majority to win.
          </Text>
          {type === 'RANKED_CHOICE' && (
            <View className="ml-9 mt-3 p-2 bg-secondary-container rounded">
              <Text className="text-on-secondary-container text-xs font-bold">Advanced Cryptography Enabled</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          className={`p-4 rounded-xl border-2 mb-4 opacity-60 ${type === 'APPROVAL' ? 'border-secondary bg-surface-container-high' : 'border-outline-variant bg-surface'}`}
          disabled
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="checkbox" size={24} color="#8e918f" className="mr-3" />
            <Text className="font-bold text-lg text-on-surface">Approval Voting</Text>
            <View className="ml-auto bg-surface-variant px-2 py-1 rounded">
              <Text className="text-[10px] uppercase font-bold text-on-surface-variant">Coming Soon</Text>
            </View>
          </View>
          <Text className="text-on-surface-variant ml-9">
            Voters can select any number of candidates they approve of.
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className="py-4 rounded-xl flex-row items-center justify-center shadow-sm bg-primary"
          onPress={handleNext}
        >
          <Text className="font-bold text-on-primary mr-2 text-lg">Continue to Eligibility</Text>
          <Ionicons name="arrow-forward" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
