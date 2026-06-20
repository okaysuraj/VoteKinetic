import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { theme } from '../theme';

export default function RegisterScreen({ navigation }) {
  const { login } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    setLoading(true);
    try {
      const { token, user } = await api.register({ full_name: fullName, email, password, role: 'voter' });
      await login(token, user);
    } catch (err) {
      Alert.alert('Registration Failed', err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#000000', '#0a192f']} style={styles.container}>
      <Text style={styles.title}>Initialize Node</Text>
      <Text style={styles.subtitle}>CREATE CRYPTOGRAPHIC IDENTITY</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>FULL NAME</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          editable={!loading}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>CLEARANCE PASSWORD</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.colors.background} />
        ) : (
          <Text style={styles.buttonText}>GENERATE IDENTITY</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')} disabled={loading}>
        <Text style={styles.linkText}>ALREADY HAVE AN IDENTITY? LOGIN</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.h1,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.label,
    textAlign: 'center',
    color: theme.colors.cyanAccent,
    marginBottom: theme.spacing.xxl,
  },
  formGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...theme.typography.label,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.textPrimary,
    padding: theme.spacing.md,
    borderRadius: 4,
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.colors.textPrimary,
    padding: theme.spacing.md,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  buttonText: {
    ...theme.typography.label,
    color: theme.colors.background,
  },
  linkButton: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  linkText: {
    ...theme.typography.label,
    color: theme.colors.textMuted,
  }
});
