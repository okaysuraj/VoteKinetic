import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../config/api';

export const VoterDashboardScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();
  const [elections, setElections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const token = await user?.getIdToken();
      const res = await fetch(`${API_URL}/elections`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setElections(data.elections || []);
    } catch (error) {
      console.error('Failed to fetch elections:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-surface pb-20">
      {/* TopAppBar */}
      <View className="w-full bg-surface border-b border-outline-variant z-50">
        <View className="flex-row items-center justify-between px-margin-mobile py-4 mt-10">
          <View className="flex-row items-center gap-2">
            <Text className="text-primary font-bold text-lg tracking-tight">🛡️ VOTEKINETIC</Text>
          </View>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity className="p-2 rounded-full bg-surface-container-high">
              <Text className="text-on-surface-variant text-xl">🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <Text className="text-primary text-2xl">👤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-margin-mobile pt-stack-lg space-y-stack-lg max-w-[800px] w-full mx-auto">
          
          {/* Welcome Greeting */}
          <View className="space-y-2 mb-8 mt-4">
            <Text className="text-primary font-bold text-3xl tracking-tight">Welcome, Citizen</Text>
            <Text className="text-on-surface-variant text-base">Your credentials have been successfully authenticated via sovereign-layer encryption.</Text>
          </View>

          {/* Bento Grid */}
          <View className="flex-col gap-6 mb-8 w-full">
            
            {/* Eligibility Status */}
            <View className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl flex-col justify-between flex-1 min-h-[160px]">
              <View className="flex-row justify-between items-start mb-4">
                <Text className="text-on-surface-variant font-semibold text-sm">Current Eligibility Status</Text>
                <Text className="text-secondary text-xl">🛡️</Text>
              </View>
              <View className="flex-row items-center gap-2 mb-2">
                <View className="w-3 h-3 rounded-full bg-[#1b5e20]"></View>
                <Text className="text-[#1b5e20] font-bold text-2xl">Verified</Text>
              </View>
              <Text className="text-outline text-xs">Validated until Dec 2026</Text>
            </View>

            {/* Identity Strength */}
            <View className="p-6 bg-primary-container rounded-xl flex-col justify-between flex-1 min-h-[160px]">
              <View className="flex-row justify-between items-start mb-4">
                <Text className="text-on-primary-container font-semibold text-sm opacity-80">Identity Strength</Text>
                <Text className="text-on-primary-container text-xl">🔒</Text>
              </View>
              <View className="mb-2">
                <Text className="text-on-primary-container font-bold text-2xl mb-1">High</Text>
                <View className="flex-row items-center gap-2">
                  <View className="flex-1 h-1.5 bg-on-primary-container/20 rounded-full overflow-hidden">
                    <View className="w-full h-full bg-inverse-primary rounded-full"></View>
                  </View>
                  <Text className="text-on-primary-container font-bold text-xs ml-2">100%</Text>
                </View>
              </View>
              <Text className="text-on-primary-container text-xs opacity-70">256-bit encrypted secure tunnel</Text>
            </View>
          </View>

          {/* Upcoming Elections */}
          <View className="p-6 bg-surface-container-low border border-outline-variant rounded-xl space-y-4 mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-primary font-semibold text-sm uppercase tracking-wider">Upcoming Elections</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ElectionsList')}>
                <Text className="text-secondary font-semibold text-xs">View All</Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <ActivityIndicator color="#115cb9" />
            ) : elections.length > 0 ? (
              elections.map((election) => (
                <TouchableOpacity 
                  key={election.id} 
                  className="flex-row items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg mb-2"
                  onPress={() => navigation.navigate('ElectionDetails', { electionId: election.id })}
                >
                  <View className="flex-row items-center gap-4">
                    <View className="w-12 h-12 bg-surface-container rounded items-center justify-center">
                      <Text className="text-primary text-xl">🗳️</Text>
                    </View>
                    <View>
                      <Text className="text-on-surface font-semibold text-base">{election.title}</Text>
                      <Text className="text-on-surface-variant text-xs">{election.status}</Text>
                    </View>
                  </View>
                  <View className="px-3 py-1 bg-secondary-container rounded-full">
                    <Text className="text-on-secondary-container text-xs font-bold uppercase">{election.status}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-on-surface-variant text-center">No active elections</Text>
            )}
          </View>

          {/* Recent Activity */}
          <View className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl space-y-4 mb-8">
            <Text className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Recent Activity</Text>
            <View className="space-y-4">
              <View className="flex-row items-start gap-4 mb-4">
                <Text className="text-on-surface-variant text-base mt-1">🔑</Text>
                <View className="flex-1 border-b border-surface-variant pb-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-on-surface font-medium text-sm">Security login successful</Text>
                    <Text className="text-outline text-xs">2m ago</Text>
                  </View>
                  <Text className="text-on-surface-variant text-xs">IP 192.XXX.XX.81 • Chrome on MacOS</Text>
                </View>
              </View>
              <View className="flex-row items-start gap-4">
                <Text className="text-on-surface-variant text-base mt-1">🕒</Text>
                <View className="flex-1 border-b border-surface-variant pb-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-on-surface font-medium text-sm">Credential validation audit</Text>
                    <Text className="text-outline text-xs">Yesterday</Text>
                  </View>
                  <Text className="text-on-surface-variant text-xs">Automated system check: PASS</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Visual Element */}
          <View className="w-full h-48 rounded-xl border border-outline-variant overflow-hidden justify-center items-center p-6 mb-8 bg-surface-container-high">
             <Text className="text-primary text-4xl mb-2">🔐</Text>
             <Text className="text-primary font-semibold text-sm mb-2">Active Protection Layer</Text>
             <Text className="text-on-surface-variant text-center text-xs px-4">Your session is being monitored for unauthorized access patterns. All biometric handshakes are end-to-end encrypted.</Text>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View className="absolute bottom-0 left-0 w-full flex-row justify-around items-center bg-surface border-t border-outline-variant py-2 pb-6 z-50">
        <TouchableOpacity className="items-center bg-secondary-container px-6 py-1 rounded-full">
          <Text className="text-on-secondary-container text-xl mb-1">📊</Text>
          <Text className="text-on-secondary-container text-xs font-semibold">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center px-6 py-1" onPress={() => navigation.navigate('ElectionsList')}>
          <Text className="text-outline-variant text-xl mb-1">🗳️</Text>
          <Text className="text-outline-variant text-xs">Ballots</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center px-6 py-1" onPress={() => navigation.navigate('BiometricSetup')}>
          <Text className="text-outline-variant text-xl mb-1">🔒</Text>
          <Text className="text-outline-variant text-xs">Security</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
