import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const CreateElectionSecuritySettingsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionData } = route.params || {};

  const [encryption, setEncryption] = useState(true);
  const [anonymity, setAnonymity] = useState(true);
  const [audit, setAudit] = useState(true);

  const handleNext = () => {
    navigation.navigate('CreateElectionPreview', {
      electionData: {
        ...electionData,
        security: {
          encryption,
          anonymity,
          audit
        }
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Step 5 of 6</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <Text className="font-headline-lg text-primary text-2xl font-bold mb-2">Security Profiles</Text>
        <Text className="text-on-surface-variant mb-6">Configure cryptographic and audit settings.</Text>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-4 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <View className="flex-row items-center mb-1">
              <Ionicons name="key" size={20} color="#aec6ff" className="mr-2" />
              <Text className="font-bold text-on-surface">End-to-End Encryption</Text>
            </View>
            <Text className="text-xs text-on-surface-variant leading-relaxed">
              Utilizes AES-256-GCM for the private key and RSA-OAEP for vote payloads. Mandatory for compliance.
            </Text>
          </View>
          <Switch 
            value={encryption} 
            onValueChange={() => {}} 
            disabled 
            trackColor={{ false: '#44474e', true: '#115cb9' }}
          />
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-4 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <View className="flex-row items-center mb-1">
              <Ionicons name="eye-off" size={20} color="#aec6ff" className="mr-2" />
              <Text className="font-bold text-on-surface">Cryptographic Anonymity</Text>
            </View>
            <Text className="text-xs text-on-surface-variant leading-relaxed">
              Decouples voter identity from the cast ballot. Prevents any association between user profile and vote.
            </Text>
          </View>
          <Switch 
            value={anonymity} 
            onValueChange={() => {}} 
            disabled 
            trackColor={{ false: '#44474e', true: '#115cb9' }}
          />
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-6 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <View className="flex-row items-center mb-1">
              <Ionicons name="server" size={20} color="#aec6ff" className="mr-2" />
              <Text className="font-bold text-on-surface">Immutable Ledger Audit</Text>
            </View>
            <Text className="text-xs text-on-surface-variant leading-relaxed">
              Records all significant election events to the central audit log for verification.
            </Text>
          </View>
          <Switch 
            value={audit} 
            onValueChange={() => {}} 
            disabled 
            trackColor={{ false: '#44474e', true: '#115cb9' }}
          />
        </View>

        <View className="p-4 bg-surface-container-low border border-outline-variant rounded-xl">
          <Text className="text-xs text-on-surface-variant text-center">
            Note: For the prototype phase, these security features are locked to ON to ensure the architecture remains secure by default.
          </Text>
        </View>
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className="py-4 rounded-xl flex-row items-center justify-center shadow-sm bg-primary"
          onPress={handleNext}
        >
          <Text className="font-bold text-on-primary mr-2 text-lg">Review Election</Text>
          <Ionicons name="arrow-forward" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
