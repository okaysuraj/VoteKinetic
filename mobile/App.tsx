import React from 'react';
import './global.css';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth, UserRole } from './src/context/AuthContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { VoterDashboardScreen } from './src/screens/VoterDashboardScreen';
import { ActivityIndicator, View, Text } from 'react-native';

import { SplashScreen } from './src/screens/SplashScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { ResetPasswordScreen } from './src/screens/ResetPasswordScreen';
import { BiometricSetupScreen } from './src/screens/BiometricSetupScreen';
import { EmailVerificationScreen } from './src/screens/EmailVerificationScreen';
import { ElectionsListScreen } from './src/screens/ElectionsListScreen';
import { ElectionDetailsScreen } from './src/screens/ElectionDetailsScreen';
import { BallotScreen } from './src/screens/BallotScreen';
import { VoteReviewScreen } from './src/screens/VoteReviewScreen';
import { VoteReceiptScreen } from './src/screens/VoteReceiptScreen';
import { VoterProfileScreen } from './src/screens/VoterProfileScreen';
import { IdentityVerifiedScreen } from './src/screens/IdentityVerifiedScreen';
import { VerificationStatusScreen } from './src/screens/VerificationStatusScreen';
import { EligibilityStatusScreen } from './src/screens/EligibilityStatusScreen';
import { SecuritySessionManagementScreen } from './src/screens/SecuritySessionManagementScreen';
import { NotificationsInboxScreen } from './src/screens/NotificationsInboxScreen';
import { NotificationDetailsScreen } from './src/screens/NotificationDetailsScreen';
import { ReminderSchedulingScreen } from './src/screens/ReminderSchedulingScreen';
import { VoterActivityLogsScreen } from './src/screens/VoterActivityLogsScreen';
import { TurnoutAnalyticsScreen } from './src/screens/TurnoutAnalyticsScreen';
import { LiveTurnoutScreen } from './src/screens/LiveTurnoutScreen';
import { OrganizationOverviewScreen } from './src/screens/OrganizationOverviewScreen';
import { OrganizationSettingsScreen } from './src/screens/OrganizationSettingsScreen';
import { OrganizationMembersScreen } from './src/screens/OrganizationMembersScreen';
import { OrganizationSelectionScreen } from './src/screens/OrganizationSelectionScreen';
import { SuperAdminDashboardScreen } from './src/screens/SuperAdminDashboardScreen';
import { PlatformSettingsScreen } from './src/screens/PlatformSettingsScreen';
import { ElectionAdminDashboardScreen } from './src/screens/ElectionAdminDashboardScreen';
import { CreateElectionBasicInfoScreen } from './src/screens/CreateElectionBasicInfoScreen';
import { CreateElectionScheduleScreen } from './src/screens/CreateElectionScheduleScreen';
import { CreateElectionVotingTypeScreen } from './src/screens/CreateElectionVotingTypeScreen';
import { CreateElectionEligibilityRulesScreen } from './src/screens/CreateElectionEligibilityRulesScreen';
import { CreateElectionSecuritySettingsScreen } from './src/screens/CreateElectionSecuritySettingsScreen';
import { CreateElectionPreviewScreen } from './src/screens/CreateElectionPreviewScreen';
import { CandidateListScreen } from './src/screens/CandidateListScreen';
import { ObserverDashboardScreen } from './src/screens/ObserverDashboardScreen';
import { AuditLedgerScreen } from './src/screens/AuditLedgerScreen';
import { AccessDeniedScreen } from './src/screens/AccessDeniedScreen';
import { AccountDisabledScreen } from './src/screens/AccountDisabledScreen';
import { AlreadyVotedScreen } from './src/screens/AlreadyVotedScreen';
import { SystemMaintenanceScreen } from './src/screens/SystemMaintenanceScreen';
import { EditElectionScreen } from './src/screens/EditElectionScreen';
import { ElectionCountdownScreen } from './src/screens/ElectionCountdownScreen';
import { ElectionClosedScreen } from './src/screens/ElectionClosedScreen';
import { AdminActionLogsScreen } from './src/screens/AdminActionLogsScreen';
import { AuditLogsOverviewScreen } from './src/screens/AuditLogsOverviewScreen';
import { ElectionResultsOverviewScreen } from './src/screens/ElectionResultsOverviewScreen';
import { ElectionStatusHistoryScreen } from './src/screens/ElectionStatusHistoryScreen';
import { InstitutionalIntegritySystemScreen } from './src/screens/InstitutionalIntegritySystemScreen';
import { OrganizationDetailsSuperAdminScreen } from './src/screens/OrganizationDetailsSuperAdminScreen';
import { PlatformSystemHealthScreen } from './src/screens/PlatformSystemHealthScreen';
import { BiometricUnlockScreen } from './src/screens/BiometricUnlockScreen';
import { NotificationDetailsScreen } from './src/screens/NotificationDetailsScreen';
import { NotificationsInboxScreen } from './src/screens/NotificationsInboxScreen';
import { ProfileOverviewScreen } from './src/screens/ProfileOverviewScreen';
import { ResultExportScreen } from './src/screens/ResultExportScreen';
import { ResultVerificationInfoScreen } from './src/screens/ResultVerificationInfoScreen';
import { SecuritySessionManagementScreen } from './src/screens/SecuritySessionManagementScreen';
import { SyncStatusScreen } from './src/screens/SyncStatusScreen';
import { VoteLifecycleTraceAnonymousScreen } from './src/screens/VoteLifecycleTraceAnonymousScreen';
import { VoterActivityLogsScreen } from './src/screens/VoterActivityLogsScreen';
import { VoterProfileScreen } from './src/screens/VoterProfileScreen';

