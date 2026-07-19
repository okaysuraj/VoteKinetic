import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export const LogoutConfirmationScreen = () => {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background justify-center items-center px-6">
      <View className="w-24 h-24 rounded-full bg-surface-container-highest items-center justify-center mb-6 shadow-sm border-4 border-surface">
        <Ionicons name="log-out" size={40} color="#003354" />
      </View>
      
      <Text className="text-2xl font-bold text-on-surface mb-2 text-center">Sign Out?</Text>
      <Text className="text-on-surface-variant text-center leading-relaxed mb-8">
        Your cryptographically signed ballots will remain securely queued if offline.
      </Text>

      <View className="w-full space-y-4">
        <TouchableOpacity 
          className="bg-error py-4 rounded-xl flex-row items-center justify-center shadow-sm"
          onPress={handleLogout}
        >
          <Text className="font-bold text-white text-lg">Yes, Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-surface border border-outline-variant py-4 rounded-xl flex-row items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Text className="font-bold text-primary text-lg">Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
