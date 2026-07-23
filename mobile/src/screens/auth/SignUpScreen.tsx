import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigation = useNavigation<any>();

  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register(email, password);
      // Let the onAuthStateChanged in AuthContext handle navigation
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#f9f9fc' }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#001b44', marginBottom: 8 }}>Create Account</Text>
          <Text style={{ fontSize: 16, color: '#44474e', textAlign: 'center' }}>
            Register your credentials to access VoteKinetic
          </Text>
        </View>

        <View style={{ backgroundColor: '#ffffff', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#c4c6d0' }}>
          
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1a1c1e', marginBottom: 8 }}>Email Address</Text>
          <TextInput
            style={{ backgroundColor: '#f9f9fc', height: 48, borderRadius: 8, paddingHorizontal: 16, borderWidth: 1, borderColor: '#c4c6d0', marginBottom: 20 }}
            placeholder="citizen@domain.gov"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1a1c1e', marginBottom: 8 }}>Security Phrase</Text>
          <TextInput
            style={{ backgroundColor: '#f9f9fc', height: 48, borderRadius: 8, paddingHorizontal: 16, borderWidth: 1, borderColor: '#c4c6d0', marginBottom: 8 }}
            placeholder="••••••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? <Text style={{ color: '#ba1a1a', fontSize: 12, marginBottom: 16 }}>{error}</Text> : null}

          <TouchableOpacity 
            style={{ backgroundColor: '#001b44', height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 16 }}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Register Credentials</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ marginTop: 24, alignItems: 'center' }}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{ color: '#3b82f6', fontWeight: 'bold' }}>Already have an account? Login here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};