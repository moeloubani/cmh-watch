import { Communication } from "@/lib/types";

export function CommunicationTimeline({ communications }: { communications: Communication[] }) {
  if (communications.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-500">No communications recorded yet.</p>
        <p className="text-sm text-gray-400 mt-2">
          When this person is contacted, the full communication will be documented here.
        </p>
      </div>
    );
  }

  const sorted = [...communications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      {sorted.map((comm, index) => (
        <div key={index} className="border-l-4 border-[var(--color-navy)] pl-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <time>{new Date(comm.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</time>
            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium capitalize">
              {comm.method.replace("-", " ")}
            </span>
          </div>
          <h4 className="font-semibold mt-1">{comm.subject}</h4>
          <p className="text-gray-700 mt-2 whitespace-pre-wrap">{comm.content}</p>

          {comm.response ? (
            <div className="mt-4 bg-green-50 border border-green-200 rounded p-4">
              <div className="text-sm text-green-700 font-medium">
                Response received — {new Date(comm.response.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <p className="text-gray-700 mt-2 whitespace-pre-wrap">{comm.response.content}</p>
            </div>
          ) : (
            <div className="mt-4 bg-red-50 border border-red-200 rounded p-3">
              <span className="text-sm text-red-700 font-medium">No response received</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
