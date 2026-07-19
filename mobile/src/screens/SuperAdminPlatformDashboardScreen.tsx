import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { adminApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const SuperAdminPlatformDashboardScreen = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const res = await adminApi.getDashboard(user);
        setData(res);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#115cb9" />
      </SafeAreaView>
    );
  }

  const metrics = data?.metrics;
  const recentAlerts = data?.recentAlerts || [];
  const isHealthy = metrics?.systemHealth === 'HEALTHY' || !metrics?.systemHealth;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Platform Command</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="flex-row justify-between items-start mb-6">
          <View>
            <Text className="font-headline-lg text-2xl font-bold text-primary mb-1">Super Admin</Text>
            <Text className="text-on-surface-variant text-sm">Global Infrastructure Overview</Text>
          </View>
          <TouchableOpacity 
            className="w-10 h-10 bg-error-container rounded-full items-center justify-center"
            onPress={logout}
          >
            <Ionicons name="log-out" size={20} color="#ba1a1a" />
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between mb-2">
          <View className="w-[48%] bg-surface border border-outline-variant rounded-xl p-4 mb-4 flex-row items-center">
            <View className="w-10 h-10 bg-primary-container rounded-lg items-center justify-center mr-3">
              <Ionicons name="people" size={20} color="#001a41" />
            </View>
            <View>
              <Text className="text-xs text-on-surface-variant font-bold uppercase mb-1">Global Users</Text>
              <Text className="font-bold text-xl text-primary">{metrics?.totalUsers || 0}</Text>
            </View>
          </View>

          <View className="w-[48%] bg-surface border border-outline-variant rounded-xl p-4 mb-4 flex-row items-center">
            <View className="w-10 h-10 bg-secondary-container/30 rounded-lg items-center justify-center mr-3">
              <Ionicons name="pie-chart" size={20} color="#115cb9" />
            </View>
            <View>
              <Text className="text-xs text-on-surface-variant font-bold uppercase mb-1">Elections</Text>
              <Text className="font-bold text-xl text-primary">{metrics?.totalElections || 0}</Text>
            </View>
          </View>

          <View className="w-[48%] bg-surface border border-outline-variant rounded-xl p-4 mb-4 flex-row items-center">
            <View className="w-10 h-10 bg-surface-container-high rounded-lg items-center justify-center mr-3">
              <Ionicons name="business" size={20} color="#434750" />
            </View>
            <View>
              <Text className="text-xs text-on-surface-variant font-bold uppercase mb-1">Orgs</Text>
              <Text className="font-bold text-xl text-primary">{metrics?.totalOrganizations || 0}</Text>
            </View>
          </View>

          <View className="w-[48%] bg-surface border border-outline-variant rounded-xl p-4 mb-4 flex-row items-center">
            <View className="w-10 h-10 bg-surface-container-high rounded-lg items-center justify-center mr-3">
              <Ionicons name="finger-print" size={20} color="#434750" />
            </View>
            <View>
              <Text className="text-xs text-on-surface-variant font-bold uppercase mb-1">Total Votes</Text>
              <Text className="font-bold text-xl text-primary">{metrics?.totalVotes || 0}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-6 flex-row items-center justify-between"
          onPress={() => navigation.navigate('PlatformSystemHealth')}
        >
          <View className="flex-row items-center">
            <Ionicons name={isHealthy ? "checkmark-circle" : "warning"} size={24} color={isHealthy ? "#12b76a" : "#fdb022"} className="mr-3" />
            <View>
              <Text className="font-bold text-on-surface text-base">Platform Health: {isHealthy ? 'Operational' : 'Degraded'}</Text>
              <Text className="text-xs text-on-surface-variant mt-1">View detailed infrastructure metrics</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8e918f" />
        </TouchableOpacity>

        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4 px-1">
            <Text className="font-bold text-lg text-primary uppercase tracking-wider">Security Alerts</Text>
            <View className="bg-error px-2 py-0.5 rounded-full">
              <Text className="text-[10px] text-white font-bold">{recentAlerts.length} Critical</Text>
            </View>
          </View>
          
          <View className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
            {recentAlerts.length === 0 ? (
              <View className="p-6 items-center">
                <Ionicons name="shield-checkmark" size={32} color="#12b76a" className="mb-2" />
                <Text className="text-on-surface-variant">No critical security alerts.</Text>
              </View>
            ) : (
              recentAlerts.map((alert: any, index: number) => (
                <View key={index} className={`p-4 ${index !== recentAlerts.length - 1 ? 'border-b border-outline-variant' : ''}`}>
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="font-bold text-error text-sm">{alert.type || 'Security Flag'}</Text>
                    <Text className="text-[10px] text-on-surface-variant">{alert.time || 'Recently'}</Text>
                  </View>
                  <Text className="text-sm text-on-surface leading-snug">{alert.message || 'Suspicious activity detected.'}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between mb-8">
          <TouchableOpacity 
            className="w-[48%] bg-primary py-4 rounded-xl items-center flex-col justify-center mb-4 shadow-sm"
            onPress={() => navigation.navigate('AdminActionLogs')}
          >
            <Ionicons name="list" size={24} color="#ffffff" className="mb-2" />
            <Text className="text-on-primary font-bold text-sm">Action Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="w-[48%] bg-primary py-4 rounded-xl items-center flex-col justify-center mb-4 shadow-sm"
            onPress={() => navigation.navigate('AuditLogsOverview')}
          >
            <Ionicons name="document-lock" size={24} color="#ffffff" className="mb-2" />
            <Text className="text-on-primary font-bold text-sm">Audit Ledger</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="w-full border border-outline-variant py-4 rounded-xl items-center flex-row justify-center"
            onPress={() => navigation.navigate('InstitutionalIntegritySystem')}
          >
            <Ionicons name="shield" size={20} color="#001a41" className="mr-2" />
            <Text className="text-on-surface font-bold text-sm">Integrity System</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
