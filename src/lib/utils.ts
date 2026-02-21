import { Communication, CommunicationStatus } from "@/lib/types";

export function daysSinceLastContact(communications: Communication[]): number | null {
  if (communications.length === 0) return null;

  const sorted = [...communications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latest = sorted[0];
  if (latest.response) return null;

  const now = new Date();
  const contactDate = new Date(latest.date);
  const diffMs = now.getTime() - contactDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function getContactStatus(communications: Communication[]): CommunicationStatus {
  if (communications.length === 0) return "not-contacted";

  const sorted = [...communications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sorted[0].response ? "responded" : "no-response";
}
