import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CreateElectionBasicInfoScreen = () => {
  const navigation = useNavigation<any>();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleNext = () => {
    if (!title.trim()) return;
    
    navigation.navigate('CreateElectionSchedule', {
      electionData: {
        title,
        description
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="close" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Step 1 of 6</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
          <Text className="font-headline-lg text-primary text-2xl font-bold mb-2">Basic Info</Text>
          <Text className="text-on-surface-variant mb-6">Enter the primary details for this election event.</Text>

          <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-6 shadow-sm">
            <View className="mb-6">
              <Text className="text-on-surface-variant font-bold text-xs mb-2 uppercase">Election Title <Text className="text-error">*</Text></Text>
              <TextInput 
                className="text-on-surface text-lg border-b border-outline-variant pb-2 font-bold"
                placeholder="e.g. 2026 Board of Directors"
                placeholderTextColor="#8e918f"
                value={title}
                onChangeText={setTitle}
              />
            </View>
            
            <View>
              <Text className="text-on-surface-variant font-bold text-xs mb-2 uppercase">Description</Text>
              <TextInput 
                className="text-on-surface text-base border-b border-outline-variant pb-2"
                placeholder="Brief summary of the election..."
                placeholderTextColor="#8e918f"
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          <View className="bg-primary-container rounded-xl p-4 flex-row items-start mb-6">
            <Ionicons name="shield-checkmark" size={24} color="#001a41" className="mr-3" />
            <View className="flex-1">
              <Text className="font-bold text-on-primary-container">Security Configured</Text>
              <Text className="text-xs text-on-primary-container opacity-80 mt-1 leading-relaxed">
                This election will automatically be provisioned with a unique homomorphic keypair upon creation.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View className="p-4 border-t border-outline-variant bg-surface">
          <TouchableOpacity 
            className={`py-4 rounded-xl flex-row items-center justify-center shadow-sm ${!title.trim() ? 'bg-surface-container-highest opacity-50' : 'bg-primary'}`}
            onPress={handleNext}
            disabled={!title.trim()}
          >
            <Text className="font-bold text-on-primary mr-2 text-lg">Continue to Schedule</Text>
            <Ionicons name="arrow-forward" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
