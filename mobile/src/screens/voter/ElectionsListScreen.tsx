import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useActiveElections } from '../hooks/useElections';

export const ElectionsListScreen = () => {
  const navigation = useNavigation<any>();
  const { elections, loading, error, refresh } = useActiveElections();
  const [filter, setFilter] = useState<'active' | 'upcoming' | 'past'>('active');

  const filteredElections = elections.filter((e) => {
    const now = new Date();
    const startDate = new Date(e.startDate);
    const endDate = new Date(e.endDate);
    
    if (filter === 'active') return now >= startDate && now <= endDate;
    if (filter === 'upcoming') return now < startDate;
    if (filter === 'past') return now > endDate;
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Elections</Text>
      </View>

      <View className="flex-row px-4 py-4 gap-2">
        <TouchableOpacity 
          className={`px-4 py-2 rounded-full ${filter === 'active' ? 'bg-secondary' : 'bg-surface-container-high'}`}
          onPress={() => setFilter('active')}
        >
          <Text className={`font-bold ${filter === 'active' ? 'text-white' : 'text-on-surface-variant'}`}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`px-4 py-2 rounded-full ${filter === 'upcoming' ? 'bg-secondary' : 'bg-surface-container-high'}`}
          onPress={() => setFilter('upcoming')}
        >
          <Text className={`font-bold ${filter === 'upcoming' ? 'text-white' : 'text-on-surface-variant'}`}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`px-4 py-2 rounded-full ${filter === 'past' ? 'bg-secondary' : 'bg-surface-container-high'}`}
          onPress={() => setFilter('past')}
        >
          <Text className={`font-bold ${filter === 'past' ? 'text-white' : 'text-on-surface-variant'}`}>Past</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-2">
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
        ) : filteredElections.length === 0 ? (
          <View className="py-16 items-center">
            <Ionicons name="archive-outline" size={64} color="#939aa1" className="mb-4" />
            <Text className="text-xl font-bold text-on-surface mb-2">No {filter} elections</Text>
            <Text className="text-on-surface-variant text-center px-8">
              There are currently no {filter} elections requiring your participation.
            </Text>
          </View>
        ) : (
          <View className="space-y-4">
            {filteredElections.map((election: any) => (
              <TouchableOpacity 
                key={election.id}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm"
                onPress={() => navigation.navigate('ElectionDetails', { electionId: election.id })}
                activeOpacity={0.7}
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-row items-center gap-2">
                    {filter === 'active' && (
                      <View className="bg-secondary-container px-2 py-0.5 rounded">
                        <Text className="text-on-secondary-container text-xs font-bold uppercase tracking-wider">Active</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-on-surface-variant text-xs">
                    {filter === 'active' ? `Closes ${new Date(election.endDate).toLocaleDateString()}` : 
                     filter === 'upcoming' ? `Opens ${new Date(election.startDate).toLocaleDateString()}` :
                     `Closed ${new Date(election.endDate).toLocaleDateString()}`}
                  </Text>
                </View>
                <Text className="text-xl font-bold text-primary mb-1">{election.title}</Text>
                <Text className="text-on-surface-variant text-sm mb-4" numberOfLines={2}>
                  {election.description || 'Standard institutional election.'}
                </Text>
                
                <View className="flex-row items-center justify-between border-t border-outline-variant pt-3 mt-1">
                  <View className="flex-row items-center gap-1 text-on-surface-variant">
                    <Ionicons name="people" size={16} color="#939aa1" />
                    <Text className="text-xs">{election.candidates?.length || 0} Candidates</Text>
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
