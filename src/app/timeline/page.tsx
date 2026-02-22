import { timelineEntries } from "@/data/timeline";
import Link from "next/link";
import { getPersonBySlug } from "@/lib/people";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline - CMH Watch",
  description:
    "Chronological record of all actions taken and responses received in the CMH accountability campaign.",
};

const categoryStyles: Record<string, string> = {
  "foi-request": "bg-blue-100 text-blue-800",
  "letter-sent": "bg-purple-100 text-purple-800",
  "response-received": "bg-green-100 text-green-800",
  "community-update": "bg-gray-100 text-gray-800",
  media: "bg-yellow-100 text-yellow-800",
  government: "bg-red-100 text-red-800",
};

export default function TimelinePage() {
  const sorted = [...timelineEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="flex-grow">
      <section className="bg-[var(--color-gray-warm)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--color-navy)]">Timeline</h1>
          <p className="mt-4 text-lg text-gray-700">
            Every action taken, every response received, every development —
            documented in chronological order.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {sorted.map((entry, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[var(--color-navy)] mt-1.5" />
                {index < sorted.length - 1 && (
                  <div className="w-0.5 bg-gray-200 flex-grow mt-1" />
                )}
              </div>
              <div className="pb-8">
                <div className="flex items-center gap-2 flex-wrap">
                  <time className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      categoryStyles[entry.category] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {entry.category.replace(/-/g, " ")}
                  </span>
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mt-1">
                  {entry.title}
                </h3>
                <p className="text-gray-700 mt-1">{entry.description}</p>
                {entry.personSlugs.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.personSlugs.map((slug) => {
                      const person = getPersonBySlug(slug);
                      return person ? (
                        <Link
                          key={slug}
                          href={`/accountability/${slug}`}
                          className="text-xs text-[var(--color-red-accent)] hover:underline"
                        >
                          {person.name}
                        </Link>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
