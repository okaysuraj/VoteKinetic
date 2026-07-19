import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { tallyApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const ResultExportScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};
  const { user } = useAuth();
  
  const [format, setFormat] = useState('PDF');
  const [generating, setGenerating] = useState(false);

  const handleExport = async () => {
    if (!electionId || !user) {
      Alert.alert('Error', 'Missing election or user context.');
      return;
    }
    setGenerating(true);
    try {
      const res = await tallyApi.exportResults(user, electionId);
      Alert.alert('Export Complete', res.message || Your  report has been securely generated and saved.);
    } catch (error: any) {
      Alert.alert('Export Failed', error.message || 'An error occurred during export.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={generating}>
          <Ionicons name="arrow-back" size={24} color={generating ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Export Report</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="items-center mb-6 mt-4">
          <View className="w-20 h-20 rounded-full bg-primary-container items-center justify-center mb-4 border-4 border-surface shadow-sm">
            <Ionicons name="document-text" size={36} color="#001b44" />
          </View>
          <Text className="text-2xl font-bold text-on-surface mb-2">Generate Official Tally</Text>
          <Text className="text-on-surface-variant text-center leading-relaxed px-4">
            Create a cryptographically signed report of the final election results for compliance and auditing.
          </Text>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-3">Select Format</Text>
        <View className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden mb-8">
          <TouchableOpacity 
            className={lex-row justify-between items-center p-4 border-b border-outline-variant }
            onPress={() => setFormat('PDF')}
          >
            <View className="flex-row items-center">
              <Ionicons name="document" size={24} color={format === 'PDF' ? "#00639b" : "#44474e"} className="mr-3" />
              <Text className={ont-bold }>PDF Document</Text>
            </View>
            <Ionicons name={format === 'PDF' ? "radio-button-on" : "radio-button-off"} size={24} color={format === 'PDF' ? "#00639b" : "#44474e"} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={lex-row justify-between items-center p-4 border-b border-outline-variant }
            onPress={() => setFormat('CSV')}
          >
            <View className="flex-row items-center">
              <Ionicons name="grid" size={24} color={format === 'CSV' ? "#00639b" : "#44474e"} className="mr-3" />
              <Text className={ont-bold }>CSV Data</Text>
            </View>
            <Ionicons name={format === 'CSV' ? "radio-button-on" : "radio-button-off"} size={24} color={format === 'CSV' ? "#00639b" : "#44474e"} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={lex-row justify-between items-center p-4 }
            onPress={() => setFormat('JSON')}
          >
            <View className="flex-row items-center">
              <Ionicons name="code-slash" size={24} color={format === 'JSON' ? "#00639b" : "#44474e"} className="mr-3" />
              <Text className={ont-bold }>Raw JSON Ledger</Text>
            </View>
            <Ionicons name={format === 'JSON' ? "radio-button-on" : "radio-button-off"} size={24} color={format === 'JSON' ? "#00639b" : "#44474e"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          className={h-14 rounded-xl flex-row items-center justify-center shadow-sm mb-12 }
          onPress={handleExport}
          disabled={generating}
        >
          {generating ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Ionicons name="download" size={20} color="#ffffff" className="mr-2" />
              <Text className="font-bold text-white text-lg">Generate & Download</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};