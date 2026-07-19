import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { adminApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const SuperAdminDashboardScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [metrics, setMetrics] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      adminApi.getDashboard(user)
        .then(res => {
          setMetrics(res.metrics);
          setAlerts(res.recentAlerts || []);
        })
        .catch(err => {
          console.error(err);
          Alert.alert('Error', 'Failed to load super admin dashboard.');
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
        <TouchableOpacity onPress={() => navigation.openDrawer && navigation.openDrawer()} className="p-2 -ml-2">
          <Ionicons name="menu" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Global Control</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-surface-container-high border border-outline-variant rounded-xl p-5 mb-6 items-center shadow-sm">
          <Ionicons name="globe" size={32} color="#939aa1" className="mb-2" />
          <Text className="text-xl font-bold text-on-surface">Platform Health</Text>
          <Text className="text-primary font-bold text-xs uppercase tracking-widest mt-1">Status: Operational</Text>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-3">System Metrics</Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm mb-4" style={{ width: '48%' }}>
            <Ionicons name="business-outline" size={20} color="#00639b" className="mb-1" />
            <Text className="text-on-surface-variant text-xs mb-1">Organizations</Text>
            <Text className="font-bold text-on-surface text-xl">{metrics?.totalOrganizations || 0}</Text>
          </View>
          <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm mb-4" style={{ width: '48%' }}>
            <Ionicons name="file-tray-full-outline" size={20} color="#00639b" className="mb-1" />
            <Text className="text-on-surface-variant text-xs mb-1">Total Elections</Text>
            <Text className="font-bold text-on-surface text-xl">{metrics?.totalElections || 0}</Text>
          </View>
          <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm mb-4" style={{ width: '48%' }}>
            <Ionicons name="people-outline" size={20} color="#00639b" className="mb-1" />
            <Text className="text-on-surface-variant text-xs mb-1">Total Users</Text>
            <Text className="font-bold text-on-surface text-xl">{metrics?.totalUsers || 0}</Text>
          </View>
          <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm mb-4" style={{ width: '48%' }}>
            <Ionicons name="layers-outline" size={20} color="#00639b" className="mb-1" />
            <Text className="text-on-surface-variant text-xs mb-1">Ledger Blocks</Text>
            <Text className="font-bold text-on-surface text-xl">{metrics?.totalVotes || 0}</Text>
          </View>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-5 mb-8 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs">Security Alerts</Text>
            {alerts.length > 0 && <View className="bg-error px-2 py-0.5 rounded-full"><Text className="text-[10px] text-white font-bold">{alerts.length}</Text></View>}
          </View>
          
          {alerts.length === 0 ? (
            <Text className="text-on-surface-variant text-sm italic">No recent security anomalies detected.</Text>
          ) : (
            alerts.slice(0, 3).map((alert, i) => (
              <View key={i} className="flex-row items-center justify-between border-b border-outline-variant pb-2 mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="warning" size={16} color="#ba1a1a" className="mr-2" />
                  <Text className="text-on-surface text-sm">{alert.action}</Text>
                </View>
                <Text className="text-on-surface-variant text-xs">{new Date(alert.createdAt).toLocaleDateString()}</Text>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity 
          className="bg-primary py-4 rounded-xl flex-row items-center justify-center shadow-sm mb-4"
          onPress={() => navigation.navigate('OrganizationListSuperAdmin')}
        >
          <Ionicons name="business" size={20} color="#ffffff" className="mr-2" />
          <Text className="font-bold text-white text-lg">Manage Organizations</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-secondary-container py-4 rounded-xl flex-row items-center justify-center shadow-sm mb-12"
          onPress={() => Alert.alert('Coming Soon', 'Platform settings are currently locked.')}
        >
          <Ionicons name="settings-outline" size={20} color="#003354" className="mr-2" />
          <Text className="font-bold text-on-secondary-container text-lg">Platform Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};