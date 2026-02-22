import { facts } from "@/data/facts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Facts - CMH Watch",
  description:
    "Documented evidence: FOI requests, official responses, and verifiable records about Cambridge Memorial Hospital.",
};

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  denied: "bg-red-100 text-red-800",
  appealed: "bg-orange-100 text-orange-800",
};

export default function FactsPage() {
  return (
    <main className="flex-grow">
      <section className="bg-[var(--color-gray-warm)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--color-navy)]">The Facts</h1>
          <p className="mt-4 text-lg text-gray-700">
            Documented, verifiable evidence only. Every item on this page is backed
            by official records, FOI requests, or documented communications.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {facts.map((fact) => (
          <article
            key={fact.id}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <time className="text-sm text-gray-500">
                  {new Date(fact.date).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-xl font-bold text-[var(--color-navy)] mt-1">
                  {fact.title}
                </h2>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[fact.status]}`}
              >
                {fact.status.replace("-", " ").toUpperCase()}
              </span>
            </div>
            <p className="text-gray-700 mt-3">{fact.summary}</p>
            {fact.recipientName && (
              <p className="text-sm text-gray-500 mt-2">
                Directed to:{" "}
                {fact.recipientSlug ? (
                  <Link
                    href={`/accountability/${fact.recipientSlug}`}
                    className="text-[var(--color-red-accent)] hover:underline"
                  >
                    {fact.recipientName}
                  </Link>
                ) : (
                  <span className="font-medium">{fact.recipientName}</span>
                )}
              </p>
            )}
            {/* Full text */}
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-[var(--color-red-accent)]">
                View full document
              </summary>
              <pre className="mt-4 bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-700 whitespace-pre-wrap font-sans overflow-x-auto">
                {fact.content}
              </pre>
            </details>
          </article>
        ))}
      </div>
    </main>
  );
}
