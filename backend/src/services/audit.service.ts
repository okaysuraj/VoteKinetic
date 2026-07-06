import { prisma } from '../db/prisma';

export class AuditService {
  /**
   * Logs a critical action to the immutable audit log table.
   * @param action The action performed (e.g. VOTE_CAST, ELECTION_CREATED)
   * @param entityType The type of entity affected (e.g. ELECTION, USER)
   * @param entityId The ID of the affected entity
   * @param userId The user who performed the action (optional, e.g. for anonymous voting)
   * @param details Additional JSON details
   * @param ipAddress The IP address of the requester (if available)
   */
  static async log(
    action: string,
    entityType: string,
    entityId: string,
    userId?: string,
    details?: any,
    ipAddress?: string
  ) {
    try {
      await prisma.auditLog.create({
        data: {
          action,
          entityType,
          entityId,
          userId,
          details: details ? JSON.stringify(details) : undefined,
          ipAddress
        }
      });
      console.log(`[AUDIT] ${action} on ${entityType} ${entityId}`);
    } catch (error) {
      console.error('[AUDIT ERROR] Failed to write to audit log:', error);
      // In a highly secure environment, an audit failure might halt the system or trigger an alert.
    }
  }
}
