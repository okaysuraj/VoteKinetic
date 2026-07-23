import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { adminApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const ImportVotersUploadScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  const mockFileSelect = () => {
    setFileSelected(true);
  };

  const handleUpload = async () => {
    if (!user || !electionId) return;
    setLoading(true);
    try {
      // Mock CSV data for prototype
      const csvData = "VOTER_ID,NAME,email\n1,John Doe,john@example.com\n2,Jane Smith,jane@example.com";
      const res = await adminApi.importVoters(user, electionId, csvData);
      
      Alert.alert('Success', (res as any).message || 'Voters imported successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to import voters.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={loading}>
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 ml-4">Import Registry</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-on-surface-variant text-center mb-6">
          Upload your voter records in CSV format to synchronize with the official database.
        </Text>

        <TouchableOpacity 
          className={`border-2 border-dashed ${fileSelected ? 'border-secondary bg-surface-container-low' : 'border-outline-variant bg-surface-container-lowest'} rounded-xl p-8 items-center justify-center min-h-[250px] mb-6`}
          onPress={mockFileSelect}
          disabled={loading}
        >
          <View className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
            <Ionicons name={fileSelected ? "checkmark-circle" : "cloud-upload"} size={32} color={fileSelected ? "#4ade80" : "#aec6ff"} />
          </View>
          <Text className="font-bold text-primary text-xl mb-2 text-center">
            {fileSelected ? 'voters_export_2024.csv' : 'Tap to select file'}
          </Text>
          <Text className="text-on-surface-variant text-center">
            {fileSelected ? '0.24 MB • Ready for processing' : 'Support for .csv, .xlsx (Max 25MB)'}
          </Text>
        </TouchableOpacity>

        <View className="bg-surface-container-low border border-outline-variant rounded-xl p-4 mb-6">
          <Text className="font-bold text-primary text-sm mb-4 uppercase tracking-wider">Required Headers</Text>
          <View className="flex-row items-center mb-3">
            <Ionicons name="checkmark-circle" size={16} color="#aec6ff" className="mr-2" />
            <Text className="font-mono text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface">VOTER_ID</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="checkmark-circle" size={16} color="#aec6ff" className="mr-2" />
            <Text className="font-mono text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface">NAME</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={16} color="#aec6ff" className="mr-2" />
            <Text className="font-mono text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface">email</Text>
          </View>
        </View>

        <View className="bg-primary rounded-xl p-4 flex-row items-center mb-6">
          <Ionicons name="lock-closed" size={32} color="#000000" className="opacity-50 mr-4" />
          <View className="flex-1">
            <Text className="font-bold text-on-primary">Institutional Security</Text>
            <Text className="text-xs text-on-primary opacity-80 mt-1">All uploaded data is processed securely.</Text>
          </View>
        </View>

        <View className="flex-row gap-4 mb-10">
          <TouchableOpacity 
            className="flex-1 py-4 border border-outline-variant rounded-xl items-center bg-surface"
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text className="text-on-surface font-bold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-4 rounded-xl items-center ${loading || !fileSelected ? 'bg-surface-variant opacity-50' : 'bg-primary'}`}
            onPress={handleUpload}
            disabled={loading || !fileSelected}
          >
            {loading ? <ActivityIndicator color="#000000" /> : <Text className={!fileSelected ? 'text-on-surface-variant font-bold' : 'text-on-primary font-bold'}>Continue</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
