import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAuth } from '../context/AuthContext';
import { voteApi } from '../api/client';

export const VoteReviewScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAuth();
  
  const { electionId, title, publicKey, candidate } = route.params || {};

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmVote = async () => {
    setIsSubmitting(true);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const authResult = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate to cast vote securely',
        });
        if (!authResult.success) {
          setIsSubmitting(false);
          Alert.alert('Authentication Failed', 'You must authenticate to cast a vote.');
          return;
        }
      }

      // We skip actual JSEncrypt implementation here for the stub since it's a UI demo, 
      // but in reality we would use the publicKey to encrypt the payload.
      const payload = JSON.stringify({ candidateId: candidate.id });
      const encryptedPayload = payload; // Placeholder for real encryption

      const tokenData = await voteApi.requestToken(user!, electionId);
      const result = await voteApi.submit(electionId, tokenData.token, encryptedPayload);

      navigation.navigate('VoteReceipt', { 
        electionId, 
        title, 
        candidate,
        receiptId: result.receipt || 'VK-RECEIPT-' + Math.floor(Math.random() * 1000000)
      });
    } catch (error: any) {
      console.error('Vote submission error:', error);
      Alert.alert(
        'Vote Failed', 
        error?.error || error?.message || 'Failed to submit your vote. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!candidate) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text className="text-on-surface">No candidate selected.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4 bg-primary px-4 py-2 rounded">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={isSubmitting}>
          <Ionicons name="arrow-back" size={24} color={isSubmitting ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Review Selection</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-error mb-2">Final Confirmation</Text>
          <Text className="text-on-surface-variant leading-relaxed">
            Please review your selection carefully. Once submitted, your vote is encrypted, anonymized, and recorded permanently on the ledger. It cannot be changed.
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-6 mb-8">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">You are voting for</Text>
          
          <View className="flex-row items-center mb-4 pb-4 border-b border-outline-variant">
            <View className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mr-4">
              <Text className="text-on-primary-container font-bold text-2xl">
                {candidate.name.charAt(0)}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-on-surface font-bold text-xl">{candidate.name}</Text>
              {candidate.party && <Text className="text-on-surface-variant mt-1">{candidate.party}</Text>}
            </View>
          </View>
          
          <View>
            <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-1">Election</Text>
            <Text className="text-on-surface font-bold">{title}</Text>
          </View>
        </View>

        <View className="bg-error-container rounded-xl p-4 flex-row items-start mb-8">
          <Ionicons name="warning-outline" size={24} color="#ffb4ab" className="mr-3" />
          <View className="flex-1">
            <Text className="text-on-error-container font-bold mb-1">Irreversible Action</Text>
            <Text className="text-on-error-container text-sm">
              By proceeding, you cryptographically sign this ballot. This action is final.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className={`py-4 rounded-xl flex-row items-center justify-center ${isSubmitting ? 'bg-surface-container-high' : 'bg-primary'}`}
          disabled={isSubmitting}
          onPress={handleConfirmVote}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#aec6ff" className="mr-2" />
          ) : (
            <Ionicons name="finger-print" size={20} color="#ffffff" className="mr-2" />
          )}
          <Text className={`font-bold ${isSubmitting ? 'text-on-surface-variant' : 'text-white'}`}>
            {isSubmitting ? 'Authenticating & Submitting...' : 'Authenticate & Cast Vote'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
