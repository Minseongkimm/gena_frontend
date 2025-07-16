import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ChartComponent({ type, data }) {
  // Transform data format: { labels: [...], values: [...] } → [{ name: "...", value: ... }]
  // Recharts expects data in array format with 'name' and 'value' properties
  const transformedData = data?.labels?.map((label, index) => ({
    name: label,
    value: data.values[index]
  })) || [];

  // Common chart elements shared between bar and line charts
  const commonElements = (
    <>
      {/* Grid lines for better readability */}
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="name" tick={{ fill: "#7B849B", fontSize: 11 }} />
      <YAxis tick={{ fill: "#7B849B", fontSize: 11 }} />
      <Tooltip contentStyle={{ fontSize: '12px', color: '#1A2233' }} />
    </>
  );

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={transformedData}>
          {commonElements}
          <Line type="monotone" dataKey="value" stroke="#5B7FFF" strokeWidth={2} dot={{ fill: "#5B7FFF" }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // Default to bar chart
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={transformedData}>
        {commonElements}
        <Bar dataKey="value" fill="#5B7FFF" radius={[7, 7, 0, 0]} barSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
} 