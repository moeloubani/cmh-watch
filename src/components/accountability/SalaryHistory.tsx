import { SalaryRecord } from "@/lib/types";

interface SalaryHistoryProps {
  sunshineList: {
    records: SalaryRecord[];
    notes?: string;
  };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function SalaryHistory({ sunshineList }: SalaryHistoryProps) {
  const { records, notes } = sunshineList;
  const sorted = [...records].sort((a, b) => b.year - a.year);
  const hasMultipleEmployers =
    new Set(sorted.map((r) => r.employer)).size > 1;

  if (records.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        {notes ? (
          <p className="text-gray-600">{notes}</p>
        ) : (
          <p className="text-gray-500">No public salary records available.</p>
        )}
        <p className="text-xs text-gray-400 mt-3">
          Source: Ontario Sunshine List (Public Sector Salary Disclosure)
        </p>
      </div>
    );
  }

  return (
    <div>
      {notes && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600">{notes}</p>
        </div>
      )}

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-navy)] text-white">
              <th className="px-4 py-3 text-left font-semibold">Year</th>
              <th className="px-4 py-3 text-left font-semibold">Position</th>
              {hasMultipleEmployers && (
                <th className="px-4 py-3 text-left font-semibold">Employer</th>
              )}
              <th className="px-4 py-3 text-right font-semibold">Salary</th>
              <th className="px-4 py-3 text-right font-semibold">
                Taxable Benefits
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((record, i) => (
              <tr
                key={record.year}
                className={
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {record.year}
                </td>
                <td className="px-4 py-3 text-gray-700">{record.position}</td>
                {hasMultipleEmployers && (
                  <td className="px-4 py-3 text-gray-700">
                    {record.employer}
                  </td>
                )}
                <td className="px-4 py-3 text-right text-gray-900 font-medium tabular-nums">
                  {formatCurrency(record.salary)}
                </td>
                <td className="px-4 py-3 text-right text-gray-600 tabular-nums">
                  {formatCurrency(record.taxableBenefits)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Source: Ontario Sunshine List (Public Sector Salary Disclosure)
      </p>
    </div>
  );
}
