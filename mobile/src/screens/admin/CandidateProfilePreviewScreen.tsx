import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const CandidateProfilePreviewScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const candidate = route.params?.candidate || { name: 'Unknown', bio: '', platform: [] };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="close" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">Preview Profile</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-secondary-container border border-secondary rounded-xl p-3 mb-6 flex-row items-center justify-center">
          <Ionicons name="eye" size={16} color="#003354" className="mr-2" />
          <Text className="text-on-secondary-container font-bold text-sm">This is how voters will see this profile.</Text>
        </View>

        <View className="items-center mb-6">
          <View className="w-32 h-32 rounded-full bg-surface-container-high border-4 border-surface items-center justify-center mb-4 shadow-sm overflow-hidden">
            <Ionicons name="person" size={64} color="#939aa1" />
          </View>
          <Text className="text-2xl font-bold text-on-surface">{candidate.name}</Text>
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 mb-6 shadow-sm">
          <Text className="text-primary font-bold mb-2 flex-row items-center">
            <Ionicons name="document-text-outline" size={16} color="#00639b" /> Biography
          </Text>
          <Text className="text-on-surface-variant leading-relaxed">
            {candidate.bio}
          </Text>
        </View>

        <View className="bg-surface-container border border-outline-variant rounded-xl p-5 mb-6">
          <Text className="text-primary font-bold mb-3 flex-row items-center">
            <Ionicons name="flag-outline" size={16} color="#00639b" /> Platform
          </Text>
          {candidate.platform.map((goal, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <View className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-3" />
              <Text className="text-on-surface-variant flex-1 leading-relaxed">{goal}</Text>
            </View>
          ))}
        </View>

        <View className="h-24" />
      </ScrollView>

      <View className="p-4 border-t border-outline-variant bg-surface">
        <TouchableOpacity 
          className="bg-primary py-4 rounded-xl flex-row items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="checkmark" size={20} color="#ffffff" className="mr-2" />
          <Text className="font-bold text-white">Looks Good</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