// ============================================================
// TYPE-SAFE NAVIGATION PARAMS
// ============================================================
export type RootStackParamList = {
  // Auth (unauthenticated)
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email?: string };
  EmailVerification: { email?: string };

  SystemMaintenance: undefined;
  AccountDisabled: undefined;
  AccessDenied: undefined;
  EditElection: { electionId: string };
  ElectionCountdown: { electionId: string };
  ElectionClosed: { electionId: string };

  // Voter / User Flows
  BiometricUnlock: undefined;
  NotificationDetails: { notificationId: string };
  NotificationsInbox: undefined;
  ProfileOverview: undefined;
  ResultExport: { electionId: string };
  ResultVerificationInfo: { electionId: string };
  SecuritySessionManagement: undefined;
  SyncStatus: undefined;
  VoteLifecycleTraceAnonymous: { receipt: string };
  VoterActivityLogs: undefined;
  VoterProfile: undefined;
  Ballot: { electionId: string };
  VoteReview: { electionId: string; candidateId: string; encryptedPayload?: string; token?: string };
  VoteReceipt: { receiptHash: string; electionTitle?: string };
  IdentityVerified: undefined;
  VerificationStatus: undefined;
  EligibilityStatus: { electionId?: string };

  // Shared authenticated screens
  BiometricSetup: undefined;
  OrganizationSelection: undefined;
  OrganizationOverview: { organizationId: string };

  // Admin screens (ORG_ADMIN, ELECTION_ADMIN, SUPER_ADMIN)
  ElectionAdminDashboard: undefined;
  CreateElectionBasicInfo: { organizationId?: string };
  CreateElectionSchedule: { electionData: any };
  CreateElectionVotingType: { electionData: any };
  CreateElectionEligibilityRules: { electionData: any };
  CreateElectionSecuritySettings: { electionData: any };
  CreateElectionPreview: { electionData: any };
  CandidateList: { electionId: string };
  OrganizationSettings: { organizationId: string };
  OrganizationMembers: { organizationId: string };
  ReminderScheduling: { electionId?: string };
  TurnoutAnalytics: { electionId?: string };
  LiveTurnout: { electionId?: string };

  // Super Admin screens
  SuperAdminDashboard: undefined;
  PlatformSettings: undefined;
  AdminActionLogs: undefined;
  AuditLogsOverview: undefined;
  ElectionResultsOverview: { electionId: string };
  ElectionStatusHistory: { electionId: string };
  InstitutionalIntegritySystem: undefined;
  OrganizationDetailsSuperAdmin: { organizationId: string };
  PlatformSystemHealth: undefined;

  // Observer screens
  ObserverDashboard: undefined;
  AuditLedger: { electionId?: string };

  // Error / state screens
  AlreadyVoted: { electionId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// ============================================================
// ROLE GUARD HELPERS
// ============================================================
const ADMIN_ROLES: UserRole[] = ['SUPER_ADMIN', 'ORG_ADMIN', 'ELECTION_ADMIN'];
const SUPER_ADMIN_ROLES: UserRole[] = ['SUPER_ADMIN'];
const OBSERVER_ROLES: UserRole[] = ['OBSERVER', 'SUPER_ADMIN'];

/**
 * Returns the appropriate initial screen based on the user's role.
 */
function getInitialScreen(role: UserRole): keyof RootStackParamList {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'SuperAdminDashboard';
    case 'ORG_ADMIN':
    case 'ELECTION_ADMIN':
      return 'ElectionAdminDashboard';
    case 'OBSERVER':
      return 'ObserverDashboard';
    case 'AUDITOR':
    case 'VOTER':
    default:
      return 'VoterDashboard';
  }
}

