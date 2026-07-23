import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const FeatureFlagsSuperAdminScreen = () => {
  const navigation = useNavigation<any>();
  
  const [flags, setFlags] = useState({
    enableBiometrics: true,
    enableRankedChoice: false,
    enableBlockchainSync: true,
    enableAbuseDetection: true,
    maintenanceMode: false
  });

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Feature Flags</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-error-container border border-error rounded-xl p-4 mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="warning" size={16} color="#ffb4ab" className="mr-2" />
            <Text className="text-error font-bold text-sm">Super Admin Only</Text>
          </View>
          <Text className="text-on-error-container text-xs leading-relaxed">
            Changing these flags will globally affect all organizations and elections on the platform. Proceed with extreme caution.
          </Text>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4">Core Platform Features</Text>
        
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-3 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="text-on-surface font-bold text-base mb-1">Biometric Authentication</Text>
            <Text className="text-on-surface-variant text-xs">Require local device biometrics before ballot encryption.</Text>
          </View>
          <Switch 
            value={flags.enableBiometrics} 
            onValueChange={() => toggleFlag('enableBiometrics')}
            trackColor={{ false: '#44474e', true: '#00639b' }}
            thumbColor={flags.enableBiometrics ? '#ffffff' : '#939aa1'}
          />
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-3 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="text-on-surface font-bold text-base mb-1">Ranked Choice Voting</Text>
            <Text className="text-on-surface-variant text-xs">Enable IRV (Instant Runoff Voting) as an election type option.</Text>
          </View>
          <Switch 
            value={flags.enableRankedChoice} 
            onValueChange={() => toggleFlag('enableRankedChoice')}
            trackColor={{ false: '#44474e', true: '#00639b' }}
            thumbColor={flags.enableRankedChoice ? '#ffffff' : '#939aa1'}
          />
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4 mt-6">Infrastructure</Text>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-3 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="text-on-surface font-bold text-base mb-1">Blockchain Ledger Sync</Text>
            <Text className="text-on-surface-variant text-xs">Mirror encrypted tallies to decentralized ledger for public audit.</Text>
          </View>
          <Switch 
            value={flags.enableBlockchainSync} 
            onValueChange={() => toggleFlag('enableBlockchainSync')}
            trackColor={{ false: '#44474e', true: '#00639b' }}
            thumbColor={flags.enableBlockchainSync ? '#ffffff' : '#939aa1'}
          />
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-3 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="text-on-surface font-bold text-base mb-1">Automated Abuse Detection</Text>
            <Text className="text-on-surface-variant text-xs">Run ML heuristics to flag suspicious voting patterns.</Text>
          </View>
          <Switch 
            value={flags.enableAbuseDetection} 
            onValueChange={() => toggleFlag('enableAbuseDetection')}
            trackColor={{ false: '#44474e', true: '#00639b' }}
            thumbColor={flags.enableAbuseDetection ? '#ffffff' : '#939aa1'}
          />
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-4 mt-6">Emergency Controls</Text>

        <View className="bg-surface-container-lowest border border-error rounded-xl p-4 mb-3 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="text-error font-bold text-base mb-1">Maintenance Mode</Text>
            <Text className="text-on-surface-variant text-xs">Block all non-admin access and pause all active elections.</Text>
          </View>
          <Switch 
            value={flags.maintenanceMode} 
            onValueChange={() => toggleFlag('maintenanceMode')}
            trackColor={{ false: '#44474e', true: '#ffb4ab' }}
            thumbColor={flags.maintenanceMode ? '#ba1a1a' : '#939aa1'}
          />
        </View>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
