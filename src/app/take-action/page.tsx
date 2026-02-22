import { letterTemplates } from "@/data/templates";
import { LetterTemplate } from "@/components/take-action/LetterTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Take Action - CMH Watch",
  description:
    "Ready-made letter templates to contact officials about accountability at Cambridge Memorial Hospital.",
};

export default function TakeActionPage() {
  return (
    <main className="flex-grow">
      <section className="bg-[var(--color-gray-warm)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--color-navy)]">
            Take Action
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Ready-made letter templates addressed to specific named officials.
            Copy, personalize, and send. Every letter puts a named person on
            notice that the community is watching.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> CC <strong>info@cmhwatch.ca</strong> on any
            letter you send so we can track community engagement. When you
            receive a response (or don't), let us know — it becomes part of the
            public record.
          </p>
        </div>

        <div className="space-y-6">
          {letterTemplates.map((template) => (
            <LetterTemplate key={template.id} template={template} />
          ))}
        </div>
      </div>
    </main>
  );
}
