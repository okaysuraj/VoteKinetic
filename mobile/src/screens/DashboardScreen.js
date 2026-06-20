import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';

export default function DashboardScreen({ navigation }) {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.cyanAccent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.full_name}</Text>
      <Text style={styles.subtitle}>STATUS: ACTIVE | CLEARANCE: {user.role.toUpperCase()}</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cryptographic Identity</Text>
        <Text style={styles.text}>Entity ID: {user.id}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
      </View>

      <Text style={styles.logoutBtn} onPress={logout}>LOGOUT SECURE SESSION</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.label,
    color: theme.colors.cyanAccent,
    marginBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.surfaceContainer,
    padding: theme.spacing.lg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xl,
  },
  cardTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    marginBottom: theme.spacing.md,
  },
  text: {
    ...theme.typography.body,
    marginBottom: theme.spacing.xs,
  },
  logoutBtn: {
    ...theme.typography.label,
    color: theme.colors.error,
    textAlign: 'center',
    padding: theme.spacing.md,
  }
});
