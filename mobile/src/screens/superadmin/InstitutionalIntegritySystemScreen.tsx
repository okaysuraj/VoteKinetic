import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const InstitutionalIntegritySystemScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">System Integrity</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="font-headline-lg text-2xl font-bold text-primary mb-2">Institutional Integrity</Text>
          <Text className="text-on-surface-variant text-sm leading-relaxed">
            VoteKinetic employs cryptographic, state-of-the-art mechanisms to guarantee that all electoral processes are transparent, secure, and verifiable.
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-6 mb-4">
          <View className="flex-row items-center mb-4">
            <Ionicons name="lock-closed" size={24} color="#115cb9" className="mr-3" />
            <Text className="font-bold text-lg text-on-surface">End-to-End Encryption</Text>
          </View>
          <Text className="text-sm text-on-surface-variant leading-relaxed">
            Votes are encrypted on the device using AES-256 and RSA cryptography. The private key remains in escrow until the election closes, ensuring that intermediate tallies cannot be observed.
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-6 mb-4">
          <View className="flex-row items-center mb-4">
            <Ionicons name="finger-print" size={24} color="#115cb9" className="mr-3" />
            <Text className="font-bold text-lg text-on-surface">Cryptographic Anonymity</Text>
          </View>
          <Text className="text-sm text-on-surface-variant leading-relaxed">
            The voter's identity is strictly decoupled from their cast ballot. Zero-knowledge proofs (ZKPs) verify eligibility without revealing who they voted for.
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-6 mb-4">
          <View className="flex-row items-center mb-4">
            <Ionicons name="server" size={24} color="#115cb9" className="mr-3" />
            <Text className="font-bold text-lg text-on-surface">Immutable Audit Ledger</Text>
          </View>
          <Text className="text-sm text-on-surface-variant leading-relaxed">
            All administrative actions, configuration changes, and state transitions are cryptographically signed and appended to an append-only ledger for post-election auditing.
          </Text>
        </View>

        <View className="bg-surface-container-low border border-outline-variant rounded-xl p-4 mt-4 flex-row items-center">
          <Ionicons name="shield-checkmark" size={32} color="#001a41" className="mr-4" />
          <View className="flex-1">
            <Text className="font-bold text-primary">Compliance Guaranteed</Text>
            <Text className="text-xs text-on-surface-variant mt-1">
              Meets VVSG 2.0 digital election standards for integrity and resilience.
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
