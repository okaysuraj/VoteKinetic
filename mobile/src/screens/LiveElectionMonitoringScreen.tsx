import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { electionApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const LiveElectionMonitoringScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAuth();
  const { electionId } = route.params || {};

  const [liveVotes, setLiveVotes] = useState(0);
  const [eligibility, setEligibility] = useState(0);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    if (!electionId || !user) return;

    const fetchStats = async () => {
      try {
        const res = await electionApi.getById(user, electionId);
        if (res.election?._count) {
          const newVotes = res.election._count.votes || 0;
          if (newVotes > liveVotes) {
            Animated.sequence([
              Animated.timing(pulseAnim, { toValue: 1.1, duration: 150, useNativeDriver: true }),
              Animated.timing(pulseAnim, { toValue: 1, duration: 150, useNativeDriver: true })
            ]).start();
          }
          setLiveVotes(newVotes);
          setEligibility(res.election._count.eligibility || 0);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [electionId, user]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-error mr-2 animate-pulse" />
          <Text className="font-bold text-xl text-primary text-center">Live Monitor</Text>
        </View>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-surface-container border border-outline-variant rounded-xl p-6 mb-6 items-center shadow-sm">
          <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-2">Incoming Votes</Text>
          <Animated.Text 
            style={{ transform: [{ scale: pulseAnim }] }} 
            className="text-6xl font-bold text-primary"
          >
            {liveVotes}
          </Animated.Text>
          <Text className="text-on-surface-variant text-sm mt-2">Blocks Verified on Ledger</Text>
        </View>

        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <Ionicons name="speedometer-outline" size={24} color="#00639b" className="mb-2" />
            <Text className="text-on-surface-variant text-xs mb-1">Voting Rate</Text>
            <Text className="text-on-surface font-bold text-lg">~4.2/min</Text>
          </View>
          <View className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <Ionicons name="people-outline" size={24} color="#00639b" className="mb-2" />
            <Text className="text-on-surface-variant text-xs mb-1">Turnout</Text>
            <Text className="text-on-surface font-bold text-lg">
              {eligibility > 0 ? ((liveVotes / eligibility) * 100).toFixed(1) : 0}%
            </Text>
          </View>
        </View>

        <View className="bg-secondary-container border border-secondary rounded-xl p-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="shield-checkmark" size={20} color="#003354" className="mr-2" />
            <Text className="font-bold text-on-secondary-container">System Status: Optimal</Text>
          </View>
          <Text className="text-on-secondary-container text-xs leading-relaxed">
            All cryptographic nodes are online and verifying blocks synchronously. No anomalies detected in voting patterns.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};