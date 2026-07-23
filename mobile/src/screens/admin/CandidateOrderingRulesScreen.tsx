import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { electionApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useElection } from '../hooks/useElections';

type OrderingRule = 'alphabetical' | 'random' | 'manual';

export const CandidateOrderingRulesScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};
  const { user } = useAuth();
  
  const { election, loading: electionLoading, refresh } = useElection(electionId);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [rule, setRule] = useState<OrderingRule>('manual');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (election?.candidates) {
      setCandidates([...election.candidates].sort((a, b) => a.order - b.order));
    }
  }, [election]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...candidates];
    const temp = newArr[index];
    newArr[index] = newArr[index - 1];
    newArr[index - 1] = temp;
    setCandidates(newArr);
    setRule('manual');
  };

  const moveDown = (index: number) => {
    if (index === candidates.length - 1) return;
    const newArr = [...candidates];
    const temp = newArr[index];
    newArr[index] = newArr[index + 1];
    newArr[index + 1] = temp;
    setCandidates(newArr);
    setRule('manual');
  };

  const handleSave = async () => {
    if (!user || !electionId) return;
    setLoading(true);
    try {
      const orders = candidates.map((c, idx) => ({ id: c.id, order: idx }));
      await electionApi.reorderCandidates(user, electionId, orders);
      
      Alert.alert('Success', 'Candidate ordering saved successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save ordering.');
    } finally {
      setLoading(false);
    }
  };

  if (electionLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#115cb9" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={loading}>
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 ml-4">Candidate Ordering</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <Text className="font-bold text-lg text-on-surface mb-2">Display Rules</Text>
        <Text className="text-on-surface-variant text-sm mb-4">
          Determine how candidates will be listed on the voter's ballot interface.
        </Text>

        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity 
            className={`flex-1 p-4 rounded-xl border ${rule === 'alphabetical' ? 'border-secondary bg-secondary-container opacity-20' : 'border-outline-variant bg-surface'}`}
            onPress={() => Alert.alert('Notice', 'Alphabetical sorting will be evaluated dynamically at runtime. For now, manual drag is supported.')}
          >
            <Ionicons name="text-outline" size={24} color={rule === 'alphabetical' ? '#aec6ff' : '#8e918f'} className="mb-2" />
            <Text className={`font-bold ${rule === 'alphabetical' ? 'text-secondary' : 'text-on-surface'}`}>Alphabetical</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 p-4 rounded-xl border ${rule === 'random' ? 'border-secondary bg-secondary-container opacity-20' : 'border-outline-variant bg-surface'}`}
            onPress={() => Alert.alert('Notice', 'Randomization requires cryptographic seed. Please order manually for this prototype.')}
          >
            <Ionicons name="shuffle-outline" size={24} color={rule === 'random' ? '#aec6ff' : '#8e918f'} className="mb-2" />
            <Text className={`font-bold ${rule === 'random' ? 'text-secondary' : 'text-on-surface'}`}>Randomized</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 p-4 rounded-xl border ${rule === 'manual' ? 'border-secondary bg-surface' : 'border-outline-variant bg-surface'}`}
            onPress={() => setRule('manual')}
          >
            <Ionicons name="list-outline" size={24} color={rule === 'manual' ? '#aec6ff' : '#8e918f'} className="mb-2" />
            <Text className={`font-bold ${rule === 'manual' ? 'text-secondary' : 'text-on-surface'}`}>Manual</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-6">
          <Text className="font-bold text-on-surface mb-4">Current Order Sequence</Text>
          {candidates.map((c, index) => (
            <View key={c.id} className="flex-row items-center justify-between p-4 bg-surface border border-outline-variant rounded-lg mb-2">
              <View className="flex-1">
                <Text className="font-bold text-on-surface">{c.name}</Text>
                <Text className="text-xs text-on-surface-variant uppercase mt-1">Candidate ID: #{c.id.slice(-4)}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <TouchableOpacity 
                  onPress={() => moveUp(index)}
                  disabled={index === 0}
                  className={`p-2 rounded-lg bg-surface-container-high ${index === 0 ? 'opacity-30' : ''}`}
                >
                  <Ionicons name="arrow-up" size={18} color="#aec6ff" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => moveDown(index)}
                  disabled={index === candidates.length - 1}
                  className={`p-2 rounded-lg bg-surface-container-high ${index === candidates.length - 1 ? 'opacity-30' : ''}`}
                >
                  <Ionicons name="arrow-down" size={18} color="#aec6ff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {candidates.length === 0 && (
            <Text className="text-on-surface-variant text-center py-4">No candidates found for this election.</Text>
          )}
        </View>

        <View className="flex-row items-start p-4 bg-surface-container border border-outline-variant rounded-xl mb-6">
          <Ionicons name="shield-checkmark" size={24} color="#115cb9" />
          <View className="flex-1 ml-3">
            <Text className="font-bold text-primary">Immutable Audit Entry</Text>
            <Text className="text-xs text-on-surface-variant mt-1">
              Updating these rules will generate a signed entry in the System Audit Log. Once the election period begins, ordering rules are locked.
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          className={`h-14 rounded-xl flex-row items-center justify-center mb-10 ${loading ? 'bg-surface-container-highest opacity-50' : 'bg-primary'}`}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <>
              <Ionicons name="lock-closed" size={18} color="#000000" className="mr-2" />
              <Text className="text-on-primary font-bold text-lg">Save Ordering Rules</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
