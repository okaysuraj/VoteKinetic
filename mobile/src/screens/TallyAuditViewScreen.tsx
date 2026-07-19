import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const TallyAuditViewScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Tally Audit</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-on-surface mb-2">Cryptographic Tally Process</Text>
          <Text className="text-on-surface-variant leading-relaxed">
            The tally is computed using homomorphic encryption, allowing votes to be counted without ever decrypting individual ballots.
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="lock-closed" size={20} color="#c2e7ff" className="mr-2" />
            <Text className="text-on-surface font-bold">1. Ballot Aggregation</Text>
          </View>
          <Text className="text-on-surface-variant text-sm pl-7 mb-2">
            Encrypted ballots are collected and verified against the voter registry zero-knowledge proofs.
          </Text>
          <View className="bg-surface-container-highest p-2 rounded ml-7">
            <Text className="text-on-surface-variant text-xs font-mono">STATUS: COMPLETED</Text>
          </View>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="calculator" size={20} color="#c2e7ff" className="mr-2" />
            <Text className="text-on-surface font-bold">2. Homomorphic Addition</Text>
          </View>
          <Text className="text-on-surface-variant text-sm pl-7 mb-2">
            Ciphertexts are mathematically added together to produce an encrypted tally sum.
          </Text>
          <View className="bg-surface-container-highest p-2 rounded ml-7">
            <Text className="text-on-surface-variant text-xs font-mono">STATUS: COMPLETED</Text>
          </View>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="key" size={20} color="#c2e7ff" className="mr-2" />
            <Text className="text-on-surface font-bold">3. Distributed Decryption</Text>
          </View>
          <Text className="text-on-surface-variant text-sm pl-7 mb-2">
            Trustee nodes use their private key shares to decrypt the final sum (but never individual ballots).
          </Text>
          <View className="bg-secondary-container p-2 rounded ml-7">
            <Text className="text-on-secondary-container text-xs font-mono font-bold">STATUS: IN PROGRESS...</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          className="bg-primary py-4 rounded-xl flex-row items-center justify-center"
          onPress={() => navigation.navigate('ResultIntegrityVerification')}
        >
          <Ionicons name="shield-checkmark" size={20} color="#ffffff" className="mr-2" />
          <Text className="text-white font-bold">Verify Tally Proofs</Text>
        </TouchableOpacity>
        
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
