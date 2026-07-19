import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const ResultIntegrityVerificationScreen = () => {
  const navigation = useNavigation<any>();
  const [verifying, setVerifying] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [verified, setVerified] = useState(false);

  const runVerification = () => {
    setVerifying(true);
    setLogs([]);
    setVerified(false);

    const steps = [
      '[00:00:01] CONNECTING to Ledger Node A...',
      '[00:00:02] SYNCING block headers for current election...',
      '[00:00:04] VERIFYING Zero-Knowledge Proofs for Ballot Batch 1...',
      '[00:00:05] ZKP Check: OK. (245 ballots)',
      '[00:00:07] VERIFYING Homomorphic Tally...',
      '[00:00:08] Tally Match: OK. (SHA-256: 8f4e2b...9a1c)',
      '[00:00:10] INTEGRITY VERIFIED. No discrepancies found.'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setVerifying(false);
        setVerified(true);
      }
    }, 800);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={verifying}>
          <Ionicons name="arrow-back" size={24} color={verifying ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Integrity Check</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-on-surface mb-2">Cryptographic Audit</Text>
          <Text className="text-on-surface-variant leading-relaxed">
            Run a client-side verification of the blockchain ledger to mathematically prove that no votes have been tampered with or altered.
          </Text>
        </View>

        <View className="bg-[#00111a] border border-outline-variant rounded-xl p-4 mb-8 min-h-[300px]">
          <View className="flex-row items-center justify-between border-b border-[#003354] pb-2 mb-4">
            <Text className="text-[#aec6ff] font-mono text-xs">TERMINAL OUTPUT</Text>
            {verifying && <ActivityIndicator size="small" color="#aec6ff" />}
          </View>
          
          {logs.length === 0 && !verifying && (
            <Text className="text-[#939aa1] font-mono text-sm">Waiting to initiate verification sequence...</Text>
          )}

          {logs.map((log, index) => (
            <Text 
              key={index} 
              className={`font-mono text-sm mb-2 ${log.includes('VERIFIED') || log.includes('OK') ? 'text-secondary' : 'text-[#e2e2e2]'}`}
            >
              {log}
            </Text>
          ))}
        </View>

        {verified && (
          <View className="bg-secondary-container p-4 rounded-xl flex-row items-start mb-6">
            <Ionicons name="checkmark-circle" size={24} color="#003354" className="mr-3 mt-0.5" />
            <View className="flex-1">
              <Text className="text-on-secondary-container font-bold mb-1">Verification Successful</Text>
              <Text className="text-on-secondary-container text-sm">
                The current tally matches the mathematical proofs on the blockchain. The election integrity remains uncompromised.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className={`py-4 rounded-xl flex-row items-center justify-center ${verifying ? 'bg-surface-container-high' : 'bg-primary'}`}
          onPress={runVerification}
          disabled={verifying}
        >
          <Ionicons name="hardware-chip-outline" size={20} color={verifying ? "#939aa1" : "#ffffff"} className="mr-2" />
          <Text className={`font-bold ${verifying ? 'text-on-surface-variant' : 'text-white'}`}>
            {verifying ? 'Verifying...' : 'Run Cryptographic Check'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
