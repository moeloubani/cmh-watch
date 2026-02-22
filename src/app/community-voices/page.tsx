import { SubmissionForm } from "@/components/community-voices/SubmissionForm";
import { StoryCard } from "@/components/community-voices/StoryCard";
import { publishedStories } from "@/data/stories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Voices - CMH Watch",
  description:
    "Personal accounts from patients and families about their experiences at Cambridge Memorial Hospital.",
};

export default function CommunityVoicesPage() {
  return (
    <main className="flex-grow">
      <section className="bg-gray-warm py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-navy">Community Voices</h1>
          <p className="mt-4 text-lg text-gray-700">
            Personal accounts from patients and families. You choose how you're
            identified: full name, first name only, or anonymous.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> Community Voices are personal accounts.
            They have not been independently verified by CMH Watch. These stories
            are published to give voice to community members' experiences.
          </p>
        </div>

        {/* Published stories */}
        {publishedStories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">
              Published Stories
            </h2>
            <div className="space-y-6">
              {publishedStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </section>
        )}

        {/* Submission form */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-2">
            Share Your Experience
          </h2>
          <p className="text-gray-600 mb-6">
            All submissions are reviewed before publishing. Names of staff you
            mention are held privately and not published without verification.
          </p>
          <SubmissionForm />
        </section>
      </div>
    </main>
  );
}
