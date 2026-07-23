import React from 'react';
import './global.css';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth, UserRole } from './src/context/AuthContext';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { VoterDashboardScreen } from './src/screens/voter/VoterDashboardScreen';
import { ActivityIndicator, View, Text } from 'react-native';

import { SplashScreen } from './src/screens/auth/SplashScreen';
import { WelcomeScreen } from './src/screens/auth/WelcomeScreen';
import { SignUpScreen } from './src/screens/auth/SignUpScreen';
import { ForgotPasswordScreen } from './src/screens/auth/ForgotPasswordScreen';
import { ResetPasswordScreen } from './src/screens/auth/ResetPasswordScreen';
import { BiometricSetupScreen } from './src/screens/settings/BiometricSetupScreen';
import { EmailVerificationScreen } from './src/screens/auth/EmailVerificationScreen';
import { ElectionsListScreen } from './src/screens/voter/ElectionsListScreen';
import { ElectionDetailsScreen } from './src/screens/voter/ElectionDetailsScreen';
import { BallotScreen } from './src/screens/voter/BallotScreen';
import { VoteReviewScreen } from './src/screens/voter/VoteReviewScreen';
import { VoteReceiptScreen } from './src/screens/voter/VoteReceiptScreen';
import { VoterProfileScreen } from './src/screens/voter/VoterProfileScreen';
import { IdentityVerifiedScreen } from './src/screens/voter/IdentityVerifiedScreen';
import { VerificationStatusScreen } from './src/screens/voter/VerificationStatusScreen';
import { EligibilityStatusScreen } from './src/screens/voter/EligibilityStatusScreen';
import { SecuritySessionManagementScreen } from './src/screens/settings/SecuritySessionManagementScreen';
import { NotificationsInboxScreen } from './src/screens/shared/NotificationsInboxScreen';
import { NotificationDetailsScreen } from './src/screens/shared/NotificationDetailsScreen';
import { ReminderSchedulingScreen } from './src/screens/admin/ReminderSchedulingScreen';
import { VoterActivityLogsScreen } from './src/screens/voter/VoterActivityLogsScreen';
import { TurnoutAnalyticsScreen } from './src/screens/admin/TurnoutAnalyticsScreen';
import { LiveTurnoutScreen } from './src/screens/voter/LiveTurnoutScreen';
import { OrganizationOverviewScreen } from './src/screens/admin/OrganizationOverviewScreen';
import { OrganizationSettingsScreen } from './src/screens/admin/OrganizationSettingsScreen';
import { OrganizationMembersScreen } from './src/screens/admin/OrganizationMembersScreen';
import { OrganizationSelectionScreen } from './src/screens/admin/OrganizationSelectionScreen';
import { SuperAdminDashboardScreen } from './src/screens/superadmin/SuperAdminDashboardScreen';
import { PlatformSettingsScreen } from './src/screens/superadmin/PlatformSettingsScreen';
import { ElectionAdminDashboardScreen } from './src/screens/admin/ElectionAdminDashboardScreen';
import { CreateElectionBasicInfoScreen } from './src/screens/admin/CreateElectionBasicInfoScreen';
import { CreateElectionScheduleScreen } from './src/screens/admin/CreateElectionScheduleScreen';
import { CreateElectionVotingTypeScreen } from './src/screens/admin/CreateElectionVotingTypeScreen';
import { CreateElectionEligibilityRulesScreen } from './src/screens/admin/CreateElectionEligibilityRulesScreen';
import { CreateElectionSecuritySettingsScreen } from './src/screens/admin/CreateElectionSecuritySettingsScreen';
import { CreateElectionPreviewScreen } from './src/screens/admin/CreateElectionPreviewScreen';
import { CandidateListScreen } from './src/screens/admin/CandidateListScreen';
import { ObserverDashboardScreen } from './src/screens/observer/ObserverDashboardScreen';
import { AuditLedgerScreen } from './src/screens/observer/AuditLedgerScreen';
import { AccessDeniedScreen } from './src/screens/shared/AccessDeniedScreen';
import { AccountDisabledScreen } from './src/screens/shared/AccountDisabledScreen';
import { AlreadyVotedScreen } from './src/screens/shared/AlreadyVotedScreen';
import { SystemMaintenanceScreen } from './src/screens/shared/SystemMaintenanceScreen';
import { EditElectionScreen } from './src/screens/admin/EditElectionScreen';
import { ElectionCountdownScreen } from './src/screens/voter/ElectionCountdownScreen';
import { ElectionClosedScreen } from './src/screens/voter/ElectionClosedScreen';
import { AdminActionLogsScreen } from './src/screens/superadmin/AdminActionLogsScreen';
import { AuditLogsOverviewScreen } from './src/screens/observer/AuditLogsOverviewScreen';
import { ElectionResultsOverviewScreen } from './src/screens/voter/ElectionResultsOverviewScreen';
import { ElectionStatusHistoryScreen } from './src/screens/voter/ElectionStatusHistoryScreen';
import { InstitutionalIntegritySystemScreen } from './src/screens/superadmin/InstitutionalIntegritySystemScreen';
import { OrganizationDetailsSuperAdminScreen } from './src/screens/superadmin/OrganizationDetailsSuperAdminScreen';
import { PlatformSystemHealthScreen } from './src/screens/superadmin/PlatformSystemHealthScreen';
import { BiometricUnlockScreen } from './src/screens/settings/BiometricUnlockScreen';
import { NotificationDetailsScreen } from './src/screens/shared/NotificationDetailsScreen';
import { NotificationsInboxScreen } from './src/screens/shared/NotificationsInboxScreen';
import { ProfileOverviewScreen } from './src/screens/settings/ProfileOverviewScreen';
import { ResultExportScreen } from './src/screens/voter/ResultExportScreen';
import { ResultVerificationInfoScreen } from './src/screens/voter/ResultVerificationInfoScreen';
import { SecuritySessionManagementScreen } from './src/screens/settings/SecuritySessionManagementScreen';
import { SyncStatusScreen } from './src/screens/shared/SyncStatusScreen';
import { VoteLifecycleTraceAnonymousScreen } from './src/screens/voter/VoteLifecycleTraceAnonymousScreen';
import { VoterActivityLogsScreen } from './src/screens/voter/VoterActivityLogsScreen';
import { VoterProfileScreen } from './src/screens/voter/VoterProfileScreen';

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
