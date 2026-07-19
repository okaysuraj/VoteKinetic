import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { adminApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const ManualAddVoterScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAuth();
  const { electionId } = route.params || { electionId: 'unknown' };

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!email) {
      Alert.alert('Validation Error', 'Email is required to provision a voting token.');
      return;
    }
    if (!user) {
      Alert.alert('Error', 'Missing user context.');
      return;
    }

    setAdding(true);
    try {
      const displayName = firstName || lastName ? ${firstName} .trim() : 'Unknown Voter';
      await adminApi.addUser(user, email, displayName, 'VOTER');
      Alert.alert('Success', ${email} has been added to the registry and a token has been provisioned., [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add voter.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={adding}>
          <Ionicons name="close" size={24} color={adding ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Add Voter</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-secondary-container border border-secondary rounded-xl p-4 mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="warning" size={20} color="#003354" className="mr-2" />
            <Text className="text-on-secondary-container font-bold text-sm">Manual Provisioning</Text>
          </View>
          <Text className="text-on-secondary-container text-xs leading-relaxed">
            Adding a voter manually bypasses standard automated eligibility checks. Ensure you have verified this individual's identity out-of-band before proceeding.
          </Text>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-3">Voter Information</Text>
        
        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-8">
          <Text className="text-on-surface text-sm font-bold mb-1">Email Address (Required)</Text>
          <TextInput
            className="border-b border-outline-variant py-2 mb-4 text-on-surface text-base"
            placeholder="voter@example.com"
            placeholderTextColor="#74777f"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!adding}
          />
          
          <Text className="text-on-surface text-sm font-bold mb-1">First Name (Optional)</Text>
          <TextInput
            className="border-b border-outline-variant py-2 mb-4 text-on-surface text-base"
            placeholder="Jane"
            placeholderTextColor="#74777f"
            value={firstName}
            onChangeText={setFirstName}
            editable={!adding}
          />

          <Text className="text-on-surface text-sm font-bold mb-1">Last Name (Optional)</Text>
          <TextInput
            className="border-b border-outline-variant py-2 mb-2 text-on-surface text-base"
            placeholder="Doe"
            placeholderTextColor="#74777f"
            value={lastName}
            onChangeText={setLastName}
            editable={!adding}
          />
        </View>

        <TouchableOpacity 
          className={py-4 rounded-xl flex-row items-center justify-center shadow-sm mb-12 }
          onPress={handleAdd}
          disabled={adding}
        >
          {adding ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Ionicons name="person-add" size={20} color="#ffffff" className="mr-2" />
              <Text className="font-bold text-white text-lg">Provision Voter</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};