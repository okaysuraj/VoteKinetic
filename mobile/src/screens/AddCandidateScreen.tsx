import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { electionApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const AddCandidateScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};
  const { user } = useAuth();
  
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !bio.trim()) {
      Alert.alert('Error', 'Please fill in all required fields (Name and Bio).');
      return;
    }
    
    if (!user || !electionId) return;

    setLoading(true);
    try {
      await electionApi.addCandidate(user, electionId, {
        name: name.trim(),
        bio: bio.trim(),
        imageUrl: `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(name)}` // mock image
      });
      
      Alert.alert('Success', 'Candidate added successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add candidate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={loading}>
          <Ionicons name="close" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 ml-4">Add Candidate</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="bg-surface-container border border-outline-variant rounded-xl p-6 shadow-sm mb-6">
            <View className="mb-6">
              <Text className="text-on-surface font-bold mb-2">Full Name <Text className="text-error">*</Text></Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g. Dr. Helena J. Montgomery"
                placeholderTextColor="#8e918f"
                className="w-full h-12 px-4 border border-outline-variant rounded-lg text-on-surface bg-background"
                editable={!loading}
              />
            </View>

            <View className="mb-6">
              <Text className="text-on-surface font-bold mb-2">Party Affiliation</Text>
              <TextInput
                value={party}
                onChangeText={setParty}
                placeholder="e.g. Independent Coalition"
                placeholderTextColor="#8e918f"
                className="w-full h-12 px-4 border border-outline-variant rounded-lg text-on-surface bg-background"
                editable={!loading}
              />
            </View>

            <View className="mb-6">
              <Text className="text-on-surface font-bold mb-2">Candidate Biography <Text className="text-error">*</Text></Text>
              <TextInput
                value={bio}
                onChangeText={setBio}
                placeholder="Provide a brief summary of the candidate's background..."
                placeholderTextColor="#8e918f"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                className="w-full p-4 border border-outline-variant rounded-lg text-on-surface bg-background h-32"
                editable={!loading}
              />
              <Text className="text-right text-xs text-on-surface-variant mt-1">{bio.length} / 2500</Text>
            </View>

            <View className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex-row items-start mt-2">
              <Ionicons name="checkmark-circle" size={20} color="#aec6ff" className="mr-3 mt-1" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-bold text-primary">Administrative Verification</Text>
                <Text className="text-xs text-on-surface-variant mt-1">By saving this candidate, you confirm that all provided details have been verified against official forms.</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            className={`h-14 rounded-xl flex-row items-center justify-center mb-10 ${loading || !name || !bio ? 'bg-surface-container-highest opacity-50' : 'bg-primary'}`}
            onPress={handleSave}
            disabled={loading || !name || !bio}
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <>
                <Ionicons name="save-outline" size={20} color="#000000" className="mr-2" />
                <Text className="text-on-primary font-bold text-lg ml-2">Save Candidate</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
