import { getAllPeople } from "@/lib/people";
import { getContactStatus } from "@/lib/utils";

export function StatsBar() {
  const people = getAllPeople();
  const contacted = people.filter(
    (p) => getContactStatus(p.communications) !== "not-contacted"
  ).length;
  const responded = people.filter(
    (p) => getContactStatus(p.communications) === "responded"
  ).length;

  return (
    <div className="bg-navy text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{people.length}</div>
            <div className="text-sm text-gray-300 mt-1">Officials Tracked</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{contacted}</div>
            <div className="text-sm text-gray-300 mt-1">
              Officials Contacted
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold">{responded}</div>
            <div className="text-sm text-gray-300 mt-1">
              Responses Received
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
