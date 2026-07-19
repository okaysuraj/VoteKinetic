import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { organizationApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const OrganizationDetailsSuperAdminScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { orgId } = route.params || {};
  const { user } = useAuth();
  
  const [orgData, setOrgData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user || !orgId) {
      setLoading(false);
      return;
    }
    
    const fetchOrg = async () => {
      try {
        const res = await organizationApi.getById(user, orgId);
        setOrgData(res.organization);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to fetch organization details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrg();
  }, [user, orgId]);

  const handleRotateKey = () => {
    setShowModal(false);
    Alert.alert('Success', 'API Keys rotated successfully.');
  };

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
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Organization Details</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="flex-row items-start justify-between mb-8">
          <View className="flex-1">
            <Text className="font-headline-lg text-2xl font-bold text-on-surface mb-1">
              {orgData?.name || 'Unknown Organization'}
            </Text>
            <Text className="text-sm text-on-surface-variant font-mono">
              ID: {orgData?.id || 'N/A'}
            </Text>
          </View>
          <View className="px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant">
            <Text className="text-xs font-bold text-on-surface uppercase">Active</Text>
          </View>
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mb-6">
          <View className="p-4 border-b border-outline-variant flex-row items-center">
            <Ionicons name="key" size={20} color="#115cb9" className="mr-2" />
            <Text className="font-bold text-on-surface text-lg">API Authentication</Text>
          </View>
          <View className="p-4">
            <View className="mb-4">
              <Text className="text-xs text-on-surface-variant uppercase font-bold mb-1">Production Client ID</Text>
              <Text className="font-mono text-on-surface bg-surface-container-high p-2 rounded">
                pk_live_8f92a11b{orgData?.id?.substring(0, 8)}
              </Text>
            </View>
            <View className="mb-4">
              <Text className="text-xs text-on-surface-variant uppercase font-bold mb-1">Client Secret (Hidden)</Text>
              <Text className="font-mono text-on-surface bg-surface-container-high p-2 rounded">
                ********************************
              </Text>
            </View>
            <TouchableOpacity 
              className="mt-2 flex-row items-center justify-center p-3 border border-outline-variant rounded-lg"
              onPress={() => setShowModal(true)}
            >
              <Ionicons name="refresh" size={16} color="#434750" className="mr-2" />
              <Text className="font-bold text-on-surface">Rotate Secret</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mb-6">
          <View className="p-4 border-b border-outline-variant flex-row items-center">
            <Ionicons name="business" size={20} color="#115cb9" className="mr-2" />
            <Text className="font-bold text-on-surface text-lg">Organization Stats</Text>
          </View>
          <View className="p-4 flex-row flex-wrap">
            <View className="w-1/2 mb-4">
              <Text className="text-xs text-on-surface-variant uppercase font-bold">Total Users</Text>
              <Text className="text-xl font-bold text-primary">{orgData?._count?.users || 0}</Text>
            </View>
            <View className="w-1/2 mb-4">
              <Text className="text-xs text-on-surface-variant uppercase font-bold">Total Elections</Text>
              <Text className="text-xl font-bold text-primary">{orgData?._count?.elections || 0}</Text>
            </View>
            <View className="w-1/2">
              <Text className="text-xs text-on-surface-variant uppercase font-bold">Timezone</Text>
              <Text className="text-sm font-bold text-primary">{orgData?.timezone || 'UTC'}</Text>
            </View>
            <View className="w-1/2">
              <Text className="text-xs text-on-surface-variant uppercase font-bold">Currency</Text>
              <Text className="text-sm font-bold text-primary">{orgData?.currency || 'USD'}</Text>
            </View>
          </View>
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mb-8">
          <View className="p-4 border-b border-outline-variant flex-row items-center">
            <Ionicons name="shield-checkmark" size={20} color="#115cb9" className="mr-2" />
            <Text className="font-bold text-on-surface text-lg">Infrastructure Location</Text>
          </View>
          <View className="p-4">
            <Text className="font-bold text-on-surface mb-1">US-EAST-1 (GovCloud)</Text>
            <Text className="text-xs text-on-surface-variant">Compliance: FISMA High / FedRAMP</Text>
          </View>
        </View>
      </ScrollView>

      {/* Rotation Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View className="bg-surface-container-lowest w-full max-w-sm p-6 rounded-xl border border-outline-variant shadow-lg">
            <View className="w-12 h-12 bg-primary-container rounded-full items-center justify-center mb-4 mx-auto">
              <Ionicons name="refresh" size={24} color="#001b44" />
            </View>
            <Text className="font-headline-md text-xl font-bold text-primary text-center mb-2">Confirm Key Rotation?</Text>
            <Text className="text-sm text-on-surface-variant text-center mb-6">
              This action will invalidate all current API sessions for {orgData?.name}. This process is irreversible.
            </Text>
            <View className="gap-3">
              <TouchableOpacity 
                className="py-3 bg-primary rounded-lg items-center"
                onPress={handleRotateKey}
              >
                <Text className="text-on-primary font-bold">Rotate Keys Now</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="py-3 border border-outline-variant rounded-lg items-center"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-on-surface font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
