const fs = require('fs');
const path = require('path');

const mobileScreens = [
  'AbuseDetectionScreen',
  'AccessibilityLanguageScreen',
  'AddCandidateScreen',
  'AdminBroadcastCreationScreen',
  'AppUpdateRequiredScreen',
  'ArchiveDeleteElectionScreen',
  'AuditLogsOverviewScreen',
  'BlockVoterConfirmationScreen',
  'BroadcastHistoryScreen',
  'CandidateDetailsScreen',
  'CandidateOrderingRulesScreen',
  'CandidateProfilePreviewScreen',
  'ChartsGraphsViewScreen',
  'ComplianceDataRetentionScreen',
  'CreateElectionBasicInfoScreen',
  'CreateElectionEligibilityRulesScreen',
  'CreateElectionPreviewScreen',
  'CreateElectionScheduleScreen',
  'CreateElectionSecuritySettingsScreen',
  'CreateElectionVotingTypeScreen',
  'CreateOrganizationSuperAdminScreen',
  'DetailedResultsBreakdownScreen',
  'DuplicateElectionConfirmationScreen',
  'EditCandidateScreen',
  'ElectionDetailsPreStartScreen',
  'ElectionResultsOverviewScreen',
  'ElectionRulesInstructionsScreen',
  'ElectionStatusHistoryScreen',
  'FeatureFlagsSuperAdminScreen',
  'GlobalMetricsScreen',
  'ImportVotersUploadScreen',
  'InstitutionalIntegritySystemScreen',
  'LiveElectionMonitoringScreen',
  'LogoutConfirmationScreen',
  'ManualAddVoterScreen',
  'ObserverAuditViewScreen',
  'ObserverElectionListScreen',
  'ObserverResultsViewScreen',
  'OfflineModeVoteQueueScreen',
  'OrganizationBillingSuperAdminScreen',
  'OrganizationDetailsSuperAdminScreen',
  'OrganizationListSuperAdminScreen',
  'RankedChoiceOrderingScreen',
  'ResultExportScreen',
  'ResultIntegrityVerificationScreen',
  'ResultVerificationInfoScreen',
  'SyncStatusScreen',
  'TallyAuditViewScreen',
  'VoteConfirmationWarningScreen',
  'VoteLifecycleTraceAnonymousScreen',
  'VoteSubmittedSuccessScreen',
  'VotingTokenIssuedScreen'
];

const mobileDir = path.join(__dirname, 'mobile', 'src', 'screens');

mobileScreens.forEach(screenName => {
  const filePath = path.join(mobileDir, `${screenName}.tsx`);
  if (!fs.existsSync(filePath)) {
    const content = `import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const ${screenName} = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#aec6ff" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-primary flex-1 text-center mr-8">${screenName.replace('Screen', '')}</Text>
      </View>
      <View className="flex-1 items-center justify-center p-4">
        <Ionicons name="construct-outline" size={64} color="#939aa1" className="mb-4" />
        <Text className="text-xl font-bold text-on-surface mb-2">Under Construction</Text>
        <Text className="text-on-surface-variant text-center">
          This screen (${screenName}) has been generated and is pending full implementation.
        </Text>
      </View>
    </SafeAreaView>
  );
};
`;
    fs.writeFileSync(filePath, content);
    console.log(`Created ${screenName}.tsx`);
  }
});
