import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { electionApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useAllElections } from '../hooks/useElections';

export const CreateElectionPreviewScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionData } = route.params || {};
  const { user } = useAuth();
  const { refresh } = useAllElections();

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const payload = {
        title: electionData.title,
        description: electionData.description,
        type: electionData.type,
        startDate: electionData.startDate,
        endDate: electionData.endDate,
        organizationId: 'org-1', // Default mock org
        candidates: [] // Empty initial candidates
      };

      await electionApi.create(user, payload);
      refresh();
      
      Alert.alert('Success', 'Election provisioned successfully.', [
        { 
          text: 'OK', 
          onPress: () => {
            // Navigate back to Admin Dashboard
            navigation.navigate('ElectionAdminDashboard');
          } 
        }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to provision election.');
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} UTC`;
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={loading}>
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Step 6 of 6</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <Text className="font-headline-lg text-primary text-2xl font-bold mb-2">Final Review</Text>
        <Text className="text-on-surface-variant mb-6">Review the configuration before generating cryptographic keys.</Text>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <Ionicons name="document-text" size={20} color="#aec6ff" className="mr-2" />
            <Text className="font-bold text-on-surface">Basic Information</Text>
          </View>
          <View className="mb-2">
            <Text className="text-xs text-on-surface-variant uppercase">Title</Text>
            <Text className="text-on-surface font-bold">{electionData?.title}</Text>
          </View>
          <View>
            <Text className="text-xs text-on-surface-variant uppercase">Description</Text>
            <Text className="text-on-surface">{electionData?.description || 'No description provided'}</Text>
          </View>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <Ionicons name="time" size={20} color="#aec6ff" className="mr-2" />
            <Text className="font-bold text-on-surface">Schedule</Text>
          </View>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-xs text-on-surface-variant uppercase">Starts</Text>
              <Text className="text-on-surface font-bold">{formatDate(electionData?.startDate)}</Text>
            </View>
            <View>
              <Text className="text-xs text-on-surface-variant uppercase text-right">Ends</Text>
              <Text className="text-on-surface font-bold text-right">{formatDate(electionData?.endDate)}</Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-surface-container border border-outline-variant rounded-xl p-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="list" size={16} color="#aec6ff" className="mr-2" />
              <Text className="font-bold text-on-surface">Voting Type</Text>
            </View>
            <Text className="text-sm text-on-surface-variant">
              {electionData?.type === 'RANKED_CHOICE' ? 'Ranked Choice (IRV)' : 'Standard Plurality'}
            </Text>
          </View>
          <View className="flex-1 bg-surface-container border border-outline-variant rounded-xl p-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="people" size={16} color="#aec6ff" className="mr-2" />
              <Text className="font-bold text-on-surface">Eligibility</Text>
            </View>
            <Text className="text-sm text-on-surface-variant">
              {electionData?.eligibilityRule === 'OPEN' ? 'Open Registration' : 'Invite Only'}
            </Text>
          </View>
        </View>

        <View className="bg-primary-container border border-primary rounded-xl p-4 mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="key" size={24} color="#001a41" className="mr-3" />
            <Text className="font-bold text-on-primary-container text-lg">Cryptographic Provisioning</Text>
          </View>
          <Text className="text-sm text-on-primary-container leading-relaxed">
            By provisioning this election, unique RSA and AES keypairs will be generated and distributed. The private key will be encrypted and held in escrow until the election concludes.
          </Text>
        </View>

      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className={`py-4 rounded-xl flex-row items-center justify-center shadow-sm ${loading ? 'bg-surface-container-highest opacity-50' : 'bg-primary'}`}
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000000" className="mr-2" />
          ) : (
            <Ionicons name="flash" size={20} color="#000000" className="mr-2" />
          )}
          <Text className="font-bold text-on-primary text-lg">
            {loading ? 'Provisioning Keys...' : 'Provision Election'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
