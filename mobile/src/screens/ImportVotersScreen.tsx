import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { adminApi } from '../api/client';

export const ImportVotersScreen = () => {
  const navigation = useNavigation<any>();
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSimulateImport = () => {
    setImporting(true);
    setProgress(0);
    
    // Simulate reading a CSV file and sending to backend
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setImporting(false);
          Alert.alert('Success', 'Successfully imported 142 voters and emailed verification links.', [
            { text: 'OK', onPress: () => navigation.goBack() }
          ]);
          return 100;
        }
        return prev + 15;
      });
    }, 300);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={importing}>
          <Ionicons name="close" size={24} color={importing ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Import Voters</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-on-surface mb-2">Upload CSV</Text>
          <Text className="text-on-surface-variant leading-relaxed">
            Bulk import voters into the registry. The system will automatically generate unique voting tokens and email them to the users.
          </Text>
        </View>

        <TouchableOpacity 
          className="border-2 border-dashed border-outline-variant rounded-xl h-48 items-center justify-center bg-surface-container-lowest mb-6"
          disabled={importing}
        >
          <Ionicons name="document-text" size={48} color="#003354" className="mb-2" />
          <Text className="text-primary font-bold">Tap to Browse Files</Text>
          <Text className="text-on-surface-variant text-xs mt-1">Accepts .csv, .xlsx (Max 5MB)</Text>
        </TouchableOpacity>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-6">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-2">Required Columns</Text>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-surface-container-highest px-3 py-1 rounded">
              <Text className="text-on-surface text-sm font-mono">email</Text>
            </View>
            <View className="bg-surface-container-highest px-3 py-1 rounded">
              <Text className="text-on-surface text-sm font-mono">firstName</Text>
            </View>
            <View className="bg-surface-container-highest px-3 py-1 rounded">
              <Text className="text-on-surface text-sm font-mono">lastName</Text>
            </View>
          </View>
        </View>

        {importing && (
          <View className="mb-6">
            <View className="flex-row justify-between mb-2">
              <Text className="text-on-surface font-bold text-sm">Processing records...</Text>
              <Text className="text-secondary font-bold text-sm">{Math.min(100, progress)}%</Text>
            </View>
            <View className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <View 
                className="bg-secondary h-full transition-all duration-300"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className={`py-4 rounded-xl flex-row items-center justify-center ${importing ? 'bg-surface-container-high' : 'bg-primary'}`}
          onPress={handleSimulateImport}
          disabled={importing}
        >
          <Ionicons name="cloud-upload" size={20} color={importing ? "#939aa1" : "#ffffff"} className="mr-2" />
          <Text className={`font-bold ${importing ? 'text-on-surface-variant' : 'text-white'}`}>
            {importing ? 'Importing...' : 'Upload & Process'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
