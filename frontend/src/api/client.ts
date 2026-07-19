import { User } from 'firebase/auth';
import { API_URL } from '../config/api';

/**
 * Generic authenticated request helper.
 * Automatically injects the Firebase ID token from the current user.
 */
async function request<T = any>(
  endpoint: string,
  user: User | null,
  options: RequestInit = {}
): Promise<T> {
  let token = '';
  if (user) {
    token = await user.getIdToken();
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data: any;
  try {
    data = await response.json();
  } catch {
    data = { error: 'Failed to parse response' };
  }

  if (!response.ok) {
    throw { status: response.status, ...data };
  }

  return data as T;
}

// ============================================================
// AUTH
// ============================================================

export const authApi = {
  syncUser: (user: User) => request('/users/sync', user, { method: 'POST' }),
};

// ============================================================
// USER PROFILE
// ============================================================

export const userApi = {
  getProfile: (user: User) =>
    request('/user/profile', user),

  getActivityLogs: (user: User) =>
    request<{ activity: any[] }>('/user/activity', user),

  updateProfile: (user: User, data: { displayName?: string; preferences?: any }) =>
    request('/user/profile', user, { method: 'PUT', body: JSON.stringify(data) }),
};

// ============================================================
// ELECTIONS
// ============================================================

export interface ElectionSummary {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: string;
  type: string;
  publicKey: string;
}

export interface ElectionDetail extends ElectionSummary {
  organization: { id: string; name: string };
  candidates: Array<{ id: string; name: string; bio?: string; imageUrl?: string }>;
  _count: { votes: number; eligibility: number };
}

export const electionApi = {
  /** List active elections for voters */
  listActive: (user: User) =>
    request<{ elections: ElectionSummary[] }>('/elections', user),

  /** List ALL elections (admin) */
  listAll: (user: User) =>
    request<{ elections: any[] }>('/elections/all', user),

  /** Get single election with candidates */
  getById: (user: User, electionId: string) =>
    request<{ election: ElectionDetail; isEligible: boolean; hasVoted: boolean }>(
      `/elections/${electionId}`, user
    ),

  /** Create election (admin) */
  create: (user: User, data: any) =>
    request('/elections', user, { method: 'POST', body: JSON.stringify(data) }),

  /** Update election (admin) */
  update: (user: User, electionId: string, data: any) =>
    request(`/elections/${electionId}`, user, { method: 'PATCH', body: JSON.stringify(data) }),

  /** Delete election (admin) */
  delete: (user: User, electionId: string) =>
    request(`/elections/${electionId}`, user, { method: 'DELETE' }),

  /** Add Candidate (admin) */
  addCandidate: (user: User, electionId: string, data: { name: string; bio: string; imageUrl?: string }) =>
    request(`/elections/${electionId}/candidates`, user, { method: 'POST', body: JSON.stringify(data) }),

  /** Update Candidate (admin) */
  updateCandidate: (user: User, electionId: string, candidateId: string, data: { name?: string; bio?: string; imageUrl?: string }) =>
    request(`/elections/${electionId}/candidates/${candidateId}`, user, { method: 'PATCH', body: JSON.stringify(data) }),

  /** Delete Candidate (admin) */
  deleteCandidate: (user: User, electionId: string, candidateId: string) =>
    request(`/elections/${electionId}/candidates/${candidateId}`, user, { method: 'DELETE' }),

  /** Reorder Candidates (admin) */
  reorderCandidates: (user: User, electionId: string, orders: Array<{ id: string; order: number }>) =>
    request(`/elections/${electionId}/candidates/reorder`, user, { method: 'POST', body: JSON.stringify({ orders }) }),

  /** Update election status (admin) */
  updateStatus: (user: User, electionId: string, status: string) =>
    request(`/elections/${electionId}`, user, { method: 'PATCH', body: JSON.stringify({ status }) }),
};

// ============================================================
// TALLY & EXPORT
// ============================================================

export const tallyApi = {
  /** Compute tally for a closed election */
  computeTally: (user: User, electionId: string) =>
    request<{ electionId: string; totalVotes: number; validVotes: number; tally: Record<string, number> }>('/tally', user, {
      method: 'POST',
      body: JSON.stringify({ electionId })
    }),

  /** Export official results */
  exportResults: (user: User, electionId: string) =>
    request<{ success: boolean; export: any; message: string }>(`/tally/${electionId}/export`, user),
};

// ============================================================
// VOTING
// ============================================================

export const voteApi = {
  /** Request a one-time voting token */
  requestToken: (user: User, electionId: string) =>
    request<{ token: string; expiresAt: string }>(
      '/vote/token', user, { method: 'POST', body: JSON.stringify({ electionId }) }
    ),

  /** Submit encrypted vote */
  submit: (electionId: string, token: string, encryptedPayload: string) =>
    request<{ success: boolean; receipt: string }>(
      '/vote/submit', null, {
        method: 'POST',
        body: JSON.stringify({ electionId, token, encryptedPayload })
      }
    ),

  /** Cast vote (web-flow convenience wrapper) */
  castVote: (user: User, electionId: string, payload: any) =>
    request<{ receipt: { voteHash: string; blockHash: string; timestamp: string } }>(
      `/vote/cast`, user, {
        method: 'POST',
        body: JSON.stringify({ electionId, ...payload })
      }
    ),
};

// ============================================================
// ADMIN
// ============================================================

export interface AdminMetrics {
  totalUsers: number;
  totalElections: number;
  totalVoters: number;
  totalVotes: number;
  totalOrganizations: number;
  systemHealth: string;
  activeElections?: number;
  activeOrganizations?: number;
  activeNodes?: number;
  globalTurnout?: number;
}

export const adminApi = {
  /** Get super admin metrics */
  getMetrics: (user: User) =>
    request<AdminMetrics>('/admin/metrics', user),

  /** Get full super admin dashboard */
  getDashboard: (user: User) =>
    request<{ metrics: AdminMetrics; recentAlerts: any[] }>('/admin/dashboard', user),

  /** Get audit logs */
  getAuditLogs: (user: User, params?: { entityType?: string; limit?: number; offset?: number; userId?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.entityType) searchParams.set('entityType', params.entityType);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());
    if (params?.userId) searchParams.set('userId', params.userId);
    const qs = searchParams.toString();
    return request<{ logs: any[]; total: number }>(`/admin/audit-logs${qs ? '?' + qs : ''}`, user);
  },

  /** Get turnout analytics for an election */
  getTurnoutAnalytics: (user: User, electionId: string) =>
    request<{
      electionId: string;
      title: string;
      totalEligible: number;
      totalVotes: number;
      turnoutPercentage: number;
      status: string;
    }>(`/admin/analytics/turnout/${electionId}`, user),

  /** Pause election */
  pauseElection: (user: User, electionId: string) =>
    request('/admin/pause', user, { method: 'POST', body: JSON.stringify({ electionId }) }),

  /** Resolve abuse report */
  resolveAbuseReport: (user: User, reportId: string, resolution: string) =>
    request(`/admin/abuse-reports/${reportId}`, user, { method: 'PATCH', body: JSON.stringify({ status: 'RESOLVED', resolution }) }),

  /** Import Voters from CSV */
  importVoters: (user: User, electionId: string, csvData: string) =>
    request(`/admin/import-voters`, user, { method: 'POST', body: JSON.stringify({ electionId, csvData }) }),

  /** Add single voter */
  addVoter: (user: User, electionId: string, email: string) =>
    request<{ message: string }>('/admin/add-voter', user, {
      method: 'POST',
      body: JSON.stringify({ electionId, email }),
    }),

  blockVoter: (user: User, userId: string, reason: string) =>
    request<{ message: string }>(`/admin/users/${userId}/block`, user, {
      method: 'POST',
      body: JSON.stringify({ reason })
    }),

  /** Add user (super admin) */
  addUser: (user: User, data: { email: string; password: string; role: string; displayName?: string; metadata?: any }) =>
    request('/admin/users', user, { method: 'POST', body: JSON.stringify(data) }),

  /** Update election status */
  updateElectionStatus: (user: User, electionId: string, status: string) =>
    request(`/admin/elections/${electionId}/status`, user, { method: 'PATCH', body: JSON.stringify({ status }) }),
};

