import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { electionApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const DuplicateElectionConfirmationScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAuth();
  const { election } = route.params || {};
  
  const [cloning, setCloning] = useState(false);

  const handleClone = async () => {
    if (!election?.id || !user) {
      Alert.alert('Error', 'Missing election or user context.');
      return;
    }
    setCloning(true);
    try {
      const res = await electionApi.cloneElection(user, election.id);
      Alert.alert('Success', 'Election duplicated successfully. Draft created.', [
        { text: 'View Draft', onPress: () => navigation.navigate('ElectionAdminDashboard', { electionId: res.election.id }) }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to clone election.');
    } finally {
      setCloning(false);
    }
  };

  if (!election) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text className="text-on-surface">No election provided to clone.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={cloning}>
          <Ionicons name="close" size={24} color={cloning ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Clone Election</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="items-center mb-8 mt-4">
          <View className="w-20 h-20 rounded-full bg-secondary-container items-center justify-center mb-4">
            <Ionicons name="copy" size={40} color="#003354" />
          </View>
          <Text className="text-2xl font-bold text-on-surface mb-2 text-center">Duplicate Settings?</Text>
          <Text className="text-on-surface-variant text-center px-4 leading-relaxed">
            You are about to clone "{election.title}". This will duplicate the rules, candidates, and settings into a new DRAFT election. Voters and votes will NOT be copied.
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-5 mb-8 shadow-sm">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">What gets copied:</Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#00639b" className="mr-3" />
              <Text className="text-on-surface">Basic details (Title, Description)</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Ionicons name="checkmark-circle" size={20} color="#00639b" className="mr-3" />
              <Text className="text-on-surface">Eligibility rules & demographics</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Ionicons name="checkmark-circle" size={20} color="#00639b" className="mr-3" />
              <Text className="text-on-surface">Candidate roster & bios</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Ionicons name="close-circle" size={20} color="#ffb4ab" className="mr-3" />
              <Text className="text-on-surface-variant line-through">Existing Voters</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Ionicons name="close-circle" size={20} color="#ffb4ab" className="mr-3" />
              <Text className="text-on-surface-variant line-through">Cryptographic ledger history</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          className={py-4 rounded-xl flex-row items-center justify-center shadow-sm mb-12 }
          onPress={handleClone}
          disabled={cloning}
        >
          {cloning ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Ionicons name="duplicate" size={20} color="#ffffff" className="mr-2" />
              <Text className="font-bold text-white text-lg">Create Duplicate</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};