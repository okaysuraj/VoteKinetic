import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { tallyApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const ChartsGraphsViewScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};
  const { user } = useAuth();
  const screenWidth = Dimensions.get('window').width - 32;

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (electionId && user) {
      tallyApi.exportResults(user, electionId)
        .then(res => {
          const cands = res.export?.data?.candidates || [];
          const colors = ['#00639b', '#115cb9', '#aec6ff', '#003354'];
          setResults(cands.map((c: any, i: number) => ({ ...c, color: colors[i % colors.length] })));
        })
        .catch(err => {
          console.error(err);
          Alert.alert('Error', 'Failed to load visual analytics.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [electionId, user]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#115cb9" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Visual Analytics</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-on-surface mb-2">Vote Distribution</Text>
          <Text className="text-on-surface-variant leading-relaxed">
            Final distribution of cryptographically verified votes.
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-5 mb-8 shadow-sm">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-6 text-center">Results by Candidate</Text>
          
          <View className="flex-row items-end justify-around h-48 mb-6 border-b border-outline-variant pb-2">
            {results.map((result, index) => (
              <View key={index} className="items-center w-16">
                <Text className="text-on-surface font-bold text-xs mb-2">{result.percentage}%</Text>
                <View 
                  style={{ 
                    height: (result.percentage / 100) * 160, 
                    backgroundColor: result.color 
                  }} 
                  className="w-8 rounded-t-sm"
                />
              </View>
            ))}
          </View>

          {results.map((result, index) => (
            <View key={index} className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center flex-1 pr-4">
                <View style={{ backgroundColor: result.color }} className="w-3 h-3 rounded-full mr-3" />
                <Text className="text-on-surface font-medium" numberOfLines={1}>{result.name}</Text>
              </View>
              <Text className="text-on-surface-variant font-bold">{result.votes} votes</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          className="bg-primary py-4 rounded-xl flex-row items-center justify-center shadow-sm mb-12"
          onPress={() => navigation.navigate('DetailedResultsBreakdown', { electionId })}
        >
          <Ionicons name="list" size={20} color="#ffffff" className="mr-2" />
          <Text className="font-bold text-white text-lg">View Detailed Breakdown</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};