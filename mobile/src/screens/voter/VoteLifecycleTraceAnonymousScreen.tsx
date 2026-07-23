import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

export const VoteLifecycleTraceAnonymousScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { receipt } = route.params || {};

  const [loading, setLoading] = useState(true);

  // Mocking the data fetch for the receipt trace
  useEffect(() => {
    if (!receipt) {
      setLoading(false);
      return;
    }
    
    // Simulate network delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [receipt]);

  const handleCopy = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied', 'Hash copied to clipboard');
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#115cb9" />
        <Text className="text-on-surface-variant mt-4">Tracing cryptographic proof...</Text>
      </SafeAreaView>
    );
  }

  if (!receipt) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center p-4">
        <Text className="text-error font-bold mb-4">No receipt provided for tracing.</Text>
        <TouchableOpacity className="bg-primary px-6 py-2 rounded-lg" onPress={() => navigation.goBack()}>
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface z-10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={20} color="#001a41" className="mr-2" />
          <Text className="font-bold text-xl text-primary tracking-tight">Vote Trace</Text>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-4 pt-6 pb-20">
        <View className="mb-8 items-center">
          <Text className="font-headline-lg text-2xl font-bold text-on-surface mb-2 text-center">Cryptographic Journey</Text>
          <Text className="text-on-surface-variant text-center max-w-[300px]">
            Follow the immutable record of your vote from device to final tally without compromising privacy.
          </Text>
        </View>

        <View className="bg-surface border border-outline-variant rounded-xl p-4 mb-8 items-center shadow-sm">
          <Text className="text-xs text-on-surface-variant uppercase tracking-wider mb-2">Tracked Receipt Hash</Text>
          <TouchableOpacity 
            onPress={() => handleCopy(receipt)}
            className="flex-row items-center bg-surface-container-highest px-3 py-2 rounded"
          >
            <Text className="font-mono text-primary mr-2" numberOfLines={1} ellipsizeMode="middle">
              {receipt.substring(0, 16)}...{receipt.substring(receipt.length - 8)}
            </Text>
            <Ionicons name="copy-outline" size={16} color="#115cb9" />
          </TouchableOpacity>
        </View>

        <View className="pl-4">
          {/* Step 1 */}
          <View className="relative pl-10 mb-8">
            <View className="absolute left-[-24px] top-0 bottom-[-32px] w-[2px] bg-outline-variant ml-8" />
            <View className="absolute left-[-12px] top-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-4 border-background ml-4">
              <Ionicons name="key" size={12} color="#ffffff" />
            </View>
            <View className="bg-surface border border-outline-variant p-4 rounded-xl shadow-sm">
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="font-bold text-on-surface text-lg">Key Generation</Text>
                  <Text className="text-[10px] text-on-surface-variant">Step 1</Text>
                </View>
                <View className="bg-surface-container-high px-2 py-1 rounded">
                  <Text className="text-[10px] font-bold text-on-surface">DONE</Text>
                </View>
              </View>
              <Text className="text-sm text-on-surface-variant mb-4">Ephemeral cryptographic key pair generated locally on your device.</Text>
              <View className="bg-surface-container-lowest p-2 rounded border border-outline-variant/50">
                <Text className="text-[10px] text-on-surface-variant uppercase mb-1">Public Key Hash</Text>
                <Text className="font-mono text-xs text-primary">0x882a77f1b990cc21...d9e1</Text>
              </View>
            </View>
          </View>

          {/* Step 2 */}
          <View className="relative pl-10 mb-8">
            <View className="absolute left-[-24px] top-0 bottom-[-32px] w-[2px] bg-outline-variant ml-8" />
            <View className="absolute left-[-12px] top-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-4 border-background ml-4">
              <Ionicons name="document-text" size={12} color="#ffffff" />
            </View>
            <View className="bg-surface border border-outline-variant p-4 rounded-xl shadow-sm">
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="font-bold text-on-surface text-lg">Ballot Signed & Encrypted</Text>
                  <Text className="text-[10px] text-on-surface-variant">Step 2</Text>
                </View>
                <View className="bg-surface-container-high px-2 py-1 rounded">
                  <Text className="text-[10px] font-bold text-on-surface">DONE</Text>
                </View>
              </View>
              <Text className="text-sm text-on-surface-variant mb-4">Ballot content encrypted via homomorphic encryption and signed.</Text>
            </View>
          </View>

          {/* Step 3 */}
          <View className="relative pl-10 mb-8">
            <View className="absolute left-[-24px] top-0 bottom-[-32px] w-[2px] bg-outline-variant ml-8" />
            <View className="absolute left-[-12px] top-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-4 border-background ml-4">
              <Ionicons name="server" size={12} color="#ffffff" />
            </View>
            <View className="bg-surface border border-outline-variant p-4 rounded-xl shadow-sm">
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="font-bold text-on-surface text-lg">Ledger Entry</Text>
                  <Text className="text-[10px] text-on-surface-variant">Step 3</Text>
                </View>
                <View className="bg-surface-container-high px-2 py-1 rounded">
                  <Text className="text-[10px] font-bold text-on-surface">DONE</Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center py-2 border-b border-outline-variant/30">
                <Text className="text-xs text-on-surface-variant font-bold">Block</Text>
                <Text className="font-mono text-xs font-bold">#4,821,093</Text>
              </View>
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-xs text-on-surface-variant font-bold">Network Consensus</Text>
                <Text className="text-primary font-bold text-xs">24/24 Nodes</Text>
              </View>
            </View>
          </View>

          {/* Step 4 */}
          <View className="relative pl-10 mb-4">
            <View className="absolute left-[-12px] top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-4 border-background ml-4">
              <Ionicons name="stats-chart" size={12} color="#ffffff" />
            </View>
            <View className="bg-surface border-2 border-primary p-4 rounded-xl shadow-sm">
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <Text className="font-bold text-on-surface text-lg">Tally Inclusion</Text>
                  <Text className="text-[10px] text-on-surface-variant">Final Step</Text>
                </View>
                <View className="bg-primary px-2 py-1 rounded">
                  <Text className="text-[10px] font-bold text-white">FINAL</Text>
                </View>
              </View>
              <View className="flex-row items-center bg-surface-container-lowest p-3 rounded border border-outline-variant/50">
                <Ionicons name="shield-checkmark" size={24} color="#115cb9" className="mr-3" />
                <View className="flex-1">
                  <Text className="font-bold text-on-surface text-sm">Verified Zero-Knowledge Proof</Text>
                  <Text className="text-[10px] text-on-surface-variant mt-1">Aggregated without decrypting selection.</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-8 bg-surface-container-high p-4 rounded-xl flex-row items-center">
          <Ionicons name="information-circle" size={24} color="#001a41" className="mr-3" />
          <Text className="flex-1 text-xs text-on-surface-variant leading-relaxed">
            Every step is protected by industrial-grade encryption. Hashes can be independently verified using the official audit tool.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
