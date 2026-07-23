import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CreateOrganizationSuperAdminScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [plan, setPlan] = useState('STANDARD');
  const [creating, setCreating] = useState(false);

  const handleCreate = () => {
    if (!name || !domain) {
      Alert.alert('Validation Error', 'Organization name and domain are required.');
      return;
    }

    setCreating(true);
    // Simulate POST /api/organizations
    setTimeout(() => {
      setCreating(false);
      Alert.alert('Success', `${name} has been provisioned on the ${plan} plan.`, [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={creating}>
          <Ionicons name="close" size={24} color={creating ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">New Tenant</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-on-surface mb-2">Provision Organization</Text>
          <Text className="text-on-surface-variant leading-relaxed">
            Create a new isolated tenant for a customer. Their data, keys, and elections will be strictly segregated.
          </Text>
        </View>

        <View className="space-y-4 mb-6">
          <View className="bg-surface-container border border-outline-variant rounded-xl p-4">
            <Text className="text-on-surface-variant text-xs mb-1">Organization Name *</Text>
            <TextInput 
              className="text-on-surface text-base border-b border-outline-variant pb-2"
              placeholder="e.g. Acme Corp"
              placeholderTextColor="#939aa1"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View className="bg-surface-container border border-outline-variant rounded-xl p-4">
            <Text className="text-on-surface-variant text-xs mb-1">Primary Domain *</Text>
            <TextInput 
              className="text-on-surface text-base border-b border-outline-variant pb-2"
              placeholder="e.g. acmecorp.com"
              placeholderTextColor="#939aa1"
              value={domain}
              onChangeText={setDomain}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-3">Subscription Tier</Text>
        <View className="flex-row gap-2 mb-8">
          {['BASIC', 'STANDARD', 'ENTERPRISE'].map((tier) => (
            <TouchableOpacity 
              key={tier}
              className={`flex-1 py-3 rounded-lg border ${plan === tier ? 'bg-primary-container border-primary' : 'bg-surface border-outline-variant'}`}
              onPress={() => setPlan(tier)}
            >
              <Text className={`text-center text-xs font-bold ${plan === tier ? 'text-on-primary-container' : 'text-on-surface'}`}>
                {tier}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View className="h-24" />
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className={`py-4 rounded-xl flex-row items-center justify-center ${creating ? 'bg-surface-container-high' : 'bg-primary'}`}
          onPress={handleCreate}
          disabled={creating}
        >
          {creating ? (
            <ActivityIndicator size="small" color="#aec6ff" className="mr-2" />
          ) : (
            <Ionicons name="business" size={20} color="#ffffff" className="mr-2" />
          )}
          <Text className={`font-bold ${creating ? 'text-on-surface-variant' : 'text-white'} text-lg`}>
            {creating ? 'Provisioning...' : 'Create Tenant'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
