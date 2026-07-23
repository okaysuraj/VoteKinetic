import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import * as LocalAuthentication from 'expo-local-authentication';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    
    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login to VoteKinetic',
        fallbackLabel: 'Use Email/Password',
      });
      if (result.success) {
        console.log('Biometric success');
      }
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-surface"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View className="w-full border-b border-outline-variant bg-surface px-margin-mobile py-4 flex-row items-center justify-between z-50 mt-10">
          <View className="flex-row items-center gap-2">
            <Text className="text-primary font-bold text-lg">🛡️ VOTEKINETIC</Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1 items-center justify-center px-margin-mobile py-stack-lg">
          <View className="w-full max-w-[440px] flex-col gap-stack-lg">
            
            {/* Branding & Title */}
            <View className="items-center space-y-2 mb-8">
              <Text className="text-primary font-bold text-4xl mb-2">Login</Text>
              <Text className="text-on-surface-variant text-base text-center">
                Enter your credentials to access the secure voting terminal.
              </Text>
            </View>

            {/* Login Card */}
            <View className="bg-surface-container-lowest border border-outline-variant p-stack-lg rounded-lg shadow-sm w-full">
              
              {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

              {/* Email Field */}
              <View className="flex-col gap-unit mb-6">
                <Text className="text-on-surface font-semibold text-sm mb-2">Email Address</Text>
                <TextInput 
                  className="w-full h-12 px-4 border border-outline rounded bg-surface text-on-surface"
                  placeholder="name@agency.gov"
                  placeholderTextColor="#747781"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              {/* Password Field */}
              <View className="flex-col gap-unit mb-6">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-on-surface font-semibold text-sm">Password</Text>
                  <TouchableOpacity>
                    <Text className="text-secondary font-medium text-xs">Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                <TextInput 
                  className="w-full h-12 px-4 border border-outline rounded bg-surface text-on-surface"
                  placeholder="••••••••"
                  placeholderTextColor="#747781"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {/* Action Button */}
              <TouchableOpacity 
                className={`w-full h-[56px] bg-primary rounded items-center justify-center flex-row gap-2 ${loading ? 'opacity-50' : 'active:opacity-80'}`}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-on-primary font-semibold text-lg">Secure Login</Text>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="w-full h-[56px] mt-4 border border-outline-variant rounded items-center justify-center bg-surface-container-low"
                onPress={handleBiometricAuth}
              >
                <Text className="text-on-surface-variant font-medium">Use Biometrics</Text>
              </TouchableOpacity>

            </View>

            {/* Institutional Trust Indicator */}
            <View className="items-center py-4 mt-8 opacity-60">
              <View className="flex-row items-center gap-2">
                <Text className="text-xs font-semibold tracking-widest text-on-surface-variant uppercase">
                  🔒 End-to-End Encrypted
                </Text>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
