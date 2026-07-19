import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { electionApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useElection } from '../hooks/useElections';

export const ArchiveDeleteElectionScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { electionId } = route.params || {};
  const { user } = useAuth();
  
  const { election, loading: electionLoading, refresh } = useElection(electionId);

  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState('');

  const handleArchive = () => {
    Alert.alert(
      'Archive Election',
      'This will move the election to the read-only historical vault. You cannot restart it once archived. Proceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Archive', 
          style: 'default',
          onPress: async () => {
            if (!user || !electionId) return;
            setLoading(true);
            try {
              // Reuse update status endpoint
              const response = await fetch(`${electionApi.update(user, electionId, {}).url.replace(electionId, `${electionId}/status`)}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${await user.getIdToken()}`
                },
                body: JSON.stringify({ status: 'ARCHIVED' })
              });
              
              if (!response.ok) throw new Error('Failed to archive');
              
              Alert.alert('Success', 'Election Archived.');
              navigation.goBack();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to archive election.');
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handlePermanentDelete = async () => {
    if (deleteText !== 'DELETE') return;
    
    if (!user || !electionId) return;
    setLoading(true);
    try {
      await electionApi.delete(user, electionId);
      Alert.alert('Success', 'Election permanently deleted.');
      // Navigate to dashboard
      navigation.navigate('AdminDashboard');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to delete election.');
      setLoading(false);
    }
  };

  if (electionLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#115cb9" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={loading}>
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 ml-4">Danger Zone</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6 p-6 rounded-xl bg-error-container border border-error opacity-90 items-center">
          <Ionicons name="warning" size={48} color="#410002" className="mb-2" />
          <Text className="text-on-error-container font-bold text-xl text-center mb-2">Critical Action Required</Text>
          <Text className="text-on-error-container text-center text-sm">
            You are about to modify the status of <Text className="font-bold">{election?.title}</Text>. This action affects historical audit trails.
          </Text>
        </View>

        <View className="mb-4">
          <TouchableOpacity 
            className="border border-outline-variant rounded-xl p-4 bg-surface hover:border-secondary mb-4"
            onPress={handleArchive}
            disabled={loading || showDeleteConfirm}
          >
            <View className="flex-row items-center mb-2">
              <Ionicons name="archive-outline" size={24} color="#aec6ff" />
              <Text className="text-on-surface font-bold text-lg ml-3">Archive Election</Text>
            </View>
            <Text className="text-on-surface-variant text-sm mb-4">
              Moves the election to the read-only historical vault. All ballots and results are preserved for audit purposes.
            </Text>
            <View className="py-3 border border-secondary rounded-lg items-center">
              <Text className="text-secondary font-bold">Archive Record</Text>
            </View>
          </TouchableOpacity>

          <View className="border border-error-container rounded-xl p-4 bg-surface mt-2">
            <View className="flex-row items-center mb-2">
              <Ionicons name="trash-outline" size={24} color="#ffb4ab" />
              <Text className="text-error font-bold text-lg ml-3">Delete Election</Text>
            </View>
            <Text className="text-on-surface-variant text-sm mb-4">
              Permanent removal. All metadata, candidate profiles, and unverified logs will be purged. This action is irreversible.
            </Text>
            
            {!showDeleteConfirm ? (
              <TouchableOpacity 
                className="py-3 bg-error rounded-lg items-center"
                onPress={() => setShowDeleteConfirm(true)}
                disabled={loading}
              >
                <Text className="text-on-error font-bold">Request Deletion</Text>
              </TouchableOpacity>
            ) : (
              <View className="mt-4 p-4 bg-surface-container-low border border-outline-variant rounded-xl">
                <Text className="text-on-surface-variant text-sm text-center mb-3">
                  To verify you want to permanently delete this election, type <Text className="text-error font-bold tracking-widest">DELETE</Text> below.
                </Text>
                <TextInput
                  value={deleteText}
                  onChangeText={setDeleteText}
                  placeholder="Type DELETE here"
                  placeholderTextColor="#8e918f"
                  className="w-full h-12 px-4 border border-outline-variant rounded-lg text-center font-bold tracking-widest uppercase text-on-surface bg-background mb-4"
                  editable={!loading}
                />
                <View className="flex-row gap-3">
                  <TouchableOpacity 
                    className="flex-1 py-3 border border-outline-variant rounded-lg items-center"
                    onPress={() => {
                      setShowDeleteConfirm(false);
                      setDeleteText('');
                    }}
                    disabled={loading}
                  >
                    <Text className="text-on-surface-variant font-bold">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className={`flex-1 py-3 rounded-lg items-center ${deleteText === 'DELETE' ? 'bg-error' : 'bg-surface-variant opacity-50'}`}
                    onPress={handlePermanentDelete}
                    disabled={loading || deleteText !== 'DELETE'}
                  >
                    {loading ? <ActivityIndicator color="#000000" /> : <Text className={deleteText === 'DELETE' ? 'text-on-error font-bold' : 'text-on-surface-variant font-bold'}>Confirm Deletion</Text>}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>

        <View className="p-4 border-t border-outline-variant flex-row items-center justify-center mt-4">
          <Ionicons name="shield-checkmark" size={18} color="#8e918f" className="mr-2" />
          <Text className="text-xs text-on-surface-variant">Security Policy: ISO-27001 Compliance Governed Action</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
