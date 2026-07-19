import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const VoteLifecycleTraceScreen = () => {
  const navigation = useNavigation<any>();
  const [receiptHash, setReceiptHash] = useState('');
  const [searching, setSearching] = useState(false);
  const [traceResult, setTraceResult] = useState<any>(null);

  const handleTrace = () => {
    if (!receiptHash || receiptHash.length < 8) {
      Alert.alert('Invalid Receipt', 'Please enter a valid cryptographic receipt hash.');
      return;
    }

    setSearching(true);
    setTraceResult(null);

    // Simulate looking up the receipt hash on the ledger
    setTimeout(() => {
      setSearching(false);
      setTraceResult({
        hash: receiptHash,
        status: 'COUNTED_IN_TALLY',
        timestamp: new Date().toISOString(),
        blockId: '0x8f4e2b...9a1c',
        nodesVerified: 24,
      });
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Trace Ballot</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-on-surface mb-2">Receipt Verification</Text>
          <Text className="text-on-surface-variant leading-relaxed">
            Enter your vote receipt hash to verify that your encrypted ballot was successfully recorded and included in the final tally.
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-6">
          <Text className="text-on-surface-variant text-xs mb-2">Receipt Hash</Text>
          <View className="flex-row items-center border-b border-outline-variant pb-2">
            <Ionicons name="search" size={20} color="#939aa1" className="mr-2" />
            <TextInput 
              className="flex-1 text-on-surface text-base font-mono"
              placeholder="e.g. SHA-256..."
              placeholderTextColor="#939aa1"
              value={receiptHash}
              onChangeText={setReceiptHash}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          
          <TouchableOpacity 
            className={`mt-4 py-3 rounded-lg flex-row items-center justify-center ${searching ? 'bg-surface-container-high' : 'bg-primary'}`}
            onPress={handleTrace}
            disabled={searching}
          >
            {searching ? (
              <ActivityIndicator size="small" color="#aec6ff" className="mr-2" />
            ) : (
              <Ionicons name="analytics" size={18} color="#ffffff" className="mr-2" />
            )}
            <Text className={`font-bold ${searching ? 'text-on-surface-variant' : 'text-white'}`}>
              {searching ? 'Querying Ledger...' : 'Trace on Ledger'}
            </Text>
          </TouchableOpacity>
        </View>

        {traceResult && (
          <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 mb-6">
            <View className="flex-row items-center mb-4 pb-4 border-b border-outline-variant">
              <View className="w-12 h-12 rounded-full bg-secondary-container items-center justify-center mr-4">
                <Ionicons name="checkmark-circle" size={24} color="#003354" />
              </View>
              <View className="flex-1">
                <Text className="text-on-surface font-bold text-lg">Vote Counted</Text>
                <Text className="text-on-surface-variant text-sm">Successfully included in tally</Text>
              </View>
            </View>

            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-xs">Block ID</Text>
                <Text className="text-on-surface font-mono text-xs">{traceResult.blockId}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-xs">Timestamp</Text>
                <Text className="text-on-surface text-xs">{new Date(traceResult.timestamp).toLocaleString()}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-xs">Verified By</Text>
                <Text className="text-on-surface text-xs">{traceResult.nodesNodes} {traceResult.nodesVerified} Independent Nodes</Text>
              </View>
              
              <View className="mt-2 bg-error-container p-3 rounded flex-row items-start">
                <Ionicons name="lock-closed" size={16} color="#ffb4ab" className="mr-2 mt-0.5" />
                <Text className="text-on-error-container text-xs flex-1">
                  Privacy Preserved: The system proves your vote was counted without revealing the candidate you selected.
                </Text>
              </View>
            </View>
          </View>
        )}

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
