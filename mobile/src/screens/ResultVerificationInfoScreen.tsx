import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const ResultVerificationInfoScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};

  const [receiptInput, setReceiptInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleVerify = () => {
    if (!receiptInput.trim()) {
      setVerificationStatus('error');
      return;
    }
    setIsVerifying(true);
    setVerificationStatus('idle');
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationStatus('success');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Verification Info</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 py-6">
          
          <View className="mb-8">
            <Text className="font-headline-lg text-3xl font-bold text-primary mb-2">Cryptographic Transparency</Text>
            <Text className="text-on-surface-variant text-base leading-relaxed">
              Our end-to-end verifiable architecture ensures that every vote is recorded exactly as cast, and tallied exactly as recorded, without ever decrypting individual selections.
            </Text>
          </View>

          <View className={`p-6 rounded-xl border mb-8 ${verificationStatus === 'success' ? 'bg-[#f0fdf4] border-[#bbf7d0]' : verificationStatus === 'error' ? 'bg-error-container/20 border-error/50' : 'bg-surface-container-low border-outline-variant'}`}>
            <View className="flex-row items-center mb-4">
              <View className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${verificationStatus === 'success' ? 'bg-[#15803d]' : 'bg-primary'}`}>
                <Ionicons name={verificationStatus === 'success' ? 'checkmark' : 'shield-checkmark'} size={20} color="#ffffff" />
              </View>
              <Text className="font-bold text-on-surface text-lg">Verify Your Receipt</Text>
            </View>
            <Text className="text-sm text-on-surface-variant mb-4">
              Enter your unique ballot receipt ID to cryptographically verify its inclusion in the final tally.
            </Text>
            <View className="flex-row items-center gap-2">
              <TextInput
                value={receiptInput}
                onChangeText={(text) => {
                  setReceiptInput(text);
                  setVerificationStatus('idle');
                }}
                placeholder="e.g. VK-7729-BX-104"
                placeholderTextColor="#8e918f"
                className={`flex-1 h-12 bg-surface px-4 rounded border ${verificationStatus === 'error' ? 'border-error' : 'border-outline-variant'} font-mono text-on-surface`}
                autoCapitalize="characters"
              />
              <TouchableOpacity 
                onPress={handleVerify}
                disabled={isVerifying}
                className={`h-12 px-6 rounded items-center justify-center flex-row ${verificationStatus === 'success' ? 'bg-[#15803d]' : 'bg-primary'}`}
              >
                {isVerifying ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <>
                    {verificationStatus === 'success' ? (
                      <>
                        <Text className="text-white font-bold mr-1">VERIFIED</Text>
                        <Ionicons name="checkmark-circle" size={16} color="#ffffff" />
                      </>
                    ) : (
                      <Text className="text-white font-bold">VERIFY</Text>
                    )}
                  </>
                )}
              </TouchableOpacity>
            </View>
            {verificationStatus === 'error' && (
              <Text className="text-error text-xs mt-2 font-bold">Please enter a valid receipt ID.</Text>
            )}
            {verificationStatus === 'success' && (
              <Text className="text-[#15803d] text-xs mt-2 font-bold">Receipt cryptographically matched in final tally block #844,212.</Text>
            )}
          </View>

          <View className="mb-8">
            <Text className="font-bold text-xl text-on-surface mb-4">The Tally Process</Text>
            <View className="gap-4">
              <View className="flex-row">
                <View className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center mr-4">
                  <Text className="font-bold text-primary">1</Text>
                </View>
                <Text className="flex-1 text-on-surface-variant leading-relaxed">
                  Individual votes are encrypted at the moment of selection.
                </Text>
              </View>
              <View className="flex-row">
                <View className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center mr-4">
                  <Text className="font-bold text-primary">2</Text>
                </View>
                <Text className="flex-1 text-on-surface-variant leading-relaxed">
                  Homomorphic encryption allows votes to be added together while still encrypted.
                </Text>
              </View>
              <View className="flex-row">
                <View className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center mr-4">
                  <Text className="font-bold text-primary">3</Text>
                </View>
                <Text className="flex-1 text-on-surface-variant leading-relaxed">
                  Only the final total is decrypted, ensuring zero leakage of individual choices.
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-surface border border-outline-variant rounded-xl overflow-hidden mb-8">
            <View className="p-4 border-b border-outline-variant">
              <Text className="font-bold text-lg text-on-surface">Recent Verification Activity</Text>
            </View>
            <View className="p-4 flex-row items-center justify-between border-b border-outline-variant">
              <View className="flex-row items-center">
                <Ionicons name="shield-checkmark" size={20} color="#115cb9" className="mr-3" />
                <View>
                  <Text className="font-bold text-on-surface">VK-9912-PX... verified</Text>
                  <Text className="text-xs text-on-surface-variant">Block height: 844,212</Text>
                </View>
              </View>
              <Text className="text-xs text-on-surface-variant">2m ago</Text>
            </View>
            <View className="p-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="shield-checkmark" size={20} color="#115cb9" className="mr-3" />
                <View>
                  <Text className="font-bold text-on-surface">VK-4410-LZ... verified</Text>
                  <Text className="text-xs text-on-surface-variant">Block height: 844,209</Text>
                </View>
              </View>
              <Text className="text-xs text-on-surface-variant">5m ago</Text>
            </View>
            <View className="p-4 bg-surface-container-lowest">
              <TouchableOpacity className="py-2 items-center">
                <Text className="font-bold text-secondary text-sm tracking-wider uppercase">Download Full Audit Log</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
