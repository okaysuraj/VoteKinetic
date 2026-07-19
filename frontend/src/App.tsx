import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { VerificationStatus } from './pages/VerificationStatus';
import { VoterDashboard } from './pages/VoterDashboard';
import { ElectionsList } from './pages/ElectionsList';
import { ElectionDetails } from './pages/ElectionDetails';
import { Ballot } from './pages/Ballot';
import { VoteReview } from './pages/VoteReview';
import { VoteReceipt } from './pages/VoteReceipt';
import { VoterProfile } from './pages/voter/VoterProfile';
import { VoterActivityLogs } from './pages/voter/VoterActivityLogs';
import { Notifications } from './pages/voter/Notifications';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { EmailVerification } from './pages/auth/EmailVerification';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CreateElection } from './pages/admin/CreateElection';
import { CreateElectionBasicInfo } from './pages/admin/CreateElectionBasicInfo';
import { CreateElectionEligibilityRules } from './pages/admin/CreateElectionEligibilityRules';
import { CreateElectionPreview } from './pages/admin/CreateElectionPreview';
import { CreateElectionSchedule } from './pages/admin/CreateElectionSchedule';
import { CreateElectionSecuritySettings } from './pages/admin/CreateElectionSecuritySettings';
import { CreateElectionVotingType } from './pages/admin/CreateElectionVotingType';
import { SuperAdminPlatformDashboard } from './pages/super-admin/SuperAdminPlatformDashboard';
import { OrganizationListSuperAdmin } from './pages/super-admin/OrganizationListSuperAdmin';
import { CreateOrganizationSuperAdmin } from './pages/super-admin/CreateOrganizationSuperAdmin';
import { OrganizationDetailsSuperAdmin } from './pages/super-admin/OrganizationDetailsSuperAdmin';
import { OrganizationBillingSuperAdmin } from './pages/super-admin/OrganizationBillingSuperAdmin';
import { PlatformSystemHealth } from './pages/super-admin/PlatformSystemHealth';
import { GlobalMetrics } from './pages/super-admin/GlobalMetrics';
import { FeatureFlagsSuperAdmin } from './pages/super-admin/FeatureFlagsSuperAdmin';
import { AuditLogsOverview } from './pages/super-admin/AuditLogsOverview';
import { AdminActionLogs } from './pages/super-admin/AdminActionLogs';
import { InstitutionalIntegritySystem } from './pages/super-admin/InstitutionalIntegritySystem';
import { ComplianceDataRetention } from './pages/super-admin/ComplianceDataRetention';
import { SyncStatus } from './pages/super-admin/SyncStatus';
import { AbuseDetection } from './pages/super-admin/AbuseDetection';
import { CandidateList } from './pages/admin/CandidateList';
import { AddCandidate } from './pages/admin/AddCandidate';
import { EditCandidate } from './pages/admin/EditCandidate';
import { CandidateOrderingRules } from './pages/admin/CandidateOrderingRules';
import { CandidateProfilePreview } from './pages/admin/CandidateProfilePreview';
import { ArchiveDeleteElection } from './pages/admin/ArchiveDeleteElection';
import { ImportVotersUpload } from './pages/admin/ImportVotersUpload';
import { ManualAddVoter } from './pages/admin/ManualAddVoter';
import { VoterRegistry } from './pages/admin/VoterRegistry';
import { ProfileOverview } from './pages/voter/ProfileOverview';
import { BlockVoterConfirmation } from './pages/admin/BlockVoterConfirmation';
import { AppUpdateRequired } from './pages/common/AppUpdateRequired';
import { BallotScreen } from './pages/voter/BallotScreen';
import { BiometricSetup } from './pages/voter/BiometricSetup';
import { BiometricUnlock } from './pages/voter/BiometricUnlock';
import { ChartsGraphsView } from './pages/admin/ChartsGraphsView';
import { DetailedResultsBreakdown } from './pages/admin/DetailedResultsBreakdown';
import { DuplicateElectionConfirmation } from './pages/admin/DuplicateElectionConfirmation';
import { ElectionAdminDashboard } from './pages/admin/ElectionAdminDashboard';
import { ElectionClosed } from './pages/voter/ElectionClosed';
import { ElectionDetailsPreStart } from './pages/voter/ElectionDetailsPreStart';
import { ElectionResultsOverview } from './pages/admin/ElectionResultsOverview';
import { ElectionRulesInstructions } from './pages/voter/ElectionRulesInstructions';
import { ElectionStatusHistory } from './pages/admin/ElectionStatusHistory';
import { EligibilityStatus } from './pages/voter/EligibilityStatus';
import { IdentityVerified } from './pages/voter/IdentityVerified';
import { LogoutConfirmation } from './pages/common/LogoutConfirmation';
import { MyElectionsList } from './pages/voter/MyElectionsList';
import { UserDashboard } from './pages/voter/UserDashboard';
import { VoteConfirmationWarning } from './pages/voter/VoteConfirmationWarning';
import { VoteSubmittedSuccess } from './pages/voter/VoteSubmittedSuccess';
import { VotingTokenIssued } from './pages/voter/VotingTokenIssued';
import { NotificationsInbox } from './pages/voter/NotificationsInbox';
import { OrganizationMembers } from './pages/admin/OrganizationMembers';
import { OrganizationOverview } from './pages/admin/OrganizationOverview';
import { OrganizationSelection } from './pages/admin/OrganizationSelection';
import { OrganizationSettings } from './pages/admin/OrganizationSettings';
import { ResultExportScreen } from './pages/admin/ResultExportScreen';
import { SignUp } from './pages/common/SignUp';
import { SplashScreen } from './pages/common/SplashScreen';
import { AdminBroadcastCreation } from './pages/admin/AdminBroadcastCreation';
import { BroadcastHistory } from './pages/admin/BroadcastHistory';
import { LiveElectionMonitoring } from './pages/admin/LiveElectionMonitoring';
import { ElectionCountdown } from './pages/voter/ElectionCountdown';
import { OrgMembers } from './pages/admin/OrgMembers';
import { OrgSettings } from './pages/admin/OrgSettings';
import { LiveTurnout } from './pages/admin/LiveTurnout';
import { TurnoutAnalytics } from './pages/admin/TurnoutAnalytics';
import { ReminderScheduling } from './pages/admin/ReminderScheduling';
import { OrganizationDashboard } from './pages/OrganizationDashboard';
import { SuperAdminDashboard } from './pages/superadmin/SuperAdminDashboard';
import { OrgManagement } from './pages/superadmin/OrgManagement';
import { PlatformSettings } from './pages/superadmin/PlatformSettings';
import { SecurityManagement } from './pages/superadmin/SecurityManagement';
import { ObserverElectionList } from './pages/observer/ObserverElectionList';
import { ObserverAuditView } from './pages/observer/ObserverAuditView';
import { ObserverResultsView } from './pages/observer/ObserverResultsView';
import { TallyAuditView } from './pages/observer/TallyAuditView';

