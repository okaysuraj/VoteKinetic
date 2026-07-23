import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useActiveElections } from '../hooks/useElections';

export const ObserverElectionListScreen = () => {
  const navigation = useNavigation<any>();
  // Observers should theoretically fetch ALL elections including past ones,
  // but for the stub we will use the active elections hook.
  const { elections, loading, error, refresh } = useActiveElections();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">System Elections</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Select to View Tally</Text>
        
        {loading ? (
          <View className="py-12 items-center">
            <ActivityIndicator size="large" color="#115cb9" />
          </View>
        ) : error ? (
          <View className="bg-error-container p-6 rounded-xl mt-4">
            <Text className="text-on-error-container font-bold mb-2">Error loading elections</Text>
            <Text className="text-on-error-container mb-4">{error}</Text>
            <TouchableOpacity onPress={refresh} className="bg-error px-4 py-2 rounded self-start">
              <Text className="text-white font-bold">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : elections.length === 0 ? (
          <View className="py-16 items-center">
            <Ionicons name="archive-outline" size={64} color="#939aa1" className="mb-4" />
            <Text className="text-xl font-bold text-on-surface mb-2">No Elections</Text>
            <Text className="text-on-surface-variant text-center px-8">
              There are no elections active in the system.
            </Text>
          </View>
        ) : (
          <View className="space-y-4">
            {elections.map((election: any) => (
              <TouchableOpacity 
                key={election.id}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm"
                onPress={() => navigation.navigate('ObserverResultsView', { electionId: election.id })}
                activeOpacity={0.7}
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="bg-surface-container-highest px-2 py-0.5 rounded">
                    <Text className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">
                      {new Date() > new Date(election.endDate) ? 'Closed' : 'Active'}
                    </Text>
                  </View>
                  <Text className="text-on-surface-variant text-xs font-mono">
                    ID: {election.id.substring(0, 8)}...
                  </Text>
                </View>
                <Text className="text-xl font-bold text-primary mb-1">{election.title}</Text>
                <Text className="text-on-surface-variant text-sm mb-4" numberOfLines={1}>
                  {election.candidates?.length || 0} Candidates • Type: {election.type || 'Standard'}
                </Text>
                
                <View className="flex-row items-center justify-between border-t border-outline-variant pt-3 mt-1">
                  <View className="flex-row items-center gap-1 text-secondary">
                    <Ionicons name="bar-chart" size={16} color="#c2e7ff" />
                    <Text className="text-xs text-secondary font-bold">View Real-time Tally</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#aec6ff" />
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
