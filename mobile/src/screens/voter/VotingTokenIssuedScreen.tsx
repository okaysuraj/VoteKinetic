import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const VotingTokenIssuedScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};

  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.navigate('Home')} className="p-2 -ml-2">
          <Ionicons name="close" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Secure Token</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6 content-center justify-center">
        <View className="items-center mb-8 mt-12">
          <Animated.View 
            className="w-32 h-32 rounded-full bg-secondary-container items-center justify-center mb-6 shadow-sm"
            style={{ transform: [{ scale: pulseAnim }] }}
          >
            <Ionicons name="key" size={64} color="#003354" />
          </Animated.View>
          
          <Text className="text-3xl font-bold text-on-surface mb-3 text-center">Token Issued</Text>
          <Text className="text-on-surface-variant text-center px-4 leading-relaxed">
            Your cryptographic voting token has been securely provisioned to your device enclave.
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-5 mb-12 shadow-sm">
          <Text className="text-on-surface font-bold mb-3 flex-row items-center">
            <Ionicons name="shield-checkmark" size={18} color="#00639b" /> Zero-Knowledge Proof
          </Text>
          <Text className="text-on-surface-variant text-sm leading-relaxed mb-4">
            This token allows you to vote without revealing your identity. The system mathematically verifies your eligibility to vote without knowing who you are.
          </Text>
          
          <View className="bg-surface-container-highest p-3 rounded font-mono">
            <Text className="text-on-surface-variant text-xs font-mono text-center tracking-widest break-all">
              ZKP-8F92-A1C4-B7D9-4E61
            </Text>
          </View>
        </View>
        
        <View className="space-y-4">
          <TouchableOpacity 
            className="bg-primary py-4 rounded-xl flex-row items-center justify-center shadow-sm"
            onPress={() => navigation.navigate('ElectionRulesInstructions', { electionId })}
          >
            <Text className="font-bold text-white text-lg mr-2">Begin Voting Process</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
        
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
