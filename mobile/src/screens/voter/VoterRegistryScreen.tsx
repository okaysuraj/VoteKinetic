import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { adminApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const VoterRegistryScreen = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [voters, setVoters] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchVoters();
  }, []);

  const fetchVoters = async () => {
    try {
      setLoading(true);
      // In a real implementation this would fetch from the new /admin/users endpoint
      // const data = await adminApi.getUsers();
      // For now, mock data:
      setTimeout(() => {
        setVoters([
          { id: '1', email: 'alice.smith@example.com', displayName: 'Alice Smith', status: 'VERIFIED', isActive: true },
          { id: '2', email: 'bob.jones@example.com', displayName: 'Bob Jones', status: 'PENDING', isActive: true },
          { id: '3', email: 'charlie.brown@example.com', displayName: 'Charlie Brown', status: 'BLOCKED', isActive: false },
        ]);
        setLoading(false);
      }, 500);
    } catch (err) {
      setLoading(false);
    }
  };

  const blockVoter = (id: string) => {
    Alert.alert('Block Voter', 'Are you sure you want to block this voter from participating?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Block', style: 'destructive', onPress: () => {
        setVoters(prev => prev.map(v => v.id === id ? { ...v, status: 'BLOCKED', isActive: false } : v));
      }}
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Voter Registry</Text>
      </View>

      <View className="flex-1 px-4 py-4">
        <View className="flex-row items-center bg-surface-container border border-outline-variant rounded-xl px-4 py-2 mb-4">
          <Ionicons name="search" size={20} color="#939aa1" className="mr-2" />
          <TextInput 
            className="flex-1 text-on-surface h-10"
            placeholder="Search voters by name or email..."
            placeholderTextColor="#939aa1"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View className="flex-row justify-between mb-4">
          <TouchableOpacity 
            className="bg-primary flex-row items-center py-2 px-4 rounded-lg flex-1 mr-2 justify-center"
            onPress={() => navigation.navigate('ImportVoters')}
          >
            <Ionicons name="cloud-upload-outline" size={18} color="#ffffff" className="mr-2" />
            <Text className="text-white font-bold">Import CSV</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-surface-container-highest flex-row items-center py-2 px-4 rounded-lg flex-1 ml-2 justify-center border border-outline-variant"
            onPress={() => Alert.alert('Add Voter', 'Manual entry form would appear here.')}
          >
            <Ionicons name="person-add-outline" size={18} color="#aec6ff" className="mr-2" />
            <Text className="text-primary font-bold">Add Manual</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#115cb9" className="mt-8" />
        ) : (
          <FlatList
            data={voters.filter(v => v.email.includes(search.toLowerCase()) || v.displayName.toLowerCase().includes(search.toLowerCase()))}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-3">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-on-surface font-bold text-base">{item.displayName}</Text>
                    <Text className="text-on-surface-variant text-sm">{item.email}</Text>
                  </View>
                  <View className={`px-2 py-1 rounded ${
                    item.status === 'VERIFIED' ? 'bg-secondary-container' : 
                    item.status === 'BLOCKED' ? 'bg-error-container' : 'bg-surface-container-highest'
                  }`}>
                    <Text className={`text-xs font-bold uppercase ${
                      item.status === 'VERIFIED' ? 'text-on-secondary-container' : 
                      item.status === 'BLOCKED' ? 'text-on-error-container' : 'text-on-surface-variant'
                    }`}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row justify-end mt-4 border-t border-outline-variant pt-3">
                  {item.isActive && (
                    <TouchableOpacity 
                      className="flex-row items-center"
                      onPress={() => blockVoter(item.id)}
                    >
                      <Ionicons name="ban" size={16} color="#ffb4ab" className="mr-1" />
                      <Text className="text-error font-bold text-sm">Block</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
