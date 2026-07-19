import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAllElections } from '../hooks/useElections';

export const CreateElectionScreen = () => {
  const navigation = useNavigation<any>();
  const { refresh } = useAllElections();
  const [isCreating, setIsCreating] = useState(false);
  
  const createElection = async (data: any) => {
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      refresh();
      navigation.goBack();
    }, 1500);
  };
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('STANDARD');
  
  // Basic date validation for stub
  const [startDateStr, setStartDateStr] = useState('');
  const [endDateStr, setEndDateStr] = useState('');

  const handleCreate = async () => {
    if (!title) {
      Alert.alert('Validation Error', 'Title is required');
      return;
    }

    try {
      const payload = {
        title,
        description,
        type,
        startDate: startDateStr ? new Date(startDateStr).toISOString() : new Date().toISOString(),
        endDate: endDateStr ? new Date(endDateStr).toISOString() : new Date(Date.now() + 7*24*60*60*1000).toISOString(),
        organizationId: 'org-1' // Default org for stub
      };

      await createElection(payload);
      Alert.alert('Success', 'Election created successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to create election');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={isCreating}>
          <Ionicons name="close" size={24} color={isCreating ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">New Election</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-2">Basic Info</Text>
          
          <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-4">
            <Text className="text-on-surface-variant text-xs mb-1">Election Title</Text>
            <TextInput 
              className="text-on-surface text-lg border-b border-outline-variant pb-2"
              placeholder="e.g. 2026 Board of Directors"
              placeholderTextColor="#939aa1"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          
          <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-4">
            <Text className="text-on-surface-variant text-xs mb-1">Description (Optional)</Text>
            <TextInput 
              className="text-on-surface text-base border-b border-outline-variant pb-2"
              placeholder="Enter details..."
              placeholderTextColor="#939aa1"
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-2">Schedule</Text>
          <View className="flex-row justify-between gap-4">
            <View className="flex-1 bg-surface-container border border-outline-variant rounded-xl p-4">
              <Text className="text-on-surface-variant text-xs mb-1">Start Date</Text>
              <TextInput 
                className="text-on-surface"
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#939aa1"
                value={startDateStr}
                onChangeText={setStartDateStr}
              />
            </View>
            <View className="flex-1 bg-surface-container border border-outline-variant rounded-xl p-4">
              <Text className="text-on-surface-variant text-xs mb-1">End Date</Text>
              <TextInput 
                className="text-on-surface"
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#939aa1"
                value={endDateStr}
                onChangeText={setEndDateStr}
              />
            </View>
          </View>
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="shield-checkmark" size={16} color="#00639b" className="mr-2" />
            <Text className="text-primary font-bold text-sm">Security Configured</Text>
          </View>
          <Text className="text-on-surface-variant text-xs leading-relaxed">
            This election will automatically be provisioned with a unique homomorphic keypair upon creation.
          </Text>
        </View>
        
        <View className="h-24" />
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className={`py-4 rounded-xl flex-row items-center justify-center ${isCreating ? 'bg-surface-container-high' : 'bg-primary'}`}
          onPress={handleCreate}
          disabled={isCreating}
        >
          {isCreating ? (
            <ActivityIndicator size="small" color="#aec6ff" className="mr-2" />
          ) : (
            <Ionicons name="add" size={20} color="#ffffff" className="mr-2" />
          )}
          <Text className={`font-bold ${isCreating ? 'text-on-surface-variant' : 'text-white'}`}>
            {isCreating ? 'Provisioning...' : 'Create Election'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
