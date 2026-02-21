import { getAllPeople } from "@/lib/people";
import { CategorySection } from "@/components/accountability/CategorySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who's Responsible - CMH Watch",
  description:
    "Every official responsible for oversight of Cambridge Memorial Hospital, tracked by name.",
};

const categoryOrder = [
  "hospital-leadership",
  "department-chief",
  "government-official",
  "regulatory-body",
];

export default function AccountabilityPage() {
  const people = getAllPeople();

  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    people: people.filter((p) => p.category === cat),
  }));

  return (
    <main className="flex-grow">
      <section className="bg-[var(--color-gray-warm)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--color-navy)]">
            Who&apos;s Responsible
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Every person in the chain of accountability — from the hospital floor to
            Parliament Hill. Each profile tracks what they&apos;ve been told, what they&apos;ve
            done, and how long they&apos;ve been silent.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {grouped.map(({ category, people }) => (
          <CategorySection key={category} category={category} people={people} />
        ))}
      </div>
    </main>
  );
}
