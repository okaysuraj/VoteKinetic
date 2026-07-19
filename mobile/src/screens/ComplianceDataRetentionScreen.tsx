import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const ComplianceDataRetentionScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Data Retention</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 mb-6">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Retention Policies</Text>
          
          <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-outline-variant">
            <View>
              <Text className="text-on-surface text-base font-bold">Voter PII</Text>
              <Text className="text-on-surface-variant text-xs">Emails, Names, Auth Logs</Text>
            </View>
            <Text className="text-on-surface font-bold text-sm">30 days post-election</Text>
          </View>

          <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-outline-variant">
            <View>
              <Text className="text-on-surface text-base font-bold">Encrypted Ballots</Text>
              <Text className="text-on-surface-variant text-xs">Anonymized payload hashes</Text>
            </View>
            <Text className="text-on-surface font-bold text-sm">Indefinitely (Ledger)</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-on-surface text-base font-bold">Platform Audit Logs</Text>
              <Text className="text-on-surface-variant text-xs">Admin actions, configuration changes</Text>
            </View>
            <Text className="text-on-surface font-bold text-sm">7 years (SOC2)</Text>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-error-container border border-error py-4 rounded-xl flex-row items-center justify-center mb-4"
        >
          <Ionicons name="trash" size={20} color="#ffb4ab" className="mr-2" />
          <Text className="font-bold text-error">Trigger Manual Data Scrub</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};
