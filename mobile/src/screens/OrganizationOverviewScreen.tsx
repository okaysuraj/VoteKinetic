import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { organizationApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const OrganizationOverviewScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAuth();
  const { orgId } = route.params || {};

  const [org, setOrg] = useState<any>(null);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && orgId) {
      organizationApi.getById(user, orgId)
        .then(res => {
          setOrg(res.organization);
          setTotalVotes(res.totalVotes || 0);
        })
        .catch(err => {
          console.error(err);
          Alert.alert('Error', 'Failed to load organization details.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, orgId]);

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
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Overview</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="items-center mb-6">
          <View className="w-24 h-24 rounded-full bg-surface-container-high border-4 border-surface items-center justify-center mb-4 shadow-sm">
            <Ionicons name="business" size={40} color="#939aa1" />
          </View>
          <Text className="text-2xl font-bold text-on-surface text-center px-4">{org?.name || 'Unknown Organization'}</Text>
          <Text className="text-primary font-bold mt-1 text-sm">{org?.type || 'Corporate'} Organization</Text>
        </View>

        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <Ionicons name="people-circle-outline" size={24} color="#00639b" className="mb-2" />
            <Text className="text-on-surface-variant text-xs mb-1">Members</Text>
            <Text className="text-on-surface font-bold text-lg">{org?._count?.members || 0}</Text>
          </View>
          <View className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <Ionicons name="file-tray-stacked-outline" size={24} color="#00639b" className="mb-2" />
            <Text className="text-on-surface-variant text-xs mb-1">Elections</Text>
            <Text className="text-on-surface font-bold text-lg">{org?._count?.elections || 0}</Text>
          </View>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-5 mb-8 shadow-sm">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Organization Statistics</Text>
          <View className="flex-row justify-between mb-3 border-b border-outline-variant pb-2">
            <Text className="text-on-surface">Total Authenticated Votes</Text>
            <Text className="font-bold text-primary">{totalVotes}</Text>
          </View>
          <View className="flex-row justify-between mb-3 border-b border-outline-variant pb-2">
            <Text className="text-on-surface">Account Status</Text>
            <Text className="font-bold text-primary">Active</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-on-surface">Created</Text>
            <Text className="font-bold text-primary">{org?.createdAt ? new Date(org.createdAt).toLocaleDateString() : 'N/A'}</Text>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-secondary-container py-4 rounded-xl flex-row items-center justify-center shadow-sm mb-4"
          onPress={() => navigation.navigate('OrganizationMembers', { orgId: org?.id })}
        >
          <Ionicons name="people" size={20} color="#003354" className="mr-2" />
          <Text className="font-bold text-on-secondary-container text-lg">Manage Members</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-surface-container-high py-4 rounded-xl flex-row items-center justify-center shadow-sm mb-12"
          onPress={() => navigation.navigate('OrganizationSettings', { orgId: org?.id })}
        >
          <Ionicons name="settings" size={20} color="#44474e" className="mr-2" />
          <Text className="font-bold text-on-surface text-lg">Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};