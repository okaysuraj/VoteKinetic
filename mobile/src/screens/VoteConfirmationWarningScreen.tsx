import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const VoteConfirmationWarningScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { candidate, election } = route.params || {};

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="close" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Final Confirmation</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="items-center mb-8 mt-4">
          <View className="w-20 h-20 rounded-full bg-error-container items-center justify-center mb-4">
            <Ionicons name="warning" size={40} color="#ffb4ab" />
          </View>
          <Text className="text-2xl font-bold text-on-surface mb-2 text-center">Are you absolutely sure?</Text>
          <Text className="text-on-surface-variant text-center px-4 leading-relaxed">
            You are about to cast your vote for <Text className="font-bold text-on-surface">{candidate?.name}</Text> in the {election?.title || 'election'}.
          </Text>
        </View>

        <View className="bg-surface-container-lowest border border-error rounded-xl p-5 mb-8">
          <Text className="text-error font-bold mb-3 flex-row items-center text-lg">
            <Ionicons name="alert-circle" size={20} color="#ffb4ab" /> Irreversible Action
          </Text>
          <Text className="text-on-surface-variant leading-relaxed text-sm">
            Once submitted, your vote is encrypted and instantly added to the immutable ledger. It cannot be recalled, changed, or viewed by anyone (including system administrators).
          </Text>
        </View>
        
        <View className="space-y-4">
          <TouchableOpacity 
            className="bg-primary py-4 rounded-xl flex-row items-center justify-center shadow-sm"
            onPress={() => navigation.navigate('VoteReview', { candidate, election })}
          >
            <Ionicons name="finger-print" size={20} color="#ffffff" className="mr-2" />
            <Text className="font-bold text-white text-lg">Proceed to Authentication</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-surface py-4 rounded-xl flex-row items-center justify-center border border-outline-variant"
            onPress={() => navigation.navigate('Ballot', { electionId: election?.id })}
          >
            <Text className="font-bold text-primary">Cancel & Return to Ballot</Text>
          </TouchableOpacity>
        </View>
        
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
