import { Person } from "@/lib/types";
import { PersonCard } from "./PersonCard";

const categoryLabels: Record<string, string> = {
  "hospital-leadership": "Hospital Leadership",
  "department-chief": "Department Chiefs",
  "board-member": "Board of Directors",
  "government-official": "Government Officials",
  "regulatory-body": "Regulatory & Oversight Bodies",
};

const categoryDescriptions: Record<string, string> = {
  "hospital-leadership":
    "The executives and board members who run Cambridge Memorial Hospital and set its policies.",
  "department-chief":
    "The physicians who lead each clinical department and are responsible for care standards in their area.",
  "government-official":
    "The elected officials responsible for healthcare oversight, funding, and representing Cambridge residents.",
  "regulatory-body":
    "The independent bodies that regulate healthcare professionals and investigate complaints in Ontario.",
};

export function CategorySection({
  category,
  people,
}: {
  category: string;
  people: Person[];
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-[var(--color-navy)]">
        {categoryLabels[category] || category}
      </h2>
      <p className="text-gray-600 mt-2 mb-6">
        {categoryDescriptions[category]}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {people.map((person) => (
          <PersonCard key={person.slug} person={person} />
        ))}
      </div>
    </section>
  );
}
