export default function StatusBadge({ status }) {
  const key = (status || 'draft').toLowerCase();
  return <span className={`badge badge-${key}`}>{status}</span>;
}
