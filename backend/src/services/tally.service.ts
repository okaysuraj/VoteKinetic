import { prisma } from '../db/prisma';
import { EncryptionService } from './encryption.service';

export class TallyService {
  static async tallyElection(electionId: string, privateKey: string) {
    const election = await prisma.election.findUnique({
      where: { id: electionId },
      include: { candidates: true, votes: true }
    });

    if (!election) throw new Error('Election not found');
    if (election.status !== 'CLOSED') throw new Error('Election must be CLOSED to tally');

    const results: Record<string, number> = {};
    election.candidates.forEach(c => results[c.id] = 0);

    for (const vote of election.votes) {
      try {
        const decryptedPayload = EncryptionService.decryptVote(vote.encryptedPayload, privateKey);
        // Payload depends on type. For SINGLE_CHOICE, payload is just the candidate ID.
        if (election.type === 'SINGLE_CHOICE') {
          if (results[decryptedPayload] !== undefined) {
            results[decryptedPayload]++;
          }
        }
        // Multi and ranked choice logic would go here
      } catch (err) {
        console.error(`Failed to decrypt/tally vote ${vote.id}:`, err);
      }
    }

    return results;
  }
}
