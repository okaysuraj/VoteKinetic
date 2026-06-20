import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { theme } from '../theme';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [requiresMfa, setRequiresMfa] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const payload = requiresMfa ? { email, password, totp_code: totpCode } : { email, password };
      const { token, user } = await api.login(payload);
      await login(token, user);
    } catch (err) {
      if (err.requires_mfa) {
        setRequiresMfa(true);
      } else {
        Alert.alert('Login Failed', err.message || 'Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#000000', '#0a192f']} style={styles.container}>
      <Text style={styles.title}>Vote Kinetic</Text>
      <Text style={styles.subtitle}>SECURE MOBILE NODE</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!requiresMfa && !loading}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>CLEARANCE PASSWORD</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!requiresMfa && !loading}
        />
      </View>

      {requiresMfa && (
        <View style={styles.mfaContainer}>
          <Text style={[styles.label, { color: theme.colors.cyanAccent }]}>AUTHENTICATOR CODE (MFA)</Text>
          <TextInput
            style={[styles.input, styles.mfaInput]}
            value={totpCode}
            onChangeText={setTotpCode}
            keyboardType="number-pad"
            maxLength={6}
            editable={!loading}
            placeholder="123456"
            placeholderTextColor={theme.colors.textMuted}
          />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.colors.background} />
        ) : (
          <Text style={styles.buttonText}>
            {requiresMfa ? 'VERIFY SECURE LOGIN' : 'ESTABLISH SECURE CONNECTION'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Register')} disabled={loading}>
        <Text style={styles.linkText}>NO IDENTITY? REGISTER NODE</Text>
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
  mfaContainer: {
    backgroundColor: theme.colors.cyanMuted,
    padding: theme.spacing.md,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.cyanAccent,
    marginBottom: theme.spacing.lg,
  },
  mfaInput: {
    textAlign: 'center',
    letterSpacing: 8,
    fontSize: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    backgroundColor: theme.colors.textPrimary,
    padding: theme.spacing.md,
    borderRadius: 4,
    alignItems: 'center',
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
