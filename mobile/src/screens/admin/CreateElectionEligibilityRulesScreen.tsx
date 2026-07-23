import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const CreateElectionEligibilityRulesScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionData } = route.params || {};

  const [rule, setRule] = useState('INVITE_ONLY');

  const handleNext = () => {
    navigation.navigate('CreateElectionSecuritySettings', {
      electionData: {
        ...electionData,
        eligibilityRule: rule
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Step 4 of 6</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <Text className="font-headline-lg text-primary text-2xl font-bold mb-2">Eligibility Rules</Text>
        <Text className="text-on-surface-variant mb-6">Determine who is authorized to cast a ballot.</Text>

        <TouchableOpacity 
          className={`p-4 rounded-xl border-2 mb-4 ${rule === 'INVITE_ONLY' ? 'border-secondary bg-surface-container-high' : 'border-outline-variant bg-surface'}`}
          onPress={() => setRule('INVITE_ONLY')}
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="people" size={24} color={rule === 'INVITE_ONLY' ? '#aec6ff' : '#8e918f'} className="mr-3" />
            <Text className={`font-bold text-lg ${rule === 'INVITE_ONLY' ? 'text-primary' : 'text-on-surface'}`}>Invite Only (Private)</Text>
          </View>
          <Text className="text-on-surface-variant ml-9">
            Only voters explicitly imported or added by the administrator can participate.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className={`p-4 rounded-xl border-2 mb-4 opacity-60 ${rule === 'OPEN' ? 'border-secondary bg-surface-container-high' : 'border-outline-variant bg-surface'}`}
          disabled
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="globe" size={24} color="#8e918f" className="mr-3" />
            <Text className="font-bold text-lg text-on-surface">Open Registration</Text>
            <View className="ml-auto bg-surface-variant px-2 py-1 rounded">
              <Text className="text-[10px] uppercase font-bold text-on-surface-variant">Coming Soon</Text>
            </View>
          </View>
          <Text className="text-on-surface-variant ml-9">
            Anyone with a verified organization account can register and vote.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className={`p-4 rounded-xl border-2 mb-4 opacity-60 ${rule === 'TOKEN_GATED' ? 'border-secondary bg-surface-container-high' : 'border-outline-variant bg-surface'}`}
          disabled
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="key" size={24} color="#8e918f" className="mr-3" />
            <Text className="font-bold text-lg text-on-surface">Token Gated</Text>
            <View className="ml-auto bg-surface-variant px-2 py-1 rounded">
              <Text className="text-[10px] uppercase font-bold text-on-surface-variant">Coming Soon</Text>
            </View>
          </View>
          <Text className="text-on-surface-variant ml-9">
            Requires voters to hold a specific cryptographic token to prove eligibility.
          </Text>
        </TouchableOpacity>
        
        <View className="mt-4 p-4 bg-surface-container border border-outline-variant rounded-xl flex-row items-center">
          <Ionicons name="information-circle" size={24} color="#aec6ff" className="mr-3" />
          <Text className="text-xs text-on-surface-variant flex-1 leading-relaxed">
            For the current platform version, Invite Only is enforced to guarantee strict cryptographic identity validation.
          </Text>
        </View>
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className="py-4 rounded-xl flex-row items-center justify-center shadow-sm bg-primary"
          onPress={handleNext}
        >
          <Text className="font-bold text-on-primary mr-2 text-lg">Continue to Security</Text>
          <Ionicons name="arrow-forward" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
