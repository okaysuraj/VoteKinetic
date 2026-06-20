export function computeElectionStatus(election, now = new Date()) {
  if (election.status === 'cancelled' || election.status === 'draft') {
    return election.status;
  }

  const start = new Date(election.start_date);
  const end = new Date(election.end_date);

  if (now < start) return 'upcoming';
  if (now > end) return 'completed';
  return 'active';
}

export function canVote(election, now = new Date()) {
  const status = computeElectionStatus(election, now);
  return status === 'active' && election.status !== 'draft' && election.status !== 'cancelled';
}
