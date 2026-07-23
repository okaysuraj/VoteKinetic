import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { organizationApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const OrganizationBillingSuperAdminScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAuth();
  const { orgId } = route.params || {};

  const [billing, setBilling] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && orgId) {
      organizationApi.getBilling(user, orgId)
        .then(res => setBilling(res.billing))
        .catch(err => {
          console.error(err);
          Alert.alert('Error', 'Failed to fetch billing details.');
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
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Billing & Usage</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-surface-container-high border border-outline-variant rounded-xl p-5 mb-6 items-center shadow-sm">
          <Ionicons name="card" size={40} color="#001b44" className="mb-2" />
          <Text className="text-xl font-bold text-on-surface">Plan: {billing?.plan || 'ENTERPRISE'}</Text>
          <Text className={ont-bold text-xs uppercase tracking-widest mt-1 }>
            Status: {billing?.status || 'GOOD STANDING'}
          </Text>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-3">Current Cycle Usage</Text>
        <View className="bg-surface-container border border-outline-variant rounded-xl p-5 mb-8 shadow-sm">
          <View className="flex-row justify-between mb-3 border-b border-outline-variant pb-2">
            <Text className="text-on-surface">Active Voters</Text>
            <Text className="font-bold text-primary">{billing?.currentCycle?.activeVoters || 14200}</Text>
          </View>
          <View className="flex-row justify-between mb-3 border-b border-outline-variant pb-2">
            <Text className="text-on-surface">API Requests</Text>
            <Text className="font-bold text-primary">{billing?.currentCycle?.apiRequests || 845020}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-on-surface font-bold text-base">Amount Due</Text>
            <Text className="font-bold text-primary text-base">
               {billing?.currentCycle?.currency || 'USD'}
            </Text>
          </View>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-3">Recent Invoices</Text>
        {billing?.invoices?.map((invoice: any) => (
          <View key={invoice.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-3 flex-row items-center justify-between shadow-sm">
            <View>
              <Text className="font-bold text-on-surface mb-1">{invoice.id}</Text>
              <Text className="text-on-surface-variant text-xs">{new Date(invoice.date).toLocaleDateString()}</Text>
            </View>
            <View className="items-end">
              <Text className="font-bold text-primary mb-1"></Text>
              <Text className="text-primary font-bold text-[10px] uppercase bg-primary-container px-2 py-0.5 rounded">{invoice.status}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity 
          className="bg-primary py-4 rounded-xl flex-row items-center justify-center shadow-sm mb-12 mt-4"
          onPress={() => Alert.alert('Payment Method', 'Redirecting to secure payment portal...')}
        >
          <Ionicons name="card-outline" size={20} color="#ffffff" className="mr-2" />
          <Text className="font-bold text-white text-lg">Update Payment Method</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};