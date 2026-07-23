import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const CreateElectionScheduleScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionData } = route.params || {};

  const [startDateStr, setStartDateStr] = useState('');
  const [endDateStr, setEndDateStr] = useState('');

  const handleNext = () => {
    if (!startDateStr.trim() || !endDateStr.trim()) {
      Alert.alert('Validation Error', 'Please enter both start and end dates.');
      return;
    }
    
    // Validate format roughly
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      Alert.alert('Validation Error', 'Invalid date format. Use YYYY-MM-DD');
      return;
    }

    if (end <= start) {
      Alert.alert('Validation Error', 'End date must be after start date.');
      return;
    }
    
    navigation.navigate('CreateElectionVotingType', {
      electionData: {
        ...electionData,
        startDate: start.toISOString(),
        endDate: end.toISOString()
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Step 2 of 6</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
          <Text className="font-headline-lg text-primary text-2xl font-bold mb-2">Schedule</Text>
          <Text className="text-on-surface-variant mb-6">Define the exact voting window for this election.</Text>

          <View className="flex-row justify-between gap-4 mb-6">
            <View className="flex-1 bg-surface-container border border-outline-variant rounded-xl p-4 shadow-sm">
              <Text className="text-on-surface-variant font-bold text-xs mb-2 uppercase">Start Date</Text>
              <TextInput 
                className="text-on-surface font-bold text-lg border-b border-outline-variant pb-2"
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#8e918f"
                value={startDateStr}
                onChangeText={setStartDateStr}
              />
            </View>
            <View className="flex-1 bg-surface-container border border-outline-variant rounded-xl p-4 shadow-sm">
              <Text className="text-on-surface-variant font-bold text-xs mb-2 uppercase">End Date</Text>
              <TextInput 
                className="text-on-surface font-bold text-lg border-b border-outline-variant pb-2"
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#8e918f"
                value={endDateStr}
                onChangeText={setEndDateStr}
              />
            </View>
          </View>

          <View className="bg-surface-container-low border border-outline-variant rounded-xl p-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="time" size={20} color="#aec6ff" className="mr-2" />
              <Text className="font-bold text-primary">Timezone Enforcement</Text>
            </View>
            <Text className="text-xs text-on-surface-variant leading-relaxed">
              All dates are recorded in UTC to ensure cryptographic synchronization across all voting nodes.
            </Text>
          </View>

        </ScrollView>

        <View className="p-4 border-t border-outline-variant bg-surface">
          <TouchableOpacity 
            className={`py-4 rounded-xl flex-row items-center justify-center shadow-sm ${!startDateStr || !endDateStr ? 'bg-surface-container-highest opacity-50' : 'bg-primary'}`}
            onPress={handleNext}
            disabled={!startDateStr || !endDateStr}
          >
            <Text className="font-bold text-on-primary mr-2 text-lg">Continue to Type</Text>
            <Ionicons name="arrow-forward" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
