import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { api } from '../api/client';
import { theme } from '../theme';

export default function ElectionDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getElection(id)
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.cyanAccent} />
      </View>
    );
  }

  if (error || !data || !data.election) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error || 'Election not found'}</Text>
      </View>
    );
  }

  const { election } = data;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>← BACK TO LEDGER</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>{election.title}</Text>
      <Text style={[styles.statusBadge, election.live_status === 'active' ? styles.statusActive : {}]}>
        STATUS: {election.live_status.toUpperCase()}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardDesc}>{election.description}</Text>
      </View>

      {election.can_vote && !data.has_voted ? (
        <TouchableOpacity 
          style={styles.voteBtn}
          onPress={() => navigation.navigate('Vote', { id: election.id })}
        >
          <Text style={styles.voteBtnText}>CAST CRYPTOGRAPHIC VOTE</Text>
        </TouchableOpacity>
      ) : data.has_voted ? (
        <View style={styles.votedCard}>
          <Text style={styles.votedText}>✓ SECURE VOTE RECORDED</Text>
        </View>
      ) : null}
      
      <TouchableOpacity 
        style={styles.bulletinBtn}
        onPress={() => navigation.navigate('BulletinBoard', { id: election.id })}
      >
        <Text style={styles.bulletinBtnText}>VIEW PUBLIC BULLETIN BOARD</Text>
      </TouchableOpacity>
      
      <View style={{ height: theme.spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xl,
  },
  backBtn: {
    marginBottom: theme.spacing.md,
  },
  backText: {
    ...theme.typography.label,
    color: theme.colors.textMuted,
  },
  title: {
    ...theme.typography.h1,
    fontSize: 28,
    marginBottom: theme.spacing.xs,
  },
  statusBadge: {
    ...theme.typography.label,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg,
  },
  statusActive: {
    color: theme.colors.cyanAccent,
  },
  card: {
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    borderRadius: 8,
    marginBottom: theme.spacing.lg,
  },
  cardDesc: {
    ...theme.typography.body,
  },
  voteBtn: {
    backgroundColor: theme.colors.cyanMuted,
    padding: theme.spacing.md,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.cyanAccent,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  voteBtnText: {
    ...theme.typography.label,
    color: theme.colors.cyanAccent,
  },
  votedCard: {
    backgroundColor: 'rgba(0, 204, 102, 0.1)',
    padding: theme.spacing.md,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.success,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  votedText: {
    ...theme.typography.label,
    color: theme.colors.success,
  },
  bulletinBtn: {
    backgroundColor: 'transparent',
    padding: theme.spacing.md,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  bulletinBtnText: {
    ...theme.typography.label,
    color: theme.colors.textPrimary,
  },
  error: {
    color: theme.colors.error,
  }
});
