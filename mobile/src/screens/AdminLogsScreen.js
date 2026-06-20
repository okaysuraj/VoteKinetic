import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { api } from '../api/client';
import { theme } from '../theme';

export default function AdminLogsScreen() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getLogs()
      .then((res) => {
        // Reverse logs to show newest first, assuming the backend sends chronological order
        setLogs(res.reverse());
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.logCard}>
      <Text style={styles.hashLabel}>BLOCK HASH</Text>
      <Text style={styles.hashText}>{item.hash}</Text>
      
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>ACTION</Text>
          <Text style={styles.detailValue}>{item.action}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>TIMESTAMP</Text>
          <Text style={styles.detailValue}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
        </View>
      </View>
      
      <Text style={styles.detailLabel}>PREVIOUS HASH</Text>
      <Text style={styles.hashText}>{item.previous_hash}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.cyanAccent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <Text style={styles.subtitle}>IMMUTABLE LOG LEDGER</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={logs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No logs found in the ledger.</Text>
        }
      />
    </View>
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
  title: {
    ...theme.typography.h1,
    fontSize: 28,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.label,
    color: theme.colors.cyanAccent,
    marginBottom: theme.spacing.lg,
  },
  list: {
    paddingBottom: theme.spacing.xxl,
  },
  logCard: {
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    borderRadius: 8,
    marginBottom: theme.spacing.md,
  },
  hashLabel: {
    ...theme.typography.label,
    color: theme.colors.cyanAccent,
    marginBottom: 4,
  },
  hashText: {
    fontFamily: 'System', // Courier/Jetbrains Mono if available
    fontSize: 10,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    ...theme.typography.label,
    marginBottom: 4,
  },
  detailValue: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
  },
  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
  emptyText: {
    ...theme.typography.body,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  }
});