// ============================================================
// ORGANIZATIONS
// ============================================================

export interface OrganizationSummary {
  id: string;
  name: string;
  domain?: string;
  timezone: string;
  currency: string;
  logoUrl?: string;
  settings?: any;
  createdAt: string;
  _count?: { users: number; elections: number };
}

export const organizationApi = {
  /** List orgs the current user has access to */
  list: (user: User) =>
    request<{ organizations: OrganizationSummary[] }>('/organizations', user),

  /** Get single org with stats */
  getById: (user: User, orgId: string) =>
    request<{ organization: any; totalVotes: number }>(`/organizations/${orgId}`, user),

  /** Update org */
  update: (user: User, orgId: string, data: Partial<OrganizationSummary>) =>
    request(`/organizations/${orgId}`, user, { method: 'PATCH', body: JSON.stringify(data) }),

  /** Create org (super admin) */
  create: (user: User, data: { name: string; domain?: string; timezone?: string; currency?: string }) =>
    request('/organizations', user, { method: 'POST', body: JSON.stringify(data) }),

  // ---- MEMBERS ----

  /** List members of an org */
  listMembers: (user: User, orgId: string) =>
    request<{ members: any[] }>(`/organizations/${orgId}/members`, user),

  /** Add member */
  addMember: (user: User, orgId: string, data: { email: string; roleName: string }) =>
    request(`/organizations/${orgId}/members`, user, { method: 'POST', body: JSON.stringify(data) }),

  /** Update member role */
  updateMember: (user: User, orgId: string, memberId: string, data: { roleName: string }) =>
    request(`/organizations/${orgId}/members/${memberId}`, user, { method: 'PATCH', body: JSON.stringify(data) }),

  /** Remove member */
  removeMember: (user: User, orgId: string, memberId: string) =>
    request(`/organizations/${orgId}/members/${memberId}`, user, { method: 'DELETE' }),

  /** Alias for listMembers (mobile compat) */
  getMembers: (user: User, orgId: string) =>
    request<{ members: any[] }>(`/organizations/${orgId}/members`, user),

  /** Get org billing (super admin) */
  getBilling: (user: User, orgId: string) =>
    request<{ billing: any }>(`/organizations/${orgId}/billing`, user),
};

