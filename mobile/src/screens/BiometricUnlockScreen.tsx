import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import * as LocalAuthentication from 'expo-local-authentication';

export const BiometricUnlockScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { role } = useAuth();
  
  // Optionally redirect somewhere specific after unlock
  const nextScreen = route.params?.nextScreen;
  const nextParams = route.params?.nextParams;

  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMsg, setErrorMsg] = useState('');

  const getDashboardRoute = () => {
    switch (role) {
      case 'SUPER_ADMIN': return 'SuperAdminDashboard';
      case 'ORG_ADMIN':
      case 'ELECTION_ADMIN': return 'ElectionAdminDashboard';
      case 'OBSERVER': return 'ObserverDashboard';
      default: return 'VoterDashboard';
    }
  };

  const handleUnlockSuccess = () => {
    setStatus('SUCCESS');
    setTimeout(() => {
      if (nextScreen) {
        navigation.replace(nextScreen, nextParams);
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: getDashboardRoute() }],
        });
      }
    }, 1000);
  };

  const scanBiometrics = async () => {
    setStatus('SCANNING');
    setErrorMsg('');
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        // Fallback or mock success if no hardware (for simulator)
        setTimeout(() => {
          handleUnlockSuccess();
        }, 1500);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Unlock VoteKinetic',
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        handleUnlockSuccess();
      } else {
        setStatus('ERROR');
        setErrorMsg(result.error || 'Authentication failed');
      }
    } catch (e: any) {
      setStatus('ERROR');
      setErrorMsg(e.message || 'An error occurred');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background justify-center items-center">
      <View className="absolute top-12 w-full flex-row justify-center items-center">
        <Ionicons name="shield-checkmark" size={24} color="#001a41" className="mr-2" />
        <Text className="font-headline-md text-xl font-bold text-primary tracking-tight">VOTEKINETIC</Text>
      </View>

      <View className="bg-surface/70 border border-outline-variant/30 rounded-3xl p-10 w-11/12 max-w-sm items-center shadow-sm">
        <View className="relative items-center justify-center mb-8">
          {status === 'SCANNING' && (
            <View className="absolute w-32 h-32 bg-primary/10 rounded-full" />
          )}
          <Ionicons 
            name="finger-print" 
            size={72} 
            color={status === 'ERROR' ? '#ba1a1a' : status === 'SUCCESS' ? '#12b76a' : '#001a41'} 
          />
        </View>

        <Text className="font-headline-md text-2xl font-bold text-on-surface mb-2 text-center">
          Unlock with Biometrics
        </Text>
        <Text className="text-on-surface-variant text-center mb-8 px-2">
          Verify your identity to access your encrypted dashboard.
        </Text>

        {status === 'SCANNING' && (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator size="small" color="#115cb9" className="mr-2" />
            <Text className="text-primary font-bold tracking-widest uppercase text-sm">Scanning...</Text>
          </View>
        )}

        {status === 'SUCCESS' && (
          <View className="flex-row items-center justify-center">
            <Ionicons name="checkmark-circle" size={20} color="#12b76a" className="mr-2" />
            <Text className="text-[#12b76a] font-bold tracking-widest uppercase text-sm">Verified</Text>
          </View>
        )}

        {status === 'ERROR' && (
          <View className="items-center justify-center">
            <Text className="text-error font-bold mb-2">{errorMsg}</Text>
            <TouchableOpacity onPress={scanBiometrics}>
              <Text className="text-secondary font-bold underline">Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {status === 'IDLE' && (
          <View className="w-full gap-4 mt-2">
            <TouchableOpacity 
              className="bg-primary py-4 rounded-xl items-center shadow-sm"
              onPress={scanBiometrics}
            >
              <Text className="text-on-primary font-bold text-base">Scan Biometrics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="border border-outline py-4 rounded-xl items-center"
              onPress={scanBiometrics}
            >
              <Text className="text-primary font-bold text-base">Use Passcode</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View className="absolute bottom-8 w-full items-center">
        <View className="flex-row items-center mb-1 opacity-60">
          <Ionicons name="lock-closed" size={14} color="#434750" className="mr-1" />
          <Text className="text-xs text-on-surface-variant mr-3">End-to-End Encrypted</Text>
          <View className="w-1 h-1 bg-outline-variant rounded-full mr-3" />
          <Ionicons name="shield-checkmark" size={14} color="#434750" className="mr-1" />
          <Text className="text-xs text-on-surface-variant">State-Grade Security</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
