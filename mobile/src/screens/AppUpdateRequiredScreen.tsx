import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export const AppUpdateRequiredScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background justify-center items-center px-6">
      <View className="w-32 h-32 rounded-full bg-error-container items-center justify-center mb-8 shadow-sm">
        <Ionicons name="cloud-download" size={64} color="#ffb4ab" />
      </View>
      
      <Text className="text-3xl font-bold text-on-surface mb-4 text-center">Update Required</Text>
      <Text className="text-on-surface-variant text-center leading-relaxed mb-8">
        For your security, VoteKinetic requires the latest version of the app to cast cryptographically secure ballots.
      </Text>

      <TouchableOpacity 
        className="bg-primary w-full py-4 rounded-xl flex-row items-center justify-center shadow-sm"
        onPress={() => alert('Redirecting to App Store...')}
      >
        <Ionicons name="logo-apple-appstore" size={20} color="#ffffff" className="mr-2" />
        <Text className="font-bold text-white text-lg">Download Update</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
