import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { api } from '../api/client';
import { theme } from '../theme';

export default function BulletinBoardScreen({ route, navigation }) {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getBulletin(id)
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.cyanAccent} />
      </View>
    );
  }

  if (!data.election) {
    return (
      <View style={styles.center}>
        <Text style={{ color: theme.colors.error }}>Election data not available</Text>
      </View>
    );
  }

  const { election, votes } = data;

  const renderVote = ({ item }) => (
    <View style={styles.voteCard}>
      <Text style={styles.voteLabel}>TRANSACTION HASH</Text>
      <Text style={styles.voteHash}>{item.transaction_hash || 'Pending...'}</Text>
      <Text style={styles.voteTimestamp}>TIMESTAMP: {new Date(item.voted_at).toISOString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>← BACK</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Public Bulletin</Text>
      <Text style={styles.subtitle}>{election.title.toUpperCase()}</Text>
      
      <View style={styles.statsCard}>
        <Text style={styles.statsText}>TOTAL SECURE BALLOTS: {votes.length}</Text>
      </View>

      <FlatList
        data={votes}
        keyExtractor={(item) => item.transaction_hash || item.voted_at}
        renderItem={renderVote}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={{ color: theme.colors.textMuted, textAlign: 'center', marginTop: 32 }}>
            No votes recorded yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.md, paddingTop: theme.spacing.xl },
  backBtn: { marginBottom: theme.spacing.md },
  backText: { ...theme.typography.label, color: theme.colors.textMuted },
  title: { ...theme.typography.h1, fontSize: 28, marginBottom: theme.spacing.xs },
  subtitle: { ...theme.typography.label, color: theme.colors.cyanAccent, marginBottom: theme.spacing.lg },
  statsCard: {
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
    padding: theme.spacing.md,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.cyanAccent,
    marginBottom: theme.spacing.md,
  },
  statsText: { ...theme.typography.label, color: theme.colors.cyanAccent, textAlign: 'center' },
  list: { paddingBottom: theme.spacing.xxl },
  voteCard: {
    backgroundColor: theme.colors.surfaceContainer,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: 8,
    borderRadius: 4,
  },
  voteLabel: { ...theme.typography.label, color: theme.colors.cyanAccent, marginBottom: 4 },
  voteHash: { fontFamily: 'System', fontSize: 11, color: theme.colors.textPrimary, marginBottom: 8 },
  voteTimestamp: { ...theme.typography.label, fontSize: 10, color: theme.colors.textMuted },
});