// ============================================================
// PLATFORM SETTINGS (Super Admin)
// ============================================================

export interface PlatformSettingsData {
  id: string;
  maintenanceMode: boolean;
  defaultTimezone: string;
  auditLogRetention: string;
  sessionTimeoutMinutes: number;
  encryptionStrength: string;
  biometricEnforcement: boolean;
  ipWhitelisting: boolean;
  fraudDetection: boolean;
}

export const platformSettingsApi = {
  /** Get global platform settings */
  get: (user: User) =>
    request<{ settings: PlatformSettingsData }>('/platform-settings', user),

  /** Update platform settings */
  update: (user: User, data: Partial<PlatformSettingsData>) =>
    request<{ settings: PlatformSettingsData }>('/platform-settings', user, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

// ============================================================
// NOTIFICATIONS
// ============================================================

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export const notificationApi = {
  /** Get user notifications */
  list: (user: User) =>
    request<{ notifications: NotificationItem[]; unreadCount: number }>('/notifications', user),

  /** Mark single notification as read */
  markRead: (user: User, notificationId: string) =>
    request(`/notifications/${notificationId}/read`, user, { method: 'PATCH' }),

  /** Mark all as read */
  markAllRead: (user: User) =>
    request('/notifications/read-all', user, { method: 'PATCH' }),
};

// (tallyApi is defined above - no duplicate needed)
