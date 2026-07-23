import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { adminApi } from '../api/client';

export const BlockVoterConfirmationScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { voter } = route.params || { voter: { email: 'unknown@example.com', id: '123' } };
  const { user } = useAuth();
  
  const [blocking, setBlocking] = useState(false);

  const handleBlock = async () => {
    setBlocking(true);
    try {
      // Simulate API call or call the real one if wired
      if (!user) throw new Error('Missing user context.');
      await adminApi.blockVoter(user, voter.id, 'MANUAL_ADMIN_BLOCK');
      
      Alert.alert('Voter Blocked', `${voter.email} has been suspended from all active elections.`, [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to block voter.');
    } finally {
      setBlocking(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={blocking}>
          <Ionicons name="close" size={24} color={blocking ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Suspend Voter</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="items-center mb-8 mt-4">
          <View className="w-20 h-20 rounded-full bg-error-container items-center justify-center mb-4">
            <Ionicons name="warning" size={40} color="#ffb4ab" />
          </View>
          <Text className="text-2xl font-bold text-on-surface mb-2 text-center">Confirm Suspension</Text>
          <Text className="text-on-surface-variant text-center px-4 leading-relaxed">
            You are about to block <Text className="font-bold text-on-surface">{voter.email}</Text> from participating in any active elections.
          </Text>
        </View>

        <View className="bg-surface-container border border-error rounded-xl p-5 mb-8">
          <Text className="text-error font-bold mb-3 flex-row items-center text-lg">
            <Ionicons name="alert-circle" size={20} color="#ffb4ab" /> Consequences
          </Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="close-circle" size={18} color="#ffb4ab" className="mr-2" />
              <Text className="text-on-surface-variant flex-1">Active voting tokens will be immediately revoked.</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="close-circle" size={18} color="#ffb4ab" className="mr-2" />
              <Text className="text-on-surface-variant flex-1">Any submitted but untallied votes will be flagged.</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="information-circle" size={18} color="#00639b" className="mr-2" />
              <Text className="text-on-surface flex-1">This action is logged in the permanent audit trail.</Text>
            </View>
          </View>
        </View>
        
        <View className="space-y-4">
          <TouchableOpacity 
            className={`py-4 rounded-xl flex-row items-center justify-center shadow-sm ${blocking ? 'bg-surface-container-high' : 'bg-error'}`}
            onPress={handleBlock}
            disabled={blocking}
          >
            {blocking ? (
              <ActivityIndicator size="small" color="#ffb4ab" className="mr-2" />
            ) : (
              <Ionicons name="ban" size={20} color="#ffffff" className="mr-2" />
            )}
            <Text className={`font-bold ${blocking ? 'text-on-surface-variant' : 'text-white'} text-lg`}>
              {blocking ? 'Suspending...' : 'Confirm Suspension'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
