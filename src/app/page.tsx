import Link from "next/link";
import { StatsBar } from "@/components/ui/StatsBar";
import { LatestUpdate } from "@/components/ui/LatestUpdate";

export default function Home() {
  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight">
            Holding Cambridge Memorial Hospital Accountable
          </h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            CMH Watch documents concerns about racism and mistreatment of
            minorities at Cambridge Memorial Hospital. We track every official
            responsible for oversight, document every communication, and record
            every response — or silence. Accountability starts with
            transparency.
          </p>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Latest Update */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LatestUpdate />
      </section>

      {/* Three CTAs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <Link
            href="/facts"
            className="block bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-navy">Read the Facts</h2>
            <p className="mt-3 text-gray-600">
              Documented evidence including FOI requests, official responses, and
              verifiable records.
            </p>
            <span className="inline-block mt-4 text-red-accent font-medium text-sm">
              View documented evidence &rarr;
            </span>
          </Link>

          <Link
            href="/community-voices"
            className="block bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-navy">Share Your Story</h2>
            <p className="mt-3 text-gray-600">
              Have you or someone you know experienced mistreatment at CMH? Your
              voice matters.
            </p>
            <span className="inline-block mt-4 text-red-accent font-medium text-sm">
              Submit your experience &rarr;
            </span>
          </Link>

          <Link
            href="/take-action"
            className="block bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-navy">Take Action</h2>
            <p className="mt-3 text-gray-600">
              Ready-made letter templates addressed to named officials. Make your
              voice heard.
            </p>
            <span className="inline-block mt-4 text-red-accent font-medium text-sm">
              Get started &rarr;
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
