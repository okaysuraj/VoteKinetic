import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const CandidateDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { candidate } = route.params || {
    candidate: {
      name: 'Sample Candidate',
      bio: 'This is a detailed biography of the candidate highlighting their extensive experience and platform goals for this election.',
      platform: [
        'Improve transparency in voting',
        'Increase community engagement',
        'Upgrade technical infrastructure'
      ]
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="close" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Candidate Profile</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="items-center mb-6">
          <View className="w-32 h-32 rounded-full bg-surface-container-high border-4 border-surface items-center justify-center mb-4 shadow-sm overflow-hidden">
            <Ionicons name="person" size={64} color="#939aa1" />
          </View>
          <Text className="text-2xl font-bold text-on-surface">{candidate.name}</Text>
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mt-1">Official Candidate</Text>
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 mb-6">
          <Text className="text-primary font-bold mb-2 flex-row items-center">
            <Ionicons name="document-text-outline" size={16} color="#00639b" /> Biography
          </Text>
          <Text className="text-on-surface-variant leading-relaxed">
            {candidate.bio || 'No biography provided for this candidate.'}
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-5 mb-6">
          <Text className="text-primary font-bold mb-3 flex-row items-center">
            <Ionicons name="flag-outline" size={16} color="#00639b" /> Key Platform Goals
          </Text>
          
          {candidate.platform && candidate.platform.length > 0 ? (
            candidate.platform.map((goal: string, index: number) => (
              <View key={index} className="flex-row items-start mb-3">
                <View className="w-6 h-6 rounded-full bg-secondary-container items-center justify-center mr-3 mt-0.5">
                  <Text className="text-on-secondary-container font-bold text-xs">{index + 1}</Text>
                </View>
                <Text className="text-on-surface-variant flex-1 leading-relaxed">{goal}</Text>
              </View>
            ))
          ) : (
            <Text className="text-on-surface-variant italic">Platform details not available.</Text>
          )}
        </View>

        <View className="h-24" />
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className="bg-primary py-4 rounded-xl flex-row items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Text className="font-bold text-white">Back to Ballot</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
