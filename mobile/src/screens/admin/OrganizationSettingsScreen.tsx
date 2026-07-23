import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { organizationApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const OrganizationSettingsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAuth();
  const { orgId } = route.params || {};

  const [org, setOrg] = useState<any>(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && orgId) {
      organizationApi.getById(user, orgId)
        .then(res => {
          setOrg(res.organization);
          setName(res.organization?.name || '');
          setType(res.organization?.type || '');
        })
        .catch(err => {
          console.error(err);
          Alert.alert('Error', 'Failed to load organization settings.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, orgId]);

  const handleSave = async () => {
    if (!name) {
      Alert.alert('Validation Error', 'Organization name is required.');
      return;
    }
    setSaving(true);
    try {
      await organizationApi.update(user!, orgId, { name, type });
      Alert.alert('Success', 'Organization settings updated.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to update settings.');
    } finally {
      setSaving(false);
    }
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
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={saving}>
          <Ionicons name="arrow-back" size={24} color={saving ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Settings</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-3">General Information</Text>
        
        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-8">
          <Text className="text-on-surface text-sm font-bold mb-1">Organization Name</Text>
          <TextInput
            className="border-b border-outline-variant py-2 mb-4 text-on-surface text-base"
            value={name}
            onChangeText={setName}
            editable={!saving}
          />
          
          <Text className="text-on-surface text-sm font-bold mb-1">Organization Type</Text>
          <TextInput
            className="border-b border-outline-variant py-2 mb-2 text-on-surface text-base"
            value={type}
            onChangeText={setType}
            editable={!saving}
          />
        </View>

        <TouchableOpacity 
          className={h-14 rounded-xl flex-row items-center justify-center shadow-sm mb-6 }
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Ionicons name="save" size={20} color="#ffffff" className="mr-2" />
              <Text className="font-bold text-white text-lg">Save Changes</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-error-container py-4 rounded-xl flex-row items-center justify-center shadow-sm mb-12 border border-error"
          onPress={() => Alert.alert('Confirm Deletion', 'Are you sure you want to delete this organization? This action is irreversible.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive' }
          ])}
        >
          <Ionicons name="trash" size={20} color="#ba1a1a" className="mr-2" />
          <Text className="font-bold text-error">Delete Organization</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};