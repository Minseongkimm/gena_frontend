import ChartSummary from "./ChartSummary";

export default function ChartStats({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-2.5 mb-6 mt-5">
      <ChartSummary title="Total" value={stats.total} />
      <ChartSummary title="Categories" value={stats.categories} />
      <ChartSummary title="Highest" value={stats.highest} />
    </div>
  );
} 