import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

export const VoteReceiptScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const { electionId, title, candidate, receiptId } = route.params || {};

  const copyToClipboard = async () => {
    if (receiptId) {
      await Clipboard.setStringAsync(receiptId);
    }
  };

  const handleReturnHome = () => {
    // Reset stack to Dashboard so they can't go back to the receipt easily
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'VoterDashboard' }],
      })
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-center px-4 py-4 border-b border-outline-variant">
        <Text className="font-bold text-xl text-primary text-center">Vote Submitted</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-8">
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-secondary-container flex items-center justify-center mb-6 shadow-sm">
            <Ionicons name="checkmark-done" size={48} color="#003354" />
          </View>
          <Text className="text-2xl font-bold text-on-surface text-center mb-2">Success!</Text>
          <Text className="text-on-surface-variant text-center max-w-[300px]">
            Your vote for <Text className="font-bold text-on-surface">{title}</Text> has been cryptographically secured and recorded on the immutable ledger.
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-6 mb-8">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Official Receipt ID</Text>
          
          <View className="bg-surface-container-highest p-4 rounded-lg flex-row items-center justify-between mb-4 border border-outline-variant">
            <Text className="text-on-surface font-mono font-bold text-lg flex-1" numberOfLines={1} adjustsFontSizeToFit>
              {receiptId || 'VK-XXXX-YYYY'}
            </Text>
            <TouchableOpacity onPress={copyToClipboard} className="p-2 bg-surface rounded ml-2">
              <Ionicons name="copy-outline" size={20} color="#aec6ff" />
            </TouchableOpacity>
          </View>
          
          <View className="bg-primary-container p-4 rounded-lg flex-row items-start">
            <Ionicons name="information-circle-outline" size={20} color="#003258" className="mr-3" />
            <Text className="text-on-primary-container text-sm flex-1 leading-relaxed">
              Save this receipt ID. You can use it to verify that your ballot was included in the final tally without revealing your selection.
            </Text>
          </View>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-6">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Your Selection</Text>
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mr-4">
              <Text className="text-on-primary-container font-bold text-lg">
                {candidate?.name?.charAt(0) || '?'}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-on-surface font-bold text-lg">{candidate?.name || 'Unknown Candidate'}</Text>
            </View>
          </View>
        </View>

        <View className="h-12" />
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className="bg-primary py-4 rounded-xl flex-row items-center justify-center"
          onPress={handleReturnHome}
        >
          <Ionicons name="home-outline" size={20} color="#ffffff" className="mr-2" />
          <Text className="text-white font-bold">Return to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