const AppNavigator = () => {
  const { user, loading, role } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0a' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ color: '#6b7280', marginTop: 12, fontSize: 14 }}>Verifying identity...</Text>
      </View>
    );
  }

  const initialScreen = user ? getInitialScreen(role) : 'Splash';
  const isAdmin = role && ADMIN_ROLES.includes(role);
  const isSuperAdmin = role && SUPER_ADMIN_ROLES.includes(role);
  const isObserver = role && OBSERVER_ROLES.includes(role);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          <>
            {/* ── Error / State screens (available to all roles) ── */}
            <Stack.Screen name="AccessDenied" component={AccessDeniedScreen} />
            <Stack.Screen name="AccountDisabled" component={AccountDisabledScreen} />
            <Stack.Screen name="AlreadyVoted" component={AlreadyVotedScreen} />
            <Stack.Screen name="SystemMaintenance" component={SystemMaintenanceScreen} />

            {/* ── Shared authenticated screens ── */}
            <Stack.Screen name="BiometricSetup" component={BiometricSetupScreen} />
            <Stack.Screen name="SecuritySessionManagement" component={SecuritySessionManagementScreen} />
            <Stack.Screen name="OrganizationSelection" component={OrganizationSelectionScreen} />
            <Stack.Screen name="OrganizationOverview" component={OrganizationOverviewScreen} />
            <Stack.Screen name="NotificationDetails" component={NotificationDetailsScreen} />

            {/* ── Voter screens (available to all authenticated users) ── */}
            <Stack.Screen name="VoterDashboard" component={VoterDashboardScreen} />
            <Stack.Screen name="ElectionsList" component={ElectionsListScreen} />
            <Stack.Screen name="ElectionDetails" component={ElectionDetailsScreen} />
            <Stack.Screen name="ElectionCountdown" component={ElectionCountdownScreen} />
            <Stack.Screen name="ElectionClosed" component={ElectionClosedScreen} />
            <Stack.Screen name="BiometricUnlock" component={BiometricUnlockScreen} />
            <Stack.Screen name="NotificationsInbox" component={NotificationsInboxScreen} />
            <Stack.Screen name="ProfileOverview" component={ProfileOverviewScreen} />
            <Stack.Screen name="ResultExport" component={ResultExportScreen} />
            <Stack.Screen name="ResultVerificationInfo" component={ResultVerificationInfoScreen} />
            <Stack.Screen name="SyncStatus" component={SyncStatusScreen} />
            <Stack.Screen name="VoteLifecycleTraceAnonymous" component={VoteLifecycleTraceAnonymousScreen} />
            <Stack.Screen name="Ballot" component={BallotScreen} />
            <Stack.Screen name="VoteReview" component={VoteReviewScreen} />
            <Stack.Screen name="VoteReceipt" component={VoteReceiptScreen} />
            <Stack.Screen name="VoterProfile" component={VoterProfileScreen} />
            <Stack.Screen name="IdentityVerified" component={IdentityVerifiedScreen} />
            <Stack.Screen name="VerificationStatus" component={VerificationStatusScreen} />
            <Stack.Screen name="EligibilityStatus" component={EligibilityStatusScreen} />
            <Stack.Screen name="VoterActivityLogs" component={VoterActivityLogsScreen} />

            {/* ── Admin screens (ORG_ADMIN, ELECTION_ADMIN, SUPER_ADMIN) ── */}
            {isAdmin && (
              <>
                <Stack.Screen name="ElectionAdminDashboard" component={ElectionAdminDashboardScreen} />
                {/* Create Election Wizard */}
            <Stack.Screen name="CreateElectionBasicInfo" component={CreateElectionBasicInfoScreen} />
            <Stack.Screen name="CreateElectionSchedule" component={CreateElectionScheduleScreen} />
            <Stack.Screen name="CreateElectionVotingType" component={CreateElectionVotingTypeScreen} />
            <Stack.Screen name="CreateElectionEligibilityRules" component={CreateElectionEligibilityRulesScreen} />
            <Stack.Screen name="CreateElectionSecuritySettings" component={CreateElectionSecuritySettingsScreen} />
            <Stack.Screen name="CreateElectionPreview" component={CreateElectionPreviewScreen} />
                <Stack.Screen name="EditElection" component={EditElectionScreen} />
                <Stack.Screen name="CandidateList" component={CandidateListScreen} />
                <Stack.Screen name="OrganizationSettings" component={OrganizationSettingsScreen} />
                <Stack.Screen name="OrganizationMembers" component={OrganizationMembersScreen} />
                <Stack.Screen name="ReminderScheduling" component={ReminderSchedulingScreen} />
                <Stack.Screen name="TurnoutAnalytics" component={TurnoutAnalyticsScreen} />
                <Stack.Screen name="LiveTurnout" component={LiveTurnoutScreen} />
              </>
            )}

            {/* ── Super Admin screens ── */}
            {isSuperAdmin && (
              <>
                <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboardScreen} />
                <Stack.Screen name="PlatformSettings" component={PlatformSettingsScreen} />
                <Stack.Screen name="AdminActionLogs" component={AdminActionLogsScreen} />
                <Stack.Screen name="AuditLogsOverview" component={AuditLogsOverviewScreen} />
                <Stack.Screen name="ElectionResultsOverview" component={ElectionResultsOverviewScreen} />
                <Stack.Screen name="ElectionStatusHistory" component={ElectionStatusHistoryScreen} />
                <Stack.Screen name="InstitutionalIntegritySystem" component={InstitutionalIntegritySystemScreen} />
                <Stack.Screen name="OrganizationDetailsSuperAdmin" component={OrganizationDetailsSuperAdminScreen} />
                <Stack.Screen name="PlatformSystemHealth" component={PlatformSystemHealthScreen} />
              </>
            )}

            {/* ── Observer screens ── */}
            {isObserver && (
              <>
                <Stack.Screen name="ObserverDashboard" component={ObserverDashboardScreen} />
                <Stack.Screen name="AuditLedger" component={AuditLedgerScreen} />
              </>
            )}
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <StatusBar style="light" />
    </AuthProvider>
  );
}
