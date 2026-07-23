import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { organizationApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const OrganizationListSuperAdminScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      organizationApi.list(user)
        .then(res => setOrganizations(res.organizations || []))
        .catch(err => {
          console.error(err);
          Alert.alert('Error', 'Failed to fetch organizations.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

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
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Organizations</Text>
      </View>

      <View className="flex-1 px-4 py-4">
        <FlatList
          data={organizations}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-3 flex-row items-center justify-between"
              onPress={() => navigation.navigate('OrganizationDetailsSuperAdmin', { orgId: item.id })}
            >
              <View className="flex-row items-center flex-1 pr-2">
                <View className="w-12 h-12 rounded-full bg-primary-container items-center justify-center mr-4">
                  <Ionicons name="business" size={24} color="#001b44" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-on-surface text-base mb-1" numberOfLines={1}>{item.name}</Text>
                  <Text className="text-on-surface-variant text-xs">{item.domain || 'No Domain'} • {item._count?.users || 0} Members</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#74777f" />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="py-10 items-center">
              <Text className="text-on-surface-variant">No organizations found.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};