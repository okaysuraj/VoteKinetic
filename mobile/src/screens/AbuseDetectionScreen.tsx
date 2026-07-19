import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const AbuseDetectionScreen = () => {
  const navigation = useNavigation<any>();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate GET /api/admin/abuse-reports
    setTimeout(() => {
      setReports([
        { id: 'rep-1', type: 'RAPID_VOTING', severity: 'HIGH', userEmail: 'suspicious@example.com', timestamp: new Date().toISOString(), status: 'PENDING_REVIEW' },
        { id: 'rep-2', type: 'IP_MISMATCH', severity: 'MEDIUM', userEmail: 'traveler@example.com', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'RESOLVED' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleReview = (id: string) => {
    Alert.alert('Review Action', 'Would you like to suspend this user?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Suspend User', style: 'destructive', onPress: () => {
        setReports(prev => prev.filter(r => r.id !== id));
      }}
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">ML Security Flags</Text>
      </View>

      <View className="flex-1 px-4 py-4">
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4 flex-row items-center">
          <Ionicons name="shield-half" size={24} color="#00639b" className="mr-3" />
          <Text className="text-on-surface-variant text-xs leading-relaxed flex-1">
            Machine Learning heuristics automatically flag suspicious patterns such as rapid successive voting, impossible travel, or bulk automated actions.
          </Text>
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#115cb9" />
          </View>
        ) : (
          <FlatList
            data={reports}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-3">
                <View className="flex-row items-start justify-between mb-3">
                  <View>
                    <Text className="text-on-surface font-bold text-base uppercase">{item.type.replace('_', ' ')}</Text>
                    <Text className="text-on-surface-variant text-xs mt-1">{item.userEmail}</Text>
                  </View>
                  <View className={`px-2 py-0.5 rounded ${item.severity === 'HIGH' ? 'bg-error' : 'bg-secondary-container'}`}>
                    <Text className={`text-[10px] font-bold uppercase tracking-wider ${item.severity === 'HIGH' ? 'text-white' : 'text-on-secondary-container'}`}>
                      {item.severity}
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row justify-between items-center mt-2 border-t border-outline-variant/50 pt-3">
                  <Text className="text-on-surface-variant text-xs font-mono">
                    {new Date(item.timestamp).toLocaleString()}
                  </Text>
                  
                  {item.status === 'PENDING_REVIEW' ? (
                    <TouchableOpacity 
                      className="bg-primary px-3 py-1.5 rounded"
                      onPress={() => handleReview(item.id)}
                    >
                      <Text className="text-white text-xs font-bold">Review</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text className="text-secondary font-bold text-xs uppercase">{item.status}</Text>
                  )}
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
