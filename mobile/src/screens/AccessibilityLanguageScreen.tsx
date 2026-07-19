import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const AccessibilityLanguageScreen = () => {
  const navigation = useNavigation<any>();
  
  const [language, setLanguage] = useState('en');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Accessibility</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-3">Language</Text>
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl mb-6 overflow-hidden">
          <TouchableOpacity 
            className="flex-row justify-between items-center p-4 border-b border-outline-variant/30"
            onPress={() => setLanguage('en')}
          >
            <Text className="text-on-surface font-bold">English (US)</Text>
            {language === 'en' && <Ionicons name="checkmark" size={20} color="#00639b" />}
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-row justify-between items-center p-4 border-b border-outline-variant/30"
            onPress={() => setLanguage('es')}
          >
            <Text className="text-on-surface font-bold">Español</Text>
            {language === 'es' && <Ionicons name="checkmark" size={20} color="#00639b" />}
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-row justify-between items-center p-4"
            onPress={() => setLanguage('fr')}
          >
            <Text className="text-on-surface font-bold">Français</Text>
            {language === 'fr' && <Ionicons name="checkmark" size={20} color="#00639b" />}
          </TouchableOpacity>
        </View>

        <Text className="text-on-surface-variant font-bold uppercase tracking-wider text-xs mb-3">Visual Settings</Text>
        
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-3 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="text-on-surface font-bold text-base mb-1">High Contrast</Text>
            <Text className="text-on-surface-variant text-xs">Increase contrast ratio for better readability.</Text>
          </View>
          <Switch 
            value={highContrast} 
            onValueChange={setHighContrast}
            trackColor={{ false: '#44474e', true: '#00639b' }}
            thumbColor={highContrast ? '#ffffff' : '#939aa1'}
          />
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-3 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="text-on-surface font-bold text-base mb-1">Large Text</Text>
            <Text className="text-on-surface-variant text-xs">Scale up text size globally.</Text>
          </View>
          <Switch 
            value={largeText} 
            onValueChange={setLargeText}
            trackColor={{ false: '#44474e', true: '#00639b' }}
            thumbColor={largeText ? '#ffffff' : '#939aa1'}
          />
        </View>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
