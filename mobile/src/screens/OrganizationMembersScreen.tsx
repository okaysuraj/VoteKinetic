import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { organizationApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const OrganizationMembersScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAuth();
  const { orgId } = route.params || {};

  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && orgId) {
      organizationApi.getMembers(user, orgId)
        .then(res => setMembers(res.members || []))
        .catch(err => {
          console.error(err);
          Alert.alert('Error', 'Failed to load members.');
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
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Members</Text>
      </View>

      <View className="flex-1 px-4 py-4">
        <TouchableOpacity className="bg-primary py-3 rounded-xl flex-row items-center justify-center shadow-sm mb-6">
          <Ionicons name="person-add" size={18} color="#ffffff" className="mr-2" />
          <Text className="font-bold text-white">Invite Member</Text>
        </TouchableOpacity>

        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-3 flex-row items-center">
              <View className="w-12 h-12 rounded-full bg-surface items-center justify-center mr-4">
                <Ionicons name="person" size={20} color="#00639b" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-on-surface text-base mb-1">{item.user?.displayName || 'Unknown'}</Text>
                <Text className="text-on-surface-variant text-xs">{item.user?.email}</Text>
              </View>
              <View className="bg-secondary-container px-2 py-1 rounded">
                <Text className="text-on-secondary-container text-[10px] font-bold">{item.role?.name || 'MEMBER'}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View className="py-10 items-center">
              <Text className="text-on-surface-variant">No members found.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};