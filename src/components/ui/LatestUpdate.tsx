import { timelineEntries } from "@/data/timeline";

export function LatestUpdate() {
  const sorted = [...timelineEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const latest = sorted[0];
  if (!latest) return null;

  return (
    <div className="bg-gray-warm border-l-4 border-red-accent p-6">
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Latest Update &mdash;{" "}
        {new Date(latest.date + "T00:00:00").toLocaleDateString("en-CA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <h3 className="text-lg font-semibold mt-1">{latest.title}</h3>
      <p className="text-gray-700 mt-2">{latest.description}</p>
    </div>
  );
}
