import { notFound } from "next/navigation";
import { getAllPeople, getPersonBySlug } from "@/lib/people";
import { daysSinceLastContact } from "@/lib/utils";
import { CommunicationTimeline } from "@/components/accountability/CommunicationTimeline";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllPeople().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) return {};
  return {
    title: `${person.name} - CMH Watch`,
    description: `Accountability profile for ${person.name}, ${person.title} at ${person.organization}. Tracking communications and responses.`,
  };
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  const days = daysSinceLastContact(person.communications);

  return (
    <main className="flex-grow">
      <section className="bg-[var(--color-gray-warm)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
            {person.organization}
          </p>
          <h1 className="text-4xl font-bold text-[var(--color-navy)] mt-2">
            {person.name}
          </h1>
          <p className="text-xl text-gray-600 mt-1">{person.title}</p>

          {days !== null && (
            <p className="text-[var(--color-red-accent)] font-bold text-lg mt-4">
              {days} days without response
            </p>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Why they're accountable */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">
            Why They&apos;re Accountable
          </h2>
          <p className="mt-3 text-gray-700">{person.responsibilities}</p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">
            Contact Information
          </h2>
          <div className="mt-3 space-y-2 text-gray-700">
            {person.contactInfo.email && (
              <p>
                <span className="font-medium">Email:</span>{" "}
                {person.contactInfo.email}
              </p>
            )}
            {person.contactInfo.phone && (
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {person.contactInfo.phone}
              </p>
            )}
            {person.contactInfo.address && (
              <p>
                <span className="font-medium">Address:</span>{" "}
                {person.contactInfo.address}
              </p>
            )}
          </div>
        </section>

        {/* Communication Record */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">
            Communication Record
          </h2>
          <p className="mt-2 text-gray-600 mb-6">
            Every communication sent to {person.name} and every response (or
            silence) is documented below.
          </p>
          <CommunicationTimeline communications={person.communications} />
        </section>

        {/* Public Statements */}
        {person.publicStatements.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-navy)]">
              Public Statements
            </h2>
            <div className="mt-4 space-y-4">
              {person.publicStatements.map((stmt, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded p-4">
                  <div className="text-sm text-gray-500">
                    {new Date(stmt.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })} — {stmt.source}
                  </div>
                  <p className="mt-2 text-gray-700">{stmt.content}</p>
                  {stmt.url && (
                    <a
                      href={stmt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--color-red-accent)] mt-2 inline-block"
                    >
                      View source &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
