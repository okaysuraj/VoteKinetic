import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import * as LocalAuthentication from 'expo-local-authentication';

const MOCK_ELECTIONS = [
  { id: '1', title: 'Student Council 2026', status: 'ACTIVE' },
  { id: '2', title: 'Housing Society Board', status: 'ACTIVE' },
];

export const VoterDashboardScreen = () => {
  const { user, logout } = useAuth();
  
  const handleVote = async (title: string) => {
    // Require biometric authentication before allowing vote casting
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to cast your encrypted vote',
    });
    
    if (result.success) {
      Alert.alert('Success', `You are ready to cast your vote for ${title}. (Voting logic follows)`);
    } else {
      Alert.alert('Authentication Failed', 'You must verify your identity to cast a vote.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Active Elections</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_ELECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.statusLabel}>{item.status}</Text>
              <Text style={styles.electionTitle}>{item.title}</Text>
            </View>
            <TouchableOpacity style={styles.voteBtn} onPress={() => handleVote(item.title)}>
              <Text style={styles.voteBtnText}>Vote</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutBtn: {
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    color: '#4ade80',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  electionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  voteBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  voteBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
