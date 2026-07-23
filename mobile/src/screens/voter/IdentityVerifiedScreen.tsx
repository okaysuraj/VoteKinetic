import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export const IdentityVerifiedScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Verification Status</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6 content-center justify-center">
        <View className="items-center mb-8 mt-12">
          <View className="w-32 h-32 rounded-full bg-secondary-container items-center justify-center mb-6 shadow-sm border-4 border-surface">
            <Ionicons name="shield-checkmark" size={64} color="#003354" />
          </View>
          
          <Text className="text-3xl font-bold text-on-surface mb-3 text-center">Identity Verified</Text>
          <Text className="text-on-surface-variant text-center px-4 leading-relaxed">
            Your government ID and biometric data have been successfully matched and verified by the system.
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-5 mb-8 shadow-sm">
          <Text className="text-on-surface font-bold mb-3 flex-row items-center uppercase tracking-wider text-xs">
            Linked Identity
          </Text>
          
          <View className="space-y-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-on-surface-variant text-sm">Account</Text>
              <Text className="text-on-surface font-bold">{user?.email || 'Voter Account'}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-on-surface-variant text-sm">Clearance</Text>
              <View className="bg-secondary px-2 py-0.5 rounded">
                <Text className="text-white text-xs font-bold uppercase tracking-wider">Level 3</Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-on-surface-variant text-sm">Verified On</Text>
              <Text className="text-on-surface font-mono text-sm">{new Date().toLocaleDateString()}</Text>
            </View>
          </View>
        </View>
        
        <View className="space-y-4">
          <TouchableOpacity 
            className="bg-primary py-4 rounded-xl flex-row items-center justify-center shadow-sm"
            onPress={() => navigation.navigate('Home')}
          >
            <Text className="font-bold text-white text-lg">Continue to Dashboard</Text>
          </TouchableOpacity>
        </View>
        
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