import { SecuritySessionManagement } from './pages/voter/SecuritySessionManagement';
import { RankedChoiceOrdering } from './pages/voter/RankedChoiceOrdering';
import { OfflineModeVoteQueue } from './pages/voter/OfflineModeVoteQueue';
import { AccessibilityLanguage } from './pages/voter/AccessibilityLanguage';
import { ResultIntegrityVerification } from './pages/voter/ResultIntegrityVerification';
import { ResultVerificationInfo } from './pages/voter/ResultVerificationInfo';
import { VoteLifecycleTraceAnonymous } from './pages/voter/VoteLifecycleTraceAnonymous';
import { NotificationDetails } from './pages/voter/NotificationDetails';

import { AccessDenied } from './pages/errors/AccessDenied';
import { SystemMaintenance } from './pages/errors/SystemMaintenance';
import { AccountDisabled } from './pages/errors/AccountDisabled';
import { AlreadyVoted } from './pages/errors/AlreadyVoted';
import { EditElection } from './pages/admin/EditElection';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, role } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const DashboardRouter = () => {
  const { role } = useAuth();
  if (role === 'SUPER_ADMIN') return <Navigate to="/superadmin" replace />;
  if (role === 'ADMIN' || role === 'ORG_ADMIN') return <Navigate to="/admin" replace />;
  if (role === 'OBSERVER') return <Navigate to="/observer" replace />;
  return <Navigate to="/voter" replace />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/verification" element={<VerificationStatus />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            } />

            <Route path="/voter" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <VoterDashboard />
              </ProtectedRoute>
            } />
            <Route path="/voter/elections" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <ElectionsList />
              </ProtectedRoute>
            } />
            <Route path="/voter/elections/:id" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <ElectionDetails />
              </ProtectedRoute>
            } />
            <Route path="/voter/ballot/:id" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <Ballot />
              </ProtectedRoute>
            } />
            <Route path="/voter/review/:id" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <VoteReview />
              </ProtectedRoute>
            } />
            <Route path="/voter/receipt/:id" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <VoteReceipt />
              </ProtectedRoute>
            } />
            <Route path="/voter/profile" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <VoterProfile />
              </ProtectedRoute>
            } />
            <Route path="/voter/logs" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <VoterActivityLogs />
              </ProtectedRoute>
            } />
            <Route path="/voter/notifications" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/voter/notifications/:id" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <NotificationDetails />
              </ProtectedRoute>
            } />

            <Route path="/voter/security" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <SecuritySessionManagement />
              </ProtectedRoute>
            } />
            <Route path="/voter/ranked-choice/:electionId" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <RankedChoiceOrdering />
              </ProtectedRoute>
            } />
            <Route path="/voter/offline-queue" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <OfflineModeVoteQueue />
              </ProtectedRoute>
            } />
            <Route path="/voter/accessibility" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <AccessibilityLanguage />
              </ProtectedRoute>
            } />
            <Route path="/voter/integrity" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <ResultIntegrityVerification />
              </ProtectedRoute>
            } />
            <Route path="/voter/verification" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <ResultVerificationInfo />
              </ProtectedRoute>
            } />
            <Route path="/voter/trace" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <VoteLifecycleTraceAnonymous />
              </ProtectedRoute>
            } />

            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/new" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}><CreateElection /></ProtectedRoute>} />
            <Route path="/admin/elections/new/basic-info" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <CreateElectionBasicInfo />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/new/eligibility" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <CreateElectionEligibilityRules />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/new/preview" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <CreateElectionPreview />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/new/schedule" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <CreateElectionSchedule />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/new/security" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <CreateElectionSecuritySettings />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/new/voting-type" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <CreateElectionVotingType />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/edit/:id" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <EditElection />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/:id/candidates" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <CandidateList />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/:id/candidates/new" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <AddCandidate />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/:id/candidates/:candidateId/edit" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <EditCandidate />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/:id/candidates/ordering" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <CandidateOrderingRules />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/:id/candidates/:candidateId/preview" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <CandidateProfilePreview />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/:id/archive-delete" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <ArchiveDeleteElection />
              </ProtectedRoute>
            } />
            <Route path="/admin/voters/import" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <ImportVotersUpload />
              </ProtectedRoute>
            } />
            <Route path="/admin/voters/new" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <ManualAddVoter />
              </ProtectedRoute>
            } />
            <Route path="/admin/voters" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <VoterRegistry />
              </ProtectedRoute>
            } />
            <Route path="/admin/broadcasts/new" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <AdminBroadcastCreation />
              </ProtectedRoute>
            } />
            <Route path="/admin/broadcasts" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <BroadcastHistory />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/:id/live" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <LiveElectionMonitoring />
              </ProtectedRoute>
            } />
            <Route path="/elections/:id/countdown" element={
              <ProtectedRoute allowedRoles={['VOTER', 'SUPER_ADMIN', 'ORG_ADMIN']}>
                <ElectionCountdown />
              </ProtectedRoute>
            } />
            <Route path="/admin/members" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <OrgMembers />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <OrgSettings />
              </ProtectedRoute>
            } />
            <Route path="/admin/turnout" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <LiveTurnout />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <TurnoutAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/admin/reminders" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <ReminderScheduling />
              </ProtectedRoute>
            } />
            <Route path="/organizations" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <OrganizationDashboard />
              </ProtectedRoute>
            } />

            <Route path="/superadmin" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/superadmin/organizations" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <OrgManagement />
              </ProtectedRoute>
            } />
            <Route path="/superadmin/settings" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <PlatformSettings />
              </ProtectedRoute>
            } />
            <Route path="/superadmin/security" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <SecurityManagement />
              </ProtectedRoute>
            } />

            <Route path="/observer" element={
              <ProtectedRoute allowedRoles={['OBSERVER', 'SUPER_ADMIN']}>
                <ObserverElectionList />
              </ProtectedRoute>
            } />
            <Route path="/observer/audit" element={
              <ProtectedRoute allowedRoles={['OBSERVER', 'SUPER_ADMIN']}>
                <ObserverAuditView />
              </ProtectedRoute>
            } />
            <Route path="/observer/results" element={
              <ProtectedRoute allowedRoles={['OBSERVER', 'SUPER_ADMIN']}>
                <ObserverResultsView />
              </ProtectedRoute>
            } />
            <Route path="/observer/tally-audit" element={
              <ProtectedRoute allowedRoles={['OBSERVER', 'SUPER_ADMIN']}>
                <TallyAuditView />
              </ProtectedRoute>
            } />

            <Route path="/403" element={<AccessDenied />} />
            <Route path="/maintenance" element={<SystemMaintenance />} />
            <Route path="/disabled" element={<AccountDisabled />} />
            <Route path="/already-voted" element={<AlreadyVoted />} />
                      {/* Super Admin Routes */}
            <Route path="/super-admin" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <SuperAdminPlatformDashboard />
              </ProtectedRoute>
            } />
            <Route path="/super-admin/organizations" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <OrganizationListSuperAdmin />
              </ProtectedRoute>
            } />
            <Route path="/super-admin/organizations/new" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <CreateOrganizationSuperAdmin />
              </ProtectedRoute>
            } />
            <Route path="/super-admin/organizations/:id" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <OrganizationDetailsSuperAdmin />
              </ProtectedRoute>
            } />
            <Route path="/super-admin/organizations/:id/billing" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <OrganizationBillingSuperAdmin />
              </ProtectedRoute>
            } />
                      <Route path="/super-admin/health" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <PlatformSystemHealth />
              </ProtectedRoute>
            } />
            <Route path="/super-admin/metrics" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <GlobalMetrics />
              </ProtectedRoute>
            } />
                      <Route path="/super-admin/settings" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <FeatureFlagsSuperAdmin />
              </ProtectedRoute>
            } />
            <Route path="/super-admin/logs" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <AuditLogsOverview />
              </ProtectedRoute>
            } />
            <Route path="/super-admin/action-logs" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <AdminActionLogs />
              </ProtectedRoute>
            } />
                      <Route path="/super-admin/integrity" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <InstitutionalIntegritySystem />
              </ProtectedRoute>
            } />
            <Route path="/super-admin/compliance" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <ComplianceDataRetention />
              </ProtectedRoute>
            } />
                      <Route path="/super-admin/sync" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <SyncStatus />
              </ProtectedRoute>
            } />
            <Route path="/super-admin/abuse" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <AbuseDetection />
              </ProtectedRoute>
            } />
                      <Route path="/voter/profile" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <ProfileOverview />
              </ProtectedRoute>
            } />
            <Route path="/admin/voters/:id/block" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <BlockVoterConfirmation />
              </ProtectedRoute>
            } />
                      <Route path="/update-required" element={<AppUpdateRequired />} />
            <Route path="/voter/ballot/:id" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <BallotScreen />
              </ProtectedRoute>
            } />
            <Route path="/voter/biometric-setup" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <BiometricSetup />
              </ProtectedRoute>
            } />
            <Route path="/voter/biometric-unlock" element={<BiometricUnlock />} />
                      <Route path="/admin/charts" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ChartsGraphsView />
              </ProtectedRoute>
            } />
            <Route path="/admin/elections/:id/results-detailed" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DetailedResultsBreakdown />
              </ProtectedRoute>
            } />
                      <Route path="/admin/elections/:id/duplicate" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DuplicateElectionConfirmation />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ElectionAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/voter/election-closed" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <ElectionClosed />
              </ProtectedRoute>
            } />
                      <Route path="/voter/election-pre-start/:id" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <ElectionDetailsPreStart />
              </ProtectedRoute>
            } />
            <Route path="/admin/results-overview" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ElectionResultsOverview />
              </ProtectedRoute>
            } />
                      <Route path="/voter/election-rules" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <ElectionRulesInstructions />
              </ProtectedRoute>
            } />
            <Route path="/admin/status-history" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ElectionStatusHistory />
              </ProtectedRoute>
            } />
                      <Route path="/voter/eligibility-status" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <EligibilityStatus />
              </ProtectedRoute>
            } />
                      <Route path="/voter/identity-verified" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <IdentityVerified />
              </ProtectedRoute>
            } />
                      <Route path="/logout-confirm" element={<LogoutConfirmation />} />
                      <Route path="/voter/my-elections" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <MyElectionsList />
              </ProtectedRoute>
            } />
                      <Route path="/voter/inbox" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <NotificationsInbox />
              </ProtectedRoute>
            } />
                      <Route path="/admin/organizations/:orgId/members" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <OrganizationMembers />
              </ProtectedRoute>
            } />
                      <Route path="/admin/organizations/:orgId/overview" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <OrganizationOverview />
              </ProtectedRoute>
            } />
                      <Route path="/admin/organization-selection" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <OrganizationSelection />
              </ProtectedRoute>
            } />
                      <Route path="/admin/organizations/:orgId/settings" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <OrganizationSettings />
              </ProtectedRoute>
            } />
                      <Route path="/admin/result-export" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ResultExportScreen />
              </ProtectedRoute>
            } />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/splash" element={<SplashScreen />} />
                      <Route path="/voter/dashboard" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <UserDashboard />
              </ProtectedRoute>
            } />
                      <Route path="/voter/vote-confirmation/:id" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <VoteConfirmationWarning />
              </ProtectedRoute>
            } />
                      <Route path="/voter/vote-success/:id" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <VoteSubmittedSuccess />
              </ProtectedRoute>
            } />
                      <Route path="/voter/voting-token/:id" element={
              <ProtectedRoute allowedRoles={['VOTER']}>
                <VotingTokenIssued />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
