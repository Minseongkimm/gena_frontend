export default function ChartDataList({ data }) {
  return (
    <div className="mb-8">
      {data.map((d, dataIndex) => (
        <div key={dataIndex} className="flex items-center px-2 py-1 gap-4">
          <span className="text-base text-black">{d.label}</span>
          <span className="text-base text-black font-bold">{d.value}</span>
          <button
            type="button"
            className="ml-2 text-base text-blue-600 hover:text-red-500"
          >×</button>
        </div>
      ))}
    </div>
  );
} 