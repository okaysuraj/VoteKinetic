import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { api } from '../api/client';
import { theme } from '../theme';

export default function ElectionsScreen({ navigation }) {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getElections()
      .then(({ elections: data }) => {
        setElections(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ElectionDetail', { id: item.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={[styles.statusBadge, item.live_status === 'active' ? styles.statusActive : {}]}>
          {item.live_status.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
    </TouchableOpacity>
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
      <Text style={styles.title}>Elections</Text>
      <Text style={styles.subtitle}>SECURE PUBLIC LEDGER</Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <FlatList
        data={elections}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
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
    paddingTop: theme.spacing.xxl,
  },
  title: {
    ...theme.typography.h1,
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.label,
    color: theme.colors.cyanAccent,
    marginBottom: theme.spacing.lg,
  },
  list: {
    paddingBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    borderRadius: 8,
    marginBottom: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  cardTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  statusBadge: {
    ...theme.typography.label,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.textMuted,
  },
  statusActive: {
    borderColor: theme.colors.success,
    color: theme.colors.success,
    backgroundColor: 'rgba(0, 204, 102, 0.1)',
  },
  cardDesc: {
    ...theme.typography.body,
    fontSize: 14,
  },
  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  }
});
