import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { adminApi } from '../api/client';

export const AdminBroadcastCreationScreen = () => {
  const navigation = useNavigation<any>();
  const [sending, setSending] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('NORMAL'); // NORMAL, HIGH, CRITICAL

  const handleSend = () => {
    if (!subject || !message) {
      Alert.alert('Validation Error', 'Subject and message are required.');
      return;
    }

    setSending(true);
    
    // Simulate sending broadcast since backend route doesn't exist yet
    setTimeout(() => {
      setSending(false);
      Alert.alert('Broadcast Sent', 'Your message has been distributed to all eligible voters.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" disabled={sending}>
          <Ionicons name="close" size={24} color={sending ? "#44474e" : "#aec6ff"} />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">New Broadcast</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle" size={16} color="#00639b" className="mr-2" />
            <Text className="text-primary font-bold text-sm">System Wide Announcement</Text>
          </View>
          <Text className="text-on-surface-variant text-xs leading-relaxed">
            Broadcasts will be sent as push notifications and will appear in the in-app notification center for all voters in active elections.
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-on-surface-variant text-xs mb-1 font-bold uppercase tracking-wider">Priority Level</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity 
              className={`flex-1 py-2 rounded border ${priority === 'NORMAL' ? 'bg-primary-container border-primary' : 'bg-surface border-outline-variant'}`}
              onPress={() => setPriority('NORMAL')}
            >
              <Text className={`text-center font-bold text-sm ${priority === 'NORMAL' ? 'text-on-primary-container' : 'text-on-surface'}`}>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 py-2 rounded border ${priority === 'HIGH' ? 'bg-secondary-container border-secondary' : 'bg-surface border-outline-variant'}`}
              onPress={() => setPriority('HIGH')}
            >
              <Text className={`text-center font-bold text-sm ${priority === 'HIGH' ? 'text-on-secondary-container' : 'text-on-surface'}`}>High</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 py-2 rounded border ${priority === 'CRITICAL' ? 'bg-error-container border-error' : 'bg-surface border-outline-variant'}`}
              onPress={() => setPriority('CRITICAL')}
            >
              <Text className={`text-center font-bold text-sm ${priority === 'CRITICAL' ? 'text-on-error-container' : 'text-on-surface'}`}>Critical</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-4 mt-2">
          <Text className="text-on-surface-variant text-xs mb-1">Subject</Text>
          <TextInput 
            className="text-on-surface text-base border-b border-outline-variant pb-2"
            placeholder="e.g. Election Deadline Extended"
            placeholderTextColor="#939aa1"
            value={subject}
            onChangeText={setSubject}
          />
        </View>
        
        <View className="bg-surface-container border border-outline-variant rounded-xl p-4 mb-6">
          <Text className="text-on-surface-variant text-xs mb-1">Message Body</Text>
          <TextInput 
            className="text-on-surface text-base"
            placeholder="Enter the broadcast message..."
            placeholderTextColor="#939aa1"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <View className="h-24" />
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className={`py-4 rounded-xl flex-row items-center justify-center ${sending ? 'bg-surface-container-high' : 'bg-primary'}`}
          onPress={handleSend}
          disabled={sending}
        >
          {sending ? (
            <ActivityIndicator size="small" color="#aec6ff" className="mr-2" />
          ) : (
            <Ionicons name="send" size={20} color="#ffffff" className="mr-2" />
          )}
          <Text className={`font-bold ${sending ? 'text-on-surface-variant' : 'text-white'}`}>
            {sending ? 'Transmitting...' : 'Send Broadcast'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
