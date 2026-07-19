import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useActiveElections } from '../hooks/useElections';

export const MyElectionsListScreen = () => {
  const navigation = useNavigation<any>();
  const { elections, loading, error, refresh } = useActiveElections();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">My Ballots</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Action Required</Text>
        
        {loading ? (
          <View className="py-12 items-center">
            <ActivityIndicator size="large" color="#115cb9" />
          </View>
        ) : error ? (
          <View className="bg-error-container p-6 rounded-xl mt-4">
            <Text className="text-on-error-container font-bold mb-2">Error loading ballots</Text>
            <Text className="text-on-error-container mb-4">{error}</Text>
            <TouchableOpacity onPress={refresh} className="bg-error px-4 py-2 rounded self-start">
              <Text className="text-white font-bold">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : elections.length === 0 ? (
          <View className="py-16 items-center">
            <Ionicons name="checkmark-done-circle-outline" size={64} color="#939aa1" className="mb-4" />
            <Text className="text-xl font-bold text-on-surface mb-2">All Caught Up!</Text>
            <Text className="text-on-surface-variant text-center px-8">
              You have no pending ballots to cast at this time.
            </Text>
          </View>
        ) : (
          <View className="space-y-4">
            {elections.map((election: any) => (
              <TouchableOpacity 
                key={election.id}
                className="bg-primary-container border border-primary rounded-xl p-4 shadow-sm"
                onPress={() => navigation.navigate('ElectionDetails', { electionId: election.id })}
                activeOpacity={0.7}
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="bg-primary px-2 py-0.5 rounded flex-row items-center">
                    <Ionicons name="time-outline" size={12} color="#ffffff" className="mr-1" />
                    <Text className="text-white text-xs font-bold uppercase tracking-wider">
                      Ends Soon
                    </Text>
                  </View>
                </View>
                <Text className="text-xl font-bold text-on-primary-container mb-1">{election.title}</Text>
                <Text className="text-on-primary-container text-sm opacity-80 mb-4" numberOfLines={2}>
                  {election.description || 'Cast your secure vote in this election.'}
                </Text>
                
                <View className="flex-row items-center justify-between pt-3 border-t border-primary/20">
                  <Text className="text-sm font-bold text-on-primary-container">Start Voting</Text>
                  <Ionicons name="arrow-forward" size={20} color="#003258" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
