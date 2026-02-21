import Link from "next/link";
import { Person } from "@/lib/types";
import { daysSinceLastContact, getContactStatus } from "@/lib/utils";

const statusColors: Record<string, string> = {
  "not-contacted": "bg-gray-200 text-gray-700",
  "contacted": "bg-yellow-100 text-yellow-800",
  "responded": "bg-green-100 text-green-800",
  "no-response": "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  "not-contacted": "Not Yet Contacted",
  "contacted": "Contacted",
  "responded": "Responded",
  "no-response": "No Response",
};

export function PersonCard({ person }: { person: Person }) {
  const status = getContactStatus(person.communications);
  const days = daysSinceLastContact(person.communications);

  return (
    <Link
      href={`/accountability/${person.slug}`}
      className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-[var(--color-navy)]">{person.name}</h3>
          <p className="text-sm text-gray-600 mt-0.5">{person.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{person.organization}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      {days !== null && (
        <p className="text-xs text-[var(--color-red-accent)] font-medium mt-3">
          {days} days without response
        </p>
      )}
    </Link>
  );
}
