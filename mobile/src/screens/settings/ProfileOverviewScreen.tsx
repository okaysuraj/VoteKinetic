import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import * as Clipboard from 'expo-clipboard';

export const ProfileOverviewScreen = () => {
  const navigation = useNavigation<any>();
  const { user, role, logout } = useAuth();

  const handleCopyId = async () => {
    if (user?.id) {
      await Clipboard.setStringAsync(user.id);
      Alert.alert('Copied', 'Voter Registration ID copied to clipboard');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <View className="flex-row items-center">
          <Ionicons name="shield-checkmark" size={24} color="#001a41" className="mr-2" />
          <Text className="font-bold text-xl text-primary tracking-tight">VOTEKINETIC</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full hover:bg-surface-container transition-colors">
          <Ionicons name="close" size={24} color="#434750" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="items-center mb-8">
          <View className="relative mb-4">
            <View className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-surface-container-high border-2 border-outline-variant items-center justify-center overflow-hidden">
              <Ionicons name="person" size={48} color="#747781" />
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 p-2 bg-primary rounded-full shadow-lg">
              <Ionicons name="pencil" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text className="font-headline-lg text-2xl font-bold text-on-surface">{user?.firstName || 'Citizen'} {user?.lastName || ''}</Text>
          <Text className="text-on-surface-variant text-base mt-1 capitalize">{role?.replace('_', ' ').toLowerCase() || 'Voter'}</Text>
        </View>

        <View className="bg-surface border border-outline-variant rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="id-card" size={16} color="#115cb9" />
            <Text className="text-xs font-bold text-primary uppercase tracking-wider">Identity Details</Text>
          </View>
          <View className="mb-4">
            <Text className="text-xs text-on-surface-variant mb-1">Full Name</Text>
            <Text className="font-bold text-base text-on-surface">{user?.firstName || 'Citizen'} {user?.lastName || ''}</Text>
          </View>
          <View>
            <Text className="text-xs text-on-surface-variant mb-1">Voter Registration ID</Text>
            <View className="flex-row items-center justify-between bg-surface-container-highest px-3 py-2 rounded">
              <Text className="font-mono text-primary text-sm">{user?.id?.substring(0, 12)}...</Text>
              <TouchableOpacity onPress={handleCopyId}>
                <Ionicons name="copy-outline" size={18} color="#115cb9" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="bg-surface border border-outline-variant rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="mail" size={16} color="#115cb9" />
            <Text className="text-xs font-bold text-primary uppercase tracking-wider">System Communication</Text>
          </View>
          <View className="mb-2">
            <Text className="text-xs text-on-surface-variant mb-1">Registered Email</Text>
            <Text className="font-bold text-base text-on-surface">{user?.email}</Text>
          </View>
          <View className="flex-row items-center bg-[#f0fdf4] px-2 py-1 rounded-full border border-[#bbf7d0] self-start mt-1">
            <Ionicons name="checkmark-circle" size={12} color="#15803d" className="mr-1" />
            <Text className="text-[10px] font-bold text-[#15803d] uppercase">Verified Account</Text>
          </View>
        </View>

        <View className="bg-primary-container border border-primary rounded-xl p-4 mb-8 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="bg-primary p-2 rounded-lg mr-3">
              <Ionicons name="shield-checkmark" size={20} color="#ffffff" />
            </View>
            <View>
              <Text className="font-bold text-on-primary-container text-sm">Encrypted Session Active</Text>
              <Text className="text-xs text-on-primary-container opacity-80 mt-1">Biometrically authenticated</Text>
            </View>
          </View>
        </View>

        <View className="gap-3 mb-8">
          <TouchableOpacity 
            className="w-full bg-primary py-3 rounded-lg flex-row items-center justify-center"
            onPress={() => navigation.navigate('SecuritySessionManagement')}
          >
            <Ionicons name="lock-closed" size={20} color="#ffffff" className="mr-2" />
            <Text className="text-on-primary font-bold text-base">Security Settings</Text>
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-surface border border-outline py-3 rounded-lg flex-row items-center justify-center">
              <Ionicons name="key" size={18} color="#001a41" className="mr-2" />
              <Text className="text-on-surface font-bold">Password</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-surface border border-outline py-3 rounded-lg flex-row items-center justify-center">
              <Ionicons name="notifications" size={18} color="#001a41" className="mr-2" />
              <Text className="text-on-surface font-bold">Alerts</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-surface-container-low border border-outline-variant rounded-lg p-4 mb-8 flex-row">
          <Ionicons name="information-circle" size={24} color="#115cb9" className="mr-3" />
          <Text className="flex-1 text-xs text-on-surface-variant leading-relaxed">
            Personal data is encrypted and stored in compliance with VK-Institutional security protocols. Changes to your identity may require manual verification by the central board.
          </Text>
        </View>

        <TouchableOpacity className="mb-10 items-center justify-center py-4 border border-error rounded-xl" onPress={logout}>
          <Text className="text-error font-bold">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
