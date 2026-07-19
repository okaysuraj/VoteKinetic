import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const ElectionRulesInstructionsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId, title } = route.params || { electionId: 'unknown', title: 'Election' };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Voting Rules</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-on-surface mb-2">Instructions</Text>
          <Text className="text-on-surface-variant leading-relaxed">
            Please read the following rules carefully before proceeding to cast your ballot for {title}.
          </Text>
        </View>

        <View className="space-y-4">
          <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex-row items-start">
            <Ionicons name="checkmark-circle" size={24} color="#00639b" className="mr-3" />
            <View className="flex-1">
              <Text className="text-on-surface font-bold mb-1">Single Choice Selection</Text>
              <Text className="text-on-surface-variant text-sm leading-relaxed">
                You may only select one candidate on the ballot. If you wish to change your vote, you must do so before final submission.
              </Text>
            </View>
          </View>

          <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex-row items-start">
            <Ionicons name="lock-closed" size={24} color="#00639b" className="mr-3" />
            <View className="flex-1">
              <Text className="text-on-surface font-bold mb-1">Final & Immutable</Text>
              <Text className="text-on-surface-variant text-sm leading-relaxed">
                Once you cryptographically sign and submit your ballot, it is permanently recorded on the ledger. You cannot undo or recast your vote.
              </Text>
            </View>
          </View>

          <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex-row items-start">
            <Ionicons name="finger-print" size={24} color="#00639b" className="mr-3" />
            <View className="flex-1">
              <Text className="text-on-surface font-bold mb-1">Biometric Verification</Text>
              <Text className="text-on-surface-variant text-sm leading-relaxed">
                You will be required to authenticate using FaceID, TouchID, or your device PIN before the final cryptographic payload is generated.
              </Text>
            </View>
          </View>

          <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex-row items-start">
            <Ionicons name="receipt-outline" size={24} color="#00639b" className="mr-3" />
            <View className="flex-1">
              <Text className="text-on-surface font-bold mb-1">Audit Receipt</Text>
              <Text className="text-on-surface-variant text-sm leading-relaxed">
                After voting, you will receive a verifiable hash receipt. Save this receipt to verify your vote was included in the final tally without revealing who you voted for.
              </Text>
            </View>
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className="bg-primary py-4 rounded-xl flex-row items-center justify-center"
          onPress={() => navigation.navigate('Ballot', { electionId })}
        >
          <Text className="font-bold text-white mr-2">I Understand, Continue to Ballot</Text>
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
